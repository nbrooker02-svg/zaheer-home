import VerticalNav from './VerticalNav'
import VerticalFooter from './VerticalFooter'

// Layout wrapper for any vertical page. Children render between nav and footer.

export default function VerticalLayout({ config, children }) {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--bg-main)' }}>
      <VerticalNav config={config} />
      <main className="flex-1">{children}</main>
      <VerticalFooter config={config} />
    </div>
  )
}
