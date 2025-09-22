import { ReactNode } from 'react'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog, Authors } from 'contentlayer/generated'
import PostLayout from '@/layouts/PostLayout'
import ListLayout from '@/layouts/ListLayout'

interface PostWithTocLayoutProps {
  content: CoreContent<Blog>
  authorDetails: CoreContent<Authors>[]
  next?: { path: string; title: string }
  prev?: { path: string; title: string }
  children: ReactNode
  posts: CoreContent<Blog>[]
}

export default function PostWithTocLayout({
  content,
  authorDetails,
  next,
  prev,
  children,
  posts,
}: PostWithTocLayoutProps) {
  return (
    <>
      <PostLayout content={content} authorDetails={authorDetails} next={next} prev={prev}>
        {children}
      </PostLayout>
      <div className="mt-8">
        <ListLayout posts={posts} title="Other Posts in this Directory" />
      </div>
    </>
  )
}
