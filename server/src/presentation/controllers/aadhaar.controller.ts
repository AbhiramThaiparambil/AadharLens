import type { NextFunction, Request, Response } from 'express';
import { injectable, inject } from 'tsyringe';
import type { IParseAadhaarUseCase } from '../../application/use-cases/parse-aadhaar/Iparse-aadhaar.usecase.js';
import type { IParseAadhaarAwsUseCase } from '../../application/use-cases/parse-aadhaar/Iparse-aadhaar-aws.usecase.js';
import { ResponseMessage } from '../../constants/ResponseMessage.js';
import { HttpStatus } from '../../constants/httpStatus.js';

@injectable()
export class AadhaarController {
  constructor(
    @inject('IParseAadhaarUseCase')    private readonly _parseAadhaarUseCase: IParseAadhaarUseCase,
    @inject('IParseAadhaarAwsUseCase') private readonly _parseAadhaarAwsUseCase: IParseAadhaarAwsUseCase,
  ) {}
  
  public getWelcomeMessage = (_req: Request, res: Response): void => {
    res.status(HttpStatus.OK).json({ message: ResponseMessage.WELCOME });
  };

  public parseAadhaar = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const files = req.files as { [fieldname: string]: Express.Multer.File[] };
      if (
        !files ||
        !files['frontFile'] || files['frontFile'].length === 0 ||
        !files['backFile']  || files['backFile'].length  === 0
      ) {
        res.status(HttpStatus.BAD_GATEWAY).json({ error: ResponseMessage.BOTH_IMAGES_REQUIRED });
        return;
      }
      const frontBuffer = (files['frontFile'][0] as Express.Multer.File).buffer;
      const backBuffer  = (files['backFile'][0]  as Express.Multer.File).buffer;
      const result = await this._parseAadhaarUseCase.execute(frontBuffer, backBuffer);
      res.status(HttpStatus.OK).json({
        status:  true,
        data:    result,
        message: ResponseMessage.PARSE_SUCCESS,
      });
    } catch (error) {
      console.error('Error parsing Aadhaar:', error);
      next(error);
    }
  };

  public parseAadhaarAws = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const files = req.files as { [fieldname: string]: Express.Multer.File[] };
      if (
        !files ||
        !files['frontFile'] || files['frontFile'].length === 0 ||
        !files['backFile']  || files['backFile'].length  === 0
      ) {
        res.status(HttpStatus.BAD_GATEWAY).json({ error: ResponseMessage.BOTH_IMAGES_REQUIRED });
        return;
      }
      const frontBuffer = (files['frontFile'][0] as Express.Multer.File).buffer;
      const backBuffer  = (files['backFile'][0]  as Express.Multer.File).buffer;
      const result = await this._parseAadhaarAwsUseCase.execute(frontBuffer, backBuffer);
      res.status(HttpStatus.OK).json({
        status:  true,
        data:    result,
        message: ResponseMessage.PARSE_SUCCESS,
      });
    } catch (error) {
      console.error('Error parsing Aadhaar with AWS Textract:', error);
      next(error);
    }
  };
}
