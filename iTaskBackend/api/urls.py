from django.urls import path, include
from base.views import RegisterUserView
from todos.views import ListCreateTodoView, RetriveUpdateDeleteTodoView
from notes.views import getNotes, createNote, fetchNote, deleteNote, updateNote, CreateNoteView
from rest_framework_nested import routers

from expenses.views import BudgetHistoryViewSet, BudgetViewSet, ExpenseViewSet

'''
Creating a router for the Expense tracker
'''
router = routers.DefaultRouter()
router.register(r'budgets', BudgetViewSet, basename='budget')

budget_router = routers.NestedDefaultRouter(router, r'budgets', lookup='budget')
budget_router.register(r'expenses', ExpenseViewSet, basename='budget-expenses')
budget_router.register(r'history', BudgetHistoryViewSet, basename='budget-history')

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
  # path('create-note/',createNote, name="create_note" ),
  path('fetch-note/<slug:slug>/',fetchNote, name="fetch_note" ),
  path('delete-note/<slug:slug>/',deleteNote, name="delete_note" ),
  path('update-note/<slug:slug>/',updateNote, name="update_note" ),  
  
  path('create-note/',CreateNoteView.as_view(), name="create-note" ),
  
  # endpoints for the expense tracker
  path('', include(router.urls)),
  path('', include(budget_router.urls)),
  
]

# endpoints for the expense tracker
