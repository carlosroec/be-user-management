import  { Router } from 'express';
import { celebrate, Joi } from 'celebrate';
import { Container } from 'typedi';
import UsergroupService from '../../services/usergroup';

const route = Router();

export default (app) => {
    app.use('/usergroup', route);

    route.post('/add',
        celebrate({
            body: Joi.object({
                name: Joi.string().required()
            }),
        }),
        async (req, res, next) => {
            const logger = Container.get('logger');
            logger.debug('Calling Add endpoint with body: %o', req.body);

            try {
                const usergroupServiceInstance = Container.get(UsergroupService);
                const { usergroup } = await usergroupServiceInstance.Add(req.body);

                return res.status(201).json({ usergroup });
            } catch(e) {
                logger.error('error: ', e);

                return next(e);
            }
        }
    );

    route.get('/:id',
        async (req, res, next) => {
            const logger = Container.get('logger');
            logger.debug('Calling Get ONE endpoint with body %o', req.params);

            try {
                const usergroupServiceInstance = Container.get(UsergroupService);
                const { usergroup } = await usergroupServiceInstance.GetOne(req.params);
                return res.status(200).json({ usergroup });
            } catch (e) {
                logger.error('error', e);

                return next(e);
            }
        }
    );
}