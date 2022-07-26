import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database';
import Collaborator from 'App/Models/Collaborator';
import Movie from 'App/Models/Movie';
import { uploadToS3Bucket } from '../module/s3';

export default class MoviesController {
    public async store({request, response}: HttpContextContract){
        const body = request.body();
        //let file = getFileFromRequest(request, "defined_file_prop_name_here");
      
        //if (file) {
          //await uploadToS3Bucket(file, BUCKET_NAME);
        //}

        //const collaboratorId = params.collaboratorId
        await Collaborator.findOrFail(body.collaborator_id)        
        const movie = await Movie.create( body )

        response.status(201)
        return {
            message: 'Filme adicionado',
            movie
        }
    }

    public async index(){
        //const movie = await Movie.query().preload("collaboratorId")       
        const movie = await Database.rawQuery(`select 
                                                    movie.* 
                                                    ,colla.id id_user
                                                    ,colla.name name_user
                                                    ,colla.username
                                                from movies movie join collaborators colla
                                                    on movie.collaborator_id = colla.id`)
        return {            
            data: movie.rows
        }
    }

    public async show({params}: HttpContextContract){
        await Collaborator.findOrFail(params.id);
        const collaborator = await Database.rawQuery(`select 
                                                            movie.* 
                                                            ,colla.id id_user
                                                            ,colla.name name_user
                                                            ,colla.username
                                                        from movies movie join collaborators colla
                                                            on movie.collaborator_id = colla.id
                                                            where movie.id = ${params.id}`)
        return {
            data: collaborator.rows
        }
    }

}
