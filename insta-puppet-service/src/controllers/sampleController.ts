import { Request, Response, NextFunction } from 'express';
import logging from '../all-configs/logging';

const NAMESPACE = 'Sample Controller';

const sampleHealthCheck = (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, `Sample health check route called`);

    return res.status(200).json({
        message: 'demo'
    });
};

export default {
    sampleHealthCheck
};
