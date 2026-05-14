export interface RawAadhaarFields {
  uid?: string;
  dob?: string;
  gender?: string;
  name?: string;
  address?: string;
  pincode?: string;
  mobileNumber?: string;
}
export interface ParsedAadhaarData {
  Name: string;
  DOB: string;
  Gender: string;
  UID: string;
  address: string;
  pincode: string;
  age_band: string;
  MobileNumber: string;
  isUidSame: string;
  document_type: string;
}
