interface TechBadgeProps {
  name: string;
}

export function TechBadge({ name }: TechBadgeProps) {
  return (
    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#1a1a1a] text-zinc-300 border border-white/8 hover:border-cyan-500/30 hover:text-cyan-400 transition-colors">
      {name}
    </span>
  );
}
