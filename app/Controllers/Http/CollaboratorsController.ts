import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Collaborator from 'App/Models/Collaborator';

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
}
