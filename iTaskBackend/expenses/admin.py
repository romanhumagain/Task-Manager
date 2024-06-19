from django.contrib import admin
from .models import Budget, Expense, BudgetHistory

# Register your models here.
admin.site.register(Budget)
admin.site.register(Expense)
admin.site.register(BudgetHistory)

