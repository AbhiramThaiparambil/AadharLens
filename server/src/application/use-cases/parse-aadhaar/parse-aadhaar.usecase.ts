import { injectable, inject } from 'tsyringe';
import type { IParseAadhaarUseCase } from './Iparse-aadhaar.usecase.js';
import type { IImageProcessor }      from '../../../services/image-processor/Iimage-processor.interface.js';
import type { IOcrService }           from '../../../services/ocr/Iocr.interface.js';
import type { IExtractorService }     from '../../../services/extractor/Iextractor.interface.js';
import type { IValidatorService }     from '../../../services/validator/Ivalidator.interface.js';
import type { ParsedAadhaarData }     from '../../entities/aadhaar.entity.js';
@injectable()
export class ParseAadhaarUseCase implements IParseAadhaarUseCase {
  constructor(
    @inject('IImageProcessor')  private readonly _imageProcessor: IImageProcessor,
    @inject('IOcrService')       private readonly _ocrService:     IOcrService,
    @inject('IExtractorService') private readonly _extractor:      IExtractorService,
    @inject('IValidatorService') private readonly _validator:      IValidatorService,
  ) {}

  async execute(frontImageBuffer: Buffer, backImageBuffer: Buffer): Promise<ParsedAadhaarData> {
    const [processedFront, processedBack] = await Promise.all([
      this._imageProcessor.processImage(frontImageBuffer),
      this._imageProcessor.processImage(backImageBuffer),
    ]);
    const [frontText, backText] = await Promise.all([
      this._ocrService.extractText(processedFront),
      this._ocrService.extractText(processedBack),
    ]);
    const rawFields = this._extractor.extract(frontText, backText);
    return this._validator.validate(rawFields);
  }
}
