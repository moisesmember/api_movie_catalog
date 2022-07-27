import Route from '@ioc:Adonis/Core/Route'

Route.group( () => { 
    Route.post('/movies_add', 'MoviesController.createDatas')
    Route.resource('/movies', 'MoviesController').apiOnly()
}).prefix('/api');