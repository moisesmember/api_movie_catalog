import Route from '@ioc:Adonis/Core/Route'

Route.group( () => { 
    Route.resource('/images', 'ImagemsController').apiOnly()
}).prefix('/api');