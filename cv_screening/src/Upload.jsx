// Upload.jsx — resume queue form + list. Pattern: form -> store (App) -> render.
// Rules: PDF only, max 5 files, 5 MB per file, no duplicates.

import { useRef, useState } from 'react';

const MAX_FILES = 5;
const MAX_SIZE = 5 * 1024 * 1024; // 5 MB

function formatSize(bytes) {
  return Math.round(bytes / 1024) + ' KB';
}

function isPdf(file) {
  return file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');
}

export default function Upload({ files, setFiles }) {
  const inputRef = useRef(null);
  const [dragOn, setDragOn] = useState(false);
  const [notice, setNotice] = useState('');

  // Label queue CV 1..5 in upload order. Internal ids stay cv_1.. for the screening contract.
  function renumber(list) {
    return list.map((item, i) => ({ ...item, id: 'cv_' + (i + 1) }));
  }

  function add(incoming) {
    const next = Array.from(incoming || []);
    if (next.length === 0) return;
    let updated = [...files];
    let added = 0;
    let rejected = '';

    for (const f of next) {
      if (updated.length >= MAX_FILES) { rejected = 'Maximum ' + MAX_FILES + ' resumes. "' + f.name + '" was skipped.'; break; }
      if (!isPdf(f)) { rejected = '"' + f.name + '" is not a PDF. Only PDF files are supported.'; continue; }
      if (f.size > MAX_SIZE) { rejected = '"' + f.name + '" is too large (' + formatSize(f.size) + '). Maximum 5 MB per file.'; continue; }
      const duplicate = updated.some((s) => s.file.name === f.name && s.file.size === f.size);
      if (duplicate) { rejected = '"' + f.name + '" is already in the queue.'; continue; }
      updated.push({ file: f, id: '' });
      added++;
    }
    setFiles(renumber(updated));
    if (added > 0) setNotice(added + ' file(s) added. Total ' + Math.min(updated.length, MAX_FILES) + '/' + MAX_FILES + ' resumes.');
    else if (rejected) setNotice(rejected);
    if (rejected && added === 0) setNotice(rejected);
  }

  function removeOne(idx) {
    const left = files.filter((_, i) => i !== idx);
    setFiles(renumber(left));
    setNotice('1 file removed. ' + left.length + ' remaining.');
  }

  function clearAll() {
    setFiles([]);
    setNotice('All files removed.');
  }

  return (
    <div className="card-float border border-black/10 dark:border-white/10 rounded-2xl p-5">
      <p className="text-xs font-bold tracking-widest uppercase text-neutral-500 dark:text-neutral-400">
        Upload resumes
      </p>

      {/* Drop zone: click to browse, drag to drop. Large tap area for mobile. */}
      <div
        onClick={() => inputRef.current && inputRef.current.click()}
        onDragEnter={(e) => { e.preventDefault(); setDragOn(true); }}
        onDragOver={(e) => { e.preventDefault(); setDragOn(true); }}
        onDragLeave={(e) => { e.preventDefault(); setDragOn(false); }}
        onDrop={(e) => { e.preventDefault(); setDragOn(false); if (e.dataTransfer.files) add(e.dataTransfer.files); }}
        className={
          'group mt-3 rounded-2xl border-2 border-dashed p-8 text-center cursor-pointer transition ' +
          (dragOn ? 'border-accent bg-red-50 dark:bg-white/5' : 'border-black/10 dark:border-white/10 hover:border-accent')
        }
      >
        <input
          ref={inputRef}
          type="file"
          accept=".pdf,application/pdf"
          multiple
          className="hidden"
          aria-label="Select PDF resume files"
          onChange={(e) => { add(e.target.files); e.target.value = ''; }}
        />
        <p className="font-bold text-sm">Drag & drop PDFs here, or tap to browse</p>
        <p className="text-xs text-neutral-600 dark:text-neutral-300 mt-1">Add up to 5 at once, or one by one. PDF only, 5 MB per file.</p>
        <span className="mt-4 inline-block border border-black/10 dark:border-white/10 rounded-xl px-5 py-2.5 text-sm font-medium transition group-hover:bg-accent group-hover:border-accent group-hover:text-white">
          Browse PDF files
        </span>
        {dragOn && <p className="mt-2 text-sm font-bold text-accent">Drop files here</p>}
      </div>

      <div className="mt-3 flex items-center justify-between text-xs">
        <p><span className="font-bold">{files.length}</span> / {MAX_FILES} resumes selected</p>
        {files.length > 0 && (
          <button onClick={clearAll} className="font-bold text-accent">Clear all</button>
        )}
      </div>

      {notice && <p className="mt-2 text-xs text-neutral-700 dark:text-neutral-200">{notice}</p>}

      {/* Queue */}
      <div className="mt-3 space-y-2">
        {files.length === 0 && (
          <div className="border border-dashed border-black/10 dark:border-white/10 rounded-2xl p-4 text-center text-sm text-neutral-600 dark:text-neutral-300">
            No files yet. Upload a PDF to start.
          </div>
        )}
        {files.map((item, idx) => (
          <div key={item.id + '-' + idx} className="border border-black/10 dark:border-white/10 rounded-2xl p-3 flex items-center gap-3">
            <div className="flex-1 min-w-0">
              <p className="font-bold text-sm truncate">{item.file.name}</p>
              <p className="text-xs text-neutral-600 dark:text-neutral-300">{formatSize(item.file.size)} • PDF</p>
            </div>
            <span className="text-xs font-bold bg-ink text-white dark:bg-white dark:text-black px-2.5 py-1 rounded-full flex-shrink-0">CV {idx + 1}</span>
            <button
              onClick={() => removeOne(idx)}
              aria-label={'Remove ' + item.file.name}
              className="w-8 h-8 rounded-xl border border-black/10 dark:border-white/10 flex items-center justify-center transition hover:bg-accent hover:border-accent hover:text-white"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
