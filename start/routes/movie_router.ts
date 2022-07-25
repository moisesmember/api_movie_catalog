import Route from '@ioc:Adonis/Core/Route'

Route.group( () => { 
    Route.resource('/movies', 'MoviesController').apiOnly()
}).prefix('/api');