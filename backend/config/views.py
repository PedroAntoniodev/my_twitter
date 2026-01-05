from django.shortcuts import render
from django.http import JsonResponse

def home(request):
    return render(request, 'home.html')

def api_index(request):
    return JsonResponse({
        'message': 'Bem-vindo ao My_Twitter API! 🚀 por Pedro Antônio dev',
        'endpoints':['/api/posts/', '/admin/', '/api/auth/login',
        '/api/auth/register/',]
    })