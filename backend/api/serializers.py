from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Note

# Step 4 Store users by the fields
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password"]
        # Write_only means nobody can read the password
        extra_kwargs = {"password": {"write_only": True}}
    # Once the data has been validated with Meta, user is created
    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

# Step 7 Store users by the fields
class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ["id", "title", "content", "created_at", "author"]
        # This specifies that author can't be written, it can only be the person who is signed in who can be the author of the note.
        extra_kwargs = {"author": {"read_only": True}}