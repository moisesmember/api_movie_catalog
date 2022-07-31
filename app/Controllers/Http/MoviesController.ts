import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { base64 } from '@ioc:Adonis/Core/Helpers';
import { uploadToS3Bucket } from '../module/s3';

import Database from '@ioc:Adonis/Lucid/Database';
import Collaborator from 'App/Models/Collaborator';
import Movie from 'App/Models/Movie';
//import { Response } from 'aws-sdk';
//import { uploadToS3Bucket } from '../module/s3';
const { forEach } = require('p-iteration');

export default class MoviesController {
    private validationOptions = {
        types: ['image'],
        size: '2mb',
        extnames: ['jpg', 'png', 'gif'],
    }

    public async store({request, response}: HttpContextContract){
        const body = request.body();
        const image = request.file('url', this.validationOptions)

        //const encoded = base64.encode( body.url , 'binary')
        //await uploadToS3Bucket( encoded, `app-movie-catalog` ); 

        await Collaborator.findOrFail(body.collaborator_id)        
        const movie = await Movie.create( body )

        response.status(201)
        return {
            message: 'Filme adicionado',
            movie
        }
    }

    public async update({request}: HttpContextContract){
        const body = request.body(); 
        const movie = await Movie.findOrFail(body.id);
        movie.name              = body.name;
        movie.description       = body.description ;
        movie.sinopse           = body.sinopse ;
        movie.avaliation        = body.avaliation ;
        movie.authors           = body.authors ;
        movie.genre             = body.genre ;
        movie.year              = body.year ;
        movie.collaborator_id   = body.collaborator_id ;
        movie.url               = body.url ;
        await movie.save()
        return {
            message: 'Rota de atualização acionada',
            data: movie
        }
    }

    public async index({response}: HttpContextContract){
        //const movie = await Movie.query().preload("collaboratorId")       
        const movie = await Database.rawQuery(`select 
                                                    movie.* 
                                                    ,colla.id id_user
                                                    ,colla.name name_user
                                                    ,colla.username
                                                from movies movie join collaborators colla
                                                    on movie.collaborator_id = colla.id`)
        response.send(movie.rows);
    }

    public async show({params, response}: HttpContextContract){
        await Movie.findOrFail(params.id);
        const movie = await Database.rawQuery(`select 
                                                            movie.* 
                                                            ,colla.id id_user
                                                            ,colla.name name_user
                                                            ,colla.username
                                                        from movies movie join collaborators colla
                                                            on movie.collaborator_id = colla.id
                                                            where movie.id = ${params.id}`)
        /*return {
            data: collaborator.rows
        }*/

        response.send(movie.rows);
    }

