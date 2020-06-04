import knex from '../database/connection';
import {Request, Response} from 'express';

class PointsControllers{
    async create(request: Request, response: Response){
        const {
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf,
            items
        } = request.body;

        const trx = await knex.transaction();


        const insertedIds = await trx('points').insert({
            image: 'image-fake',
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf,
        });
        const point_id = insertedIds[0];

        const pointItems = items.map((item_id: number) => {
            return {
                item_id,
                point_id,
            }
        });

        await trx('points_items').insert(pointItems);

        return response.json({
            sucess: true
        })
    }
}

export default PointsControllers;