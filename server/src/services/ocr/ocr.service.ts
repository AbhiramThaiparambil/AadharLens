import Tesseract from 'tesseract.js';
import { injectable } from 'tsyringe';
import type { IOcrService } from './Iocr.interface.js';
@injectable()
export class TesseractOcrService implements IOcrService {
  async extractText(buffer: Buffer): Promise<string> {
    const {data: {text}} = await Tesseract.recognize(buffer, 'eng');
    return text;
  }
}
