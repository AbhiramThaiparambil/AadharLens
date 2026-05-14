import type { RawAadhaarFields } from '../../application/entities/aadhaar.entity.js';
export interface IExtractorService {
  extract(frontText: string, backText: string): RawAadhaarFields;
}
