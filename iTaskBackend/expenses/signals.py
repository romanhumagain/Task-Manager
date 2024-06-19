from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from .models import BudgetHistory, Expense

@receiver(post_save, sender= Expense)
@receiver(post_delete, sender= Expense)
def update_budget_history(sender, instance, **kwargs):
  budget = instance.budget
  
  BudgetHistory.objects.create(
    budget = budget,
    remaining_budget = budget.remaining_budget,
    spend_budget = budget.spent_budget
  )
  
