import * as fs from 'fs';
import { join } from 'path';

export function deleteFileFromSystem(url: string) {
  const rootDir = join(__dirname, '..', '..');
  const filePath = `${rootDir}/${url}`;
  fs.unlink(filePath, (error) => {
    if (error) {
      throw new Error('Error deleting file');
    }
  });
}
