import { useState, useEffect } from 'react'

export const useDeviceType = () => {
  const [isMobile, setIsMobile] = useState(null)

  useEffect(() => {
    const handleResize = () => {
      const mobileBreakpoint = 768 // Adjust this breakpoint as needed
      const currentWidth = window.innerWidth

      setIsMobile(currentWidth < mobileBreakpoint)
    }

    // Initial check on mount
    handleResize()

    // Event listener for window resize
    window.addEventListener('resize', handleResize)

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, []) // Empty dependency array ensures the effect runs only once on mount

  return isMobile
}
