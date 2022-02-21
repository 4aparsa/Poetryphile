from django.db import models
from django.utils import timezone
from accounts.models import UserAccount

class Ink(models.Model):
    user = models.ForeignKey(UserAccount, on_delete=models.CASCADE)
    poem = models.ForeignKey('Poem', on_delete=models.CASCADE)
    date_given = models.DateTimeField(auto_now_add=True)

class Comment(models.Model):
    date_created = models.DateTimeField(auto_now_add=True)
    text = models.TextField(blank=False)
    user = models.ForeignKey(UserAccount, related_name='comments', on_delete=models.CASCADE)
    poem = models.ForeignKey('Poem', related_name='comments', on_delete=models.CASCADE)

class Poem(models.Model):
    user = models.ForeignKey(UserAccount, related_name='poems', on_delete=models.CASCADE, null=True)
    title = models.CharField(max_length=100, blank=True)
    text = models.TextField(blank=True)
    date_created = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateTimeField(auto_now=True)
    is_published = models.BooleanField(default=False)
    inks = models.ManyToManyField(UserAccount, related_name='inks', blank=True, through=Ink)