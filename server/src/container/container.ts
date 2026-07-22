import 'reflect-metadata';
import { container } from 'tsyringe';
import { SharpImageProcessor }  from '../services/image-processor/image-processor.service.js';
import { TesseractOcrService }  from '../services/ocr/ocr.service.js';
import { AwsTextractService }   from '../services/ocr/aws-textract.service.js';
import { AadharFieldExtractor } from '../services/extractor/extractor.service.js';
import { ZodAadhaarValidator }  from '../services/validator/validator.service.js';
import { ParseAadhaarUseCase }  from '../application/use-cases/parse-aadhaar/parse-aadhaar.usecase.js';
import { ParseAadhaarAwsUseCase } from '../application/use-cases/parse-aadhaar/parse-aadhaar-aws.usecase.js';

container.register('IImageProcessor',        { useClass: SharpImageProcessor });
container.register('IOcrService',            { useClass: TesseractOcrService });
container.register('AwsTextractService',     { useClass: AwsTextractService });
container.register('IExtractorService',      { useClass: AadharFieldExtractor });
container.register('IValidatorService',      { useClass: ZodAadhaarValidator });
container.register('IParseAadhaarUseCase',   { useClass: ParseAadhaarUseCase });
container.register('IParseAadhaarAwsUseCase', { useClass: ParseAadhaarAwsUseCase });

export { container };
