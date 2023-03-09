"""drinkbackend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from django.urls import include
from django.views.generic import RedirectView
from django.conf import settings
from django.conf.urls.static import static
from djoser import views as djoser_views
from drinks.views import CustomTokenCreateView, CurrentUserViewSet, UserViewSet
from rest_framework.routers import SimpleRouter, Route, DynamicRoute, DefaultRouter

class CurrentUserRouter(SimpleRouter):
    routes = [
        Route(
            url=r"^{prefix}/$",
            mapping={"get": "retrieve", "put": "update", "patch": "partial_update"},
            name="{basename}-detail",
            detail=True,
            initkwargs={"suffix": "Detail"},
        ),
        DynamicRoute(
            url=r"^{prefix}/{url_path}$",
            name="{basename}-{url_name}",
            detail=True,
            initkwargs={},
        ),
    ]

current_user_router = CurrentUserRouter()
current_user_router.register("user-me", CurrentUserViewSet)

default_router = DefaultRouter()
default_router.register('user-create', UserViewSet, 'user-create')

urlpatterns = [
    path("api/admin/", admin.site.urls),
    path('api/cocktails/', include('drinks.urls')),
    path('api/', RedirectView.as_view(url='api/cocktails/', permanent=True)),
    path('api/accounts/login/', CustomTokenCreateView.as_view(), name='login'),
    path('api/accounts/logout/', djoser_views.TokenDestroyView.as_view(), name='logout'),
    path('api/', include(default_router.urls)),
    path('api/', include(current_user_router.urls)),
]

# urlpatterns += current_user_router.urls
# urlpatterns += default_router.urls
urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

