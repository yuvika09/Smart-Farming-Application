from django.db import models

class CropRecommendation(models.Model):
    date = models.DateField()
    time = models.TimeField()
    nitrogen = models.FloatField()
    phosphorus = models.FloatField()
    potassium = models.FloatField()
    soil_ph = models.FloatField()
    temperature = models.FloatField()
    humidity = models.FloatField()
    rainfall = models.FloatField()
    recommended_crop = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.date} {self.time} - {self.recommended_crop}"
