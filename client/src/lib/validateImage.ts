export      const validateImage = (file: File): boolean => {
  return file.type.startsWith("image/");
};