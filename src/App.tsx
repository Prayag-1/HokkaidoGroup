import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { lazy, Suspense, useEffect, type ComponentType } from 'react'
import { PageTransition } from './components/PageTransition'
import { SectionSurface } from './components/SectionSurface'
import { SiteHeader } from './components/SiteHeader'
import { HomePage } from './pages/HomePage'
import { getBusinessBySlug } from './data/businesses'

const ContactPage = lazy(() => import('./pages/ContactPage').then(({ ContactPage }) => ({ default: ContactPage })))
const AboutPage = lazy(() => import('./pages/AboutPage').then(({ AboutPage }) => ({ default: AboutPage })))
const BusinessDirectoryPage = lazy(() => import('./pages/BusinessDirectoryPage').then(({ BusinessDirectoryPage }) => ({ default: BusinessDirectoryPage })))
const BusinessDetailPage = lazy(() => import('./pages/BusinessDetailPage').then(({ BusinessDetailPage }) => ({ default: BusinessDetailPage })))

const MartPage = lazy(() => import('./pages/MartPage').then(m => ({ default: m.MartPage })))
const MembershipPage = lazy(() => import('./pages/MembershipPage').then(m => ({ default: m.MembershipPage })))
const StoryPage = lazy(() => import('./pages/StoryPage').then(m => ({ default: m.StoryPage })))
const CateringPage = lazy(() => import('./pages/CateringPage').then(m => ({ default: m.CateringPage })))

function RouteFallback() {
  return (
    <main className="corporate-page">
      <SectionSurface variant="rice-paper" className="corporate-section--first">
        <div className="corporate-shell">
          <p className="corporate-eyebrow">Loading</p>
        </div>
      </SectionSurface>
    </main>
  )
}

function NotFoundPage() {
  return (
    <main id="main-content" className="corporate-page">
      <SectionSurface variant="rice-paper" className="corporate-section--first">
        <div className="corporate-shell">
          <div className="section-header corporate-section__header">
            <p className="section-header__eyebrow">404</p>
            <h1 className="section-header__heading">Page not found</h1>
            <p className="section-header__description">The page you requested could not be found.</p>
            <a href="/" className="corporate-button corporate-button--primary">Return home</a>
          </div>
        </div>
      </SectionSurface>
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
    const path = location.pathname.replace(/\/$/, '') || '/'
    const slug = path.startsWith('/businesses/') ? path.split('/').at(-1) : undefined
    const business = slug ? getBusinessBySlug(slug) : undefined
    const routeMeta: Record<string, { title: string; description: string }> = {
      '/': { title: 'Hokkaido Group | Japanese Hospitality in Nepal', description: 'Discover Hokkaido Group’s Japanese dining, retail, hospitality, and trading businesses across Nepal.' },
      '/about': { title: 'About Hokkaido Group', description: 'Learn about Hokkaido Group and its Japanese hospitality businesses in Nepal.' },
      '/about-us': { title: 'About Hokkaido Group', description: 'Learn about Hokkaido Group and its Japanese hospitality businesses in Nepal.' },
      '/our-story': { title: 'Our Story | Hokkaido Group', description: 'The story of Hokkaido Group and Japanese hospitality in Nepal.' },
      '/businesses': { title: 'Our Businesses | Hokkaido Group', description: 'Explore Hokkaido Group’s restaurants, retail, and business divisions across Nepal.' },
      '/our-brands': { title: 'Our Businesses | Hokkaido Group', description: 'Explore Hokkaido Group’s restaurants, retail, and business divisions across Nepal.' },
      '/mart': { title: 'HOMA Nepal | Hokkaido Group', description: 'Explore Japanese skincare, pantry goods, and lifestyle products at HOMA Nepal.' },
      '/catering': { title: 'Catering | Hokkaido Group', description: 'Ask Hokkaido Group about catering for private celebrations and corporate gatherings.' },
      '/membership': { title: 'Membership | Hokkaido Group', description: 'Register your interest in Hokkaido Group membership updates.' },
      '/contact': { title: 'Contact | Hokkaido Group', description: 'Find contact details for Hokkaido Group and its businesses.' },
    }
    const meta = business
      ? { title: `${business.name} | Hokkaido Group`, description: business.description ?? `Find information about ${business.name}.` }
      : routeMeta[path] ?? { title: 'Page not found | Hokkaido Group', description: 'The requested page could not be found.' }
    document.title = meta.title
    const setMeta = (selector: string, attribute: string, value: string) => {
      let element = document.head.querySelector<HTMLMetaElement>(selector)
      if (!element) {
        element = document.createElement('meta')
        document.head.append(element)
      }
      element.setAttribute(attribute, value)
    }
    setMeta('meta[name="description"]', 'name', 'description')
    document.head.querySelector('meta[name="description"]')?.setAttribute('content', meta.description)
    setMeta('meta[property="og:title"]', 'property', 'og:title')
    document.head.querySelector('meta[property="og:title"]')?.setAttribute('content', meta.title)
    setMeta('meta[property="og:description"]', 'property', 'og:description')
    document.head.querySelector('meta[property="og:description"]')?.setAttribute('content', meta.description)
    setMeta('meta[name="twitter:title"]', 'name', 'twitter:title')
    document.head.querySelector('meta[name="twitter:title"]')?.setAttribute('content', meta.title)
    setMeta('meta[name="twitter:description"]', 'name', 'twitter:description')
    document.head.querySelector('meta[name="twitter:description"]')?.setAttribute('content', meta.description)
    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.rel = 'canonical'
      document.head.append(canonical)
    }
    canonical.href = `${window.location.origin}${path}`
  }, [location.pathname])

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
          <Route path="/about-us" element={renderPage(AboutPage)} />
          <Route path="/our-brands" element={renderPage(BusinessDirectoryPage)} />
          <Route path="/mart" element={renderPage(MartPage)} />
          <Route path="/catering" element={renderPage(CateringPage)} />
          <Route path="/membership" element={renderPage(MembershipPage)} />
          <Route path="/franchises" element={<Navigate to="/membership" replace />} />
          <Route path="/franchise" element={<Navigate to="/membership" replace />} />
          <Route path="/our-story" element={renderPage(StoryPage)} />
          <Route path="/about" element={renderPage(AboutPage)} />
          <Route path="/businesses" element={renderPage(BusinessDirectoryPage)} />
          <Route path="/businesses/:slug" element={renderPage(BusinessDetailPage)} />
          <Route path="/careers" element={<Navigate to="/" replace />} />
          <Route path="/press" element={<Navigate to="/" replace />} />
          <Route path="/booking" element={<Navigate to="/" replace />} />
          <Route path="/contact" element={renderPage(ContactPage)} />
          <Route path="*" element={renderPage(NotFoundPage)} />
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
