from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework import status

from .serializers import PoemSerializer

from .models import Poem


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createPoem(request):
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
    user = request.user
    poems = user.poem_set.all().order_by('-date_created')
    serializer = PoemSerializer(poems, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['GET'])
def getPoem(request, pk):
    try:
        poem = Poem.objects.select_related('user').get(id=pk)
        if poem.is_published or poem.user == request.user:
            serializer = PoemSerializer(poem, many=False)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response('You do not have access to view this poem.', status=status.HTTP_403_FORBIDDEN)
    except:
        return Response('This poem you are looking for does not exist.', status=status.HTTP_404_NOT_FOUND)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deletePoem(request, pk):
    poem = Poem.objects.get(id=pk)
    poem.delete()
    return Response('Poem was deleted.', status=status.HTTP_200_OK)