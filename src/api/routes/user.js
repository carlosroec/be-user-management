import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';
import { Container } from 'typedi';
import middlewares from '../middlewares';
import UserService from '../../services/user';

const route = Router();

export default (app) => {
    app.use('/users', route);

    route.get('/me', 
        middlewares.isAuth, 
        middlewares.attachCurrentUser, 
        (req, res) => {
            return res.json({ user: req.currentUser }).status(200);
        }
    );

    route.post('/filter',
        celebrate({
            body: Joi.object({
                filter: Joi.object().required()
            })
        }),
        async (req, res, next) => {
            const logger = Container.get('logger');
            logger.debug('Calling Filter endpoid with body: %o', req.body);

            try {
                const userServiceInstance = Container.get(UserService);
                const { response } = await userServiceInstance.Filter(req.body);

                return res.status(200).json({ response });
            } catch(e) {
                logger.error('error', e);

                return next(e);
            }
        }
    );
}
