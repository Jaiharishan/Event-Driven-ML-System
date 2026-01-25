FROM python:3.12-slim

# Set working directory to root (not /app)
# This allows 'import app.xxx' to work because 'app' is a folder here
WORKDIR /src

# Copy requirements from your local root
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the entire /app folder into /src/app
# Locally: ./app/main.py -> Container: /src/app/main.py
COPY ./app ./app

# Add the current directory to PYTHONPATH as a fallback
ENV PYTHONPATH="/src" \
    PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

# Run the service using the module path
# This is the standard way to run microservices with absolute imports
CMD ["python", "-m", "app.main"]
