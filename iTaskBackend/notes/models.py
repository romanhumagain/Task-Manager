from typing import Iterable
from django.db import models
from .utils import generate_slug
from django.contrib.auth import get_user_model

User = get_user_model()


def note_image_upload_to(instance, filename):
  return f'notes/{instance.title}/{filename}'

class Note(models.Model):
  user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='notes', null=True, verbose_name='User')
  slug = models.SlugField(unique=True, null=True)
  title = models.CharField(max_length=200)
  body = models.TextField(null=True)
  updated_date = models.DateField(auto_now=True)
  created_date = models.DateField(auto_now_add=True)
  image = models.ImageField(upload_to=note_image_upload_to, default='notes/notes.jpg')
  
  
  def save(self,*args, **kwargs):
    if not self.pk:
      self.slug = generate_slug(self.title)
    super(Note,self).save(*args , **kwargs)
  
  def __str__(self) -> str:
    return self.title
