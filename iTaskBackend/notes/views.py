from django.shortcuts import get_object_or_404
from django.db.models import Q
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly

from .serializers import NoteSerializer
from .models import Note
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import filters
from rest_framework import generics


# @api_view(['GET'])
# @permission_classes([IsAuthenticatedOrReadOnly])
# def getNotes(request):
#     user = request.user
#     search_query = request.query_params('search', None)
#     if search_query is not None:
#         notes_obj = Note.objects.filter(Q(title__icontains = search_query)|
#                                         Q(body__icontains = search_query)).order_by("-updated_date", "-created_date")
#     else:
#         notes_obj = Note.objects.filter(user = user).order_by("-updated_date", "-created_date")
     
#     serializer = NoteSerializer(notes_obj, many=True)
#     return Response(serializer.data, status=status.HTTP_200_OK)

class NoteListView(generics.ListAPIView):
    serializer_class = NoteSerializer
    permission_classes =[IsAuthenticatedOrReadOnly]
    filter_backends = [filters.SearchFilter]
    search_fields = ['title', 'body']

    def get_queryset(self):
        user = self.request.user
        return Note.objects.filter(user=user)
        
  
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createNote(request):
    data = request.data
    serializer = NoteSerializer(data=data)
    if serializer.is_valid():
        serializer.save(user=request.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
  
  
class CreateNoteView(APIView):
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]
    
    def post(self, request, format = None):
        serializer = NoteSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
          

@api_view(['GET'])
@permission_classes([IsAuthenticatedOrReadOnly])
def fetchNote(request, slug):
    user = request.user
    note_obj = get_object_or_404(Note, slug=slug, user=user)
    serializer = NoteSerializer(note_obj)
    print(serializer.data)
    return Response(serializer.data, status=status.HTTP_200_OK)
  
@api_view(['PUT', 'PATCH'])
@permission_classes([IsAuthenticated])
def updateNote(request, slug):
    note = get_object_or_404(Note, slug=slug, user=request.user)
    
    if request.method == 'PUT':
        serializer = NoteSerializer(note, data=request.data)
    elif request.method == 'PATCH':
        serializer = NoteSerializer(note, data=request.data, partial=True)
        
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deleteNote(request, slug):
    note = get_object_or_404(Note, slug=slug, user=request.user)
    note.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)
