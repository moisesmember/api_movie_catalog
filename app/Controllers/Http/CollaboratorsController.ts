import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Database from '@ioc:Adonis/Lucid/Database';
import Collaborator from 'App/Models/Collaborator';
const { forEach } = require('p-iteration');

export default class CollaboratorsController {
    public async store({request, response} : HttpContextContract){        
        const body = request.body(); 
        const collaborator = await Collaborator.create(body)
        response.status(201)

        return {
            message: 'Criado',
            data: collaborator,
        }
    }

    public async index(){
        const collaborator = await Collaborator.all();
        return {
            data: collaborator
        }
    }

    public async show({params}: HttpContextContract){
        const collaborator = await Collaborator.findOrFail(params.id);
        return {
            data: collaborator
        }
    }

    public async destroy({params}: HttpContextContract){
        const collaborator = await Collaborator.findOrFail(params.id);
        await collaborator.delete()
        return {
            message: 'Rota de exclusão acionada',
            data: collaborator
        }
    }

    public async update({params, request}: HttpContextContract){
        const body = request.body(); 
        const collaborator = await Collaborator.findOrFail(params.id);
        collaborator.name     = body.name
        collaborator.username = body.username
        collaborator.password = body.password
        await collaborator.save()
        return {
            message: 'Rota de atualização acionada',
            data: collaborator
        }
    }

    public async createDatas({response} : HttpContextContract){

        const data = [
            { id: 11, name: `Maria Eduarda`, username: `duda`, password: `123` },
            { id: 12, name: `João Pedro`, username: `joao.pedro`, password: `123` },
            { id: 13, name: `Guilherem`, username: `gui.marcos`, password: `123` },
            { id: 14, name: `Maria Vitória`, username: `vica`, password: `123` },
            { id: 15, name: `Moises Santos`, username: `mouses`, password: `123` },
            { id: 16, name: `Pedro Fernandes`, username: `fernandes`, password: `123` },
            { id: 17, name: `Alice Maria`, username: `alica`, password: `123` },
        ]

        await forEach( data, async (users) => {
            await Collaborator.create(users)
        } );

        response.status(201)

        return {
            message: 'Usuarios adicionados',
        }
    }

    public async login({request, response} : HttpContextContract){
        const body = request.body();
        const user = await Database.rawQuery(` SELECT 1  login                                                                                                                                                                                                                                                                                  
                                                        FROM collaborators                                                                                                                                                                                                                       
                                                    WHERE EXISTS (                                                                                                                                                                                              
                                                                SELECT DISTINCT c.id FROM collaborators c WHERE c.username = '${body.username}' and c.password = '${body.password}'          
                                                                )                                                                                                                                                                                                                                                
                                                    UNION                                                                                                                                                                                                                                                                 
                                                    SELECT 0 login                                                                                                                                                                                                                                             
                                                        FROM collaborators                                                                                                                                                                                                                                             
                                                    WHERE NOT EXISTS (                                                                                                                                                                                                                                
                                                                SELECT DISTINCT c.id FROM collaborators c WHERE c.username = '${body.username}' and c.password = '${body.password}'
                                                    ) `)                              
        response.send(user.rows)
    }
}
