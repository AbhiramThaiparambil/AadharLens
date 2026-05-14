import type { Request, Response } from 'express';
import { injectable, inject } from 'tsyringe';
import type { IParseAadhaarUseCase } from '../../application/use-cases/parse-aadhaar/Iparse-aadhaar.usecase.js';
@injectable()
export class AadhaarController {
  constructor(
    @inject('IParseAadhaarUseCase') private readonly parseAadhaarUseCase: IParseAadhaarUseCase,
  ) {}
  
  public getWelcomeMessage = (_req: Request, res: Response): void => {
    res.status(200).json({ message: 'Welcome to AadhaarLens ' });
  };

  
  public parseAadhaar = async (req: Request, res: Response): Promise<void> => {
    try {
      const files = req.files as { [fieldname: string]: Express.Multer.File[] };
      if (
        !files ||
        !files['frontFile'] || files['frontFile'].length === 0 ||
        !files['backFile']  || files['backFile'].length  === 0
      ) {
        res.status(400).json({ error: 'Both front and back Aadhaar images are required' });
        return;
      }
      const frontBuffer = (files['frontFile'][0] as Express.Multer.File).buffer;
      const backBuffer  = (files['backFile'][0]  as Express.Multer.File).buffer;
      const result = await this.parseAadhaarUseCase.execute(frontBuffer, backBuffer);
      res.status(200).json({
        status:  true,
        data:    result,
        message: 'Parsing Successful',
      });
    } catch (error) {
      console.error('Error parsing Aadhaar:', error);
      res.status(500).json({ error: 'An error occurred during parsing' });
    }
  };
}
