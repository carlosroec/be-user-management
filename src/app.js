import express from 'express';
import config from './config';
import Logger from './loaders/logger';

const app = express();

require('./loaders').default(app);

app.listen(config.port, err => {
    if (err) {
        process.exit(1);
        
        return;
    }

    Logger.info(`
        ==========================================
                Server listeningn on port: ${config.port}
        ==========================================
    `)
});

export default app;
