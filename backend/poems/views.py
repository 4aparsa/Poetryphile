from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.exceptions import InvalidToken
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import status

from .serializers import PoemSerializer

from .models import Poem

class AllowAnyJWTAuthentication(JWTAuthentication):
    def authenticate(self, request):
        try:
            return super().authenticate(request=request)
        except InvalidToken:
            return None

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createPoem(request):
    """
    Create poem
    Authentication required
    No authorization required
    """
    user = request.user
    poem = Poem.objects.create(
        title = 'Untitled poem',
        user = user
    )
    serializer = PoemSerializer(poem, many=False)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getMyPoems(request):
    """
    Get My Poems
    Authentication required
    No authorization required
    """
    user = request.user
    paginator = PageNumberPagination()
    poems = user.poem_set.all().order_by('-date_created')
    poems_page = paginator.paginate_queryset(poems, request)
    serializer = PoemSerializer(poems_page, many=True)
    return paginator.get_paginated_response(serializer.data)

@api_view(['GET'])
@authentication_classes([AllowAnyJWTAuthentication])
def getPoem(request, pk):
    """
    Get Poem
    No authentication required
    Authorization sometimes required
    """
    try:
        poem = Poem.objects.select_related('user').get(id=pk)
        if poem.is_published or poem.user == request.user:
            serializer = PoemSerializer(poem, many=False)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response({
                'message': 'You do not have access to view this poem.'
            }, status=status.HTTP_403_FORBIDDEN)
    except:
        return Response({
            'message': 'The poem you are looking for does not exist.'
        }, status=status.HTTP_404_NOT_FOUND)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def editPoem(request, pk):
    """
    Get Poem Editor
    Authentication required
    Authorization required
    """
    data = request.data
    try:
        poem = Poem.objects.get(id=pk)
        if poem.user == request.user:
            serializer = PoemSerializer(instance=poem, data=data, partial=True)

            if serializer.is_valid():
                serializer.save()

            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response({
                'message': 'You do not have access to edit this poem.'
            }, status=status.HTTP_403_FORBIDDEN)
    except:
        return Response({
            'message': 'The poem you are looking for does not exist.'
        }, status=status.HTTP_404_NOT_FOUND)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deletePoem(request, pk):
    """
    Delete poem
    Authentication required
    Authorization required
    """
    try:
        poem = Poem.objects.get(id=pk)
        if poem.user == request.user:
            poem.delete()
            return Response('Poem was deleted.', status=status.HTTP_200_OK)
        else:
            return Response({
                'message': 'You do not have access to delete this poem.'
            }, status=status.HTTP_403_FORBIDDEN)
    except:
        return Response({
            'message': 'The poem you are looking for does not exist.'
        }, status=status.HTTP_403_FORBIDDEN)