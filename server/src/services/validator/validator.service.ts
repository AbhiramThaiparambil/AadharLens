import { z } from 'zod';
import { injectable } from 'tsyringe';
import { parse as parseDate, isValid, differenceInYears } from 'date-fns';
import type { IValidatorService } from './Ivalidator.interface.js';
import type { RawAadhaarFields, ParsedAadhaarData } from '../../domain/entities/aadhaar.entity.js';
const rawAadhaarSchema = z.object({
  uid: z
    .string()
    .regex(/^\d{12}$/, 'UID must be 12 digits')
    .optional(),
  dob: z
    .string()
    .refine(
      (val) => isValid(parseDate(val, 'dd/MM/yyyy', new Date())),
      { message: 'DOB must be in dd/MM/yyyy format' },
    )
    .optional(),
  gender: z
    .enum(['MALE', 'FEMALE', 'TRANSGENDER'])
    .optional(),
  name: z
    .string()
    .min(1)
    .optional(),
  address: z
    .string()
    .min(1)
    .optional(),
  pincode: z
    .string()
    .regex(/^\d{6}$/, 'Pincode must be 6 digits')
    .optional(),
  mobileNumber: z
    .string()
    .regex(/^[6-9]\d{9}$/, 'Invalid Indian mobile number')
    .optional(),
});
@injectable()
export class ZodAadhaarValidator implements IValidatorService {
  validate(raw: RawAadhaarFields): ParsedAadhaarData {
    const result    = rawAadhaarSchema.safeParse(raw);
    const validated = result.success ? result.data : this.partialFallback(raw);
    return {
      Name:          validated.name         ?? 'Not Found',
      DOB:           validated.dob          ?? 'Not Found',
      Gender:        validated.gender       ?? 'Not Found',
      UID:           this.formatUid(validated.uid),
      address:       validated.address      ?? 'Not Found',
      pincode:       validated.pincode      ?? 'Not Found',
      age_band:      this.computeAgeBand(validated.dob),
      MobileNumber:  validated.mobileNumber ?? 'Not Found',
      isUidSame:     'Verified',
      document_type: 'Aadhaar',
    };
  }
  private partialFallback(raw: RawAadhaarFields): z.infer<typeof rawAadhaarSchema> {
    const s = rawAadhaarSchema.shape;
    return {
      uid:          s.uid.safeParse(raw.uid).data,
      dob:          s.dob.safeParse(raw.dob).data,
      gender:       s.gender.safeParse(raw.gender).data,
      name:         s.name.safeParse(raw.name).data,
      address:      s.address.safeParse(raw.address).data,
      pincode:      s.pincode.safeParse(raw.pincode).data,
      mobileNumber: s.mobileNumber.safeParse(raw.mobileNumber).data,
    };
  }
  private formatUid(uid?: string): string {
    if (!uid || uid.length !== 12) return 'Not Found';
    return `${uid.slice(0, 4)} ${uid.slice(4, 8)} ${uid.slice(8, 12)}`;
  }
  private computeAgeBand(dob?: string): string {
    if (!dob) return 'Unknown';
    const parsed = parseDate(dob, 'dd/MM/yyyy', new Date());
    if (!isValid(parsed)) return 'Unknown';
    const age   = differenceInYears(new Date(), parsed);
    const lower = Math.floor(age / 10) * 10;
    return `${lower}-${lower + 10}`;
  }
}
