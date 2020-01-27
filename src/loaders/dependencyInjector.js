import { Container } from 'typedi';
import LoggerInstance from './logger';

export default (models) => {
    try {
        models.forEach(item => {
            Container.set(item.name, item.model);
        });

        Container.set('logger', LoggerInstance);
    } catch(e) {
        LoggerInstance.error('Error on dependency injector loader: ', e);

        throw e;
    }
};
