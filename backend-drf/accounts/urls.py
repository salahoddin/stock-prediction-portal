from django.urls import path
from . import views

urlpatterns = [
    path("auth/register/", views.RegisterView.as_view(), name="register"),
    path(
        "auth/protected-view/",
        views.ProtectedView.as_view(),
        name="protected-view",
    ),
]
