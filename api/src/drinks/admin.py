from django.contrib import admin

# Register your models here.
from .models import Cocktail, Like, Dislike, Ingredient, CocktailIngredient

admin.site.register(Like)
admin.site.register(Dislike)
admin.site.register(Ingredient)
admin.site.register(CocktailIngredient)

class IngredientInline(admin.StackedInline):
    model = CocktailIngredient
    extra = 0
    

class CocktailAdmin(admin.ModelAdmin):
    inlines=[IngredientInline]

admin.site.register(Cocktail, CocktailAdmin)

