import type { RawAadhaarFields } from '../../domain/entities/aadhaar.entity.js';
export interface IExtractorService {
  extract(frontText: string, backText: string): RawAadhaarFields;
}
