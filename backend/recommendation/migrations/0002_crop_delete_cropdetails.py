# Generated by Django 5.2 on 2025-04-05 10:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('recommendation', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Crop',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('hindi_name', models.CharField(max_length=100)),
                ('n_min', models.FloatField()),
                ('n_max', models.FloatField()),
                ('p_min', models.FloatField()),
                ('p_max', models.FloatField()),
                ('k_min', models.FloatField()),
                ('k_max', models.FloatField()),
            ],
        ),
        migrations.DeleteModel(
            name='CropDetails',
        ),
    ]