    public async createDatas({response} : HttpContextContract){

        const data = [
            {name:"The Road Trick",genre:"AVENTURA",description: `Conheça os aspectos culturais do povo local a partir da maneira como as pessoas reagem aos truques de Adam Trent, mágico que tem um show na Broadway`,sinopse:`Conheça os aspectos culturais do povo local a partir da maneira como as pessoas reagem aos truques de Adam Trent, mágico que tem um show na Broadway`,url:"https://app-movie-catalog.s3.us-east-1.amazonaws.com/the%20road%20trick.png?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEID%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXNhLWVhc3QtMSJIMEYCIQCpHoQfBnbdmBpPRVDnnJR2%2BsmHeVSWOMatVtp86k4I7AIhAML5Jzon7IDdiOYv8Pa8V2A45BsEANLlP4oCDnNE%2BrMPKu0CCMn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQAhoMMDE4MzAxODMyNzM0IgySgyAHkbjuWPs32vsqwQIn3KVxzzE5UA0NmWXOEOsU2UuQ7tBh1gO%2BOdERu%2BaP2ijVrWFaumHnZgPmjwyDHKY%2BnW8qyfEpZN7FDDTegcPoCtYgbTcjdnxeYD1eMAsglGQfC8Poy7yVvqrToy9sYF8X8YR1%2FDD7BejJtc0n3rdeWt8V5FK9rnr4YbtVZBBR8UHOkTHs4L95IyclPPcnb%2FgpOXC3178TLeAdZbrxUnVlpTAtC0%2BkAmLhH8%2Fyi8aa23liVhqx7ia0yUrwiprholwI6EI8FAxl%2Bts5%2BqSilmjYlLr3uBu28UV1MCv5apcrLy6TWdFrELa4FnPhKLBbCAn8XQ%2FY13Z4aw5aOBmeUX%2FBYqRC5d8oA1RnalOvDrazK7SbSi9P4cIq%2BA4kmoJxyXF2Q1Tq0WijQ01XdWjmiOce1iGQVjgAIgFF%2Bm5PxHkG8z8wjv2BlwY6sgJ%2B%2B%2FxfgKXKWKlSquMCFiqeXQ2edGGbHFvqKh0HEBO1HtrkbBrgXkgWXRKgCPmExMnEmaZhCxFOqfkrXPnWa%2BQwgGP2bjg7E%2FotoNsNl00Cx3A41cvenHG3kSogn3hj9jrD0vfwLX5kPtj2F1zQPV6N2TS3yT2nc9O25%2BKCeUNzrgnKOWHDSH%2B6rTjhac%2Fcilxo%2BmPXSC%2B13UPNFTWcWAi1r2EjqEc4vV83ohcTfxrb%2F69iRv5WWdmOx2UurJXrI3J%2BnDCh1YtaPrPkLRMQSMe2rn984a4B8jzkJN4FBkK0DTMg5Iwvbs4cHHUHVFnRS8%2Bw%2FXseotr6JPGpofgJtTouCFbj5GshsSsvMuglZBJhFXsTjRGJ5BjTmhssjLf7pvDc6GRRIPdsJ5LOpBkcGMpBTdI%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20220727T024233Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIAQIQW7ZYPF2QOJBKR%2F20220727%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=7d7e530aa33ef3c4147117675ee8b486750cdfd5d6ff11631ed8629380d65789",year:2000,avaliation:0,collaborator_id:11},
            {name:"Wynonna Earp",genre:"DRAMA",description: `Wynonna Earp retorna à cidade natal de Purgatório para lutar contra os demônios que assolam o local. Para isso, ela deve destruir as almas ressuscitadas e conquistar aliados.`,sinopse:`Wynonna Earp retorna à cidade natal de Purgatório para lutar contra os demônios que assolam o local. Para isso, ela deve destruir as almas ressuscitadas e conquistar aliados.`,url:"https://app-movie-catalog.s3.us-east-1.amazonaws.com/wynonna.png?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEID%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXNhLWVhc3QtMSJIMEYCIQCpHoQfBnbdmBpPRVDnnJR2%2BsmHeVSWOMatVtp86k4I7AIhAML5Jzon7IDdiOYv8Pa8V2A45BsEANLlP4oCDnNE%2BrMPKu0CCMn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQAhoMMDE4MzAxODMyNzM0IgySgyAHkbjuWPs32vsqwQIn3KVxzzE5UA0NmWXOEOsU2UuQ7tBh1gO%2BOdERu%2BaP2ijVrWFaumHnZgPmjwyDHKY%2BnW8qyfEpZN7FDDTegcPoCtYgbTcjdnxeYD1eMAsglGQfC8Poy7yVvqrToy9sYF8X8YR1%2FDD7BejJtc0n3rdeWt8V5FK9rnr4YbtVZBBR8UHOkTHs4L95IyclPPcnb%2FgpOXC3178TLeAdZbrxUnVlpTAtC0%2BkAmLhH8%2Fyi8aa23liVhqx7ia0yUrwiprholwI6EI8FAxl%2Bts5%2BqSilmjYlLr3uBu28UV1MCv5apcrLy6TWdFrELa4FnPhKLBbCAn8XQ%2FY13Z4aw5aOBmeUX%2FBYqRC5d8oA1RnalOvDrazK7SbSi9P4cIq%2BA4kmoJxyXF2Q1Tq0WijQ01XdWjmiOce1iGQVjgAIgFF%2Bm5PxHkG8z8wjv2BlwY6sgJ%2B%2B%2FxfgKXKWKlSquMCFiqeXQ2edGGbHFvqKh0HEBO1HtrkbBrgXkgWXRKgCPmExMnEmaZhCxFOqfkrXPnWa%2BQwgGP2bjg7E%2FotoNsNl00Cx3A41cvenHG3kSogn3hj9jrD0vfwLX5kPtj2F1zQPV6N2TS3yT2nc9O25%2BKCeUNzrgnKOWHDSH%2B6rTjhac%2Fcilxo%2BmPXSC%2B13UPNFTWcWAi1r2EjqEc4vV83ohcTfxrb%2F69iRv5WWdmOx2UurJXrI3J%2BnDCh1YtaPrPkLRMQSMe2rn984a4B8jzkJN4FBkK0DTMg5Iwvbs4cHHUHVFnRS8%2Bw%2FXseotr6JPGpofgJtTouCFbj5GshsSsvMuglZBJhFXsTjRGJ5BjTmhssjLf7pvDc6GRRIPdsJ5LOpBkcGMpBTdI%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20220727T024601Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIAQIQW7ZYPF2QOJBKR%2F20220727%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=cac48506d6a96ef9f77b4582996021655fb8abbbc88f0b3c15d67b3614aa89be",year:2016,avaliation:0,collaborator_id:12},
            {name:"Os Bad Boys",genre:"AÇÃO",description: `Em Miami, os detetives Mike Lowrey e Marcus Burnett trocam de identidade enquanto investigam assassinatos ligados ao roubo de uma carga de 100 milhões de dólares em heroína, que recentemente confiscaram.`,sinopse:`Em Miami, os detetives Mike Lowrey e Marcus Burnett trocam de identidade enquanto investigam assassinatos ligados ao roubo de uma carga de 100 milhões de dólares em heroína, que recentemente confiscaram.`,url:"https://app-movie-catalog.s3.us-east-1.amazonaws.com/bad%20boys.png?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEID%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXNhLWVhc3QtMSJIMEYCIQCpHoQfBnbdmBpPRVDnnJR2%2BsmHeVSWOMatVtp86k4I7AIhAML5Jzon7IDdiOYv8Pa8V2A45BsEANLlP4oCDnNE%2BrMPKu0CCMn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQAhoMMDE4MzAxODMyNzM0IgySgyAHkbjuWPs32vsqwQIn3KVxzzE5UA0NmWXOEOsU2UuQ7tBh1gO%2BOdERu%2BaP2ijVrWFaumHnZgPmjwyDHKY%2BnW8qyfEpZN7FDDTegcPoCtYgbTcjdnxeYD1eMAsglGQfC8Poy7yVvqrToy9sYF8X8YR1%2FDD7BejJtc0n3rdeWt8V5FK9rnr4YbtVZBBR8UHOkTHs4L95IyclPPcnb%2FgpOXC3178TLeAdZbrxUnVlpTAtC0%2BkAmLhH8%2Fyi8aa23liVhqx7ia0yUrwiprholwI6EI8FAxl%2Bts5%2BqSilmjYlLr3uBu28UV1MCv5apcrLy6TWdFrELa4FnPhKLBbCAn8XQ%2FY13Z4aw5aOBmeUX%2FBYqRC5d8oA1RnalOvDrazK7SbSi9P4cIq%2BA4kmoJxyXF2Q1Tq0WijQ01XdWjmiOce1iGQVjgAIgFF%2Bm5PxHkG8z8wjv2BlwY6sgJ%2B%2B%2FxfgKXKWKlSquMCFiqeXQ2edGGbHFvqKh0HEBO1HtrkbBrgXkgWXRKgCPmExMnEmaZhCxFOqfkrXPnWa%2BQwgGP2bjg7E%2FotoNsNl00Cx3A41cvenHG3kSogn3hj9jrD0vfwLX5kPtj2F1zQPV6N2TS3yT2nc9O25%2BKCeUNzrgnKOWHDSH%2B6rTjhac%2Fcilxo%2BmPXSC%2B13UPNFTWcWAi1r2EjqEc4vV83ohcTfxrb%2F69iRv5WWdmOx2UurJXrI3J%2BnDCh1YtaPrPkLRMQSMe2rn984a4B8jzkJN4FBkK0DTMg5Iwvbs4cHHUHVFnRS8%2Bw%2FXseotr6JPGpofgJtTouCFbj5GshsSsvMuglZBJhFXsTjRGJ5BjTmhssjLf7pvDc6GRRIPdsJ5LOpBkcGMpBTdI%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20220727T024933Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIAQIQW7ZYPF2QOJBKR%2F20220727%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=4308859b250af6c355ec0256e39b11dd0d61c5a2b3c07139eceb7a1f33258fcb",year:1995,avaliation:0,collaborator_id:13},
        ]

        await forEach( data, async (movies) => {
            await Movie.create(movies)
        } );

        response.status(201)

        return {
            message: 'Filmes adicionados adicionados',
        }
    }

}
