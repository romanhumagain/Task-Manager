from typing import Iterable
from django.db import models
from django.contrib.auth import get_user_model
from django.utils import timezone


User = get_user_model()

class Todo(models.Model):
  user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='todos', null=True, verbose_name='User')
  todo = models.CharField(max_length=255, verbose_name="Todo Item")
  is_completed = models.BooleanField(default=False, verbose_name="Completed")
  is_pinned = models.BooleanField(default=False, verbose_name="Pinned")
  pinned_date = models.DateTimeField(null=True,blank=True, verbose_name="Pinned Date")
  created_date = models.DateTimeField(auto_now_add=True, verbose_name="Created Date")
  updated_date = models.DateTimeField(auto_now=True, verbose_name='Updated Date')
  
  class Meta:
    verbose_name = "Todo"
    verbose_name_plural = 'Todos'
    ordering = ['-updated_date']
    
  def __str__(self) -> str:
    return f'{self.todo[:50]}'
  
  def save(self,*args, **kwargs ):
    if self.is_pinned:
      self.pinned_date = timezone.now()
    else:
      self.pinned_date = None
      
    super().save(*args, **kwargs)
    