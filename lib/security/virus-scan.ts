export async function scanForViruses(_file: Buffer): Promise<{ clean: boolean; reason?: string }> {
  return { clean: true };
}
