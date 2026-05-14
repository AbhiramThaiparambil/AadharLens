import type { ParsedAadhaarData } from '../../entities/aadhaar.entity.js';
export interface IParseAadhaarUseCase {
  execute(frontImageBuffer: Buffer, backImageBuffer: Buffer): Promise<ParsedAadhaarData>;
}
