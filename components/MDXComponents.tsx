import TOCInline from 'pliny/ui/TOCInline'
import Pre from 'pliny/ui/Pre'
import BlogNewsletterForm from 'pliny/ui/BlogNewsletterForm'
import dynamic from 'next/dynamic'
import type { ComponentProps, ReactNode } from 'react'
import type { MDXComponents } from 'mdx/types'
import Image from './Image'
import CustomLink from './Link'
import TableWrapper from './TableWrapper'

const Mermaid = dynamic(() => import('./Mermaid'), { ssr: true })

const collectText = (node: ReactNode): string => {
  if (typeof node === 'string') {
    return node
  }

  if (Array.isArray(node)) {
    return node.map((child) => collectText(child)).join('')
  }

  if (typeof node === 'object' && node !== null && 'props' in node) {
    return collectText((node as { props?: { children?: ReactNode } }).props?.children)
  }

  return ''
}

const isMermaidClass = (className?: string) =>
  className?.split(/\s+/).some((token) => token === 'mermaid' || token === 'language-mermaid')

const CustomPre = ({ children, className }: ComponentProps<'pre'>) => {
  const child = children as ReactNode & { props?: { className?: string; children?: ReactNode } }

  if (isMermaidClass(className)) {
    return <Mermaid chart={collectText(children)} />
  }

  if (typeof child === 'object' && child !== null && 'props' in child) {
    const codeClassName = child.props?.className
    if (isMermaidClass(codeClassName)) {
      return <Mermaid chart={collectText(child.props?.children)} />
    }
  }

  return <Pre>{children}</Pre>
}

export const components: MDXComponents = {
  Image,
  TOCInline,
  a: CustomLink,
  pre: CustomPre,
  table: TableWrapper,
  BlogNewsletterForm,
}
