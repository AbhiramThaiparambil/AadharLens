import type { ParsedAadhaarData } from '../../entities/aadhaar.entity.js';

export interface IParseAadhaarAwsUseCase {
  execute(frontImageBuffer: Buffer, backImageBuffer: Buffer): Promise<ParsedAadhaarData>;
}
