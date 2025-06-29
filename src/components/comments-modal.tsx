"use client"

import type React from "react"

import { useState } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface Comment {
  id: string
  author: {
    name: string
    avatar?: string
  }
  content: string
  date: string
}

interface CommentsModalProps {
  isOpen: boolean
  onClose: () => void
  comments: Comment[]
  onAddComment: (content: string) => void
}

export function CommentsModal({ isOpen, onClose, comments, onAddComment }: CommentsModalProps) {
  const [newComment, setNewComment] = useState("")

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (newComment.trim()) {
      onAddComment(newComment.trim())
      setNewComment("")
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div className="absolute inset-0 bg-gray-400 bg-opacity-50" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl w-full max-w-[613px] mx-4 md:mx-0 max-h-[90vh] overflow-y-auto">
        <div className="flex flex-col p-4 md:p-6 gap-4 md:gap-5">
          {/* Header */}
          <div className="flex flex-row items-center justify-between">
            <h2 className="text-base md:text-xl font-bold tracking-[-0.03em] leading-[30px] md:leading-[34px] text-black">
              Comments({comments.length})
            </h2>
            <button onClick={onClose} className="w-6 h-6 flex items-center justify-center" aria-label="Close">
              <X className="w-6 h-6 text-black" />
            </button>
          </div>

          {/* Comment Form */}
          <div className="flex flex-col gap-3">
            <form onSubmit={handleSubmit} className="flex flex-col gap-1">
              <label className="text-sm font-semibold tracking-[-0.03em] leading-7 text-black">
                Give your Comments
              </label>
              <Textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Enter your comment"
                className="min-h-[140px] rounded-xl border-gray-300 text-sm tracking-[-0.03em] leading-7 text-gray-800 resize-none placeholder-gray-400"
              />
            </form>
            <div className="flex justify-end">
              <Button
                onClick={handleSubmit}
                className="w-full md:w-[204px] h-10 md:h-12 rounded-full bg-steelblue hover:bg-steelblue/90 text-white font-semibold text-sm tracking-[-0.03em] leading-7"
              >
                Send
              </Button>
            </div>
          </div>

          {/* Comments List */}
          <div className="flex flex-col gap-3">
            <div className="border-t border-lightgray" />
            {comments.map((comment, index) => (
              <div key={comment.id}>
                <div className="bg-white flex flex-col gap-2">
                  <div className="flex flex-row items-center gap-2 md:gap-3">
                    <Avatar className="w-10 h-10 md:w-12 md:h-12">
                      <AvatarImage src={comment.author.avatar || "/image-6.png"} />
                      <AvatarFallback>{comment.author.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <div className="text-xs md:text-sm font-semibold tracking-[-0.03em] leading-6 md:leading-7 text-black">
                        {comment.author.name}
                      </div>
                      <div className="text-xs tracking-[-0.03em] leading-6 md:leading-7 text-dimgray -mt-1">
                        {comment.date}
                      </div>
                    </div>
                  </div>
                  <div className="text-xs md:text-sm tracking-[-0.03em] leading-6 md:leading-7 text-black">
                    {comment.content}
                  </div>
                </div>
                {index < comments.length - 1 && <div className="border-t border-lightgray mt-3" />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
