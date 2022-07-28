import Route from '@ioc:Adonis/Core/Route'

Route.group( () => {  
    Route.post('/collaborators_add', 'CollaboratorsController.createDatas')
    Route.post('/collaborators_login', 'CollaboratorsController.login')
    Route.resource('/collaborators', 'CollaboratorsController').apiOnly()
}).prefix('/api');