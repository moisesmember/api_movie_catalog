import Route from '@ioc:Adonis/Core/Route'

Route.group( () => {  
    Route.post('/collaborators_add', 'CollaboratorsController.createDatas')
    Route.resource('/collaborators', 'CollaboratorsController').apiOnly()
}).prefix('/api');