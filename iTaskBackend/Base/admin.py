from django.contrib import admin
from .models import Todo

class TodoAdmin(admin.ModelAdmin):
  list_display = ['user', 'todo', 'is_completed', 'is_pinned', 'pinned_date', 'created_date', 'updated_date']

  search_fields =['todo', 'user__username']
  
  list_filter = ['is_completed', 'is_pinned']
  
  readonly_fields =('pinned_date', 'created_date', 'updated_date')

  fields = ['user', 'todo', 'is_completed', 'is_pinned']
  
admin.site.register(Todo, TodoAdmin)
