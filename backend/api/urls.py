from django.urls import path
from . import views

# Step 10 Add urls for creating, listing and one for deleting
urlpatterns = [
    path("notes/", views.NoteListCreate.as_view(), name="note-list"),
    path("notes/delete/<int:pk>/", views.NoteDelete.as_view(), name="note-delete")
]