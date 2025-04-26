from django.contrib.auth.models import User
from rest_framework import serializers
from .models import CropRecommendation

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'first_name', 'last_name', 'email', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            first_name=validated_data.get('first_name', ''),
            last_name=validated_data.get('last_name', ''),
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user

class CropRecommendationSerializer(serializers.ModelSerializer):
    class Meta:
        model = CropRecommendation
        fields = '__all__'

