
import type { Request, Response, NextFunction } from "express";
import { HttpStatus } from "../../constants/httpStatus.js";
import { ResponseMessage } from "../../constants/ResponseMessage.js";
type ErrorWithStatus = {
  statusCode?: number;
  message?: string;
};

export function errorHandler(
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
    const err=error as ErrorWithStatus
  console.error(error);

  res.status(err?.statusCode ?? HttpStatus.INTERNAL_SERVER_ERROR).json({
    status: false,
    message: err?.message ?? ResponseMessage.INTERNAL_SERVER_ERROR,
  });
}