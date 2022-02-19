from django.urls import path
from . import views
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)


urlpatterns = [
    path('signup/', views.signupUser),
    path('login/', views.loginUser),
    path('password_reset_request/', views.resetPasswordRequest),
    path('<uidb64>/<token>/password_reset_confirm/', views.resetPasswordConfirm),
    path('token/refresh/', TokenRefreshView.as_view()),
]