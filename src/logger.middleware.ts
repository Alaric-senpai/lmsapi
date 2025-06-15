/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-misused-promises */
import {
  Injectable,
  Logger,
  NestMiddleware,
  RequestMethod,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { PrismaService } from './core/prisma/prisma.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  constructor(private readonly prisma: PrismaService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl } = req;
    // const reqmt: RequestMethod = method;
    const host = req.hostname || req.get('host');
    const ip = req.ip || req.connection.remoteAddress;
    const userAgent = req.get('user-agent') || 'unknown';

    const startTime = Date.now(); // Start time for response time tracking

    this.logger.log(`[${host}] ${method} ${originalUrl} - Source: ${ip}`);

    // headers attached

    // Hook into response to log status code & response time
    res.on('finish', async () => {
      const responseTime = Date.now() - startTime;
      const statusCode = res.statusCode;

      this.logger.log(
        `[${host}] ${method as any as RequestMethod} ${originalUrl} - Status: ${statusCode} - ${responseTime}ms`,
      );

      // Save request & response details to Prisma database
      // await this.prisma.requestLog.create({
      // 	data: {
      // 		method,
      // 		url: originalUrl,
      // 		host,
      // 		ip,
      // 		userAgent,
      // 		statusCode,
      // 		responseTime,
      // 	},
      // });
    });

    next();
  }
}
