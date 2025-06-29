import type React from "react"
interface SectionTitleProps {
  children: React.ReactNode
  variant?: "main" | "sidebar"
}

export default function SectionTitle({ children, variant = "main" }: SectionTitleProps) {
  if (variant === "sidebar") {
    return (
      <h2 className="relative text-2xl tracking-[-0.03em] leading-9 font-inter text-[#374151] text-left font-bold">
        {children}
      </h2>
    )
  }

  return (
    <h1 className="w-full relative text-[28px] tracking-[-0.03em] leading-[38px] inline-block font-inter text-[#374151] text-left font-bold">
      {children}
    </h1>
  )
}
