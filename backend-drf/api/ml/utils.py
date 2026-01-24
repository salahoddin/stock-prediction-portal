from datetime import datetime
from django.conf import settings

import matplotlib.pyplot as plt
import yfinance as yf
import os
import numpy as np
import pandas as pd

from sklearn.preprocessing import MinMaxScaler
from keras.models import load_model
from sklearn.metrics import mean_squared_error, r2_score


def download_stock_data(ticker="AAPL", years_back=10):
    """Download historical stock data for a ticker over the past N years."""
    now = datetime.now()
    start = datetime(now.year - years_back, now.month, now.day)
    end = now
    return yf.download(ticker, start, end)


def _build_closing_price_figure(df, ticker, ma_100=None, ma_200=None):
    plt.switch_backend("AGG")  # saves to png
    plt.figure(figsize=(10, 5))
    plt.plot(df.Close, label="Closing Price")
    plt.title(f"Closing price of {ticker}")
    if ma_100 is not None:
        plt.plot(ma_100, label="100 days moving average")
        plt.title(f"100 days moving average of {ticker}")
    if ma_200 is not None:
        plt.plot(ma_200, label="200 days moving average")
        plt.title(f"200 days moving average of {ticker}")
    plt.xlabel("Days")
    plt.ylabel("Close Price")
    plt.legend()
    return plt.gcf()


def _save_figure(fig, image_name):
    plot_img_path = os.path.join(settings.MEDIA_ROOT, image_name)
    fig.savefig(plot_img_path)
    plt.close(fig)
    return plot_img_path


def _build_media_url(image_name):
    return settings.MEDIA_URL + image_name


def _build_plot_image_name(ticker, ma_100=None, ma_200=None):
    parts = [f"{ticker}_plot"]
    if ma_100 is not None:
        parts.append("ma100")
    if ma_200 is not None:
        parts.append("ma200")
    return "_".join(parts) + ".png"


def plot_closing_price(df, ticker, ma_100=None, ma_200=None):
    image_name = _build_plot_image_name(ticker, ma_100=ma_100, ma_200=ma_200)
    fig = _build_closing_price_figure(df, ticker, ma_100=ma_100, ma_200=ma_200)
    _save_figure(fig, image_name)
    return _build_media_url(image_name)


def plot_final_predictions(y_test, y_predicted, ticker):
    plt.switch_backend("AGG")  # saves to png
    plt.figure(figsize=(10, 5))
    plt.plot(y_test, "b", label="Original Price")
    plt.plot(y_predicted, "r", label="Predicted Price")
    plt.title(f"Final predictions for {ticker}")
    plt.xlabel("Days")
    plt.ylabel("Close")
    plt.legend()
    image_name = f"{ticker}_final_prediction.png"
    fig = plt.gcf()
    _save_figure(fig, image_name)
    return _build_media_url(image_name)


def build_moving_average_plots(df, ticker):
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

    return plot_100_dma_url, plot_200_dma_url


def _get_close_series(df, ticker):
    close_col = df["Close"]
    if isinstance(close_col, pd.DataFrame):
        if ticker in close_col.columns:
            return close_col[ticker]
        return close_col.iloc[:, 0]
    return close_col


def _split_train_test(series, split_ratio=0.7):
    split_idx = int(len(series) * split_ratio)
    data_training = series.iloc[:split_idx].to_frame(name="Close")
    data_testing = series.iloc[split_idx:].to_frame(name="Close")
    return data_training, data_testing


def _load_prediction_model():
    model_path = settings.BASE_DIR.parent / "resources" / "stock_prediction_model.keras"
    return load_model(model_path)


def _prepare_windows(data_training, data_testing, lookback=100):
    past = data_training.tail(lookback)
    final_df = pd.concat([past, data_testing], ignore_index=True)

    scaler = MinMaxScaler(feature_range=(0, 1))
    input_data = scaler.fit_transform(final_df)

    x_test = []
    y_test = []
    for i in range(lookback, input_data.shape[0]):
        x_test.append(input_data[i - lookback : i])
        y_test.append(input_data[i, 0])

    return np.array(x_test), np.array(y_test), scaler


def _inverse_scale_predictions(y_predicted, y_test, scaler):
    y_predicted = scaler.inverse_transform(y_predicted).reshape(-1, 1).flatten()
    y_test = scaler.inverse_transform(y_test.reshape(-1, 1)).flatten()
    return y_predicted, y_test


def build_predictions(df, ticker):
    close_series = _get_close_series(df, ticker)
    data_training, data_testing = _split_train_test(close_series)
    x_test, y_test, scaler = _prepare_windows(data_training, data_testing)
    model = _load_prediction_model()
    y_predicted = model.predict(x_test)
    return _inverse_scale_predictions(y_predicted, y_test, scaler)


def evaluate_predictions(y_test, y_predicted):
    mse = mean_squared_error(y_test, y_predicted)
    r2 = r2_score(y_test, y_predicted)
    rmse = np.sqrt(mse)
    return {"mse": mse, "r2": r2, "rmse": rmse}
