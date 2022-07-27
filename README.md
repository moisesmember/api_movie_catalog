
# API Movie Catalog

Essa api utiliza o framework AdonisJS e fornece serviço ao projeto.


## Instalação

Instale este projeto com npm

```bash
  git clone https://github.com/moisesmember/api_movie_catalog.git
  npm install   
```

## Execução

Instale este projeto com npm

```bash
  cd api_movie_catalog
  node ace serve --wacth
```


    
## Documentação da API

#### Configure seu ambiente (HOST) - p/ acessar S3 AWS

``` 
C:\\user\<your-user>\.aws\credentials

[default]
aws_access_key_id = <SEU ID DE ACESSO>
aws_secret_access_key = <CHAVE DE ACESSO>
```

``` 
C:\\user\<your-user>\.aws\config

[default]
region=us-west-1
output=json
```

#### Configure o ENV
```
PG_HOST=localhost
PG_PORT=5432
PG_USER=lucid
PG_PASSWORD=
PG_DB_NAME=db_movie_catolog
S3_KEY=AKIAQIQW7ZYPMK7BBNA4
S3_SECRET=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
S3_BUCKET=app-movie-catalog
S3_REGION=us-east-1

```

#### Insere Imagem no Amazon S3 (reconhecimento facial)
```javascript
node ace list:routes
````

```http
  POST         /api/collaborators_add
  GET|HEAD     /api/collaborators
  POST         /api/collaborators
  GET|HEAD     /api/collaborators/:id
  PUT|PATCH    /api/collaborators/:id
  DELETE       /api/collaborators/:id
```

```http
  POST         /api/images
  GET|HEAD     /api/images
  GET|HEAD     /api/images/:id
  PUT|PATCH    /api/images/:id
  DELETE       /api/images/:id
```

```http
  POST         /api/movies
  GET|HEAD     /api/movies
  GET|HEAD     /api/movies/:id
  PUT|PATCH    /api/movies/:id
  DELETE       /api/movies/:id
```
hub.com/Hospital-Adventista-de-Manaus/face-rekognition-aws/blob/main/example/data/RESULTADO.PNG)

## Referência

 - [Flutter and AWS](https://medium.com/codechai/flutter-and-aws-cd7dabc06301)
 