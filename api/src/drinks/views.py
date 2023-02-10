from django.views import generic
from django.shortcuts import render

# Create your views here.
from .models import Cocktail, Ingredient, CocktailIngredient, Like, Dislike
from django.views import View
from django.http import JsonResponse
from django.contrib.auth import authenticate
from django.db.models import Count
from rest_framework import serializers, status, viewsets, mixins
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import action
from rest_framework.exceptions import ValidationError
from djoser import views as djoser_views, serializers as djoser_serializers
from django.contrib.auth.models import User

import json


class IngredientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ingredient
        fields = ("name",)


class CocktailIngredientSerializer(serializers.ModelSerializer):
    ingredient = IngredientSerializer()

    class Meta:
        model = CocktailIngredient
        fields = (
            "measure",
            "ingredient",
        )


class CocktailSerializerGET(serializers.ModelSerializer):
    liked = serializers.SerializerMethodField()
    disliked = serializers.SerializerMethodField()
    ingredients = CocktailIngredientSerializer(many=True)

    def get_liked(self, obj):
        return len(list(obj.like_set.all().values()))

    def get_disliked(self, obj):
        return len(list(obj.dislike_set.all().values()))

    class Meta:
        model = Cocktail
        fields = (
            "id",
            "api_id",
            "name",
            "image",
            "category",
            "alcoholic",
            "instruction",
            "liked",
            "disliked",
            "ingredients",
        )


class CocktailSerializerPOST(serializers.ModelSerializer):
    ingredients = serializers.ListField(
        child=serializers.CharField(max_length=32), write_only=True
    )
    measures = serializers.ListField(
        child=serializers.CharField(max_length=32, allow_blank=True, allow_null=True),
        write_only=True,
    )

    def create(self, validated_data):
        ingredients = validated_data.pop("ingredients")
        measures = validated_data.pop("measures")
        cocktail = Cocktail.objects.create(**validated_data)
        new_ingredients = []
        for ingredient_name in ingredients:
            new_ingredient, _ = Ingredient.objects.get_or_create(name=ingredient_name)
            new_ingredients.append(new_ingredient)

        for ingredient, measure in zip(new_ingredients, measures):
            CocktailIngredient.objects.create(
                cocktail=cocktail, ingredient=ingredient, measure=measure
            )

        return cocktail

    class Meta:
        model = Cocktail
        fields = "__all__"


class CocktailViewSet(
    mixins.CreateModelMixin,
    mixins.RetrieveModelMixin,
    mixins.ListModelMixin,
    viewsets.GenericViewSet,
):

    queryset = Cocktail.objects.all()

    def get_serializer_class(self):
        if self.request.method == "POST":
            return CocktailSerializerPOST
        return CocktailSerializerGET

    @action(detail=False, methods=["get"], serializer_class=CocktailSerializerGET)
    def top(self, request):
        queryset = Cocktail.objects.annotate(count=Count("like__id")).order_by(
            "-count"
        )[:8]
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class CustomTokenCreateSerializer(djoser_serializers.TokenCreateSerializer):
    def validate(self, attrs):
        password = attrs.get("password")
        username = attrs.get("username")
        self.user = authenticate(username=username, password=password)
        if not self.user:
            raise ValidationError({"invalid_credentials": ["This user doesn't exist"]})
        if self.user and self.user.is_active:
            return attrs


class CustomTokenCreateView(djoser_views.TokenCreateView):
    serializer_class = CustomTokenCreateSerializer


class UserSerializer(djoser_serializers.UserSerializer, serializers.ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"


class CurrentUserViewSet(djoser_views.UserViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


    def get_object(self):
        return self.request.user



class CocktailLikeDislikePOST(serializers.ModelSerializer):
    cocktail_id = serializers.IntegerField(write_only=True)

    def create(self, validated_data):
        user = self.context.get("request").user
        cocktail_id = validated_data.pop("cocktail_id")
        cocktail = Cocktail.objects.get(id=cocktail_id)
        return self.Meta.model.objects.create(user=user, cocktail=cocktail)

    class Meta:
        pass


class CocktailLikeSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Like
        fields = ("user",)


class CocktailDislikeSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Dislike
        fields = ("user",)


class CocktailLikeSerializerPOST(CocktailLikeDislikePOST):
    class Meta:
        model = Like
        fields = ("cocktail_id",)


class CocktailDislikeSerializerPOST(CocktailLikeDislikePOST):
    class Meta:
        model = Dislike
        fields = ("cocktail_id",)


class CocktailLikeViewSet(mixins.CreateModelMixin, viewsets.GenericViewSet):
    serializer_class = CocktailLikeSerializerPOST


class CocktailDislikeViewSet(mixins.CreateModelMixin, viewsets.GenericViewSet):
    serializer_class = CocktailDislikeSerializerPOST


class CocktailUserSerializerGET(serializers.ModelSerializer):

    class Meta:
        model = Cocktail
        fields = (
            "id",
            "name",
            "image",
        )


class CocktailUserViewSet(djoser_views.UserViewSet, mixins.ListModelMixin, viewsets.GenericViewSet):
    serializer_class = CocktailUserSerializerGET

    def get_queryset(self):
        return Cocktail.objects.filter(id__in=list(Like.objects.filter(user=self.request.user).values_list('cocktail', flat=True)))

class UserCreateSerializer(serializers.ModelSerializer):
        
    def create(self, obj):
        return User.objects.create_user(**obj)
    
    class Meta:
        model = User
        fields = ("username", "password",)
    

class UserViewSet(viewsets.GenericViewSet, mixins.CreateModelMixin):
    serializer_class = UserCreateSerializer



