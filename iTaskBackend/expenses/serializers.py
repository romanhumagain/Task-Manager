from rest_framework import serializers
from rest_framework.serializers import ModelSerializer
from .models import Budget, Expense,BudgetHistory

class BudgetSerializer(ModelSerializer):
  spent_budget = serializers.DecimalField(max_digits=10, decimal_places=2, read_only = True)
  remaining_budget = serializers.DecimalField(max_digits=10, decimal_places=2, read_only= True)
  
  class Meta:
    model = Budget
    fields = '__all__'
    
class ExpenseSerializer(ModelSerializer):
  class Meta:
    model = Expense
    fields = '__all__'
    
    
class BudgetHistorySerializer(ModelSerializer):
  class Meta:
    model = BudgetHistory
    fields = '__all__'