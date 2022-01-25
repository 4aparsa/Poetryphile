from rest_framework.serializers import ModelSerializer
from poems.models import Poem

class PoemSerializer(ModelSerializer):
    class Meta:
        model = Poem
        fields = '__all__'