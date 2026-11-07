type FourTileBackgroundProps = {
  image: string;
  opacity?: number;
};

export default function FourTileBackground({ image, opacity = 0.08 }: FourTileBackgroundProps) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 mix-blend-multiply"
      style={{
        backgroundImage: `url('${image}')`,
        backgroundSize: '25vw 25vw',
        backgroundRepeat: 'repeat',
        opacity,
      }}
    />
  );
}
