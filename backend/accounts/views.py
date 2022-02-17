from rest_framework.response import Response
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.exceptions import InvalidToken
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework import status

from .models import UserAccount

from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken


@api_view(['POST'])
@permission_classes([AllowAny])
def loginUser(request):
    """
    Login user
    Expects a pen name and password to login user
    No authentication required
    No authorization required
    """
    data = request.data
    pen_name = data.get('pen_name')
    password = data.get('password')

    if pen_name == "" or password == "":
        return Response({ 
            'message': 'Please fill in your credentials.'
        }, status=status.HTTP_400_BAD_REQUEST)

    user = authenticate(
            request, 
            pen_name=pen_name, 
            password=password
    )

    if user == None:
        return Response({
            'message': 'Pen name or password is incorrect.'
        }, status=status.HTTP_401_UNAUTHORIZED)
    else:
        refresh = RefreshToken.for_user(user)
        refresh['email'] = user.email
        refresh['pen_name'] = user.pen_name
        return Response({
            'refresh': str(refresh),
            'access': str(refresh.access_token)
        }, status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([AllowAny])
def signupUser(request):
    """
    Signup user
    Expects an email, pen name, password, and re password to create user
    No authentication required
    No authorization required
    """
    data = request.data
    email = data.get('email')
    pen_name = data.get('pen_name')
    password = data.get('password')
    re_password = data.get('re_password')

    try:
        if UserAccount.objects.filter(email=email).exists():
            return Response({
                'message': 'A user with this email already exists.'
            }, status=status.HTTP_400_BAD_REQUEST)
        if UserAccount.objects.filter(pen_name=pen_name).exists():
            return Response({
                'message': 'A user with this pen name already exists.'
            }, status=status.HTTP_400_BAD_REQUEST)
        if password != re_password:
            return Response({
                'message': 'Passwords do not match.'
            }, status=status.HTTP_400_BAD_REQUEST)
        user = UserAccount.objects.create_user(pen_name=pen_name, email=email, password=password)
        return Response({
            'message': 'Successfully signed up. Please login.'
        }, status=status.HTTP_201_CREATED)
    except:
        return Response({
            'message': 'Something went wrong.'
        }, status=status.HTTP_400_BAD_REQUEST)

class JWTAuthentication(JWTAuthentication):
    def authenticate(self, request):
        try:
            return super().authenticate(request=request)
        except InvalidToken:
            return None