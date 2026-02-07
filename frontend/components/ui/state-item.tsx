export default function StatItem({
  label,
  value,
  subLabel,
}: {
  label: string;
  value: string;
  subLabel: string;
}) {
  return (
    <div className="flex flex-col items-center text-center">
      <span className="text-[10px] font-black text-white/20 uppercase tracking-widest mb-2">
        {label}
      </span>
      <div className="text-2xl font-light text-white/90 leading-none mb-1">
        {value}
      </div>
      <span className="text-[10px] text-white/30 font-medium">{subLabel}</span>
    </div>
  );
}