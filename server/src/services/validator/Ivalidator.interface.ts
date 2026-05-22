import type { RawAadhaarFields, ParsedAadhaarData } from '../../application/entities/aadhaar.entity.js';
export interface IValidatorService {
  validate(raw: RawAadhaarFields): ParsedAadhaarData;
}
