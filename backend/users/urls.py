from django.urls import path
from .views import SignupView, LoginView, SaveCropInputView

urlpatterns = [
    path('signup/', SignupView.as_view(), name='signup'),
    path('login/', LoginView.as_view(), name='login'),
    path('save-input/', SaveCropInputView.as_view(), name='save-input'),

]