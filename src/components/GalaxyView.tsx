import React, { useState, useRef, useCallback, useEffect } from 'react'
import Header from './Header'
import GalaxyViewport from './GalaxyViewport'
import ControlPanel from './ControlPanel'
import GalaxyStats from './GalaxyStats'
import SupportLegend from './SupportLegend'
import HoverInfo from './HoverInfo'

interface Position {
  x: number
  y: number
}

interface DragState {
  isDragging: boolean
  dragStart: Position
  lastPan: Position
}

const GalaxyView: React.FC = () => {
  const [pan, setPan] = useState<Position>({ x: 0, y: 0 })
  const [dragState, setDragState] = useState<DragState>({
    isDragging: false,
    dragStart: { x: 0, y: 0 },
    lastPan: { x: 0, y: 0 }
  })
  
  const containerRef = useRef<HTMLDivElement>(null)

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    setDragState({
      isDragging: true,
      dragStart: { x: e.clientX, y: e.clientY },
      lastPan: pan
    })
  }, [pan])

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!dragState.isDragging) return
    
    const deltaX = e.clientX - dragState.dragStart.x
    const deltaY = e.clientY - dragState.dragStart.y
    
    setPan({
      x: dragState.lastPan.x + deltaX,
      y: dragState.lastPan.y + deltaY
    })
  }, [dragState])

  const handleMouseUp = useCallback(() => {
    setDragState(prev => ({ ...prev, isDragging: false }))
  }, [])

  // Touch support for mobile
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    e.preventDefault()
    const touch = e.touches[0]
    setDragState({
      isDragging: true,
      dragStart: { x: touch.clientX, y: touch.clientY },
      lastPan: pan
    })
  }, [pan])

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!dragState.isDragging) return
    e.preventDefault()
    
    const touch = e.touches[0]
    const deltaX = touch.clientX - dragState.dragStart.x
    const deltaY = touch.clientY - dragState.dragStart.y
    
    setPan({
      x: dragState.lastPan.x + deltaX,
      y: dragState.lastPan.y + deltaY
    })
  }, [dragState])

  const handleTouchEnd = useCallback(() => {
    setDragState(prev => ({ ...prev, isDragging: false }))
  }, [])

  // Mouse event listeners
  useEffect(() => {
    if (dragState.isDragging) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
      document.addEventListener('touchmove', handleTouchMove, { passive: false })
      document.addEventListener('touchend', handleTouchEnd)
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
        document.removeEventListener('touchmove', handleTouchMove)
        document.removeEventListener('touchend', handleTouchEnd)
      }
    }
  }, [dragState.isDragging, handleMouseMove, handleMouseUp, handleTouchMove, handleTouchEnd])

  const centerGalaxy = useCallback(() => {
    setPan({ x: 0, y: 0 })
  }, [])

  return (
    <>
      <Header />
      
      <div 
        ref={containerRef}
        className="relative w-full h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 overflow-hidden cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        style={{ cursor: dragState.isDragging ? 'grabbing' : 'grab' }}
      >
        <GalaxyViewport pan={pan} />
      </div>

      <ControlPanel onCenterGalaxy={centerGalaxy} />
      <GalaxyStats />
      <SupportLegend />
      <HoverInfo />
      
      {/* Bottom Instructions */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 z-10 text-center text-gray-400 text-sm p-2">
        Drag to explore • Pinch to zoom • Tap menu for options
      </div>
    </>
  )
}

export default GalaxyView 