from django.urls import path
from . import views

urlpatterns = [
    # prediction API
    path("predict/", views.StockPredictionAPIView.as_view(), name="stock-prediction")
]
