import { injectable } from 'tsyringe';
import type { IExtractorService } from './Iextractor.interface.js';
import type { RawAadhaarFields } from '../../domain/entities/aadhaar.entity.js';
import {
  cleanText,
  extractUid,
  extractDob,
  extractGender,
  extractName,
  extractAddress,
  extractPincode,
  extractMobile,
} from '../../utils/aadhaar-regex.util.js';
@injectable()
export class AadharFieldExtractor implements IExtractorService {
  extract(frontText: string, backText: string): RawAadhaarFields {
    const cleanFront = cleanText(frontText);
    const cleanBack  = cleanText(backText);
    const combined   = `${cleanFront} ${cleanBack}`;
    const uid          = extractUid(combined);
    const dob          = extractDob(cleanFront);
    const gender       = extractGender(cleanFront);
    const name         = extractName(frontText);
    const address      = extractAddress(backText, cleanBack);
    const pincode      = extractPincode(combined);
    const mobileNumber = extractMobile(combined);
    return {
      ...(uid          !== undefined && { uid }),
      ...(dob          !== undefined && { dob }),
      ...(gender       !== undefined && { gender }),
      ...(name         !== undefined && { name }),
      ...(address      !== undefined && { address }),
      ...(pincode      !== undefined && { pincode }),
      ...(mobileNumber !== undefined && { mobileNumber }),
    };
  }
}
