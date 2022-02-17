from django.contrib import admin

from .models import Poem
from .models import Ink

admin.site.register(Poem)
admin.site.register(Ink)
