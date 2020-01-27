import dependencyInjectorLoader from './dependencyInjector';
import expressLoader from './express';
import Logger from './logger';
import mongooseLoader from './mongoose';

export default async (app) => {
    const mongoConnection = await mongooseLoader();
    Logger.info('DB loaded and connected!');

    const models = [
        {
            name: 'userModel',
            model: require('../models/user').default,
        },
        {
            name: 'usergroupModel',
            model: require('../models/usergroup').default,
        }
    ];
    await dependencyInjectorLoader(models);
    Logger.info('Dependency Injector loaded');

    await expressLoader(app);
    Logger.info('Express loaded');
};
