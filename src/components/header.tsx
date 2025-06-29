"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Menu, X, User, LogOut } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Logo from "@/components/logo"
import SearchBar from "@/components/search-bar"
import Link from "next/link"
import Image from "next/image"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { user, logout } = useAuth()
  const router = useRouter()

  return (
    <>
      {/* Desktop Header */}
      <header className="hidden md:block w-full sticky top-0 z-50 bg-white/80 backdrop-blur shadow-md border-[#E5E7EB] border-solid border-b-[1px] box-border h-20">
        <div className="w-full flex flex-row items-center justify-between py-0 px-[120px] h-full text-left text-sm font-inter">
          <div className="w-[158.6px]">
            <Logo />
          </div>
          <SearchBar className="w-[373px]" />
          <div className="flex flex-row items-center justify-start gap-6 text-[#1DA1F2]">
            {user ? (
              <> 
                <Link href="/write" className="flex items-center gap-1.5">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="align-middle">
                    <path d="M3 21H21" stroke="#1DA1F2" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M7 17L17.586 6.414a2 2 0 0 1 2.828 2.828L9.828 19.828a2 2 0 0 1-2.828-2.828Z" stroke="#1DA1F2" strokeWidth="2"/>
                  </svg>
                  <span className="align-middle text-[#1DA1F2] font-semibold text-base leading-7 tracking-[-0.03em] [text-decoration:underline]">Write Post</span>
                </Link>
                <div className="w-px relative border-[#E5E7EB] border-solid border-r-[1px] box-border h-6" />
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="flex flex-row items-center justify-start gap-3 text-[#374151]">
                      <Image 
                        className="w-10 relative rounded-[50%] max-h-full object-cover" 
                        alt="User profile" 
                        src="/image-6.png"
                        width={40}
                        height={40}
                      />
                      <div className="relative tracking-[-0.03em] leading-7 font-medium">John Doe</div>
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    className="w-[184px] rounded-xl bg-white border-[#E5E7EB] border-solid border-[1px] box-border shadow-lg"
                    align="end"
                    sideOffset={8}
                  >
                    <DropdownMenuItem asChild>
                      <Link
                        href="/profile"
                        className="flex flex-row items-center justify-start py-3 px-4 gap-2 hover:bg-gray-50 cursor-pointer"
                      >
                        <User className="w-5 relative h-5 overflow-hidden shrink-0" />
                        <span className="relative tracking-[-0.03em] leading-7">Profile</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={logout}
                      className="flex flex-row items-center justify-start py-3 px-4 gap-2 hover:bg-gray-50 cursor-pointer"
                    >
                      <LogOut className="w-5 relative max-h-full overflow-hidden shrink-0" />
                      <span className="relative tracking-[-0.03em] leading-7">Logout</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Link href="/login" className="flex flex-row items-center justify-start">
                  <div className="relative [text-decoration:underline] tracking-[-0.03em] leading-7 font-semibold">
                    Login
                  </div>
                </Link>
                <div className="w-px relative border-[#E5E7EB] border-solid border-r-[1px] box-border h-6" />
                <Link
                  href="/register"
                  className="w-[182px] rounded-[9999px] bg-[#1DA1F2] h-11 flex flex-row items-center justify-center p-2 box-border text-white hover:bg-[#1991DB] transition-colors"
                >
                  <div className="relative tracking-[-0.03em] leading-7 font-semibold">Register</div>
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Mobile Header */}
      <header className="md:hidden w-full sticky top-0 z-50 bg-white/80 backdrop-blur shadow-md border-[#E5E7EB] border-solid border-b-[1px] box-border h-16">
        <div className="w-full flex flex-row items-center justify-between py-0 px-4 h-full text-left text-base font-outfit">
          <Logo mobile />

          <div className="flex flex-row items-center justify-start gap-6">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button aria-label="User menu">
                    <Image 
                      className="w-10 h-10 object-cover rounded-full" 
                      alt="User profile" 
                      src="/image-6.png"
                      width={40}
                      height={40}
                    />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-[184px] rounded-xl bg-white border-[#E5E7EB] border-solid border-[1px] box-border shadow-lg"
                  align="end"
                  sideOffset={8}
                >
                  <DropdownMenuItem asChild>
                    <Link
                      href="/profile"
                      className="flex flex-row items-center justify-start py-3 px-4 gap-2 hover:bg-gray-50 cursor-pointer"
                    >
                      <User className="w-4 relative h-4 overflow-hidden shrink-0" />
                      <span className="relative tracking-[-0.03em] leading-6">Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={logout}
                    className="flex flex-row items-center justify-start py-3 px-4 gap-2 hover:bg-gray-50 cursor-pointer"
                  >
                    <LogOut className="w-4 relative max-h-full overflow-hidden shrink-0" />
                    <span className="relative tracking-[-0.03em] leading-6">Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <button 
                  onClick={() => router.push("/search")}
                  aria-label="Search"
                  className="p-1"
                >
                  <svg className="w-6 h-6 text-[#374151]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
                <button 
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  aria-label="Menu"
                  className="p-1"
                >
                  <Menu className="w-6 relative h-6 overflow-hidden shrink-0 text-[#374151]" />
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && !user && (
        <div className="md:hidden fixed inset-0 bg-white z-[60] flex flex-col">
          <div className="w-full border-[#E5E7EB] border-solid border-b-[1px] box-border h-16 flex flex-row items-center justify-between py-0 px-4 text-base font-outfit">
            <Logo mobile />
            <button 
              onClick={() => setIsMenuOpen(false)}
              aria-label="Close menu"
              className="p-1"
            >
              <X className="w-6 relative h-6 overflow-hidden shrink-0 text-[#374151]" />
            </button>
          </div>

          <div className="flex-1 flex flex-col items-center justify-start pt-16 px-4 gap-6">
            <Link
              href="/login"
              className="text-[#1DA1F2] text-lg font-semibold [text-decoration:underline]"
              onClick={() => setIsMenuOpen(false)}
            >
              Login
            </Link>
            <Link
              href="/register"
              className="w-[280px] rounded-[9999px] bg-[#1DA1F2] h-12 flex flex-row items-center justify-center text-white font-semibold hover:bg-[#1991DB] transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Register
            </Link>
          </div>
        </div>
      )}
    </>
  )
}
