from django.contrib.auth.decorators import login_required
from django.shortcuts import render, redirect, get_object_or_404

from .forms import ApplicationForm
from .models import Applications
# Create your views here.

@login_required
def application_list(request):
    applications=Applications.objects.filter(user=request.user)
    
    return render(request, "applications/application_list.html",{
        "applications":applications
    })
    
@login_required
def application_create(request):
    if request.method=="POST":
        form=ApplicationForm(request.POST)
        
        if form.is_valid():
            application=form.save(commit=False)
            application.user=request.user
            application.save()
            return redirect("application_list")
    else:
        form=ApplicationForm()
        
    return render(request, "applications/application_form.html",{
        "form":form,
        "title":"Add Application"
    })
    
@login_required
def application_update(request, pk):
    applicaton=get_object_or_404(Applications, pk=pk, user=request.user)
    
    if request.method=="POST":
        form=ApplicationForm(request.POST, instance=applicaton)
        
        if form.is_valid():
            form.save()
            return redirect("application_list")
    else:
        form=ApplicationForm(instance=applicaton)
    
    return render(request,"applications/application_form.html",{
        "form":form,
        "title":"Edit Application"
    })
    
@login_required
def application_delete(request, pk):
    application=get_object_or_404(Applications, pk=pk, user=request.user)
    
    if request.method == "POST":
        application.delete()
        return redirect("application_list")
    
    return render(request, "applications/application_confirm_delete.html",{
        "application":application
    })