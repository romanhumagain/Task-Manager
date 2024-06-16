from django.utils.text import slugify
import uuid

def generate_slug(title:str) ->str:
  from .models import Note
  
  slug_title = slugify(f"{title}-{uuid.uuid4()}")
  
  while(Note.objects.filter(slug=slug_title).exists()):
    slug_title = slugify(f"{title}-{uuid.uuid4()}")
    
  return slug_title
    