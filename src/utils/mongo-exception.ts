import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import type { MongoError } from 'mongodb';
import { mongo } from 'mongoose';

enum MongoErrors {
  MongooseError = 'MongooseError',
  DocumentNotFoundError = 'DocumentNotFoundError',
  CastError = 'CastError',
  DisconnectedError = 'DisconnectedError',
  DivergentArrayError = 'DivergentArrayError',
  MissingSchemaError = 'MissingSchemaError',
  ValidatorError = 'ValidatorError',
  ValidationError = 'ValidationError',
  ObjectExpectedError = 'ObjectExpectedError',
  ObjectParameterError = 'ObjectParameterError',
  OverwriteModelError = 'OverwriteModelError',
  ParallelSaveError = 'ParallelSaveError',
  StrictModeError = 'StrictModeError',
  VersionError = 'VersionError',
}

@Catch(mongo.MongoServerError)
export class MongoExceptionFilter implements ExceptionFilter {
  catch(exception: MongoError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    const error = {
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: exception.name,
      mongoErrorCoder: exception?.code || null,
    };

    response.status(error.statusCode).json(error);
  }
}
