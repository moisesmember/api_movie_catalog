import { v4 as uuiddv4 } from 'uuid'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ImageTeste from 'App/Models/ImageTeste';

/** Seta a imagem no repositório desejado */
import Application from '@ioc:Adonis/Core/Application';

export default class ImagemsController {
    private validationOptions = {
        types: ['image'],
        size: '2mb',
        extnames: ['jpg', 'png', 'gif'],
    }

    public async store({request, response} : HttpContextContract){
        const body = request.body();        
        const image = request.file('imagem', this.validationOptions)
   
        if(image){ // Verifica se a imagem veio
            const imageName = `${uuiddv4()}.${image.extname}`
            // Move a nova imagem para pasta uploads
            /*await image.move(Application.tmpPath('uploads'),{
                name: imageName
            })  */          
            /*await image.moveToDisk('../../../files/image', {
                name: imageName
            })*/

            try {
                const img = await image.moveToDisk('oi', {}, 's3')
                console.log( `Result` )
                console.log( img )
            } catch (error) {
                console.log( error )
            }

            body.imagem = imageName
        }
        const imageRegister = await ImageTeste.create(body)
        response.status(201)

        return {
            message: 'Create image',
            data: imageRegister,
        }
    }

    public async update({params, request}: HttpContextContract){
        const body = request.body(); 
        const imageDB = await ImageTeste.findOrFail(params.id);
        
        if(imageDB.imagem != body.imagem || !imageDB.imagem){ // Verifica se é mesmo a imagem
            const image = request.file('imagem', this.validationOptions)
            if(image){ // Verifica se a imagem veio
                const imageName = `${uuiddv4()}.${image.extname}`
                // Move a nova imagem para pasta uploads
                await image.move(Application.tmpPath('uploads'),{
                    name: imageName
                })            
                /*await image.moveToDisk('../../../files/image', {
                    name: imageName
                })*/
                imageDB.imagem = imageName

                await imageDB.save()
            }
            
        }

        return {
            message: 'Imagem atualizada',
            data: imageDB,
        }
    }
}
