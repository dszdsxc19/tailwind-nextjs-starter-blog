'use client'

import { useEffect, useRef } from 'react'
import mermaid from 'mermaid'

type MermaidProps = {
  chart: string
}

let initialized = false

const Mermaid = ({ chart }: MermaidProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const renderIdRef = useRef(`mermaid-${Math.random().toString(36).slice(2)}`)

  useEffect(() => {
    if (!initialized) {
      mermaid.initialize({ startOnLoad: false })
      initialized = true
    }
  }, [])

  useEffect(() => {
    const renderDiagram = async () => {
      if (!containerRef.current) {
        return
      }

      const definition = chart.trim()

      if (!definition) {
        containerRef.current.innerHTML = ''
        return
      }

      try {
        const { svg } = await mermaid.render(renderIdRef.current, definition)
        if (containerRef.current) {
          containerRef.current.innerHTML = svg
        }
      } catch (error) {
        console.error('Mermaid diagram failed to render', error)
      }
    }

    renderDiagram()
  }, [chart])

  return <div ref={containerRef} className="mermaid" />
}

export default Mermaid
