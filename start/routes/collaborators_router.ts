import Route from '@ioc:Adonis/Core/Route'

Route.group( () => {  
    //Route.post('collaborators', 'CollaboratorsController.store')
    Route.resource('/collaborators', 'CollaboratorsController').apiOnly()
}).prefix('/api');