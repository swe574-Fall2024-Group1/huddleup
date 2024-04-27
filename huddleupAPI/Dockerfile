FROM python:3.9-slim

# Set the working directory in the container
RUN pip install --upgrade pip

# Copy the dependencies file to the working directory
COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . /app
WORKDIR /app

COPY ./entrypoint.sh .
ENTRYPOINT ["sh", "/app/entrypoint.sh"]