import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';
import { Container } from 'typedi';
import AuthService from '../../services/auth';

const route = Router();

export default (app) => {
    app.use('/auth', route);

    route.post('/signup', 
        celebrate({
            body: Joi.object({
                name: Joi.string().required(),
                username: Joi.string().required(),
                email: Joi.string().required(),
                password: Joi.string().required(),
                usergroup: Joi.string().required()
            }),
        }),
        async (req, res, next) => {
            const logger = Container.get('logger');
            logger.debug('Calling Sign-Up endpoint with body: %o', req.body);
            try {
                const authServiceInstance = Container.get(AuthService);
                const { user, token } = await authServiceInstance.SignUp(req.body);

                return res.status(201).json({ user, token});
            } catch (e) {
                logger.error('error: ', e);

                return next(e);
            }
        }
    );

    route.post('/signin', 
        celebrate({
            body: Joi.object({
                email: Joi.string().required(),
                password: Joi.string().required()
            })
        }),
        async (req, res, next) => {
            const logger = Container.get('logger');
            logger.debug('Calling Sign-In endpoint with body: %o', req.body);

            try {
                const { email, password } = req.body;
                const authServiceInstance = Container.get(AuthService);
                const { user, token } = await authServiceInstance.SignIn(email, password);

                return res.json({ user, token }).status(200);
            } catch(e) {
                logger.error('error: %o', e);

                return next(e);
            }
        }
    );
}