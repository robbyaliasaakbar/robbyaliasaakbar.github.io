// pdf.js helper — text extraction runs in the browser, not on a server.
// Kenapa di browser? n8n tinggal terima JSON bersih, tidak perlu handle binary PDF.

let workerSiap = false;

function pastikanWorker() {
  const lib = window.pdfjsLib;
  if (!lib) throw new Error('pdf.js belum ke-load (CDN diblokir/offline?). Refresh sekali.');
  if (!workerSiap) {
    lib.GlobalWorkerOptions.workerSrc =
      'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js';
    workerSiap = true;
  }
  return lib;
}

// file = File PDF dari input. Balikin { text, page_count }.
export async function ekstrakTextDariPDF(file) {
  const lib = pastikanWorker();
  const buf = await file.arrayBuffer();
  const pdf = await lib.getDocument({ data: buf }).promise;
  let gabung = '';
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const isi = await page.getTextContent();
    gabung += isi.items.map((it) => it.str || '').join(' ') + '\n';
  }
  return { text: gabung.trim(), page_count: pdf.numPages };
}
