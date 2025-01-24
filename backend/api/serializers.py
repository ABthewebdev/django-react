from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Note

# Step 4 Store users by the fields
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        print(validated_data)
    # Once the data has been validated with Meta, user is created
        user = User.objects.create_user(**validated_data)
        return user

# Step 7 Store users by the fields
class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ["id", "title", "content", "created_at", "author"]
        extra_kwargs = {"author": {"read_only": True}}
