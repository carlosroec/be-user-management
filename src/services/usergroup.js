import config from '../config';

export default class UsergroupService {
    constructor(container) {
        this.usergroupModel = container.get('usergroupModel');
        this.logger = container.get('logger');
    }

    async Add({ name }) {
        try {
            this.logger.silly('Creating usergroup DB record');
            const usergroupRecord = await this.usergroupModel.create({
                name
            });

            const usergroup = usergroupRecord.toObject();
            
            return { usergroup };
        } catch(e) {
            this.logger.error(e);

            throw e;
        }
    }
}