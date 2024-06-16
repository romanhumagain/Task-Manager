from typing import Iterable
from django.db import models
from .utils import generate_slug

class Note(models.Model):
  slug = models.SlugField(unique=True, null=True)
  title = models.CharField(max_length=200)
  body = models.TextField(null=True)
  updated_date = models.DateField(auto_now=True)
  created_date = models.DateField(auto_now_add=True)
  
  
  def save(self,*args, **kwargs):
    if not self.pk:
      self.slug = generate_slug(self.title)
    super(Note,self).save(*args , **kwargs)
  
  def __str__(self) -> str:
    return self.title
