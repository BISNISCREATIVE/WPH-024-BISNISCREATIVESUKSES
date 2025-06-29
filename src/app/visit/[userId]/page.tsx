"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Header from "@/components/header"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAuth } from "@/contexts/auth-context"

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

interface UserProfile {
  id: string
  name: string
  email: string
  avatar?: string
  bio?: string
  postsCount: number
}

export default function VisitProfilePage() {
  const params = useParams()
  const userId = params.userId as string
  const { user: currentUser } = useAuth()

  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchUserProfile()
    fetchUserPosts()
  }, [userId])

  const fetchUserProfile = async () => {
    try {
      // Mock user profile
      const mockProfile: UserProfile = {
        id: userId,
        name: "John Doe",
        email: "john@example.com",
        avatar: "/image-6.png",
        bio: "Frontend Developer",
        postsCount: 5,
      }
      setProfile(mockProfile)
    } catch (error) {
      console.error("Error fetching user profile:", error)
    }
  }

  const fetchUserPosts = async () => {
    try {
      setLoading(true)

      // Mock posts - sometimes return empty array to show empty state
      const shouldShowPosts = Math.random() > 0.3 // 70% chance to show posts

      if (shouldShowPosts) {
        const mockPosts: BlogPost[] = Array.from({ length: 5 }, (_, i) => ({
          id: `post-${i + 1}`,
          title: "5 Reasons to Learn Frontend Development in 2025",
          content:
            "Frontend development is more than just building beautiful user interfaces — it's about crafting user experiences that are fast, accessible, and intuitive. As we move into 2025, the demand for skilled frontend developers continues to rise.",
          image:
            "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image%20%285%29-bCPn7nMtvrEyzHHVlA5TguCex4yQqy.png",
          author: {
            id: userId,
            name: "John Doe",
            avatar: "/image-6.png",
          },
          tags: ["Programming", "Frontend", "Coding"],
          likes: 20,
          comments: 20,
          createdAt: "2025-05-27T00:00:00Z",
          isLiked: false,
        }))
        setPosts(mockPosts)
      } else {
        setPosts([])
      }
    } catch (error) {
      console.error("Error fetching user posts:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleLike = async (postId: string) => {
    setPosts(
      posts.map((post) =>
        post.id === postId
          ? { ...post, isLiked: !post.isLiked, likes: post.isLiked ? post.likes - 1 : post.likes + 1 }
          : post,
      ),
    )
  }

  if (loading || !profile) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse space-y-8">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="h-20 w-20 bg-gray-200 rounded-full mb-4"></div>
              <div className="h-6 bg-gray-200 rounded w-1/3 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            </div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Desktop Layout */}
        <div className="hidden md:block">
          {/* Profile Header */}
          <div className="flex items-center gap-3 mb-6 text-lg text-gray-700">
            <Avatar className="h-20 w-20">
              <AvatarImage src={profile.avatar || "/placeholder.svg"} alt={profile.name} />
              <AvatarFallback className="text-2xl">{profile.name.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <h1 className="font-bold tracking-[-0.03em] leading-8">{profile.name}</h1>
              <p className="text-base tracking-[-0.03em] leading-[30px]">{profile.bio}</p>
            </div>
          </div>

          <div className="border-t border-gray-200 mb-6"></div>

          <h2 className="text-2xl font-bold tracking-[-0.03em] leading-9 text-gray-700 mb-6">
            {profile.postsCount} Post{profile.postsCount !== 1 ? "s" : ""}
          </h2>

          {/* Posts */}
          {posts.length > 0 ? (
            <div className="space-y-6">
              {posts.map((post) => (
                <div key={post.id} className="bg-white flex gap-6">
                  <img
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    className="w-[340px] h-[258px] rounded-md object-cover"
                  />
                  <div className="flex-1 flex flex-col gap-4">
                    <div className="flex flex-col gap-3">
                      <h3 className="text-xl font-bold tracking-[-0.03em] leading-[34px]">{post.title}</h3>
                      <div className="flex gap-2">
                        {post.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-lg bg-white border border-gray-200 h-7 flex items-center justify-center px-2 text-xs tracking-[-0.03em] leading-6"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <p className="text-sm tracking-[-0.03em] leading-7 line-clamp-2">{post.content}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={post.author.avatar || "/placeholder.svg"} alt={post.author.name} />
                          <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span className="text-sm tracking-[-0.03em] leading-7 font-medium">{post.author.name}</span>
                      </div>
                      <div className="w-1 h-1 rounded-full bg-gray-600"></div>
                      <span className="text-sm tracking-[-0.03em] leading-7 text-gray-500">27 May 2025</span>
                    </div>
                    <div className="flex items-center gap-5 text-[#6B7280]">
                      <button
                        onClick={() => handleLike(post.id)}
                        className="flex items-center gap-1.5 hover:text-[#374151] transition-colors"
                        aria-label="Like"
                      >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 21V9a2 2 0 0 1 2-2h7.586a1 1 0 0 0 .707-1.707l-2.586-2.586a2 2 0 0 1 0-2.828l.293-.293a2 2 0 0 1 2.828 0l4.586 4.586a2 2 0 0 1 0 2.828l-8.586 8.586A2 2 0 0 1 8 19H7a2 2 0 0 1-2-2z" />
                        </svg>
                        <span className="text-base tracking-[-0.03em] leading-7">{post.likes}</span>
                      </button>
                      <div className="flex items-center gap-1.5">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                        </svg>
                        <span className="text-base tracking-[-0.03em] leading-7">{post.comments}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12">
              <img src="/fd12acbc29.png" alt="No posts" className="w-[118.1px] h-[135px] object-contain mb-6" />
              <div className="text-center">
                <p className="text-sm tracking-[-0.03em] leading-7 font-semibold mb-1">No posts from this user yet</p>
                <p className="text-sm tracking-[-0.03em] leading-7">Stay tuned for future posts</p>
              </div>
            </div>
          )}
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden">
          <div className="flex flex-col gap-4 p-4">
            {/* Profile Header */}
            <div className="flex items-center gap-2">
              <Avatar className="h-10 w-10">
                <AvatarImage src={profile.avatar || "/placeholder.svg"} alt={profile.name} />
                <AvatarFallback>{profile.name.charAt(0).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <h1 className="text-sm font-bold tracking-[-0.03em] leading-7">{profile.name}</h1>
                <p className="text-xs tracking-[-0.03em] leading-6 text-gray-500 -mt-1">{profile.bio}</p>
              </div>
            </div>

            <div className="border-t border-gray-200"></div>

            <h2 className="text-lg font-bold tracking-[-0.03em] leading-8">
              {profile.postsCount} Post{profile.postsCount !== 1 ? "s" : ""}
            </h2>

            {/* Posts */}
            {posts.length > 0 ? (
              <div className="space-y-4">
                {posts.map((post, index) => (
                  <div key={post.id}>
                    <div className="bg-white flex flex-col gap-3">
                      <div className="flex flex-col gap-2">
                        <h3 className="text-base font-bold tracking-[-0.03em] leading-[30px]">{post.title}</h3>
                        <div className="flex gap-2">
                          {post.tags.map((tag) => (
                            <span
                              key={tag}
                              className="rounded-lg bg-white border border-gray-200 h-7 flex items-center justify-center px-2 text-xs tracking-[-0.03em] leading-6"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        <p className="text-xs tracking-[-0.03em] leading-6 line-clamp-2">{post.content}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-[30px] w-[30px]">
                            <AvatarImage src={post.author.avatar || "/placeholder.svg"} alt={post.author.name} />
                            <AvatarFallback className="text-xs">{post.author.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <span className="text-xs tracking-[-0.03em] leading-6">{post.author.name}</span>
                        </div>
                        <div className="w-1 h-1 rounded-full bg-gray-600"></div>
                        <span className="text-xs tracking-[-0.03em] leading-6 text-gray-500">27 May 2025</span>
                      </div>
                      <div className="flex items-center gap-5 text-[#6B7280]">
                        <button
                          onClick={() => handleLike(post.id)}
                          className="flex items-center gap-1.5 hover:text-[#374151] transition-colors"
                          aria-label="Like"
                        >
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 21V9a2 2 0 0 1 2-2h7.586a1 1 0 0 0 .707-1.707l-2.586-2.586a2 2 0 0 1 0-2.828l.293-.293a2 2 0 0 1 2.828 0l4.586 4.586a2 2 0 0 1 0 2.828l-8.586 8.586A2 2 0 0 1 8 19H7a2 2 0 0 1-2-2z" />
                          </svg>
                          <span className="text-base tracking-[-0.03em] leading-7">{post.likes}</span>
                        </button>
                        <div className="flex items-center gap-1.5">
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                          </svg>
                          <span className="text-base tracking-[-0.03em] leading-7">{post.comments}</span>
                        </div>
                      </div>
                    </div>
                    {index < posts.length - 1 && <div className="border-t border-gray-200"></div>}
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12">
                <img src="/fd12acbc29.png" alt="No posts" className="w-[118.1px] h-[135px] object-contain mb-6" />
                <div className="text-center">
                  <p className="text-sm tracking-[-0.03em] leading-7 font-semibold mb-1">No posts from this user yet</p>
                  <p className="text-sm tracking-[-0.03em] leading-7">Stay tuned for future posts</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 h-20 flex items-center justify-center p-2 text-gray-500">
        <p className="text-sm tracking-[-0.03em] leading-7">© 2025 Web Programming Hack Blog All rights reserved.</p>
      </footer>
    </div>
  )
}
