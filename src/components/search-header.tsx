"use client"

import type { FunctionComponent } from "react"
import { useSearchParams } from "next/navigation"

const SearchHeaderDesktop: FunctionComponent = () => {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || "Frontend Development"

  return (
    <div className="w-full relative bg-white border-lightgray border-solid border-b-[1px] box-border h-20 flex flex-row items-center justify-between py-0 px-[120px] gap-0 text-left text-sm text-gray-200 font-inter">
      <div className="w-[158.6px] flex flex-row items-center justify-start gap-[9.6px] text-2xl font-outfit">
        <img className="w-[29.6px] relative h-[32.5px] object-cover" alt="" src="/logo-symbol.png" />
        <div className="relative leading-9 font-semibold">Your Logo</div>
      </div>
      <div className="w-[377px] rounded-xl border-lightgray border-solid border-[1px] box-border h-12 flex flex-row items-center justify-start py-3 px-4 gap-2">
        <img className="w-6 relative h-6 overflow-hidden shrink-0" alt="" src="/search-md.svg" />
        <div className="relative tracking-[-0.03em] leading-7">{query}</div>
      </div>
      <div className="flex flex-row items-center justify-start gap-6 text-steelblue">
        <div className="flex flex-row items-center justify-start gap-2">
          <img className="w-6 relative h-6 overflow-hidden shrink-0" alt="" src="/write-post-icon.svg" />
          <div className="relative [text-decoration:underline] tracking-[-0.03em] leading-7 font-semibold [display:-webkit-inline-box] overflow-hidden text-ellipsis [-webkit-line-clamp:2] [-webkit-box-orient:vertical]">
            Write Post
          </div>
        </div>
        <div className="w-px relative border-lightgray border-solid border-r-[1px] box-border h-6" />
        <div className="flex flex-row items-center justify-start gap-3 text-gray-100">
          <img className="w-10 relative rounded-[50%] max-h-full object-cover" alt="" src="/image-6.png" />
          <div className="relative tracking-[-0.03em] leading-7 font-medium [display:-webkit-inline-box] overflow-hidden text-ellipsis [-webkit-line-clamp:2] [-webkit-box-orient:vertical]">
            John Doe
          </div>
        </div>
      </div>
    </div>
  )
}

const SearchHeaderMobile: FunctionComponent = () => {
  return (
    <div className="w-full relative bg-white border-lightgray border-solid border-b-[1px] box-border h-16 flex flex-row items-center justify-between py-0 px-4 gap-0 text-left text-base text-gray font-outfit">
      <div className="w-[105.8px] flex flex-row items-center justify-start gap-[6.4px]">
        <img className="w-[19.7px] relative h-[21.6px] object-cover" alt="" src="/logo-symbol.png" />
        <div className="relative leading-6 font-semibold">Your Logo</div>
      </div>
      <img className="w-10 h-10 object-cover" alt="" src="/image-6.png" />
    </div>
  )
}

export { SearchHeaderDesktop, SearchHeaderMobile }
