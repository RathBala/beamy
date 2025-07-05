import { useState, useRef, useCallback, useEffect } from 'react'
import type { MouseEvent as ReactMouseEvent, TouchEvent as ReactTouchEvent } from 'react'
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

interface UIState {
  showStats: boolean
  showControls: boolean
  showLegend: boolean
  showMenu: boolean
}

const GalaxyView = () => {
  const [pan, setPan] = useState<Position>({ x: 0, y: 0 })
  const [dragState, setDragState] = useState<DragState>({
    isDragging: false,
    dragStart: { x: 0, y: 0 },
    lastPan: { x: 0, y: 0 }
  })
  
  const [uiState, setUiState] = useState<UIState>({
    showStats: false,
    showControls: false,
    showLegend: false,
    showMenu: false
  })
  
  const containerRef = useRef<HTMLDivElement>(null)

  const togglePanel = useCallback((panel: keyof UIState) => {
    setUiState(prev => ({
      ...prev,
      [panel]: !prev[panel]
    }))
  }, [])

  const handleMouseDown = useCallback((e: ReactMouseEvent) => {
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
  const handleTouchStart = useCallback((e: ReactTouchEvent) => {
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
      {/* Hamburger Menu Button */}
      <button
        onClick={() => togglePanel('showMenu')}
        className="fixed top-4 left-4 z-30 p-3 bg-gray-800 bg-opacity-90 border border-gray-600 rounded-lg hover:bg-gray-700 transition-colors backdrop-blur-sm"
      >
        <div className="w-6 h-6 flex flex-col justify-center items-center">
          <span className="block w-5 h-0.5 bg-gray-300 mb-1"></span>
          <span className="block w-5 h-0.5 bg-gray-300 mb-1"></span>
          <span className="block w-5 h-0.5 bg-gray-300"></span>
        </div>
      </button>

      {/* Stats Toggle Button */}
      <button
        onClick={() => togglePanel('showStats')}
        className="fixed top-4 right-4 z-30 px-3 py-2 bg-gray-800 bg-opacity-90 border border-gray-600 rounded-lg hover:bg-gray-700 transition-colors backdrop-blur-sm text-sm text-gray-300"
      >
        18 ⭐
      </button>

      {/* Support Legend Toggle Button */}
      <button
        onClick={() => togglePanel('showLegend')}
        className="fixed top-4 right-20 z-30 p-2 bg-gray-800 bg-opacity-90 border border-gray-600 rounded-lg hover:bg-gray-700 transition-colors backdrop-blur-sm text-sm text-gray-300"
      >
        ?
      </button>

      {/* Conditionally render Header/Menu */}
      {uiState.showMenu && <Header onClose={() => togglePanel('showMenu')} />}
      
      <div 
        ref={containerRef}
        className="relative w-full h-screen bg-gradient-to-br from-black via-gray-950 to-black overflow-hidden cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        style={{ cursor: dragState.isDragging ? 'grabbing' : 'grab' }}
      >
        <GalaxyViewport pan={pan} />
      </div>

      {/* FAB System */}
      <div className="fixed bottom-6 right-6 z-30">
        <div className="flex flex-col items-end gap-3">
          {uiState.showControls && (
            <div className="flex flex-col gap-2 mb-2">
              <button className="px-4 py-2 bg-gray-800 bg-opacity-90 border border-gray-600 rounded-lg hover:bg-gray-700 transition-colors backdrop-blur-sm text-sm text-gray-300 whitespace-nowrap">
                ➕ Add New Contact
              </button>
              <button 
                onClick={centerGalaxy}
                className="px-4 py-2 bg-gray-800 bg-opacity-90 border border-gray-600 rounded-lg hover:bg-gray-700 transition-colors backdrop-blur-sm text-sm text-gray-300 whitespace-nowrap"
              >
                🎯 Centre Galaxy
              </button>
              <button className="px-4 py-2 bg-gray-800 bg-opacity-90 border border-gray-600 rounded-lg hover:bg-gray-700 transition-colors backdrop-blur-sm text-sm text-gray-300 whitespace-nowrap">
                🌌 Create System
              </button>
            </div>
          )}
          <button
            onClick={() => togglePanel('showControls')}
            className="w-14 h-14 bg-yellow-500 hover:bg-yellow-400 rounded-full shadow-lg flex items-center justify-center text-2xl transition-all duration-200 transform hover:scale-105"
          >
            {uiState.showControls ? '✕' : '⚙️'}
          </button>
        </div>
      </div>

      {/* Conditionally render other panels */}
      {uiState.showStats && <GalaxyStats onClose={() => togglePanel('showStats')} />}
      {uiState.showLegend && <SupportLegend onClose={() => togglePanel('showLegend')} />}
      
      {/* HoverInfo - only shows when hovering over contacts */}
      <HoverInfo />
    </>
  )
}

export default GalaxyView 