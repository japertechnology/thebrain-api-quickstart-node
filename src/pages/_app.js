import '@/styles/globals.css'

/**
 * Root application component for the Next.js app.
 *
 * This component initializes pages and allows for shared layout or state across
 * the application. It simply renders the active page component provided by
 * Next.js and spreads any associated page properties.
 *
 * @param {{ Component: import('react').ComponentType, pageProps: Object }} props
 *   Component - The active page component to render.
 *   pageProps - Props preloaded for the page by Next.js.
 * @returns {JSX.Element} Rendered page component.
 */
export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />
}
