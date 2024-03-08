from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser

class CustomUserAdmin(UserAdmin):
    model = CustomUser
    # Add fields to be displayed in the admin list view
    list_display = ('email', 'username', 'firstname', 'lastname', 'is_active', 'is_staff')
    # Customize the fieldsets for the user detail view in the admin
    fieldsets = (
        (None, {'fields': ('username', 'password', 'email', 'firstname', 'lastname', 'bio')}),
        ('Permissions', {'fields': ('is_staff', 'is_active', 'groups', 'user_permissions')}),
        ('Important dates', {'fields': ('last_login', 'date_joined')}),
    )
    # Customize the fields that appear when creating a new user through the admin
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('username', 'email', 'firstname', 'lastname', 'bio', 'password1', 'password2', 'is_staff', 'is_active')}
        ),
    )
    # Specify search fields to enable searching users in the admin
    search_fields = ('email', 'username', 'firstname', 'lastname')
    # Specify ordering of records in the admin list view
    ordering = ('email',)

# Register the CustomUser model and CustomUserAdmin with the admin site
admin.site.register(CustomUser, CustomUserAdmin)
