"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { SearchHeaderDesktop, SearchHeaderMobile } from "@/components/search-header"
import { Search } from "lucide-react"
import Link from "next/link"
import Header from "@/components/header"

interface BlogPost {
  id: string
  title: string
  content: string
  image?: string
  author: {
    id: string
    name: string
    avatar?: string
  }
  tags: string[]
  likes: number
  comments: number
  createdAt: string
  isLiked?: boolean
}

export default function SearchPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const query = searchParams.get("q") || ""
  const [searchQuery, setSearchQuery] = useState(query)
  const [results, setResults] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(false)
  const [hasSearched, setHasSearched] = useState(!!query)

  useEffect(() => {
    if (query) {
      setSearchQuery(query)
      searchPosts(query)
      setHasSearched(true)
    }
  }, [query])

  // Add this useEffect for mobile live search
  useEffect(() => {
    if (window.innerWidth < 768 && searchQuery.trim()) {
      searchPosts(searchQuery)
      setHasSearched(true)
    }
     
  }, [searchQuery])

  // Live search for mobile
  useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 768 && searchQuery.trim()) {
      searchPosts(searchQuery)
      setHasSearched(true)
    }
     
  }, [searchQuery])

  const searchPosts = async (searchQuery: string) => {
    try {
      setLoading(true)
      // Ambil seluruh mockPosts (seperti di page.tsx)
      const mockPosts: BlogPost[] = Array.from({ length: 50 }, (_, i) => ({
        id: `post-${i + 1}`,
        title: `5 Reasons to Learn Frontend Development in 2025 Blog Post ${i + 1}`,
        content:
          "Frontend development is more than just building beautiful user interfaces — it's about crafting user experiences that are fast, accessible, and intuitive. As we move into 2025, the demand for skilled frontend developers continues to rise.",
        image: "/image-5.png",
        author: {
          id: "author-1",
          name: "John Doe",
          avatar: "/image-6.png",
        },
        tags: ["Programming", "Frontend", "Coding"],
        likes: 20,
        comments: 20,
        createdAt: "2025-05-27T00:00:00Z",
        isLiked: false,
      }))

      // Most liked posts data
      const mostLikedPosts: BlogPost[] = [
        {
          id: "liked-1",
          title: "The Future of Web Development: AI-Powered Tools in 2025",
          content:
            "Artificial Intelligence is revolutionizing web development. From automated code generation to intelligent debugging, AI tools are becoming essential for modern developers. Learn how to leverage these technologies to build better applications faster.",
          author: {
            id: "author-1",
            name: "Sarah Johnson",
            avatar: "/image-6.png",
          },
          tags: ["AI", "Web Development", "Technology"],
          likes: 156,
          comments: 23,
          createdAt: "2025-05-25T00:00:00Z",
          isLiked: false,
        },
        {
          id: "liked-2",
          title: "Mastering React Performance: Optimization Techniques That Work",
          content:
            "Performance optimization in React applications is crucial for user experience. Discover proven techniques for reducing bundle size, implementing code splitting, and optimizing rendering performance.",
          author: {
            id: "author-2",
            name: "Mike Chen",
            avatar: "/image-6.png",
          },
          tags: ["React", "Performance", "Frontend"],
          likes: 142,
          comments: 18,
          createdAt: "2025-05-24T00:00:00Z",
          isLiked: false,
        },
        {
          id: "liked-3",
          title: "TypeScript Best Practices for Large-Scale Applications",
          content:
            "TypeScript has become the standard for building maintainable JavaScript applications. Explore advanced patterns, type safety techniques, and architectural decisions that scale with your project.",
          author: {
            id: "author-3",
            name: "Emily Rodriguez",
            avatar: "/image-6.png",
          },
          tags: ["TypeScript", "Best Practices", "Architecture"],
          likes: 128,
          comments: 31,
          createdAt: "2025-05-23T00:00:00Z",
          isLiked: false,
        },
        {
          id: "liked-4",
          title: "CSS Grid vs Flexbox: When to Use Each Layout System",
          content:
            "Understanding when to use CSS Grid versus Flexbox can significantly improve your layout efficiency. This comprehensive guide covers real-world scenarios and practical examples for both systems.",
          author: {
            id: "author-4",
            name: "David Kim",
            avatar: "/image-6.png",
          },
          tags: ["CSS", "Layout", "Design"],
          likes: 115,
          comments: 27,
          createdAt: "2025-05-22T00:00:00Z",
          isLiked: false,
        },
        {
          id: "liked-5",
          title: "Building Accessible Web Applications: A Complete Guide",
          content:
            "Web accessibility is not just a legal requirement—it's a moral imperative. Learn how to build applications that work for everyone, including users with disabilities, and improve your overall user experience.",
          author: {
            id: "author-5",
            name: "Lisa Thompson",
            avatar: "/image-6.png",
          },
          tags: ["Accessibility", "UX", "Inclusive Design"],
          likes: 98,
          comments: 15,
          createdAt: "2025-05-21T00:00:00Z",
          isLiked: false,
        }
      ]

      // Combine all posts
      const allPosts = [...mockPosts, ...mostLikedPosts]
      let filtered: BlogPost[] = []

      // Special handling for "Most Liked" queries
      if (searchQuery.toLowerCase().includes("most liked") || searchQuery.toLowerCase().includes("mostliked")) {
        filtered = mostLikedPosts
      } else {
        // Cek jika query berupa rentang angka, contoh: '1...10' atau '1-10'
        const numberRangeMatch = searchQuery.match(/^(\d+)\.\.\.(\d+)$/) || searchQuery.match(/^(\d+)-(\d+)$/)
        if (numberRangeMatch) {
          const startNum = parseInt(numberRangeMatch[1], 10)
          const endNum = parseInt(numberRangeMatch[2], 10)
          filtered = allPosts.filter(post => {
            // Ambil nomor urut dari judul
            const match = post.title.match(/Blog Post (\d+)$/)
            if (!match) return false
            const num = parseInt(match[1], 10)
            return num >= startNum && num <= endNum
          })
        } else {
          // Cek jika query berupa rentang huruf, contoh: 'a-d'
          const rangeMatch = searchQuery.match(/^([a-z])-([a-z])$/i)
          if (rangeMatch) {
            const start = rangeMatch[1].toLowerCase().charCodeAt(0)
            const end = rangeMatch[2].toLowerCase().charCodeAt(0)
            filtered = allPosts.filter(post => {
              const first = post.title.trim().charAt(0).toLowerCase().charCodeAt(0)
              return first >= start && first <= end
            })
          } else {
            // Pencarian biasa (judul mengandung query)
            filtered = allPosts.filter(post => 
              post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
              post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
              post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
              post.author.name.toLowerCase().includes(searchQuery.toLowerCase())
            )
          }
        }
      }
      
      setResults(filtered)
    } catch (error) {
      console.error("Search error:", error)
      setResults([])
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      setHasSearched(true)
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  const handleLike = async (postId: string) => {
    setResults(
      results.map((post) =>
        post.id === postId
          ? { ...post, isLiked: !post.isLiked, likes: post.isLiked ? post.likes - 1 : post.likes + 1 }
          : post,
      ),
    )
  }

  // Desktop Layout
  const DesktopLayout = () => (
    <div className="hidden md:block w-full relative bg-white min-h-screen text-left text-sm text-dimgray font-inter">
      <Header />

      {/* Footer */}
      <div className="fixed bottom-0 left-[calc(50%_-_720px)] bg-white border-[#E5E7EB] border-solid border-t-[1px] box-border w-[1440px] h-20 flex flex-col items-center justify-center p-2">
        <div className="relative tracking-[-0.03em] leading-7">
          © 2025 Web Programming Hack Blog All rights reserved.
        </div>
      </div>

      {!hasSearched ? (
        // Initial state - empty search
        <div className="pt-32 pb-32 min-h-[calc(100vh-160px)]">{/* Content will be added if needed */}</div>
      ) : results.length > 0 ? (
        // Found results
        <div className="absolute top-[128px] left-[120px] w-[807px] flex flex-col items-start justify-start gap-6 text-[28px] text-[#374151]">
          <b className="self-stretch relative tracking-[-0.03em] leading-[38px] whitespace-pre-wrap">
            {`Result for  "${query}"`}
          </b>
          <ul className="flex flex-col gap-4 mt-4 w-full">
            {results.map(post => (
              <li key={post.id}>
                <Link href={`/post/${post.id}`} className="text-[#1DA1F2] hover:underline text-base font-semibold">{post.title}</Link>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        // No results found
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-160px)] gap-6 text-center">
          <img className="w-[118.1px] relative h-[135px] object-contain" alt="" src="/fd12acbc29.png" />
          <div className="flex flex-col items-center justify-start gap-1">
            <div className="relative tracking-[-0.03em] leading-7 font-semibold text-[#374151]">No results found</div>
            <div className="relative tracking-[-0.03em] leading-7 text-[#6B7280]">Try using different keywords</div>
          </div>
          <Link
            href="/"
            className="w-[200px] rounded-[9999px] bg-[#1DA1F2] h-11 flex flex-row items-center justify-center p-2 box-border text-white font-semibold hover:bg-[#1991DB] transition-colors"
          >
            Back to Home
          </Link>
        </div>
      )}
    </div>
  )

  // Mobile Layout
  const MobileLayout = () => (
    <div className="md:hidden w-full relative bg-white h-[852px] text-left text-base text-gray font-inter">
      <Header />

      {/* Search Bar */}
      <div className="absolute top-[80px] left-[16px] w-[361px] flex flex-col items-start justify-start gap-4 text-sm">
        <form
          onSubmit={handleSearch}
          className="self-stretch rounded-xl border-[#E5E7EB] border-solid border-[1px] box-border h-12 flex flex-row items-center justify-start py-3 px-4 gap-2"
        >
          <Search className="w-6 relative h-6 overflow-hidden shrink-0 text-[#64748B]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search"
            className="relative tracking-[-0.03em] leading-7 bg-transparent border-none outline-none flex-1 text-[#64748B] placeholder:text-[#64748B]"
          />
        </form>

        {hasSearched && results.length > 0 && (
          <div className="pt-24 px-4">
            <b className="block mb-4 text-lg text-[#374151]">{`Result for "${query}"`}</b>
            <ul className="flex flex-col gap-4 mt-4 w-full">
              {results.map(post => (
                <li key={post.id}>
                  <Link href={`/post/${post.id}`} className="text-[#1DA1F2] hover:underline text-base font-semibold">{post.title}</Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* No Results Found - Mobile */}
      {hasSearched && results.length === 0 && (
        <div className="absolute top-[261px] left-[calc(50%_-_180.5px)] w-[372px] flex flex-col items-center justify-start gap-6 text-center">
          <img className="w-[118.1px] relative h-[135px] object-contain" alt="" src="/fd12acbc29.png" />
          <div className="self-stretch flex flex-col items-center justify-start gap-1">
            <div className="self-stretch relative tracking-[-0.03em] leading-7 font-semibold text-[#374151]">
              No results found
            </div>
            <div className="self-stretch relative tracking-[-0.03em] leading-7 text-[#6B7280]">
              Try using different keywords
            </div>
          </div>
          <Link
            href="/"
            className="w-[200px] rounded-[9999px] bg-[#1DA1F2] h-11 flex flex-row items-center justify-center p-2 box-border text-white font-semibold hover:bg-[#1991DB] transition-colors"
          >
            Back to Home
          </Link>
        </div>
      )}

      {/* Footer */}
      <div className="absolute top-[792px] left-[calc(50%_-_196.5px)] bg-white border-[#E5E7EB] border-solid border-t-[1px] box-border w-[393px] h-[60px] flex flex-col items-center justify-center p-2 text-xs text-[#6B7280]">
        <div className="relative tracking-[-0.03em] leading-6">
          © 2025 Web Programming Hack Blog All rights reserved.
        </div>
      </div>
    </div>
  )

  return (
    <>
      <DesktopLayout />
      <MobileLayout />
    </>
  )
}
