"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Search } from "lucide-react"

interface SearchBarProps {
  className?: string
  mobile?: boolean
}

export default function SearchBar({ className = "", mobile = false }: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [suggestions] = useState([
    "Most Liked",
    "React",
    "TypeScript", 
    "CSS",
    "AI",
    "Accessibility",
    "Frontend Development",
    "Web Development"
  ])
  const router = useRouter()
  const searchRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      setShowSuggestions(false)
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion)
    setShowSuggestions(false)
    router.push(`/search?q=${encodeURIComponent(suggestion)}`)
  }

  const filteredSuggestions = suggestions.filter(suggestion =>
    suggestion.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div ref={searchRef} className="relative">
      <form
        onSubmit={handleSearch}
        className={`rounded-xl bg-white border-[#E5E7EB] border-solid border-[1px] box-border h-12 flex flex-row items-center justify-start py-3 px-4 gap-2 text-sm text-[#64748B] font-inter ${className}`}
      >
        <Search className="w-6 relative h-6 overflow-hidden shrink-0 text-[#64748B]" />
        <input
          type="text"
          placeholder="Search (try 'Most Liked')"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value)
            setShowSuggestions(true)
          }}
          onFocus={() => setShowSuggestions(true)}
          className="relative tracking-[-0.03em] leading-7 bg-transparent border-none outline-none flex-1 text-[#64748B] placeholder:text-[#64748B]"
        />
      </form>
      
      {/* Search Suggestions */}
      {showSuggestions && searchQuery && filteredSuggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#E5E7EB] rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
          {filteredSuggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors text-sm text-[#374151] border-b border-[#E5E7EB] last:border-b-0"
            >
              <div className="flex items-center gap-2">
                <Search className="w-4 h-4 text-[#64748B]" />
                <span>{suggestion}</span>
                {suggestion === "Most Liked" && (
                  <span className="ml-auto text-xs bg-[#1DA1F2] text-white px-2 py-1 rounded-full">
                    Popular
                  </span>
                )}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
