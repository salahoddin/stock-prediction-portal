from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import StockPredictionSerializer
from .ml.utils import download_stock_data, plot_closing_price

import pandas as pd
import numpy as np

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
            df = df.reset_index()
            plot_img_url = plot_closing_price(df, ticker)

            # 100 days moving average
            ma_100 = df.Close.rolling(100).mean()
            ma_200 = df.Close.rolling(200).mean()
            plot_100_dma_url = plot_closing_price(
                df,
                ticker,
                ma_100=ma_100,
            )

            plot_200_dma_url = plot_closing_price(
                df,
                ticker,
                ma_200=ma_200,
            )

            return Response(
                {
                    "status": "success",
                    "plot_img_url": plot_img_url,
                    "plot_100_dma_url": plot_100_dma_url,
                    "plot_200_dma_url": plot_200_dma_url,
                },
                status=status.HTTP_200_OK,
            )
