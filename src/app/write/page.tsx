"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Upload, X } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { useToast } from "@/hooks/use-toast"

export default function WritePage() {
  const { user, loading: authLoading } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [tags, setTags] = useState<string[]>([])
  const [newTag, setNewTag] = useState("")
  const [image, setImage] = useState<string>("")
  const [errors, setErrors] = useState<{ title?: string; content?: string }>({})
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login")
    }
  }, [user, authLoading, router])

  const validateForm = () => {
    const newErrors: { title?: string; content?: string } = {}

    if (!title.trim()) {
      newErrors.title = "Title is required"
    }

    if (!content.trim()) {
      newErrors.content = "Content is required"
    } else if (content.trim().length < 50) {
      newErrors.content = "Content must be at least 50 characters"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()])
      setNewTag("")
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Success",
        description: "Post published successfully!",
      })

      router.push("/profile")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to publish post. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="animate-pulse">
          <div className="bg-white border-b border-gray-200 h-20"></div>
          <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
            <div className="h-8 bg-gray-200 rounded w-1/4"></div>
            <div className="h-12 bg-gray-200 rounded"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 h-20 flex items-center px-4 md:px-[120px] gap-4 md:gap-[18px]">
        <button onClick={() => router.back()} className="flex items-center justify-center w-6 h-6">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="flex-1 text-2xl font-bold tracking-[-0.03em] leading-9">Write Post</h1>
        <div className="flex items-center gap-3">
          <img
            src={user.avatar || "/placeholder.svg"}
            alt={user.name}
            className="w-10 h-10 rounded-full object-cover"
          />
          <span className="hidden md:block text-sm tracking-[-0.03em] leading-7 font-medium">{user.name}</span>
        </div>
      </header>

      <main className="max-w-[734px] mx-auto px-4 py-12">
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Title */}
          <div className="bg-white flex flex-col gap-1">
            <Label htmlFor="title" className="text-sm tracking-[-0.03em] leading-7 font-semibold text-gray-400">
              Title
            </Label>
            <Input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter your title"
              className={`rounded-xl border-gray-200 h-12 px-4 text-gray-500 placeholder:text-gray-400 ${
                errors.title ? "border-red-500 focus:ring-red-500" : ""
              }`}
            />
            {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
          </div>

          {/* Content */}
          <div className="flex flex-col gap-1.5">
            <Label className="text-sm tracking-[-0.03em] leading-7 font-semibold text-gray-400">Content</Label>
            <div className="rounded-lg border border-gray-200 overflow-hidden">
              {/* Toolbar */}
              <div className="border-b border-gray-200 flex items-center flex-wrap p-2.5 gap-2">
                <div className="w-[120px] rounded-md border border-gray-200 h-8 flex items-center justify-between px-2">
                  <span className="text-sm tracking-[-0.03em] leading-7 text-gray-400">Heading 1</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
                <div className="w-px bg-gray-300 h-4"></div>
                <div className="flex gap-1">
                  <button type="button" className="w-7 h-7 flex items-center justify-center hover:bg-gray-100 rounded">
                    <strong>B</strong>
                  </button>
                  <button type="button" className="w-7 h-7 flex items-center justify-center hover:bg-gray-100 rounded">
                    <em>I</em>
                  </button>
                  <button type="button" className="w-7 h-7 flex items-center justify-center hover:bg-gray-100 rounded">
                    <u>U</u>
                  </button>
                </div>
                <div className="w-px bg-gray-300 h-4"></div>
                <div className="flex gap-1">
                  <button type="button" className="w-7 h-7 flex items-center justify-center hover:bg-gray-100 rounded">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  </button>
                  <button type="button" className="w-7 h-7 flex items-center justify-center hover:bg-gray-100 rounded">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h8M4 18h16" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Content Area */}
              <Textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Enter your content"
                className={`h-[186px] border-0 resize-none focus:ring-0 text-gray-500 placeholder:text-gray-400 ${
                  errors.content ? "border-red-500" : ""
                }`}
              />
            </div>
            {errors.content && <p className="mt-1 text-sm text-red-600">{errors.content}</p>}
          </div>

          {/* Cover Image */}
          <div className="flex flex-col gap-1.5">
            <Label className="text-sm tracking-[-0.03em] leading-7 font-semibold text-gray-400">Cover Image</Label>
            <div className="rounded-xl bg-gray-100 border-2 border-dashed border-gray-400 flex flex-col items-center justify-center py-4 px-6">
              {image ? (
                <div className="relative w-full">
                  <img src={image || "/placeholder.svg"} alt="Cover" className="max-h-64 mx-auto rounded-lg" />
                  <Button type="button" variant="outline" size="sm" className="mt-4" onClick={() => setImage("")}>
                    Remove Image
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                    <Upload className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        className="text-blue-600 tracking-[-0.03em] leading-7 font-semibold hover:underline"
                        onClick={() =>
                          setImage(
                            "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image%20%285%29-bCPn7nMtvrEyzHHVlA5TguCex4yQqy.png",
                          )
                        }
                      >
                        Click to upload
                      </button>
                      <span className="text-gray-600 tracking-[-0.03em] leading-7">or drag and drop</span>
                    </div>
                    <p className="text-xs tracking-[-0.03em] leading-6 text-gray-600">PNG or JPG (max. 5mb)</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Tags */}
          <div className="bg-white flex flex-col gap-1">
            <Label className="text-sm tracking-[-0.03em] leading-7 font-semibold text-gray-400">Tags</Label>
            <div className="flex flex-wrap gap-2 mb-3">
              {tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                  {tag}
                  <button type="button" onClick={() => handleRemoveTag(tag)} className="ml-1 hover:text-red-600">
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
            <Input
              type="text"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onKeyDown={handleAddTag}
              placeholder="Enter your tags"
              className="rounded-xl border-gray-200 h-12 px-4 text-gray-500 placeholder:text-gray-400"
            />
            <p className="mt-1 text-sm text-gray-500">Press Enter to add tags</p>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={loading}
              className="w-[265px] rounded-full bg-blue-600 hover:bg-blue-700 text-white h-11"
            >
              {loading ? "Publishing..." : "Finish"}
            </Button>
          </div>
        </form>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 h-20 flex items-center justify-center p-2 text-gray-500">
        <p className="text-sm tracking-[-0.03em] leading-7">© 2025 Web Programming Hack Blog All rights reserved.</p>
      </footer>
    </div>
  )
}
