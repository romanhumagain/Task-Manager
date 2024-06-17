from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.generics import get_object_or_404

from rest_framework.permissions import IsAuthenticated

from .serializers import TodoSerializer
from .models import Todo

class ListCreateTodoView(APIView):
  """
  API view to list all the Todos or create a new Todo
  """
  permission_classes = [IsAuthenticated]
  
  def get(self, request):
    user = request.user
    
    is_completed_param = request.query_params.get('is_completed', None)
    
    if is_completed_param is not None and is_completed_param.lower() == "false":
      
      if is_completed_param.lower() in ['false', 1]:
        is_completed = False
      else:
        return Response({'details':'Invalid parameter for is_completed'}, status=status.HTTP_400_BAD_REQUEST)
      
      todos = Todo.objects.filter(user = user, is_completed=is_completed).order_by('-created_date')
    else:
      todos = Todo.objects.filter(user=user).order_by('-created_date', '-is_completed')
    
    serializer = TodoSerializer(instance=todos, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)
  
  
  def post(self, request):
    data = request.data
    serializer = TodoSerializer(data=data)
    if serializer.is_valid():
      serializer.save(user = request.user)
      return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
  
class RetriveUpdateDeleteTodoView(APIView):
  
  """
    API view to retrieve, update, or delete a Todo instance.
  """
  
  permission_classes = [IsAuthenticated]

  def get_object(self, pk, user):
     return get_object_or_404(Todo, pk=pk, user=user)
  
  def get(self, request, pk):
    todo = self.get_object(pk, request.user)
    serializer = TodoSerializer(todo)
    return Response(serializer.data)
  
  def put(self, request, pk):
    todo = self.get_object(pk, request.user)
    serializer = TodoSerializer(todo, data = request.data)
    if serializer.is_valid():
      serializer.save()
      return Response(serializer.data, status = status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
  
  def patch(self, request, pk):
    todo = self.get_object(pk, request.user)
    
    serializer = TodoSerializer(todo, data = request.data, partial = True)
    if serializer.is_valid():
      serializer.save()
      return Response(serializer.data, status = status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
  
  def delete(self, request, pk):
    todo = self.get_object(pk, request.user)
    todo.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)
    