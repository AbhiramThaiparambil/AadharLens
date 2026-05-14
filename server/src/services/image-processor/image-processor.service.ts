import sharp from 'sharp';
import { injectable } from 'tsyringe';
import type { IImageProcessor } from './Iimage-processor.interface.js';
@injectable()
export class SharpImageProcessor implements IImageProcessor {
  async processImage(buffer: Buffer): Promise<Buffer> {
    return sharp(buffer)
      .grayscale() 
      .normalize()  
      .png()       
      .toBuffer();
  }
}
