import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useEffect } from 'react'
import { PageTransition } from './components/PageTransition'
import { HomePage } from './pages/HomePage'
import { BrandPage } from './pages/BrandPage'
import { ContactPage } from './pages/ContactPage'
import { BookingPage } from './pages/BookingPage'
import { AboutPage } from './pages/AboutPage'
import { BusinessDirectoryPage } from './pages/BusinessDirectoryPage'
import { BusinessDetailPage } from './pages/BusinessDetailPage'
import { CareersPage } from './pages/CareersPage'
import { PressPage } from './pages/PressPage'
import { SiteHeader } from './components/SiteHeader'

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
          <Route
            path="/"
            element={
              <PageTransition>
                <HomePage />
              </PageTransition>
            }
          />
          <Route
            path="/about"
            element={
              <PageTransition>
                <AboutPage />
              </PageTransition>
            }
          />
          <Route
            path="/businesses"
            element={
              <PageTransition>
                <BusinessDirectoryPage />
              </PageTransition>
            }
          />
          <Route
            path="/businesses/:slug"
            element={
              <PageTransition>
                <BusinessDetailPage />
              </PageTransition>
            }
          />
          <Route
            path="/careers"
            element={
              <PageTransition>
                <CareersPage />
              </PageTransition>
            }
          />
          <Route
            path="/press"
            element={
              <PageTransition>
                <PressPage />
              </PageTransition>
            }
          />
          <Route
            path="/booking"
            element={
              <PageTransition>
                <BookingPage />
              </PageTransition>
            }
          />
          <Route
            path="/contact"
            element={
              <PageTransition>
                <ContactPage />
              </PageTransition>
            }
          />
          <Route
            path="/brands/:slug"
            element={
              <PageTransition>
                <BrandPage />
              </PageTransition>
            }
          />
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
