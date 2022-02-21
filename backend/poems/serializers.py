from rest_framework.serializers import ModelSerializer, SerializerMethodField, PrimaryKeyRelatedField, StringRelatedField, ReadOnlyField

from poems.models import Poem, Comment, Ink
from accounts.serializers import UserAccountSerializer

class CommentSerializer(ModelSerializer):
    user = UserAccountSerializer()
    class Meta:
        model = Comment
        fields = '__all__'

class InkSerializer(ModelSerializer):
    user = UserAccountSerializer()
    class Meta:
        model = Ink
        fields = '__all__'

class PoemSerializer(ModelSerializer):
    user = UserAccountSerializer()
    comments = CommentSerializer(many=True, read_only=True)
    comment_count = SerializerMethodField(read_only=True)
    inks = InkSerializer(source='ink_set', many=True)
    ink_count = SerializerMethodField(read_only=True)
    class Meta:
        model = Poem
        fields = ('id', 'user', 'title', 'text', 'date_created', 'date_updated', 'is_published', 'comments', 'comment_count', 'inks', 'ink_count')

    def get_ink_count(self, instance):
        return instance.inks.count()

    def get_comment_count(self, instance):
        return instance.comments.count()

    def update(self, instance, data):
        instance.title = data.get('title', instance.title)
        instance.text = data.get('text', instance.text)
        instance.is_published = data.get('is_published', instance.is_published)
        instance.save()
        return instance