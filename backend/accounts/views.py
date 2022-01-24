from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from .models import UserAccount

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['email'] = user.email
        token['pen_name'] = user.pen_name

        return token


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

@api_view(['POST'])
def signupUser(request):
    data = request.data
    email = data.get('email', None)
    pen_name = data.get('pen_name', None)
    password = data.get('password', None)
    re_password = data.get('re_password', None)

    try:
        if UserAccount.objects.filter(email=email).exists():
            return Response({ 'message': 'A user with this email already exists.' }, status=status.HTTP_400_BAD_REQUEST)
        if UserAccount.objects.filter(pen_name=pen_name).exists():
            return Response({ 'message': 'A user with this pen name already exists.' }, status=status.HTTP_400_BAD_REQUEST)
        user = UserAccount.objects.create_user(pen_name=pen_name, email=email, password=password)
        return Response({ 'message': 'Successfully signed up. Please login.' }, status=status.HTTP_201_CREATED)
    except:
        return Response({ 'message': 'Something went wrong.' }, status=status.HTTP_400_BAD_REQUEST)