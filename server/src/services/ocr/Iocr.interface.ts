export interface IOcrService {
  extractText(buffer: Buffer): Promise<string>;
}
