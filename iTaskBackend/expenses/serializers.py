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
  ''' If you want to get all the budget details as budget act as a foreign key in the expense table'''
  # budget = BudgetSerializer(read_only = True)
  
  '''If you want to get a specific data from the budget table'''
  budget_name = serializers.SerializerMethodField(read_only = True)
  budget_id = serializers.SerializerMethodField(read_only = True)
  
  class Meta:
    model = Expense
    fields = '__all__'
    
  def get_budget_name(self, obj):
    return obj.budget.budget_name if obj.budget else None
  
  def get_budget_id(self, obj):
    return obj.budget.id if obj.budget else None
    
    
class BudgetHistorySerializer(ModelSerializer):
  class Meta:
    model = BudgetHistory
    fields = '__all__'