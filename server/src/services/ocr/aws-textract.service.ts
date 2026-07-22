import { TextractClient, DetectDocumentTextCommand } from '@aws-sdk/client-textract';
import { injectable } from 'tsyringe';
import type { IOcrService } from './Iocr.interface.js';
import { env } from '../../config/env.js';

@injectable()
export class AwsTextractService implements IOcrService {
  private readonly _client: TextractClient;

  constructor() {
    const config: { region: string; credentials?: { accessKeyId: string; secretAccessKey: string } } = {
      region: env.AWS_REGION,
    };

    if (env.AWS_ACCESS_KEY_ID && env.AWS_SECRET_ACCESS_KEY) {
      config.credentials = {
        accessKeyId: env.AWS_ACCESS_KEY_ID,
        secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
      };
    }

    this._client = new TextractClient(config);
  }

  async extractText(buffer: Buffer): Promise<string> {
    const command = new DetectDocumentTextCommand({
      Document: {
        Bytes: buffer,
      },
    });

    const response = await this._client.send(command);
    if (!response.Blocks) {
      return '';
    }

    const lines = response.Blocks
      .filter((block) => block.BlockType === 'LINE' && block.Text)
      .map((block) => block.Text);

    return lines.join('\n');
  }
}
