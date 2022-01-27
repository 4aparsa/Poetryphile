from rest_framework.serializers import ModelSerializer
from poems.models import Poem
from accounts.serializers import UserAccountSerializer

class PoemSerializer(ModelSerializer):
    user = UserAccountSerializer()
    class Meta:
        model = Poem
        fields = '__all__'