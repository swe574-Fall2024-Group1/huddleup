FROM python:3.9.19
ENV PYTHONBUFFERED 1

ENV APP_USER=app
ENV APP_GROUP=app

RUN addgroup --system --gid 500 $APP_GROUP && adduser --system --uid 500 $APP_USER --ingroup $APP_GROUP

ENV APP_HOME=/app
RUN mkdir $APP_HOME
RUN mkdir $APP_HOME/staticfiles
RUN mkdir $APP_HOME/mediafiles
WORKDIR $APP_HOME
COPY . $APP_HOME

RUN pip install --upgrade pip
RUN pip install -r requirements.txt

RUN chown -R $APP_USER:$APP_GROUP $APP_HOME
RUN chmod -R 770 $APP_HOME
USER $APP_USER

CMD python manage.py collectstatic --no-input;python manage.py migrate;gunicorn huddleupAPI.wsgi --workers 4 -b 0.0.0.0:8000 --threads=2 --worker-class=gthread --timeout 90 --worker-tmp-dir /dev/shm --capture-output --log-level debug --access-logfile - --error-logfile -