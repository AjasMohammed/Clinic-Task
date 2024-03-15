from django.contrib import admin
from Auth.models import UserProfile, Doctor

class UserAdmin(admin.ModelAdmin):
    list_display = ('id', 'email', 'username')
    list_display_links = ('id', 'email', 'username')
    readonly_fields = ('password',)

admin.site.register(UserProfile, UserAdmin)
admin.site.register(Doctor)