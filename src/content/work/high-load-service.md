---
title: Bypassing unnecessary OCR for PDF receipts
summary: A receipt-processing investigation that reduced an approximately 6-to-10-second path to approximately 600 to 650 milliseconds.
featured: true
status: published
result: approximately 6 to 10 seconds to approximately 600 to 650 milliseconds
capabilities:
  - Go
  - Python
  - PDF text extraction
  - benchmarking
  - investigative debugging
---

The receipt validator relied heavily on OCR, so processing one receipt took approximately six to ten seconds. I noticed that many inputs were PDFs and formed a simpler hypothesis: if the text already existed in the file, we should extract it directly instead of rendering the document and asking OCR to rediscover it.

I gathered previously classified receipts, tested PDF libraries in Go, compared Python alternatives when the Go options were not reliable enough, and introduced a separate Python service for extraction. The downstream parsing rules were adapted to the extracted text, while OCR remained available for inputs that genuinely needed it.

The resulting path took approximately 600 to 650 milliseconds. The surrounding receipt work also included investigating binary differences between valid and manipulated files. Company and service details remain anonymized.
