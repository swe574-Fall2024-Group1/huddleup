#!/bin/sh

python manage.py runserver

gunicorn huddleupapi.wsgi:application --bind

