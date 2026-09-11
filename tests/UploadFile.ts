import { Page } from '@playwright/test';
import * as path from 'path';

/**
 * @param page - Playwright page object
 * @param inputLocator - locator dari input file yang mau diisi
 * @param fileName - nama file (contoh: 'KTP.jpg'), diambil dari folder test-data
 */
export async function uploadFile(page: Page, inputLocator: ReturnType<Page['locator']>, fileName: string) {
  const filePath = path.join(__dirname, '..', 'test-data', fileName)
  await inputLocator.waitFor({ state: 'attached', timeout: 3000 })
  await inputLocator.setInputFiles(filePath)
  await page.waitForTimeout(500)
}