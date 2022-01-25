from django.urls import path
from . import views

urlpatterns = [
    path('my_poems/', views.getMyPoems),
    path('create/', views.createPoem),
]