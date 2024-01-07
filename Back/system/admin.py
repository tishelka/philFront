from django.contrib import admin
from .models import *
#from django.contrib.auth.models import User

admin.site.register(Category)
admin.site.register(Product)
admin.site.register(Producer)
admin.site.register(Order)
#admin.site.register(User)
