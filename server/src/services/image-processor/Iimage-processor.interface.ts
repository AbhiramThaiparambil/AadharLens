export interface IImageProcessor {
  processImage(buffer: Buffer): Promise<Buffer>;
}
