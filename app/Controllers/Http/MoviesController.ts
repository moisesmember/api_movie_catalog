import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Collaborator from 'App/Models/Collaborator';
import Movie from 'App/Models/Movie';

export default class MoviesController {
    public async store({request, response}: HttpContextContract){
        const body = request.body();
        //const collaboratorId = params.collaboratorId
        await Collaborator.findOrFail(body.collaborator_id)        
        const movie = await Movie.create(body)

        response.status(201)
        return {
            message: 'Filme adicionado',
            movie
        }
    }

    public async index(){
        const movie = await Movie.query().preload("collaboratorId")
        return {            
            data: movie
        }
    }
}
