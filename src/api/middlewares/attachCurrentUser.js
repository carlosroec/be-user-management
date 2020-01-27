import { Container } from 'typedi';

const attachCurrentUser = async (req, res, next) => {
    const Logger = Container.get('logger');

    try {
        const UserModel = Container.get('userModel');
        const userRecord = await UserModel.findById(req.token._id);

        if (!userRecord) {
            return res.sendStatus(401);
        }

        const currentUser = userRecord.toObject();
        Reflect.deleteProperty(currentUser, 'password');
        Reflect.deleteProperty(currentUser, 'salt');

        req.currentUser = currentUser;

        return next();
    } catch (e) {
        Logger.error('Error attaching user to req: %o', e);

        return next(e);
    }
};

export default attachCurrentUser;
