from django.db import models
from django.contrib.auth import get_user_model
from django.db.models import Sum

User = get_user_model()

class Budget(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='budgets', null=True, blank=True)
    budget_name = models.CharField(max_length=100)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    created_at = models.DateField(auto_now_add=True)
    
    class Meta:
        ordering = ['-created_at']
    
    def __str__(self) -> str:
        return self.budget_name
      
    @property
    def spent_budget(self):
        spent = self.expenses.aggregate(total_spent=Sum('amount'))['total_spent']
        return spent or 0
    
    @property
    def remaining_budget(self):
        return self.amount - self.spent_budget


class Expense(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='expenses', null=True, blank=True)
    budget = models.ForeignKey(Budget, on_delete=models.CASCADE, related_name='expenses', null=True)
    name = models.CharField(max_length=200)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.TextField(blank=True, null=True)
    created_at = models.DateField(auto_now_add=True)
    
    class Meta:
        ordering = ['-created_at']
    
    def __str__(self) -> str:
        return self.name
      
class BudgetHistory(models.Model):
  budget = models.ForeignKey(Budget, on_delete=models.CASCADE, related_name='budget_history')
  remaining_budget = models.IntegerField()
  spend_budget = models.IntegerField()
  recorded_at = models.DateField(auto_now=True)
  
  class Meta:
    ordering  = ['-recorded_at']
    
