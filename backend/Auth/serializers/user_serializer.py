from rest_framework import serializers
from Auth.models import UserProfile
from django.contrib.auth import authenticate
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework.exceptions import AuthenticationFailed


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    first_name = serializers.CharField(max_length=100, required=True)
    last_name = serializers.CharField(max_length=100, required=True)

    class Meta:
        model = UserProfile
        fields = ["email", "password", "first_name", "last_name"]

    def create(self, validated_data):
        user = UserProfile.objects._create_user(
            email=validated_data["email"],
            first_name = validated_data['first_name'],
            last_name = validated_data['last_name'],
            password=validated_data["password"],
            is_staff=validated_data.get("is_staff", False),
        )
        return user


class LoginUserSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, attrs):
        email = attrs.get("email", None)
        password = attrs.get("password", None)
        if email and password:
            user_data = {"email": email, "password": password}


            user = authenticate(**user_data)
            if user:
                token = TokenObtainPairSerializer.get_token(user)

                data = {"refresh": str(token), "access": str(token.access_token)}

                return data
        raise AuthenticationFailed(
            "Authentication credentials were not provided or are invalid."
        )
