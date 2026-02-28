from django.urls import path
from .views import get_user_role

urlpatterns = []
urlpatterns += [
    path('user/', get_user_role),
]
