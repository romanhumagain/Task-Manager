from django.urls import path
from base.views import RegisterUserView
from todos.views import ListCreateTodoView, RetriveUpdateDeleteTodoView
from notes.views import getNotes, createNote, fetchNote, deleteNote, updateNote, CreateNoteView


'''
All the end points for this iTask app
'''

urlpatterns = [
  # endpoints for user registration
  path('register-user/', RegisterUserView.as_view(), name = 'register-user'),
  
  # endpoints for the todo application
  path('todos/', ListCreateTodoView.as_view(), name='list-create-todo'),
  path('todos/<int:pk>/', RetriveUpdateDeleteTodoView.as_view(), name='retrieve-update-delete-todo'),
  
  # endpoints for the notes application
  path('get-notes/',getNotes, name="get_notes" ),
  path('create-note/',createNote, name="create_note" ),
  path('fetch-note/<slug:slug>/',fetchNote, name="fetch_note" ),
  path('delete-note/<slug:slug>/',deleteNote, name="delete_note" ),
  path('update-note/<slug:slug>/',updateNote, name="update_note" ),  
  
  path('create/',CreateNoteView.as_view(), name="create" ),
  
]