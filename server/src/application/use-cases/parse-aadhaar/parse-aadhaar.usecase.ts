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
    @inject('IImageProcessor')  private readonly imageProcessor: IImageProcessor,
    @inject('IOcrService')       private readonly ocrService:     IOcrService,
    @inject('IExtractorService') private readonly extractor:      IExtractorService,
    @inject('IValidatorService') private readonly validator:      IValidatorService,
  ) {}
  async execute(frontImageBuffer: Buffer, backImageBuffer: Buffer): Promise<ParsedAadhaarData> {
    const [processedFront, processedBack] = await Promise.all([
      this.imageProcessor.processImage(frontImageBuffer),
      this.imageProcessor.processImage(backImageBuffer),
    ]);
    const [frontText, backText] = await Promise.all([
      this.ocrService.extractText(processedFront),
      this.ocrService.extractText(processedBack),
    ]);
    const rawFields = this.extractor.extract(frontText, backText);
    return this.validator.validate(rawFields);
  }
}
