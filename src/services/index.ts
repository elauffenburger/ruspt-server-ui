import winston from 'winston';
import { ApiRusptServerService } from './ruspt-server-service';
import environment from '@/env';

const logger = winston.createLogger({
    transports: new winston.transports.Console()
});

export default {
    logger,
    rusptServerService: new ApiRusptServerService(environment.rusptServerAddress, logger)
}