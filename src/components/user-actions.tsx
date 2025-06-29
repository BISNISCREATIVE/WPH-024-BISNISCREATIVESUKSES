"use client"

import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { User, LogOut, Edit } from "lucide-react"
import { useRouter } from "next/navigation"

export default function UserActions() {
  const { user, logout } = useAuth()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  if (user) {
    return (
      <div className="flex flex-row items-center justify-start gap-6">
        <Link href="/write" className="flex flex-row items-center justify-start gap-2 text-[#1DA1F2]">
          <Edit className="w-6 relative h-6 overflow-hidden shrink-0" />
          <div className="relative [text-decoration:underline] tracking-[-0.03em] leading-7 font-semibold">
            Write Post
          </div>
        </Link>
        <div className="w-px relative border-[#E5E7EB] border-solid border-r-[1px] box-border h-6" />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex flex-row items-center justify-start gap-3 text-[#374151]">
              <img className="w-10 relative rounded-[50%] max-h-full object-cover" alt="" src="/image-6.png" />
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
              onClick={handleLogout}
              className="flex flex-row items-center justify-start py-3 px-4 gap-2 hover:bg-gray-50 cursor-pointer"
            >
              <LogOut className="w-5 relative max-h-full overflow-hidden shrink-0" />
              <span className="relative tracking-[-0.03em] leading-7">Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    )
  }

  return (
    <div className="flex flex-row items-center justify-start gap-6">
      <Link href="/login" className="flex flex-row items-center justify-start">
        <div className="relative [text-decoration:underline] tracking-[-0.03em] leading-7 font-semibold text-[#1DA1F2]">
          Login
        </div>
      </Link>
      <div className="w-px relative border-[#E5E7EB] border-solid border-r-[1px] box-border h-6" />
      <Link
        href="/register"
        className="rounded-[9999px] bg-[#1DA1F2] h-11 flex flex-row items-center justify-center px-6 box-border text-white hover:bg-[#1991DB] transition-colors"
      >
        <div className="relative tracking-[-0.03em] leading-7 font-semibold">Register</div>
      </Link>
    </div>
  )
}
