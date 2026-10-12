import imageCompression from 'browser-image-compression';

export const MAX_IMAGE_SIZE_BYTES = 5 * 1024 * 1024;
const COMPRESS_ABOVE_BYTES = 2 * 1024 * 1024;

const MIME_EXTENSIONS: Record<string, string> = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
  'image/gif': 'gif',
  'image/avif': 'avif',
};

function bytesToString(bytes: Uint8Array): string {
  return String.fromCharCode(...bytes);
}

async function detectImageMime(file: File): Promise<string | null> {
  const bytes = new Uint8Array(await file.slice(0, 32).arrayBuffer());
  if (bytes.length >= 3 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) return 'image/jpeg';
  if (bytes.length >= 8 && bytesToString(bytes.slice(0, 8)) === '\x89PNG\r\n\x1a\n') return 'image/png';
  if (bytes.length >= 12 && bytesToString(bytes.slice(0, 4)) === 'RIFF' && bytesToString(bytes.slice(8, 12)) === 'WEBP') return 'image/webp';
  if (bytes.length >= 6 && /^GIF8[79]a$/.test(bytesToString(bytes.slice(0, 6)))) return 'image/gif';
  if (bytes.length >= 12 && bytesToString(bytes.slice(4, 8)) === 'ftyp' && ['avif', 'avis'].some((brand) => bytesToString(bytes).includes(brand))) return 'image/avif';
  return null;
}

export function imageExtensionForMime(mimeType: string): string {
  const extension = MIME_EXTENSIONS[mimeType];
  if (!extension) throw new Error('This image format is not supported. Use JPEG, PNG, WebP, GIF, or AVIF.');
  return extension;
}

export async function prepareImageForUpload(file: File): Promise<File> {
  if (file.size > MAX_IMAGE_SIZE_BYTES) {
    throw new Error(`${file.name} is larger than 5 MiB. Choose a smaller image.`);
  }

  const detectedMime = await detectImageMime(file);
  if (!detectedMime || !MIME_EXTENSIONS[detectedMime]) {
    throw new Error(`${file.name} is not a supported image. Use JPEG, PNG, WebP, GIF, or AVIF.`);
  }
  if (file.type && file.type !== detectedMime) {
    throw new Error(`${file.name} has a file type that does not match its image content.`);
  }

  if (file.size <= COMPRESS_ABOVE_BYTES) return file;

  let compressed: File;
  try {
    compressed = await imageCompression(file, {
      maxSizeMB: 1.8,
      maxWidthOrHeight: 2400,
      useWebWorker: false,
      fileType: detectedMime,
    });
  } catch {
    throw new Error(`${file.name} could not be compressed in this browser. Choose a smaller image or convert it to JPEG, PNG, or WebP.`);
  }

  if (compressed.size > MAX_IMAGE_SIZE_BYTES) {
    throw new Error(`${file.name} is still larger than 5 MiB after compression.`);
  }

  const compressedMime = await detectImageMime(compressed);
  if (!compressedMime || compressedMime !== compressed.type || !MIME_EXTENSIONS[compressedMime]) {
    throw new Error(`${file.name} could not be validated after compression.`);
  }

  return compressed;
}
