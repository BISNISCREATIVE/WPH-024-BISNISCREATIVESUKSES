"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Heart, MessageCircle } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { CommentsModal } from "@/components/comments-modal"
import Header from "@/components/header"

interface Comment {
  id: string
  author: {
    name: string
    avatar?: string
  }
  content: string
  date: string
}

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
  comments: Comment[]
  createdAt: string
  isLiked?: boolean
}

export default function PostDetailPage() {
  const params = useParams()
  const [post, setPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)
  const [newComment, setNewComment] = useState("")
  const [showCommentsModal, setShowCommentsModal] = useState(false)
  const [anotherLiked, setAnotherLiked] = useState(false)
  const [anotherLikes, setAnotherLikes] = useState(20)

  useEffect(() => {
    fetchPost()
  }, [params.id])

  const fetchPost = async () => {
    try {
      setLoading(true)
      // Mock posts data (50 data, judul sesuai urutan)
      const mockPosts: BlogPost[] = Array.from({ length: 50 }, (_, i) => ({
        id: `post-${i + 1}`,
        title: `5 Reasons to Learn Frontend Development in 2025 Blog Post ${i + 1}`,
        content: `Frontend development is more than just building beautiful user interfaces — it's about crafting user experiences that are fast, accessible, and intuitive. As we move into 2025, the demand for skilled frontend developers continues to rise.\n\nHere are 5 reasons why you should start learning frontend development today:`,
        image: "/image-5.png",
        author: {
          id: "author-1",
          name: "John Doe",
          avatar: "/image-6.png",
        },
        tags: ["Programming", "Frontend", "Coding"],
        likes: 20,
        comments: [],
        createdAt: "2025-05-27T00:00:00Z",
        isLiked: false,
      }))

      // Most liked posts data
      const mostLikedPosts: BlogPost[] = [
        {
          id: "liked-1",
          title: "The Future of Web Development: AI-Powered Tools in 2025",
          content: `Artificial Intelligence is revolutionizing web development. From automated code generation to intelligent debugging, AI tools are becoming essential for modern developers. Learn how to leverage these technologies to build better applications faster.\n\nHere are the key areas where AI is transforming web development:`,
          image: "/image-5.png",
          author: {
            id: "author-1",
            name: "Sarah Johnson",
            avatar: "/image-6.png",
          },
          tags: ["AI", "Web Development", "Technology"],
          likes: 156,
          comments: [],
          createdAt: "2025-05-25T00:00:00Z",
          isLiked: false,
        },
        {
          id: "liked-2",
          title: "Mastering React Performance: Optimization Techniques That Work",
          content: `Performance optimization in React applications is crucial for user experience. Discover proven techniques for reducing bundle size, implementing code splitting, and optimizing rendering performance.\n\nHere are the most effective React performance optimization strategies:`,
          image: "/image-5.png",
          author: {
            id: "author-2",
            name: "Mike Chen",
            avatar: "/image-6.png",
          },
          tags: ["React", "Performance", "Frontend"],
          likes: 142,
          comments: [],
          createdAt: "2025-05-24T00:00:00Z",
          isLiked: false,
        },
        {
          id: "liked-3",
          title: "TypeScript Best Practices for Large-Scale Applications",
          content: `TypeScript has become the standard for building maintainable JavaScript applications. Explore advanced patterns, type safety techniques, and architectural decisions that scale with your project.\n\nHere are the essential TypeScript best practices for large applications:`,
          image: "/image-5.png",
          author: {
            id: "author-3",
            name: "Emily Rodriguez",
            avatar: "/image-6.png",
          },
          tags: ["TypeScript", "Best Practices", "Architecture"],
          likes: 128,
          comments: [],
          createdAt: "2025-05-23T00:00:00Z",
          isLiked: false,
        },
        {
          id: "liked-4",
          title: "CSS Grid vs Flexbox: When to Use Each Layout System",
          content: `Understanding when to use CSS Grid versus Flexbox can significantly improve your layout efficiency. This comprehensive guide covers real-world scenarios and practical examples for both systems.\n\nHere's a detailed comparison of CSS Grid and Flexbox:`,
          image: "/image-5.png",
          author: {
            id: "author-4",
            name: "David Kim",
            avatar: "/image-6.png",
          },
          tags: ["CSS", "Layout", "Design"],
          likes: 115,
          comments: [],
          createdAt: "2025-05-22T00:00:00Z",
          isLiked: false,
        },
        {
          id: "liked-5",
          title: "Building Accessible Web Applications: A Complete Guide",
          content: `Web accessibility is not just a legal requirement—it's a moral imperative. Learn how to build applications that work for everyone, including users with disabilities, and improve your overall user experience.\n\nHere's how to build truly accessible web applications:`,
          image: "/image-5.png",
          author: {
            id: "author-5",
            name: "Lisa Thompson",
            avatar: "/image-6.png",
          },
          tags: ["Accessibility", "UX", "Inclusive Design"],
          likes: 98,
          comments: [],
          createdAt: "2025-05-21T00:00:00Z",
          isLiked: false,
        }
      ]

      // Combine regular posts and most liked posts
      const allPosts = [...mockPosts, ...mostLikedPosts]
      
      // Cari post sesuai id
      const found = allPosts.find(post => post.id === params.id)
      setPost(found || null)
    } catch (error) {
      console.error("Error fetching post:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleLike = () => {
    if (!post) return
    setPost({
      ...post,
      isLiked: !post.isLiked,
      likes: post.isLiked ? post.likes - 1 : post.likes + 1,
    })
  }

  const handleComment = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newComment.trim() || !post) return

    const comment: Comment = {
      id: `comment-${Date.now()}`,
      author: { name: "John Doe", avatar: "/image-6.png" },
      content: newComment.trim(),
      date: new Date().toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
    }

    setPost({
      ...post,
      comments: [...post.comments, comment],
    })
    setNewComment("")
  }

  const handleAddComment = (content: string) => {
    if (!post) return

    const comment: Comment = {
      id: `comment-${Date.now()}`,
      author: { name: "John Doe", avatar: "/image-6.png" },
      content,
      date: new Date().toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
    }

    setPost({
      ...post,
      comments: [...post.comments, comment],
    })
  }

  const handleAnotherLike = () => {
    setAnotherLiked((prev) => !prev)
    setAnotherLikes((prev) => (anotherLiked ? prev - 1 : prev + 1))
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <main className="max-w-[800px] mx-auto px-4 md:px-0 py-8">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-3/4"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
            <div className="space-y-3">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>
          </div>
        </main>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <main className="max-w-[800px] mx-auto px-4 md:px-0 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Post not found</h1>
            <p className="text-gray-600">The post you're looking for doesn't exist.</p>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="w-full">
        {/* Desktop Layout */}
        <div className="hidden md:block">
          <div className="max-w-[800px] mx-auto px-0 py-8">
            <article className="flex flex-col gap-4 text-gray-900">
              {/* Title and Tags */}
              <div className="flex flex-col gap-4">
                <h1 className="text-4xl font-bold tracking-[-0.02em] leading-[44px] text-[#374151]">{post.title}</h1>
                <div className="flex gap-2">
                  {post.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="h-7 px-2 text-xs tracking-[-0.03em] leading-6 border-lightgray"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Author Info */}
              <div className="flex items-center gap-3">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={post.author.avatar || "/placeholder.svg"} />
                  <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <span className="font-medium tracking-[-0.03em] leading-7">{post.author.name}</span>
                <div className="w-1 h-1 rounded-full bg-darkgray" />
                <span className="font-medium tracking-[-0.03em] leading-7 text-dimgray">27 May 2025</span>
              </div>

              <div className="border-t border-lightgray" />

              {/* Engagement Stats */}
              <div className="flex items-center gap-5 text-[#6B7280]">
                <button
                  onClick={handleLike}
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
                  <span className={`tracking-[-0.03em] leading-7 text-base ${post.isLiked ? 'text-[#1DA1F2]' : ''}`}>{post.likes}</span>
                </button>
                <div className="flex items-center gap-1.5">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                  <span className="tracking-[-0.03em] leading-7 text-base">{post.comments.length}</span>
                </div>
              </div>

              <div className="border-t border-lightgray" />

              {/* Featured Image */}
              <img src={post.image || "/placeholder.svg"} alt={post.title} className="w-full rounded-md object-cover" />

              {/* Content */}
              <div className="flex flex-col gap-5 text-xl text-[#374151]">
                <div className="text-base tracking-[-0.03em] leading-[30px]">
                  <p className="mb-4">
                    Frontend development is more than just building beautiful user interfaces — it's about crafting user
                    experiences that are fast, accessible, and intuitive. As we move into 2025, the demand for skilled
                    frontend developers continues to rise.
                  </p>
                  <p>Here are 5 reasons why you should start learning frontend development today:</p>
                </div>

                <div className="flex flex-col gap-3">
                  <h2 className="text-xl font-bold tracking-[-0.03em] leading-[34px]">1. High Industry Demand</h2>
                  <p className="text-base tracking-[-0.03em] leading-[30px]">
                    Tech companies, startups, and even traditional businesses are constantly looking for frontend
                    developers to help them deliver high-quality digital experiences.
                  </p>
                </div>

                <div className="flex flex-col gap-3">
                  <h2 className="text-xl font-bold tracking-[-0.03em] leading-[34px]">
                    2. Powerful and Beginner-Friendly Tools
                  </h2>
                  <p className="text-base tracking-[-0.03em] leading-[30px]">
                    Modern frameworks like React, Vue, and Svelte make it easier than ever to build interactive UIs.
                    Their growing ecosystems and active communities mean you'll find support at every step.
                  </p>
                </div>

                <div className="flex flex-col gap-3">
                  <h2 className="text-xl font-bold tracking-[-0.03em] leading-[34px]">3. Creative Freedom</h2>
                  <p className="text-base tracking-[-0.03em] leading-[30px]">
                    Frontend development allows you to bring your design ideas to life. From animations to responsive
                    layouts, your creativity directly impacts how users engage with a product.
                  </p>
                </div>

                <div className="flex flex-col gap-3">
                  <h2 className="text-xl font-bold tracking-[-0.03em] leading-[34px]">4. Rapid Career Growth</h2>
                  <p className="text-base tracking-[-0.03em] leading-[30px]">
                    With roles like UI Developer, React Developer, and Frontend Engineer, you'll find plenty of
                    opportunities with competitive salaries and growth potential.
                  </p>
                </div>

                <div className="flex flex-col gap-3">
                  <h2 className="text-xl font-bold tracking-[-0.03em] leading-[34px]">
                    5. Essential for Fullstack Development
                  </h2>
                  <p className="text-base tracking-[-0.03em] leading-[30px]">
                    Understanding frontend is crucial if you want to become a fullstack developer. It complements your
                    backend knowledge and enables you to build complete applications.
                  </p>
                </div>

                <div className="flex flex-col gap-3">
                  <h2 className="text-xl font-bold tracking-[-0.03em] leading-[34px]">Conclusion:</h2>
                  <p className="text-base tracking-[-0.03em] leading-[30px]">
                    If you're interested in building things that users interact with daily, frontend development is the
                    path to take. Whether you're a designer learning to code or a backend developer exploring the
                    frontend, 2025 is the perfect year to start.
                  </p>
                </div>
              </div>

              <div className="border-t border-lightgray" />

              {/* Comments Section */}
              <div className="flex flex-col gap-3">
                <h2 className="text-2xl font-bold tracking-[-0.03em] leading-9">Comments({post.comments.length})</h2>

                <div className="flex items-center gap-3">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src="/image-6.png" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <span className="font-semibold tracking-[-0.03em] leading-7">{post.author.name}</span>
                </div>

                <form onSubmit={handleComment} className="flex flex-col gap-1">
                  <label className="font-semibold tracking-[-0.03em] leading-7 text-[#374151]">Give your Comments</label>
                  <Textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Enter your comment"
                    className="min-h-[140px] rounded-xl border-lightgray text-slategray"
                  />
                </form>

                <div className="flex justify-end">
                  <Button
                    onClick={handleComment}
                    className="w-[204px] h-12 rounded-full bg-steelblue hover:bg-steelblue/90 text-white font-semibold"
                  >
                    Send
                  </Button>
                </div>
              </div>

              <div className="border-t border-lightgray" />

              {/* Comments List */}
              <div className="flex flex-col gap-3">
                {post.comments.slice(0, 3).map((comment, index) => (
                  <div key={comment.id}>
                    <div className="bg-white flex flex-col gap-2">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={comment.author.avatar || "/placeholder.svg"} />
                          <AvatarFallback>{comment.author.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <span className="font-semibold tracking-[-0.03em] leading-7 text-[#374151]">{comment.author.name}</span>
                          <span className="tracking-[-0.03em] leading-7 text-[#9CA3AF] -mt-1">{comment.date}</span>
                        </div>
                      </div>
                      <p className="tracking-[-0.03em] leading-7 text-[#374151]">{comment.content}</p>
                    </div>
                    {index < 2 && <div className="border-t border-lightgray" />}
                  </div>
                ))}
              </div>

              <button
                onClick={() => setShowCommentsModal(true)}
                className="text-[#1DA1F2] underline font-semibold text-base tracking-[-0.03em] leading-7 text-left"
              >
                See All Comments
              </button>

              <div className="border-t border-lightgray" />

              {/* Another Post Section */}
              <div className="flex flex-col gap-4">
                <h2 className="text-2xl font-bold tracking-[-0.03em] leading-9">Another Post</h2>
                <div className="bg-white flex gap-6">
                  <img src="/image-5.png" alt="Another post" className="w-[340px] h-[258px] rounded-md object-cover" />
                  <div className="flex-1 flex flex-col gap-4">
                    <div className="flex flex-col gap-3">
                      <h3 className="text-xl font-bold tracking-[-0.03em] leading-[34px]">
                        5 Reasons to Learn Frontend Development in 2025
                      </h3>
                      <div className="flex gap-2">
                        {["Programming", "Frontend", "Coding"].map((tag) => (
                          <Badge key={tag} variant="outline" className="h-7 px-2 text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <p className="text-sm tracking-[-0.03em] leading-7 line-clamp-2">
                        Frontend development is more than just building beautiful user interfaces — it's about crafting
                        user experiences that are fast, accessible, and intuitive. As we move into 2025, the demand for
                        skilled frontend developers continues to rise.
                      </p>
                    </div>
                    <div className="flex items-center gap-5 text-[#6B7280]">
                      <button
                        className="flex items-center gap-1.5 hover:text-[#374151] transition-colors"
                        aria-label="Like"
                        onClick={handleAnotherLike}
                      >
                        {anotherLiked ? (
                          <svg className="w-6 h-6" fill="#1DA1F2" stroke="#1DA1F2" strokeWidth="2" viewBox="0 0 24 24">
                            <path d="M1 21h4V9H1v12zM23 10c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 2 7.59 8.59C7.22 8.95 7 9.45 7 10v9c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-1z"/>
                          </svg>
                        ) : (
                          <svg className="w-6 h-6" fill="none" stroke="#6B7280" strokeWidth="2" viewBox="0 0 24 24">
                            <path d="M1 21h4V9H1v12zM23 10c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 2 7.59 8.59C7.22 8.95 7 9.45 7 10v9c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-1z"/>
                          </svg>
                        )}
                        <span className={`tracking-[-0.03em] leading-7 text-base ${anotherLiked ? 'text-[#1DA1F2]' : ''}`}>{anotherLikes}</span>
                      </button>
                      <div className="flex items-center gap-1.5">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                        </svg>
                        <span className="tracking-[-0.03em] leading-7 text-base">20</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="block md:hidden">
          <div className="bg-white w-full flex flex-col p-4 gap-3 text-gray-900">
            {/* Title and Tags */}
            <div className="flex flex-col gap-3">
              <h1 className="text-[28px] font-bold tracking-[-0.03em] leading-[38px]">{post.title}</h1>
              <div className="flex gap-2">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="h-7 px-2 text-xs border-lightgray">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Author Info */}
            <div className="flex items-center gap-2">
              <Avatar className="w-10 h-10">
                <AvatarImage src={post.author.avatar || "/placeholder.svg"} />
                <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <span className="font-medium leading-6">{post.author.name}</span>
              <div className="w-1 h-1 rounded-full bg-darkgray" />
              <span className="tracking-[-0.03em] leading-6 text-dimgray">27 May 2025</span>
            </div>

            <div className="border-t border-lightgray" />

            {/* Engagement Stats */}
            <div className="flex items-center gap-3 text-dimgray">
              <button
                onClick={handleLike}
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
                <span className={`tracking-[-0.03em] leading-7 text-base ${post.isLiked ? 'text-[#1DA1F2]' : ''}`}>{post.likes}</span>
              </button>
              <div className="flex items-center gap-1.5">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
                <span className="tracking-[-0.03em] leading-7 text-base">{post.comments.length}</span>
              </div>
            </div>

            <div className="border-t border-lightgray" />

            {/* Featured Image */}
            <img
              src={post.image || "/placeholder.svg"}
              alt={post.title}
              className="w-[359px] h-[203px] rounded-md object-cover"
            />

            {/* Content */}
            <div className="flex flex-col gap-3 text-base text-gray-900">
              <div className="text-sm tracking-[-0.03em] leading-7">
                <p className="mb-3">
                  Frontend development is more than just building beautiful user interfaces — it's about crafting user
                  experiences that are fast, accessible, and intuitive. As we move into 2025, the demand for skilled
                  frontend developers continues to rise.
                </p>
                <p>Here are 5 reasons why you should start learning frontend development today:</p>
              </div>

              <div className="flex flex-col gap-1.5">
                <h2 className="font-bold tracking-[-0.03em] leading-[30px]">1. High Industry Demand</h2>
                <p className="text-sm tracking-[-0.03em] leading-7">
                  Tech companies, startups, and even traditional businesses are constantly looking for frontend
                  developers to help them deliver high-quality digital experiences.
                </p>
              </div>

              <div className="flex flex-col gap-1.5">
                <h2 className="font-bold tracking-[-0.03em] leading-[30px]">2. Powerful and Beginner-Friendly Tools</h2>
                <p className="text-sm tracking-[-0.03em] leading-7">
                  Modern frameworks like React, Vue, and Svelte make it easier than ever to build interactive UIs. Their
                  growing ecosystems and active communities mean you'll find support at every step.
                </p>
              </div>

              <div className="flex flex-col gap-1.5">
                <h2 className="font-bold tracking-[-0.03em] leading-[30px]">3. Creative Freedom</h2>
                <p className="text-sm tracking-[-0.03em] leading-7">
                  Frontend development allows you to bring your design ideas to life. From animations to responsive
                  layouts, your creativity directly impacts how users engage with a product.
                </p>
              </div>

              <div className="flex flex-col gap-1.5">
                <h2 className="font-bold tracking-[-0.03em] leading-[30px]">4. Rapid Career Growth</h2>
                <p className="text-sm tracking-[-0.03em] leading-7">
                  With roles like UI Developer, React Developer, and Frontend Engineer, you'll find plenty of
                  opportunities with competitive salaries and growth potential.
                </p>
              </div>

              <div className="flex flex-col gap-1.5">
                <h2 className="font-bold tracking-[-0.03em] leading-[30px]">5. Essential for Fullstack Development</h2>
                <p className="text-sm tracking-[-0.03em] leading-7">
                  Understanding frontend is crucial if you want to become a fullstack developer. It complements your
                  backend knowledge and enables you to build complete applications.
                </p>
              </div>

              <div className="flex flex-col gap-1.5">
                <h2 className="font-bold tracking-[-0.03em] leading-[30px]">Conclusion:</h2>
                <p className="text-sm tracking-[-0.03em] leading-7">
                  If you're interested in building things that users interact with daily, frontend development is the
                  path to take. Whether you're a designer learning to code or a backend developer exploring the
                  frontend, 2025 is the perfect year to start.
                </p>
              </div>
            </div>

            <div className="border-t border-lightgray" />

            {/* Comments Section */}
            <div className="flex flex-col gap-3 text-sm">
              <h2 className="text-xl font-bold tracking-[-0.03em] leading-[34px]">Comments({post.comments.length})</h2>

              <div className="flex items-center gap-2 text-xs">
                <Avatar className="w-10 h-10">
                  <AvatarImage src="/image-6.png" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <span className="font-semibold leading-6">{post.author.name}</span>
              </div>

              <form onSubmit={handleComment} className="flex flex-col gap-1 text-gray-900">
                <label className="font-semibold tracking-[-0.03em] leading-7">Give your Comments</label>
                <Textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Enter your comment"
                  className="min-h-[140px] rounded-xl border-lightgray text-slategray"
                />
              </form>

              <Button
                onClick={handleComment}
                className="w-full h-12 rounded-full bg-steelblue hover:bg-steelblue/90 text-white font-semibold"
              >
                Send
              </Button>
            </div>

            <div className="border-t border-lightgray" />

            {/* Comments List */}
            <div className="flex flex-col gap-3">
              {post.comments.slice(0, 3).map((comment, index) => (
                <div key={comment.id}>
                  <div className="bg-white flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={comment.author.avatar || "/placeholder.svg"} />
                        <AvatarFallback>{comment.author.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="font-semibold leading-6 text-xs">{comment.author.name}</span>
                        <span className="tracking-[-0.03em] leading-6 text-dimgray text-xs -mt-1">{comment.date}</span>
                      </div>
                    </div>
                    <p className="tracking-[-0.03em] leading-6 text-xs">{comment.content}</p>
                  </div>
                  {index < 2 && <div className="border-t border-lightgray" />}
                </div>
              ))}
            </div>

            <button
              onClick={() => setShowCommentsModal(true)}
              className="text-[#1DA1F2] underline font-semibold text-base tracking-[-0.03em] leading-7 text-left"
            >
              See All Comments
            </button>

            <div className="border-t border-lightgray" />

            {/* Another Post Section */}
            <div className="flex flex-col gap-0">
              <h2 className="text-xl font-bold tracking-[-0.03em] leading-[34px] mb-4">Another Post</h2>
              <div className="w-[361px] bg-white flex flex-col gap-3">
                <div className="flex flex-col gap-2">
                  <h3 className="text-base font-bold tracking-[-0.03em] leading-[30px]">
                    5 Reasons to Learn Frontend Development in 2025
                  </h3>
                  <div className="flex gap-2">
                    {["Programming", "Frontend", "Coding"].map((tag) => (
                      <Badge key={tag} variant="outline" className="h-7 px-2 text-xs border-lightgray">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <p className="tracking-[-0.03em] leading-6 text-xs line-clamp-2">
                    Frontend development is more than just building beautiful user interfaces — it's about crafting user
                    experiences that are fast, accessible, and intuitive. As we move into 2025, the demand for skilled
                    frontend developers continues to rise.
                  </p>
                </div>
                <div className="flex items-center gap-5 text-[#6B7280]">
                  <button
                    className="flex items-center gap-1.5 hover:text-[#374151] transition-colors"
                    aria-label="Like"
                    onClick={handleAnotherLike}
                  >
                    {anotherLiked ? (
                      <svg className="w-6 h-6" fill="#1DA1F2" stroke="#1DA1F2" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M1 21h4V9H1v12zM23 10c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 2 7.59 8.59C7.22 8.95 7 9.45 7 10v9c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-1z"/>
                      </svg>
                    ) : (
                      <svg className="w-6 h-6" fill="none" stroke="#6B7280" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M1 21h4V9H1v12zM23 10c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 2 7.59 8.59C7.22 8.95 7 9.45 7 10v9c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-1z"/>
                      </svg>
                    )}
                    <span className={`tracking-[-0.03em] leading-7 text-base ${anotherLiked ? 'text-[#1DA1F2]' : ''}`}>{anotherLikes}</span>
                  </button>
                  <div className="flex items-center gap-1.5">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    </svg>
                    <span className="tracking-[-0.03em] leading-7 text-base">20</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-lightgray w-full h-20 flex items-center justify-center p-2 text-dimgray">
        <div className="tracking-[-0.03em] leading-7 text-sm">
          © 2025 Web Programming Hack Blog All rights reserved.
        </div>
      </footer>

      {/* Comments Modal */}
      <CommentsModal
        isOpen={showCommentsModal}
        onClose={() => setShowCommentsModal(false)}
        comments={post.comments}
        onAddComment={handleAddComment}
      />
    </div>
  )
}
