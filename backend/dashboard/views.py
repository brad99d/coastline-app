from django.shortcuts import render
from django.http import HttpResponse
from django.http import JsonResponse

# Create your views here.
def index(request):
    return HttpResponse("Hello, world. You are at the dashboard.")

def test(request):
    return JsonResponse({
        "message": "Hello, world. You are at the API dashboard.",
    })