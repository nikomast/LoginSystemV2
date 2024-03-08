from rest_framework import serializers
from .models import CustomUser

class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('id', 'firstname', 'lastname', 'email', 'bio', 'password')  # Removed 'username' from fields
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        # Removed 'username' from the create_user call since it will be generated automatically
        user = CustomUser.objects.create_user(
            email=validated_data['email'],
            firstname=validated_data.get('firstname', ''),
            lastname=validated_data.get('lastname', ''),
            password=validated_data['password'],
            bio=validated_data.get('bio', '')
        )
        return user
