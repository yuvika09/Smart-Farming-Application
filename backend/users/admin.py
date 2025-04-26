from django.contrib import admin
from .models import CropRecommendation

admin.site.register(CropRecommendation)
class CropRecommendationAdmin(admin.ModelAdmin):
    list_display = ('date', 'time', 'nitrogen', 'phosphorus', 'potassium', 'soil_ph', 'temperature', 'humidity', 'rainfall', 'recommended_crop')
    search_fields = ('recommended_crop', 'date')
    list_filter = ('date', 'recommended_crop')