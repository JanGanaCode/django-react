# Start a new project
#### 1. install pipenv
`pip3 install pipenv`

#### 2. create/run virtual environment
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

<br/><br/>

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

<br/><br/>

# FRONTEND
#### 1. generate an app
cd {project_name}
`python manage.py startapp frontend`

#### 2. components folder
`mkdir -p ./frontend/src/components`

#### 3. templates/static folder
`mkdir -p ./frontend/{static,templates}/frontend`

#### 4. install webpack
`npm init`
`npm install -D webpack webpack-cli`

#### 5. install babel, babel loader and preset, react-preset, babel-plugin-transform-class-properties
`npm install -D @babel/core babel-loader @babel/preset-env @babel/preset-react babel-plugin-transform-class-properties`

#### 6. install react
`npm install react react-dom prop-types`

#### 7. create .babelrc
```javascript
{
  "presets": ["@babel/preset-env", "@babel/preset-react"],
  "plugins": ["transform-class-properties"]
}
```

#### 7. create webpack.config.js
```javascript
module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  }
}
```

#### 8. package.json scripts
`"dev": "webpack --mode development --watch ./{project_name}/frontend/src/index.js --output ./{project_name}/frontend/static/frontend/main.js"`

`"build": "webpack --mode production ./{project_name}/frontend/src/index.js --output ./{project_name}/frontend/static/frontend/main.js"`

#### 9. create index.js file
`{src/index.js}`

```javascript
import App from './components/App';
```

#### 10. create App.js file
`{src/components/App.js}`

```javascript
import React, { Component }  from 'react';
import ReactDOM from 'react-dom';

class App extends Component () {
  render() {
    return (
      <div>
        hello
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
```

#### 11. create index.html file
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <title>{title}</title>
  </head>
  <body>
    <div id="app"></div>
    {% load static %}
    <script src="{% static "frontend/main.js" %}"></script>
  </body>
</html>
```

#### 12. add frontend app to the 'INSTALLED_APPS' in settings.py {project_name/settings.py}
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
    'frontend',
]
```

#### 13. create a view in frontend/views.py
```python
from django.shortcuts import render

def index(request):
  return render(request, 'frontend/index.html')
```
#### 14. link a url to the view - frontend/urls.py
```python
from django.urls import path
from . import views

urlpatterns = [
  path('', views.index)
]
```

#### 15. include frontend urls in main {project_name}/urls.py
(frontend to load first!)
```python
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('', include('frontend.urls')),
    path('', include('leads.urls')),
]
```

#### 16. run server
`python manage.py runserver`
`http://localhost:8000/`
