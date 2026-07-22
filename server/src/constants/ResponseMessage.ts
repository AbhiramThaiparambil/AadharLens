export const ResponseMessage = {
  WELCOME: 'Welcome to AadhaarLens',

  PARSE_SUCCESS: 'Aadhaar parsed successfully.',

  BOTH_IMAGES_REQUIRED:
    'Both front and back Aadhaar images are required.',

  PARSE_FAILED:
    'An error occurred while parsing the Aadhaar.',

  INTERNAL_SERVER_ERROR:
    'Internal server error.',
} as const;