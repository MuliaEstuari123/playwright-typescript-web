import { PDFDocument } from 'pdf-lib';
import * as fs from 'fs';

export async function combineScreenshotsToPdf(imagePaths: string[], outputPath: string) {
  const pdfDoc = await PDFDocument.create()

  for (const imgPath of imagePaths) {
    if (!fs.existsSync(imgPath)) continue // skip kalau file gak ada
    const imgBytes = fs.readFileSync(imgPath)
    const img = await pdfDoc.embedPng(imgBytes)
    const page = pdfDoc.addPage([img.width, img.height])
    page.drawImage(img, { x: 0, y: 0, width: img.width, height: img.height })
  }

    const pdfBytes = await pdfDoc.save()
    const outputDir = outputPath.substring(0, outputPath.lastIndexOf('/'))
    fs.mkdirSync(outputDir, { recursive: true })
    fs.writeFileSync(outputPath, pdfBytes)
  }