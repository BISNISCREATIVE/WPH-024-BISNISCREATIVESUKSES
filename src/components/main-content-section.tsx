"use client"

import SectionTitle from "@/components/section-title"
import BlogCard from "@/components/blog-card"
import { useEffect, useState, memo } from "react"

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

interface MainContentSectionProps {
  posts: BlogPost[]
  mostLikedPosts: BlogPost[]
  onLike: (postId: string) => void
}

const BlogList = memo(function BlogList({ posts, onLike, variant }: { posts: BlogPost[], onLike: (postId: string) => void, variant: "desktop" | "mobile" }) {
  return (
    <div className="flex flex-col divide-y divide-[#E5E7EB] bg-white rounded-xl">
      {posts.map((post) => (
        <div key={post.id}>
          <BlogCard post={post} onLike={onLike} variant={variant} />
        </div>
      ))}
    </div>
  )
})

export default function MainContentSection({ posts, mostLikedPosts, onLike }: MainContentSectionProps) {
  // Responsive: 5 blog per page desktop, 5 blog per page mobile (tapi mobile tampilkan 5 sekaligus, carousel di bawah)
  const [isMobile, setIsMobile] = useState(false)
  const [currentPage, setCurrentPage] = useState(0)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const blogsPerPage = 5;
  const totalPages = Math.ceil(posts.length / blogsPerPage);
  const pages = Array.from({ length: totalPages }, (_, i) =>
    posts.slice(i * blogsPerPage, (i + 1) * blogsPerPage)
  );

  function renderPagination() {
    // Pagination logic
    const pagesToShow = [];
    if (totalPages <= 5) {
      for (let i = 0; i < totalPages; i++) {
        pagesToShow.push(i);
      }
    } else {
      if (currentPage <= 2) {
        pagesToShow.push(0, 1, 2, -1, totalPages - 1);
      } else if (currentPage >= totalPages - 3) {
        pagesToShow.push(0, -1, totalPages - 3, totalPages - 2, totalPages - 1);
      } else {
        pagesToShow.push(0, -1, currentPage - 1, currentPage, currentPage + 1, -2, totalPages - 1);
      }
    }
    return (
      <div className="flex justify-center items-center gap-2 mt-8 select-none">
        <button
          className="flex items-center justify-center w-auto h-8 rounded-full text-[#374151] disabled:text-gray-300 gap-1 px-2"
          onClick={() => setCurrentPage((p) => Math.max(0, p - 1))}
          disabled={currentPage === 0}
          aria-label="Previous"
        >
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M15 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round"/></svg>
          <span className="text-sm font-medium">Previous</span>
        </button>
        {pagesToShow.map((idx, i) => {
          if (idx === -1 || idx === -2) {
            return (
              <span key={"ellipsis-" + i} className="w-8 h-8 flex items-center justify-center text-xl text-[#374151]">…</span>
            );
          }
          return (
            <button
              key={idx}
              className={`w-8 h-8 flex items-center justify-center rounded-full border-none outline-none transition-colors duration-200 text-base font-semibold ${idx === currentPage ? "bg-[#1DA1F2] text-white" : "bg-gray-200 text-[#374151]"}`}
              aria-label={`Go to page ${idx + 1}`}
              onClick={() => setCurrentPage(idx)}
            >
              {idx + 1}
            </button>
          );
        })}
        <button
          className="flex items-center justify-center w-auto h-8 rounded-full text-[#374151] disabled:text-gray-300 gap-1 px-2"
          onClick={() => setCurrentPage((p) => Math.min(totalPages - 1, p + 1))}
          disabled={currentPage === totalPages - 1}
          aria-label="Next"
        >
          <span className="text-sm font-medium">Next</span>
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center justify-center gap-6 text-left text-sm text-[#E5E7EB] font-inter">
      <div className="w-full flex flex-col md:flex-row md:gap-20 gap-8 items-start justify-start max-w-[1200px] mx-auto px-2 md:px-8">
        {/* Kiri: Recommended For You */}
        <div className="flex-1 min-w-0 w-full max-w-full md:max-w-none px-0 relative overflow-visible">
          <SectionTitle variant="main">Recommend For You</SectionTitle>
          <div className="w-full relative overflow-visible pb-16 max-w-full md:max-w-none">
            {isMobile ? (
              <>
                <BlogList posts={pages[currentPage]} onLike={onLike} variant="mobile" />
                {renderPagination()}
                {/* Most Liked di bawah pada mobile */}
                <section className="block md:hidden mt-10">
                  <SectionTitle variant="sidebar">Most Liked</SectionTitle>
                  <div className="flex flex-col gap-4">
                    {mostLikedPosts.map((post) => (
                      <BlogCard
                        key={post.id}
                        post={post}
                        onLike={onLike}
                        variant="sidebar"
                      />
                    ))}
                  </div>
                </section>
              </>
            ) : (
              <>
                <BlogList posts={pages[currentPage]} onLike={onLike} variant="desktop" />
                {renderPagination()}
              </>
            )}
          </div>
        </div>
        {/* Kanan: Most Liked (hanya desktop) */}
        <aside className="hidden md:block w-[320px] flex-shrink-0 mt-8 md:mt-0 border-l border-[#E5E7EB] pl-8">
          <SectionTitle variant="sidebar">Most Liked</SectionTitle>
          <div className="flex flex-col gap-4">
            {mostLikedPosts.map((post) => (
              <BlogCard
                key={post.id}
                post={post}
                onLike={onLike}
                variant="sidebar"
              />
            ))}
          </div>
        </aside>
      </div>
    </div>
  )
}
