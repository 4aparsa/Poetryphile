from rest_framework.serializers import ModelSerializer
from poems.models import Poem
from accounts.serializers import UserAccountSerializer


class PoemSerializer(ModelSerializer):
    user = UserAccountSerializer()
    class Meta:
        model = Poem
        fields = '__all__'

    def update(self, instance, data):
        instance.title = data.get('title', instance.title)
        instance.text = data.get('text', instance.text)
        instance.save()
        return instance