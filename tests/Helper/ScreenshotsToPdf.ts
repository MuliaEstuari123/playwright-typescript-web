import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import * as fs from 'fs';

interface CoverInfo {
  testName: string;
  status: string;
  startTime: Date;
  environment: string; // 'UAT' | 'Production' dll
}

export async function combineScreenshotsToPdf(
  imagePaths: string[],
  outputPath: string,
  cover: CoverInfo
) {
  const pdfDoc = await PDFDocument.create()
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica)
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold)

  // ===== Cover page =====
  const pageWidth = 595
  const pageHeight = 842
  const coverPage = pdfDoc.addPage([pageWidth, pageHeight])
  const isPassed = cover.status === 'passed'

  const centerX = (text: string, size: number, f = font) => {
    const textWidth = f.widthOfTextAtSize(text, size)
    return (pageWidth - textWidth) / 2
  }

  let y = pageHeight / 2 + 70

  // Judul test
  const titleSize = 24
  coverPage.drawText(cover.testName, {
    x: centerX(cover.testName, titleSize, fontBold),
    y,
    size: titleSize,
    font: fontBold,
  })
  y -= 30

  // Environment
  const envText = `Environment : ${cover.environment}`
  const envSize = 12
  coverPage.drawText(envText, {
    x: centerX(envText, envSize, font),
    y,
    size: envSize,
    font,
    color: rgb(0.4, 0.4, 0.4),
  })
  y -= 30

  // Garis pembatas tipis
  const lineWidth = 200
  coverPage.drawLine({
    start: { x: (pageWidth - lineWidth) / 2, y },
    end: { x: (pageWidth + lineWidth) / 2, y },
    thickness: 1,
    color: rgb(0.8, 0.8, 0.8),
  })
  y -= 35

  // Status
  const statusText = `STATUS : ${cover.status.toUpperCase()}`
  const statusSize = 20
  coverPage.drawText(statusText, {
    x: centerX(statusText, statusSize, fontBold),
    y,
    size: statusSize,
    font: fontBold,
    color: isPassed ? rgb(0, 0.5, 0) : rgb(0.8, 0, 0),
  })
  y -= 30

  // Waktu run
  const runText = `Run : ${cover.startTime.toLocaleString('id-ID')}`
  const runSize = 14
  coverPage.drawText(runText, {
    x: centerX(runText, runSize, font),
    y,
    size: runSize,
    font,
    color: rgb(0.3, 0.3, 0.3),
  })

  // ===== Screenshot pages (tetep sama, gak diubah) =====
  for (const imgPath of imagePaths) {
    if (!fs.existsSync(imgPath)) continue
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