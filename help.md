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
