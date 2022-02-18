from rest_framework.serializers import ModelSerializer, SerializerMethodField

from poems.models import Poem
from accounts.serializers import UserAccountSerializer


class PoemSerializer(ModelSerializer):
    user = UserAccountSerializer()
    ink_count = SerializerMethodField(read_only=True)
    class Meta:
        model = Poem
        fields = ('id', 'user', 'title', 'text', 'date_created', 'date_updated', 'is_published', 'inks', 'ink_count')

    def get_ink_count(self, instance):
        return instance.inks.count()

    def update(self, instance, data):
        instance.title = data.get('title', instance.title)
        instance.text = data.get('text', instance.text)
        instance.is_published = data.get('is_published', instance.is_published)
        instance.save()
        return instance