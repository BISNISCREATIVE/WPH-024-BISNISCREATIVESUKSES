"use client"

import Link from "next/link"
import Image from "next/image"
import { Heart, MessageCircle } from "lucide-react"

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

interface BlogCardProps {
  post: BlogPost
  onLike: (postId: string) => void
  variant?: "desktop" | "mobile" | "sidebar"
}

export default function BlogCard({ post, onLike, variant = "desktop" }: BlogCardProps) {
  if (variant === "sidebar") {
    return (
      <div className="flex-1 flex flex-col items-start justify-start gap-4">
        <div className="self-stretch flex flex-col items-start justify-start gap-1">
          <Link href={`/post/${post.id}`}>
            <h3 className="self-stretch relative tracking-[-0.03em] leading-[30px] text-base font-bold text-[#374151] hover:text-[#1DA1F2] transition-colors cursor-pointer">
              {post.title}
            </h3>
          </Link>
          <p className="self-stretch relative text-sm tracking-[-0.03em] leading-7 text-[#374151] [display:-webkit-inline-box] overflow-hidden text-ellipsis [-webkit-line-clamp:2] [-webkit-box-orient:vertical]">
            {post.content}
          </p>
        </div>
        <div className="flex flex-row items-center justify-start gap-5 text-[#6B7280]">
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
            <span className={`relative tracking-[-0.03em] leading-7 text-base ${post.isLiked ? 'text-[#1DA1F2]' : ''}`}>{post.likes}</span>
          </button>
          <button
            onClick={() => window.location.href = `/post/${post.id}#comments`}
            className="flex flex-row items-center justify-start gap-1.5 hover:text-[#374151] transition-colors text-[#6B7280]"
            aria-label="Comment"
          >
            <svg className="w-6 h-6" fill="none" stroke="#6B7280" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M3.5 20l2.5-2H19a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14z" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="relative tracking-[-0.03em] leading-7 text-base">{post.comments}</span>
          </button>
        </div>
      </div>
    )
  }

  if (variant === "mobile") {
    return (
      <div className="bg-white rounded-xl shadow-sm p-4 flex flex-col gap-3 w-full">
        {post.image && (
          <Link href={`/post/${post.id}`}>
            <Image
              className="w-full h-40 object-cover rounded-lg mb-2"
              alt={post.title}
              src={post.image}
              width={400}
              height={160}
            />
          </Link>
        )}
        <Link href={`/post/${post.id}`}>
          <h2 className="text-lg font-bold text-[#23272E] leading-6 mb-1 hover:text-[#1DA1F2] transition-colors cursor-pointer">
            {post.title}
          </h2>
        </Link>
        <div className="flex flex-row flex-wrap gap-2 mb-1">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-lg border border-[#E5E7EB] bg-white px-2 py-1 text-xs text-[#374151]"
            >
              {tag}
            </span>
          ))}
        </div>
        <p className="text-xs text-[#6B7280] leading-5 line-clamp-2 mb-2">
          {post.content}
        </p>
        <div className="flex items-center gap-2 mb-2">
          <Image className="w-7 h-7 rounded-full object-cover" alt={post.author.name} src={post.author.avatar || "/image-6.png"} width={28} height={28} />
          <span className="text-xs font-medium text-[#374151]">{post.author.name}</span>
          <span className="w-1 h-1 bg-[#6B7280] rounded-full mx-2" />
          <span className="text-xs text-[#9CA3AF]">{new Date(post.createdAt).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}</span>
        </div>
        <div className="flex flex-row items-center gap-6 pt-1">
          <button
            onClick={() => onLike(post.id)}
            className="flex items-center gap-1.5 hover:text-[#374151] transition-colors"
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
            <span className={`relative tracking-[-0.03em] leading-7 text-base ${post.isLiked ? 'text-[#1DA1F2]' : ''}`}>{post.likes}</span>
          </button>
          <button
            onClick={() => window.location.href = `/post/${post.id}#comments`}
            className="flex items-center gap-1.5 hover:text-[#374151] transition-colors text-[#6B7280]"
            aria-label="Comment"
          >
            <svg className="w-6 h-6" fill="none" stroke="#6B7280" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M3.5 20l2.5-2H19a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14z" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="text-sm">{post.comments}</span>
          </button>
        </div>
      </div>
    )
  }

  // Desktop variant
  return (
    <div className="self-stretch bg-white flex flex-row items-center justify-start gap-6">
      <Link href={`/post/${post.id}`}>
        <Image
          className="w-[340px] relative rounded-md h-[258px] object-cover hover:opacity-90 transition-opacity cursor-pointer"
          alt="Blog post image"
          src="/image-5.png"
          width={340}
          height={258}
        />
      </Link>
      <div className="flex-1 flex flex-col items-start justify-start gap-4">
        <div className="self-stretch flex flex-col items-start justify-start gap-3 text-xl">
          <Link href={`/post/${post.id}`}>
            <h2 className="self-stretch relative tracking-[-0.03em] leading-[34px] font-bold text-[#374151] hover:text-[#1DA1F2] transition-colors cursor-pointer">
              {post.title}
            </h2>
          </Link>
          <div className="flex flex-row items-start justify-start gap-2 text-xs">
            {post.tags.map((tag) => (
              <div
                key={tag}
                className="rounded-lg bg-white border-[#E5E7EB] border-solid border-[1px] box-border h-7 flex flex-row items-center justify-center p-2"
              >
                <span className="relative tracking-[-0.03em] leading-6 text-[#374151]">{tag}</span>
              </div>
            ))}
          </div>
          <p className="self-stretch relative text-sm tracking-[-0.03em] leading-7 text-[#374151] [display:-webkit-inline-box] overflow-hidden text-ellipsis [-webkit-line-clamp:2] [-webkit-box-orient:vertical]">
            {post.content}
          </p>
        </div>
        <div className="self-stretch flex flex-row items-center justify-start gap-3">
          <div className="flex flex-row items-center justify-start gap-2">
            <Image className="w-10 relative rounded-[50%] max-h-full object-cover" alt="Author avatar" src="/image-6.png" width={40} height={40} />
            <span className="relative tracking-[-0.03em] leading-7 font-medium text-sm text-[#374151]">
              {post.author.name}
            </span>
          </div>
          <div className="w-1 relative rounded-[50%] bg-[#6B7280] h-1" />
          <span className="relative tracking-[-0.03em] leading-7 text-[#9CA3AF] text-sm">27 May 2025</span>
        </div>
        <div className="flex flex-row items-center justify-start gap-5 text-[#6B7280]">
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
            <span className={`relative tracking-[-0.03em] leading-7 text-base ${post.isLiked ? 'text-[#1DA1F2]' : ''}`}>{post.likes}</span>
          </button>
          <button
            onClick={() => window.location.href = `/post/${post.id}#comments`}
            className="flex flex-row items-center justify-start gap-1.5 hover:text-[#374151] transition-colors text-[#6B7280]"
            aria-label="Comment"
          >
            <svg className="w-6 h-6" fill="none" stroke="#6B7280" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M3.5 20l2.5-2H19a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14z" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="relative tracking-[-0.03em] leading-7 text-base">{post.comments}</span>
          </button>
        </div>
      </div>
    </div>
  )
}
