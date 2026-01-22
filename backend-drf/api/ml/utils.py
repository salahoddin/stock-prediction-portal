from datetime import datetime
from django.conf import settings

import matplotlib.pyplot as plt
import yfinance as yf
import os


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
