"use client"

import { Heart, MessageCircle } from "lucide-react"
import SectionTitle from "@/components/section-title"

interface BlogPost {
  id: string
  title: string
  content: string
  likes: number
  comments: number
  isLiked?: boolean
}

interface MostLikedSectionProps {
  posts: BlogPost[]
  onLike: (postId: string) => void
}

export default function MostLikedSection({ posts, onLike }: MostLikedSectionProps) {
  return (
    <div className="flex-1 w-full relative flex flex-col items-start justify-start gap-5 text-left text-base text-[#374151] font-inter">
      <SectionTitle variant="sidebar">Most Liked</SectionTitle>
      <div className="self-stretch bg-white flex flex-col items-start justify-start gap-4">
        {posts.map((post, index) => (
          <div key={post.id}>
            <div className="flex-1 flex flex-col items-start justify-start gap-4">
              <div className="self-stretch flex flex-col items-start justify-start gap-1">
                <h3 className="self-stretch relative tracking-[-0.03em] leading-[30px] font-bold">{post.title}</h3>
                <p className="self-stretch relative text-sm tracking-[-0.03em] leading-7 [display:-webkit-inline-box] overflow-hidden text-ellipsis [-webkit-line-clamp:2] [-webkit-box-orient:vertical]">
                  {post.content}
                </p>
              </div>
              <div className="flex flex-row items-center justify-start gap-5 text-sm text-[#9CA3AF]">
                <button
                  onClick={() => onLike(post.id)}
                  className="flex flex-row items-center justify-start gap-1.5 hover:text-[#374151] transition-colors"
                  aria-label="Like"
                >
                  {post.isLiked ? (
                    <svg className="w-6 h-6" fill="#1DA1F2" stroke="#1DA1F2" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M1 21h4V9H1v12zM23 10c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 2 7.59 8.59C7.22 8.95 7 9.45 7 10v9c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-1z"/>
                    </svg>
                  ) : (
                    <svg className="w-6 h-6" fill="none" stroke="#6B7280" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M1 21h4V9H1v12zM23 10c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 2 7.59 8.59C7.22 8.95 7 9.45 7 10v9c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-1z"/>
                    </svg>
                  )}
                  <span className={`relative tracking-[-0.03em] leading-7 ${post.isLiked ? 'text-[#1DA1F2]' : ''}`}>{post.likes}</span>
                </button>
                <div className="flex flex-row items-center justify-start gap-1.5">
                  <MessageCircle className="w-5 relative h-5 overflow-hidden shrink-0" />
                  <span className="relative tracking-[-0.03em] leading-7">{post.comments}</span>
                </div>
              </div>
            </div>
            {index < posts.length - 1 && (
              <div className="self-stretch relative border-[#E5E7EB] border-solid border-t-[1px] box-border h-px my-4" />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
