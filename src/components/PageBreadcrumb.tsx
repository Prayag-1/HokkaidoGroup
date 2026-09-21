import { Link } from 'react-router-dom'
export function PageBreadcrumb({ title }: { title: string }) {
  return (
    <nav className="page-breadcrumb" aria-label="Breadcrumb">
      <Link to="/">Home</Link>
      <span aria-hidden="true">›</span>
      <span aria-current="page">{title}</span>
    </nav>
  )
}
