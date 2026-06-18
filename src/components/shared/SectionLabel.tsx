interface SectionLabelProps {
  children: string
}

export function SectionLabel({ children }: SectionLabelProps) {
  return (
    <div className="flex items-center gap-3 mb-3">
      <span
        className="block w-6 h-[2px] rounded-full"
        style={{
          background: 'linear-gradient(135deg, #00D4AA 0%, #1852E8 100%)',
        }}
      />
      <span
        className="text-[10px] font-medium tracking-[0.1em] uppercase text-[#00D4AA]"
      >
        {children}
      </span>
    </div>
  )
}
