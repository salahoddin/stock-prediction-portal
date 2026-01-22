from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import StockPredictionSerializer
from .ml.utils import download_stock_data

import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

from sklearn.preprocessing import MinMaxScaler
from keras.models import Sequential
from keras.layers import Dense, LSTM, Input


# Create your views here.
class StockPredictionAPIView(APIView):
    def post(self, request):
        serializer = StockPredictionSerializer(data=request.data)
        if serializer.is_valid():
            ticker = serializer.validated_data["ticker"]
            df = download_stock_data(ticker)
            if df.empty:
                return Response(
                    {"status": "error", "message": "Invalid ticker"},
                    status=status.HTTP_400_BAD_REQUEST,
                )
            print(df.head())
            return Response(
                {"status": "success from django", "ticker": ticker},
                status=status.HTTP_200_OK,
            )
