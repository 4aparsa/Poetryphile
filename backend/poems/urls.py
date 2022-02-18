from django.urls import path
from . import views

urlpatterns = [
    path('my_poems/', views.getMyPoems),
    path('create/', views.createPoem),
    path('<str:pk>/delete/', views.deletePoem),
    path('<str:pk>/', views.getPoem),
    path('<str:pk>/edit/', views.editPoem),
    path('<str:pk>/give_ink/', views.givePoemInk),
    path('<str:pk>/publish/', views.publishPoem)
]