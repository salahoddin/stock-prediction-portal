from datetime import datetime

import yfinance as yf


def download_stock_data(ticker="AAPL", years_back=10):
    """Download historical stock data for a ticker over the past N years."""
    now = datetime.now()
    start = datetime(now.year - years_back, now.month, now.day)
    end = now
    return yf.download(ticker, start, end)
