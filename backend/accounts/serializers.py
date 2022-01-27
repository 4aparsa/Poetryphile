from rest_framework.serializers import ModelSerializer
from poems.models import UserAccount

class UserAccountSerializer(ModelSerializer):
    class Meta:
        model = UserAccount
        fields = '__all__'