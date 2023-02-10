from django.urls import path
from rest_framework.routers import DefaultRouter
from drinks.views import CocktailViewSet, CocktailLikeViewSet, CocktailDislikeViewSet, CocktailUserViewSet


default_router = DefaultRouter()

default_router.register('all', CocktailViewSet, 'all')
default_router.register('like', CocktailLikeViewSet, 'like')
default_router.register('dislike', CocktailDislikeViewSet, 'dislike')
default_router.register('favourite', CocktailUserViewSet, 'favourite')



 

urlpatterns = default_router.urls