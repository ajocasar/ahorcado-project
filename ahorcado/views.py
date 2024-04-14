from django.http import HttpResponse
from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.contrib.auth.forms import UserCreationForm

# Create your views here.

#def inicio(request):
    #return HttpResponse("¡Esta es la página de inicio!")
 #   return render(request, 'base.html', context)

def inicio(request):
    #return HttpResponse("¡Esta es la página de inicio!")
    return render(request, 'info.html')

@login_required
def pagina1 (request):
    #return HttpResponse("Esta es la página 1.")
    return render(request, 'inicio.html')

def pagina2(request):
    #return HttpResponse("Esta es la página 2.")
    return render(request, 'pagina2.html')
