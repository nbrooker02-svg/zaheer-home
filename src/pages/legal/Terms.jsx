import { Link } from 'react-router-dom'

export default function Terms() {
  return (
    <>
      <section className="px-6" style={{ paddingTop: '80px', paddingBottom: '64px', background: 'var(--bg-dark)' }}>
        <div className="max-w-3xl mx-auto">
          <span className="section-label-light">Legal</span>
          <h1
            className="font-serif font-bold mt-3"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: 1.1, color: '#EDEFEE' }}
          >
            Terms of Service
          </h1>
          <p className="text-sm mt-3" style={{ color: 'rgba(237,239,238,0.5)' }}>Last updated: April 23, 2026</p>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="prose-zaheer mx-auto" style={{ maxWidth: '680px' }}>
          <p>
            These terms govern your use of Zaheer Studios (zaheer.studio) and the products sold here
            — including agent packs, web apps, and subscriptions. By using the site or buying a product,
            you agree to these terms.
          </p>

          <h2>1. What we offer</h2>
          <p>
            Zaheer Studios sells downloadable Claude Code agent packs and provides web apps powered by AI.
            Packs are licensed for your personal or commercial use. Web apps are made available
            on an as-is basis and may change or be discontinued at any time.
          </p>

          <h2>2. Your account</h2>
          <p>
            To download packs, you'll need an account. You're responsible for keeping your sign-in email
            secure and for any activity under your account. We use magic-link sign-in — no passwords are stored.
          </p>

          <h2>3. Payments</h2>
          <p>
            All payments are processed by Stripe. Prices are in US dollars. By purchasing, you authorize us
            to charge your selected payment method. Subscriptions auto-renew at the listed interval until
            you cancel from your account page.
          </p>

          <h2>4. Refunds</h2>
          <p>
            All sales are final. See our <Link to="/refunds" style={{ color: 'var(--accent)' }}>Refunds policy</Link> for full details.
          </p>

          <h2>5. License to use packs</h2>
          <p>
            When you buy a pack, you receive a non-exclusive, non-transferable license to use it
            for your own work — including commercial work. You may not resell, redistribute, or
            republish the pack contents as your own product.
          </p>
          <p>
            Subscribers to Studio All-Access have the same usage rights for every pack included in the subscription,
            for as long as the subscription is active. Packs already downloaded remain yours after cancellation.
          </p>

          <h2>6. Acceptable use</h2>
          <p>
            Don't use the site or our products to do anything illegal, abusive, or that violates anyone's
            rights. Don't try to break the service or scrape it.
          </p>

          <h2>7. Termination</h2>
          <p>
            We may suspend or terminate accounts that violate these terms. You can stop using the site at
            any time. Active subscriptions can be cancelled from your account page.
          </p>

          <h2>8. Disclaimers</h2>
          <p>
            The site and products are provided "as is" without warranties of any kind. We don't promise
            the service will be uninterrupted or error-free. The agent packs are tools — your results
            depend on how you use them.
          </p>

          <h2>9. Limitation of liability</h2>
          <p>
            To the fullest extent permitted by law, Zaheer Studios is not liable for any indirect, incidental,
            consequential, or punitive damages arising from your use of the site or products. Our total
            liability for any claim is limited to the amount you paid us in the 12 months prior to the claim.
          </p>

          <h2>10. Changes</h2>
          <p>
            We may update these terms from time to time. The "Last updated" date at the top reflects
            the most recent change. Continued use of the site after changes means you accept the updated terms.
          </p>

          <h2>11. Governing law</h2>
          <p>
            These terms are governed by the laws of the United States and the state where Zaheer Studios is based.
            Any disputes will be resolved in the courts of that jurisdiction.
          </p>

          <h2>12. Contact</h2>
          <p>
            Questions about these terms? Email <a href="mailto:hello@zaheer.studio" style={{ color: 'var(--accent)' }}>hello@zaheer.studio</a>.
          </p>
        </div>
      </section>
    </>
  )
}
