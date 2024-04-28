#!/bin/sh

python manage.py makemigrations
python manage.py migrate authAPI --no-input
python manage.py migrate communityAPI --no-input

gunicorn huddleupAPI.wsgi:application --bind huddleup.space:8000

