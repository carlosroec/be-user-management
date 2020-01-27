import user from "../api/routes/user";

export default class UserService {
    constructor(container) {
        this.userModel = container.get('userModel');
        this.usergroupModel = container.get('usergroupModel');
        this.logger = container.get('logger');
    }

    async Filter(filters) {
        try {
            this.logger.silly('Get users');

            const usergroups = await this.usergroupModel.find();
            const users = await this.userModel.find();
            const response = [];

            users.map(user => {
                const usergroup = usergroups.find(item => item._id.toString() == user.usergroup);

                if (usergroup) console.log("enc", usergroup.name);
                response.push({
                    name: user.name,
                    username: user.username,
                    email: user.email,
                    createdAt: user.createdAt,
                    lastVisit: user.lastVisit,
                    usergroup: usergroup? usergroup.name : ''
                });
            });

            return { response };
        } catch (e) {
            this.logger.error(e);

            throw e;
        }
    }
}