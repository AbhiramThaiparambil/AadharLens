import type { RawAadhaarFields, ParsedAadhaarData } from '../../domain/entities/aadhaar.entity.js';
export interface IValidatorService {
  validate(raw: RawAadhaarFields): ParsedAadhaarData;
}
