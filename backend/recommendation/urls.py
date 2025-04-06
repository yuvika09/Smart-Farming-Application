from django.urls import path
from . import views

app_name = 'recommendation'  # Add this namespace

urlpatterns = [
    path('', views.home, name='home'),
    path('predict/', views.predict, name='predict'),
]