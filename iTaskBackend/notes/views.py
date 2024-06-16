from django.shortcuts import render, get_object_or_404
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from .serializers import NoteSerializer
from .models import Note


@api_view(['GET'])
def getNotes(request):
  if request.method == "GET":
    notes_obj = Note.objects.all().order_by("-updated_date", "-created_date")
    serailizer = NoteSerializer(notes_obj, many = True)
    return Response(serailizer.data, status=status.HTTP_200_OK)
  
@api_view(['POST'])
def createNote(request):
  if request.method == "POST":
    data = request.data
    serializer = NoteSerializer(data=data)
    if serializer.is_valid():
      serializer.save()
      return Response(serializer.data , status=status.HTTP_201_CREATED)
    return Response(serializer.errors)
  
@api_view(['GET'])
def fetchNote(request, slug):
  if request.method == "GET":
    note_obj = Note.objects.filter(slug = slug)
    serailizer = NoteSerializer(note_obj, many = True)
    return Response(serailizer.data, status=status.HTTP_200_OK)
  
@api_view(['PUT', 'PATCH'])
def updateNote(request, slug):
    note = get_object_or_404(Note, slug=slug)
    
    if request.method == 'PUT':
        serializer = NoteSerializer(note, data=request.data)
    elif request.method == 'PATCH':
        serializer = NoteSerializer(note, data=request.data, partial=True)
        
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
def deleteNote(request, slug):
  if request.method == "DELETE":
    note = get_object_or_404(Note, slug=slug)
    title = note.title
    note.delete()
    return Response({"message":f"Successfully Deleted Notes Of title {title}"})