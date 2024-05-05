# Use the official Python image as base
FROM python:3.9

# Set the working directory in the container
WORKDIR /code

# Copy the requirements file and install dependencies
COPY requirements.txt /code/
RUN pip install --upgrade pip
RUN pip install -r requirements.txt

# Copy the Django project into the container
COPY . /code/

# Expose the Django service port
EXPOSE 8000

# Command to run the Django development server
CMD ["gunicorn", "huddleupAPI.wsgi:application", "--bind", "0.0.0.0:8000"]