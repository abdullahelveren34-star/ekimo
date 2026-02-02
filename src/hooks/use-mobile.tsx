import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  // Default to a consistent value (false) on the server and initial client render.
  const [isMobile, setIsMobile] = React.useState(false)

  React.useEffect(() => {
    // This effect runs only on the client, after hydration.
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)

    // Set the state based on the initial media query match on the client.
    setIsMobile(mql.matches)

    // Create a listener for future changes.
    const listener = (event: MediaQueryListEvent) => {
      setIsMobile(event.matches)
    }

    // Add the listener.
    mql.addEventListener("change", listener)

    // Clean up the listener on component unmount.
    return () => mql.removeEventListener("change", listener)
  }, []) // The empty dependency array is crucial for running this only once on the client.

  return isMobile
}
