
# Create your models here.
from django.db import models

class Crop(models.Model):
    name = models.CharField(max_length=100)
    hindi_name = models.CharField(max_length=100)
    n_min = models.FloatField()
    n_max = models.FloatField()
    p_min = models.FloatField()
    p_max = models.FloatField()
    k_min = models.FloatField()
    k_max = models.FloatField()
    
    def __str__(self):
        return self.name