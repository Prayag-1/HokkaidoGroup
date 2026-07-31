import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { lazy, Suspense, useEffect, type ComponentType } from 'react'
import { PageTransition } from './components/PageTransition'
import { SiteHeader } from './components/SiteHeader'
import { HomePage } from './pages/HomePage'

const ContactPage = lazy(() => import('./pages/ContactPage').then(({ ContactPage }) => ({ default: ContactPage })))
const AboutPage = lazy(() => import('./pages/AboutPage').then(({ AboutPage }) => ({ default: AboutPage })))
const BusinessDirectoryPage = lazy(() => import('./pages/BusinessDirectoryPage').then(({ BusinessDirectoryPage }) => ({ default: BusinessDirectoryPage })))
const BusinessDetailPage = lazy(() => import('./pages/BusinessDetailPage').then(({ BusinessDetailPage }) => ({ default: BusinessDetailPage })))

function RouteFallback() {
  return (
    <main className="corporate-page">
      <section className="corporate-section corporate-section--first">
        <div className="corporate-shell">
          <p className="corporate-eyebrow">Loading</p>
        </div>
      </section>
    </main>
  )
}

function renderPage(Page: ComponentType) {
  return (
    <PageTransition>
      <Suspense fallback={<RouteFallback />}>
        <Page />
      </Suspense>
    </PageTransition>
  )
}

function AppRoutes() {
  const location = useLocation()

  useEffect(() => {
    if (location.hash) {
      const target = document.getElementById(location.hash.slice(1))
      if (target) {
        requestAnimationFrame(() => {
          target.scrollIntoView({ behavior: 'auto', block: 'start' })
        })
      }
      return
    }

    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [location.hash, location.pathname])

  return (
    <>
      <SiteHeader />
      <AnimatePresence mode="wait" initial={false}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={renderPage(HomePage)} />
          <Route path="/about" element={renderPage(AboutPage)} />
          <Route path="/businesses" element={renderPage(BusinessDirectoryPage)} />
          <Route path="/businesses/:slug" element={renderPage(BusinessDetailPage)} />
          <Route path="/careers" element={<Navigate to="/" replace />} />
          <Route path="/press" element={<Navigate to="/" replace />} />
          <Route path="/booking" element={<Navigate to="/" replace />} />
          <Route path="/contact" element={renderPage(ContactPage)} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AnimatePresence>
    </>
  )
}

const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </QueryClientProvider>
  )
}
