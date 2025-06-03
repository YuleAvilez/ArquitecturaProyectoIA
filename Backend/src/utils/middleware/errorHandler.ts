import { Request, Response } from "express";
import {
  ExpressErrorMiddlewareInterface,
  HttpError,
  Middleware,
} from "routing-controllers";
import { Service } from "typedi";

@Service()
@Middleware({ type: "after" })
export class ErrorHandlerMiddleware implements ExpressErrorMiddlewareInterface {
  error(
    error: HttpError,
    req: Request,
    res: Response,
    next: (err: any) => any
  ): void {
    const status = error?.httpCode || 500;
    const message = error?.message || "Internal Server Error";

    res.status(status).json({
      name: error?.name,
      message: message,
    });
  }
}
