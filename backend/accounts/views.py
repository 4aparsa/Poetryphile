from rest_framework.response import Response
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.exceptions import InvalidToken
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework import status

from .models import UserAccount

from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken

from django.core.mail import send_mail
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes

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

@api_view(['POST'])
@permission_classes([AllowAny])
def resetPasswordRequest(request):
    """
    Request reset password link
    Expects an email
    No authentication required
    No authorization required
    """
    email = request.data.get('email')
    try:
        if not UserAccount.objects.filter(email=email).exists():
            return Response({
                'message': 'There is no user with the given email address.'
            }, status=status.HTTP_404_NOT_FOUND)
            
        user = UserAccount.objects.get(email=email)
        uidb64 = urlsafe_base64_encode(force_bytes(user.id))
        token = PasswordResetTokenGenerator().make_token(user)
        reset_link = f'http://localhost:3000/{uidb64}/{token}/reset_password_confirm'

        body = 'Please use the link below to reset your password \n' + \
        f'{reset_link} \n' + \
        'If you did not request this, please ignore this email'
        
        send_mail('Poetryphile Password Reset',
                  body, 'hellopoetryphile@gmail.com', [email])
        return Response({
            'message': 'A password reset link has been sent.'
        }, status=status.HTTP_200_OK)
    except:
        return Response({
            'message': 'Something went wrong.'
        }, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([AllowAny])
def resetPasswordConfirm(request, **kwargs):
    """
    Confirm reset password
    Expects password and re_password
    No authentication required
    No authorization required
    """
    uidb64 = kwargs.get('uidb64')
    token = kwargs.get('token')

    if not uidb64 or not token:
        return Response({
            'Invalid password reset request.'
        }, status=status.HTTP_400_BAD_REQUEST)

    uid = urlsafe_base64_decode(uidb64)

    user = UserAccount.objects.filter(pk=uid)
    if not user or not user[0]:
        return Response({
            'Invalid password reset request.'
        }, status=status.HTTP_401_UNAUTHORIZED)
    
    is_token_valid = PasswordResetTokenGenerator().check_token(user[0], token)

    if not is_token_valid:
        message = {'message': 'Reset password token is invalid.'}
        return Response(message, status=status.HTTP_401_UNAUTHORIZED)
    
    data = request.data
    password = data.get('password')
    re_password = data.get('re_password')
    if password == re_password:
        user[0].set_password(password)
        user[0].save()
    else:
        return Response({
            'Passwords do not match.'
        }, status=status.HTTP_400_BAD_REQUEST)
    return Response({
        'message': 'Your password has been reset.'
    }, status=status.HTTP_200_OK)
    

class JWTAuthentication(JWTAuthentication):
    def authenticate(self, request):
        try:
            return super().authenticate(request=request)
        except InvalidToken:
            return None