from django.db import models
from django.utils import timezone
from accounts.models import UserAccount

class Poem(models.Model):
    user = models.ForeignKey(UserAccount, on_delete=models.CASCADE, null=True)
    title = models.CharField(max_length=100, blank=True)
    text = models.TextField(blank=True)
    date_created = models.DateTimeField(default=timezone.now)
    is_published = models.BooleanField(default=False)