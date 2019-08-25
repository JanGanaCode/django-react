#### 1. install pipenv
`pip3 install pipenv`

#### 2. create virtual environment
`pipenv shell`

#### 3. install dependencies
`pipenv install django djangorestframework django-rest-knox`

#### 4. start a project
`django-admin startproject {project_name}`

#### 5. select environment for python interpreter (vs code)
`{folder-name} pipenv`

#### 6. generate an app
cd {project_name}
`python manage.py startapp {app_name}`

#### 7. add this app (and 'rest_framework') to the 'INSTALLED_APPS' in settings.py {project_name/settings.py}
```python
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'leads',
    'rest_framework',
]
```

#### 8. create a db model
`{app_name}/models.py`

```python
from django.db import models

class Lead(model.Model):
  name = models.CharField(max_length=100)
  email = models.EmailField(max_length=100, unique=True)
  message = models.CharField(max_length=100, blank=True)
  created_at = models.DateTimeField(auto_now_add=True)
```

### 9. create a migration
`python manage.py makemigrations {app_name}`

### 10. run a migration (add to the DB)
`python manage.py migrate`



# API
### 1. create an api.py file in the app folder
`{app_name}/api.py`

### 2. create a viewset
```python
from {app_name}.models import {model_name}
from rest_framework import viewsets, permissions
from .serializers import {serializer_name}
```

```python
class {viewset_name}(viewsets.ModelViewSet):
  queryset = {model_name}.objects.all()
  permission_classes = [
    permissions.AllowAny
  ]
  serializer_class = {serialize_name}
```

### 3. create urls
`{project_name}/urls.py`

```python
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
  path('', include('{app_name}.urls')),
]
```

### 4. {app_name/urls}
```python
from rest_framework import routers
from .api import {viewset_name}

router = routers.DefaultRouter()
router.register('api/{endpoint_name}', {viewset_name}, '{name}')

urlpatterns = router.urls
```
