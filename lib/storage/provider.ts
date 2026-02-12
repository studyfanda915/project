import { promises as fs } from 'fs';
import path from 'path';

export interface StorageProvider {
  save(key: string, data: Buffer): Promise<string>;
  read(filePath: string): Promise<Buffer>;
  remove(filePath: string): Promise<void>;
}

class LocalStorageProvider implements StorageProvider {
  root = path.join(process.cwd(), 'storage');

  async save(key: string, data: Buffer): Promise<string> {
    await fs.mkdir(this.root, { recursive: true });
    const filePath = path.join(this.root, key);
    await fs.writeFile(filePath, data);
    return filePath;
  }

  async read(filePath: string): Promise<Buffer> {
    return fs.readFile(filePath);
  }

  async remove(filePath: string): Promise<void> {
    await fs.rm(filePath, { force: true });
  }
}

export const storageProvider: StorageProvider = new LocalStorageProvider();
