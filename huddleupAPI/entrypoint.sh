#!/bin/sh

python manage.py makemigrations
python manage.py migrate authAPI --no-input
python manage.py migrate communityAPI --no-input

gunicorn huddleupAPI.wsgi:application --bind 0.0.0.0:8000

