import { Link } from 'react-router-dom'

export default function Privacy() {
  return (
    <>
      <section className="px-6" style={{ paddingTop: '80px', paddingBottom: '64px', background: 'var(--bg-dark)' }}>
        <div className="max-w-3xl mx-auto">
          <span className="section-label-light">Legal</span>
          <h1
            className="font-serif font-bold mt-3"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: 1.1, color: '#EDEFEE' }}
          >
            Privacy Policy
          </h1>
          <p className="text-sm mt-3" style={{ color: 'rgba(237,239,238,0.5)' }}>Last updated: April 23, 2026</p>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="prose-zaheer mx-auto" style={{ maxWidth: '680px' }}>
          <p>
            This policy explains what data Zaheer Studios collects, why, and what happens to it.
            We try to keep this short and human.
          </p>

          <h2>What we collect</h2>
          <ul>
            <li>
              <strong>Your email address</strong> — to create your account and send sign-in links,
              transactional emails (welcome, receipts), and occasional product updates you can opt out of.
            </li>
            <li>
              <strong>Payment information</strong> — handled entirely by Stripe. We never see your full
              card number. We store the Stripe customer ID and basic purchase info (what you bought, when).
            </li>
            <li>
              <strong>Account activity</strong> — sign-in events, packs you've downloaded, subscription status.
              Used to give you access to what you've paid for.
            </li>
            <li>
              <strong>Basic site analytics</strong> — anonymized page views and traffic source (no personal
              tracking, no cookies for advertising).
            </li>
          </ul>

          <h2>How we use it</h2>
          <p>We use your information to:</p>
          <ul>
            <li>Run your account and give you access to packs you've bought or subscribed to</li>
            <li>Process payments and send receipts</li>
            <li>Email you about your account and the products you've purchased</li>
            <li>Improve the site and our products</li>
            <li>Comply with legal obligations</li>
          </ul>
          <p>We don't sell your data. We don't share it with advertisers.</p>

          <h2>Third-party services</h2>
          <p>We use a small number of trusted services to run the site:</p>
          <ul>
            <li><strong>Stripe</strong> — payments and subscription management</li>
            <li><strong>Supabase</strong> — account auth and storage of pack files</li>
            <li><strong>Vercel</strong> — site hosting</li>
            <li><strong>Resend</strong> — transactional email delivery</li>
          </ul>
          <p>
            Each of these has its own privacy policy. We only share with them what's needed to deliver
            the service to you.
          </p>

          <h2>Cookies</h2>
          <p>
            We use one essential cookie: a sign-in session cookie set by Supabase Auth so you stay logged
            in between visits. We don't use advertising or tracking cookies.
          </p>

          <h2>Your rights</h2>
          <p>
            You can request a copy of your data, ask for it to be corrected, or ask us to delete your
            account at any time. Email <a href="mailto:hello@zaheer.studio" style={{ color: 'var(--accent)' }}>hello@zaheer.studio</a> and
            we'll respond within 30 days.
          </p>
          <p>
            If you cancel your account, we'll delete your personal data. We'll keep purchase records
            (anonymized where possible) for accounting and tax compliance reasons.
          </p>

          <h2>Children</h2>
          <p>
            Zaheer Studios is not intended for anyone under 13. We don't knowingly collect data from children.
          </p>

          <h2>Changes</h2>
          <p>
            We may update this policy from time to time. Material changes will be flagged on the site
            or via email if you have an account. The "Last updated" date at the top always reflects the
            most recent change.
          </p>

          <h2>Contact</h2>
          <p>
            Questions about your data? Email <a href="mailto:hello@zaheer.studio" style={{ color: 'var(--accent)' }}>hello@zaheer.studio</a>.
            See also our <Link to="/terms" style={{ color: 'var(--accent)' }}>Terms of Service</Link>.
          </p>
        </div>
      </section>
    </>
  )
}
