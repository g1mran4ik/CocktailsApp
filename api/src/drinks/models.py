from django.db import models

# Create your models here.

from django.contrib.auth.models import User

# from django.contrib.auth.models import AbstractUser

class Cocktail(models.Model):
    api_id = models.CharField(max_length=16, unique=True)
    name = models.CharField(max_length=128, unique=True)
    image = models.URLField(max_length=200)
    category = models.CharField(max_length=128)
    alcoholic = models.CharField(max_length=128)
    instruction = models.TextField()

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['name']

class Ingredient(models.Model):
    name = models.CharField(max_length=64, unique=True)

    def __str__(self):
        return self.name
    
    class Meta:
        ordering = ['name']

class Like(models.Model):
    cocktail = models.ForeignKey(Cocktail, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.cocktail.name}/{self.user.get_username()}"

class Dislike(models.Model):
    cocktail = models.ForeignKey(Cocktail, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.cocktail.name}/{self.user.get_username()}"

class CocktailIngredient(models.Model):
    ingredient = models.ForeignKey(Ingredient, related_name='ingredients', on_delete=models.CASCADE)
    cocktail = models.ForeignKey(Cocktail, related_name='ingredients', on_delete=models.CASCADE)
    measure = models.CharField(max_length=32, null=True)

    @property
    def name(self):
        return self.ingredient.name

    def __str__(self):
        return f"{self.name}/{self.cocktail.name}"

