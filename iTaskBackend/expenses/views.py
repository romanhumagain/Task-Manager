from django.shortcuts import get_object_or_404
from rest_framework import viewsets
from rest_framework.response import Response
from .models import Budget, BudgetHistory, Expense
from .serializers import BudgetSerializer, BudgetHistorySerializer, ExpenseSerializer
from django.contrib.auth.models import User
from rest_framework.permissions import IsAuthenticated

class BudgetViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = Budget.objects.all()
    serializer_class = BudgetSerializer

    def get_queryset(self):
        user = self.request.user
        return self.queryset.filter(user=user)

    def perform_create(self, serializer):
        user = self.request.user
        serializer.save(user=user)
    

class ExpenseViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = Expense.objects.all()
    serializer_class = ExpenseSerializer

    def get_queryset(self):
        budget_id = self.kwargs['budget_pk']
        return self.queryset.filter(user=self.request.user, budget_id=budget_id)

    def perform_create(self, serializer):
        budget_id = self.kwargs['budget_pk']
        budget = get_object_or_404(Budget, id=budget_id, user=self.request.user)  # Ensure the budget exists and belongs to the user
        serializer.save(user=self.request.user, budget=budget)


class BudgetHistoryViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = BudgetHistory.objects.all()
    serializer_class = BudgetHistorySerializer

    def get_queryset(self):
        budget_id = self.kwargs['budget_pk']
        return self.queryset.filter(budget_id=budget_id, budget__user=self.request.user)

    def perform_create(self, serializer):
        budget_id = self.kwargs['budget_pk']
        budget = get_object_or_404(Budget, id=budget_id, user=self.request.user)  # Ensure the budget exists and belongs to the user
        serializer.save(budget=budget)