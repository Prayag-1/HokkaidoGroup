import { Link } from 'react-router-dom'
export function PageBreadcrumb({ title, parent }: { title: string; parent?: { label: string; to: string } }) {
  return (
    <nav className="page-breadcrumb" aria-label="Breadcrumb">
      <Link to="/">Home</Link>
      <span aria-hidden="true">›</span>
      {parent ? <><Link to={parent.to}>{parent.label}</Link><span aria-hidden="true">›</span></> : null}
      <span aria-current="page">{title}</span>
    </nav>
  )
}
