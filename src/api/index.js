import { Router } from 'express';
import auth from './routes/auth';
import user from './routes/user';
import usergroup from './routes/usergroup';

export default () => {
    const app = Router();

    auth(app);
    user(app);
    usergroup(app);
    
    return app;
}
