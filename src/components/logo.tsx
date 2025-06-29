import Link from "next/link"

export default function Logo({ mobile = false }: { mobile?: boolean }) {
  if (mobile) {
    return (
      <Link href="/" className="flex flex-row items-center justify-start gap-[6.4px] text-base text-gray font-outfit">
        <img className="w-[19.7px] relative h-[21.6px] object-cover" alt="" src="/logo-symbol.png" />
        <div className="relative leading-6 font-semibold">Your Logo</div>
      </Link>
    )
  }

  return (
    <Link href="/" className="flex flex-row items-center justify-start gap-[9.6px] text-2xl text-gray font-outfit">
      <img className="w-[29.6px] relative h-[32.5px] object-cover" alt="" src="/logo-symbol.png" />
      <div className="relative leading-9 font-semibold">Your Logo</div>
    </Link>
  )
}
