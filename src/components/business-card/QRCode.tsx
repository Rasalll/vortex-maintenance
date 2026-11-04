export default function QRCode({ src, name }: { src: string; name: string }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-3 shadow-sm">
      <img src={src} alt={`${name} business card QR code`} className="block h-auto w-full max-w-[280px] rounded-xl" />
    </div>
  );
}
