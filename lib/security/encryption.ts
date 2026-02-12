import crypto from 'crypto';

const key = crypto.createHash('sha256').update(process.env.FILE_ENCRYPTION_KEY ?? 'local-dev-key').digest();

export function encryptBuffer(buffer: Buffer): Buffer {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
  const encrypted = Buffer.concat([cipher.update(buffer), cipher.final()]);
  const tag = cipher.getAuthTag();
  return Buffer.concat([iv, tag, encrypted]);
}

export function decryptBuffer(buffer: Buffer): Buffer {
  const iv = buffer.subarray(0, 16);
  const tag = buffer.subarray(16, 32);
  const content = buffer.subarray(32);
  const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv);
  decipher.setAuthTag(tag);
  return Buffer.concat([decipher.update(content), decipher.final()]);
}
