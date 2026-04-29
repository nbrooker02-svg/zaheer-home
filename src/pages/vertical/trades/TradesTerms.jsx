import VerticalLegalPage from '../VerticalLegalPage'
import { trades } from '../../../data/verticals/trades'

// Placeholder Terms for Zaheer Studio Trades. Replace prose with the
// real legal copy when ready — structure is fine to keep.

export default function TradesTerms() {
  return (
    <VerticalLegalPage config={trades} slug="terms" title="Terms of Service" lastUpdated="April 28, 2026">
      <p>
        These terms govern your use of Zaheer Studio Trades and the products available
        under it — including PermitPilot, BackBill, and any future tools we ship as part
        of this vertical. By using any of these tools, you agree to these terms.
      </p>

      <h2>1. What we offer</h2>
      <p>
        Zaheer Studio Trades is a collection of focused software tools for contractors,
        subcontractors, and trade businesses. Some tools are free to try; others are
        sold as monthly subscriptions or one-time licenses. Pricing for each tool is on
        its own page.
      </p>

      <h2>2. Your account</h2>
      <p>
        Each tool that requires sign-up uses email-based authentication. You are
        responsible for keeping your account credentials secure and for activity that
        occurs under your account.
      </p>

      <h2>3. Acceptable use</h2>
      <p>
        Don't reverse-engineer, resell, or redistribute the tools without written
        permission. Don't use them in ways that violate the law, infringe rights, or
        harm other users.
      </p>

      <h2>4. Subscriptions and billing</h2>
      <p>
        Where a tool is sold as a subscription, it renews automatically until cancelled.
        You can cancel anytime through the tool's account settings — you'll keep access
        through the end of the current billing period. Refunds are handled per tool;
        see the specific tool's pricing page for details.
      </p>

      <h2>5. Disclaimers</h2>
      <p>
        Tools in Zaheer Studio Trades are provided "as is." We make a real effort to
        keep data current — for example, jurisdiction-specific permit checklists in
        PermitPilot — but you remain responsible for verifying any output before
        relying on it for a paid job, a permit submittal, or a contract.
      </p>

      <h2>6. Liability</h2>
      <p>
        To the extent allowed by law, our liability for any claim related to these
        tools is limited to the amount you paid us in the prior 12 months. We aren't
        liable for indirect or consequential damages.
      </p>

      <h2>7. Changes</h2>
      <p>
        We may update these terms as the product evolves. Material changes will be
        announced via email or in-app notice.
      </p>

      <h2>8. Contact</h2>
      <p>
        Questions about these terms — or anything else? Email{' '}
        <a href="mailto:info@zaheer.studio">info@zaheer.studio</a>.
      </p>
    </VerticalLegalPage>
  )
}
