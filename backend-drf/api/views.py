from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import StockPredictionSerializer


# Create your views here.
class StockPredictionAPIView(APIView):
    def post(self, request):
        serializer = StockPredictionSerializer(data=request.data)
        if serializer.is_valid():
            ticker = serializer.validated_data["ticker"]
            return Response(
                {"status": "success from django", "ticker": ticker},
                status=status.HTTP_200_OK,
            )
