import express from 'express';
import knex from './database/connection';

import PointsControllers from './controllers/PointsControllers';

const routes = express.Router();
const pointsController = new PointsControllers();

routes.get('/items', async (request, response) => {
    const items = await knex('items').select('*');
    const serializedItems = items.map(item => {
        return {
            id: item.id,
            title: item.title,
            image_url: `http://localhost:3333/uploads/${item.image}`
        }
    })
    return response.json(serializedItems);
});

routes.post('/points', pointsController.create);


export default routes;