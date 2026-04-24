import { Link } from 'react-router-dom'

export default function Refunds() {
  return (
    <>
      <section className="px-6" style={{ paddingTop: '80px', paddingBottom: '64px', background: 'var(--bg-dark)' }}>
        <div className="max-w-3xl mx-auto">
          <span className="section-label-light">Legal</span>
          <h1
            className="font-serif font-bold mt-3"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: 1.1, color: '#EDEFEE' }}
          >
            Refunds policy
          </h1>
          <p className="text-sm mt-3" style={{ color: 'rgba(237,239,238,0.5)' }}>Last updated: April 23, 2026</p>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="prose-zaheer mx-auto" style={{ maxWidth: '680px' }}>
          <p>
            <strong>All sales are final. We do not offer refunds.</strong>
          </p>
          <p>
            Every product sold here is a digital download or recurring subscription that you can preview
            before buying — pack pages describe exactly what's included, and a free starter kit is
            available to evaluate the system at no cost.
          </p>

          <h2>One-time pack purchases</h2>
          <p>
            Once you complete checkout and the pack is in your library, the sale is final. You keep
            lifetime access to the version of the pack you bought.
          </p>

          <h2>Subscriptions</h2>
          <p>
            Studio All-Access subscriptions auto-renew monthly or yearly until cancelled. You can cancel
            from your account page at any time — cancellation stops future renewals. We do not refund
            for unused time on the current billing period.
          </p>
          <p>
            After cancellation, you keep access until the end of your current billing period. Packs you
            downloaded during your subscription remain yours.
          </p>

          <h2>If something is broken</h2>
          <p>
            If you can't access a pack you paid for, or a download is corrupt, email{' '}
            <a href="mailto:hello@zaheer.studio" style={{ color: 'var(--accent)' }}>hello@zaheer.studio</a> and
            we'll resolve it. Technical issues that prevent you from using what you bought are our
            problem to fix, not yours.
          </p>

          <h2>Chargebacks</h2>
          <p>
            Please email us before initiating a chargeback. Most issues can be resolved faster directly.
          </p>

          <h2>Contact</h2>
          <p>
            Questions? Email <a href="mailto:hello@zaheer.studio" style={{ color: 'var(--accent)' }}>hello@zaheer.studio</a>.
            See also our <Link to="/terms" style={{ color: 'var(--accent)' }}>Terms of Service</Link>.
          </p>
        </div>
      </section>
    </>
  )
}
