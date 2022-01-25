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