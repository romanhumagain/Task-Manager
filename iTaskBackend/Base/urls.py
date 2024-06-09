from django.urls import path
from .views import ListCreateTodoView, RetriveUpdateDeleteTodoView

urlpatterns = [
  path('todos/', ListCreateTodoView.as_view(), name='list-create-todo'),
  path('todos/<int:pk>/', RetriveUpdateDeleteTodoView.as_view(), name='retrieve-update-delete-todo'),
]