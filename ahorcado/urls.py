from django.urls import path
from . import views
from django.conf.urls.static import static

urlpatterns = [
    #path('', views.inicio, name='inicio'),
    path('', views.inicio, name='inicio'),
    path('pagina1/', views.pagina1, name='pagina1'),
    path('pagina2/', views.pagina2, name='pagina2'),
]

