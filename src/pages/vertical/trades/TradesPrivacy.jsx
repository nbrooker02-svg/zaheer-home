import VerticalLegalPage from '../VerticalLegalPage'
import { trades } from '../../../data/verticals/trades'

// Placeholder Privacy policy for Zaheer Studio Trades. Replace prose with
// the real legal copy when ready — structure is fine to keep.

export default function TradesPrivacy() {
  return (
    <VerticalLegalPage config={trades} slug="privacy" title="Privacy Policy" lastUpdated="April 28, 2026">
      <p>
        This policy describes what information Zaheer Studio Trades collects when you
        use our tools (PermitPilot, BackBill, and any future tools in this vertical),
        how we use that information, and the choices you have.
      </p>

      <h2>1. What we collect</h2>
      <ul>
        <li>
          <strong>Account data:</strong> email address (required to sign in), and any
          profile info you choose to provide (company name, phone number, etc.).
        </li>
        <li>
          <strong>Usage data:</strong> the lookups you perform, projects you create,
          and content you generate (e.g. change orders in BackBill). This is stored so
          you can come back and access it.
        </li>
        <li>
          <strong>Billing data:</strong> if you subscribe, payment processing is
          handled by Stripe — we receive subscription status but never see your card
          number.
        </li>
        <li>
          <strong>Diagnostic data:</strong> anonymous error reports and basic
          page-view analytics so we can keep the tools working.
        </li>
      </ul>

      <h2>2. How we use it</h2>
      <p>
        Strictly to operate the tools you're using: signing you in, generating
        outputs, processing payments, sending account-related emails, and fixing
        bugs. We don't sell your data.
      </p>

      <h2>3. Who we share it with</h2>
      <p>
        Only the third-party services we use to run the tools — for example: Clerk
        (authentication), Neon (database), Stripe (payments), Resend (email),
        Anthropic and OpenAI (the AI models that power some features). Each is
        bound by their own data-protection terms.
      </p>

      <h2>4. How long we keep it</h2>
      <p>
        Account and project data is kept while your account is active. If you
        delete your account or ask us to remove your data, we delete it within 30
        days, except where retention is required by law (e.g. payment records).
      </p>

      <h2>5. Your rights</h2>
      <p>
        You can access, correct, or delete your data at any time. Email{' '}
        <a href="mailto:info@zaheer.studio">info@zaheer.studio</a> and we'll handle
        the request within a reasonable timeframe.
      </p>

      <h2>6. Cookies and tracking</h2>
      <p>
        We use essential cookies to keep you signed in and lightweight analytics
        for usage stats. We don't run advertising trackers.
      </p>

      <h2>7. Changes</h2>
      <p>
        If this policy changes materially, we'll notify you via email or in-app
        notice before the change takes effect.
      </p>

      <h2>8. Contact</h2>
      <p>
        Questions or requests about your data? Email{' '}
        <a href="mailto:info@zaheer.studio">info@zaheer.studio</a>.
      </p>
    </VerticalLegalPage>
  )
}
