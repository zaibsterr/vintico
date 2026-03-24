import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Vintico Digital Hub",
  description:
    "Learn how Vintico Digital Hub collects, uses, and safeguards your personal information. We never sell your data under any circumstances.",
};

export default function PrivacyPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero */}
      <section className="border-b">
        <div className="mx-auto max-w-4xl px-6 py-16 sm:py-20">
          <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            Legal
          </p>
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
            Privacy Policy
          </h1>
          <p className="mt-4 text-muted-foreground leading-relaxed max-w-2xl">
            At Vintico Digital Hub, we take your privacy seriously. This policy
            explains in plain language what information we collect, why we
            collect it, and the measures we take to keep it safe. We encourage
            you to read this document in full so you understand your rights and
            our obligations.
          </p>
          <p className="mt-4 text-sm text-muted-foreground">
            <strong>Effective Date:</strong> August 24, 2025
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="mx-auto max-w-4xl px-6 py-16">
        <div className="space-y-12">

          {/* 1 */}
          <div>
            <h2 className="text-xl font-bold tracking-tight mb-3">
              1. Our Commitment to Your Privacy
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-3">
              Vintico Digital Hub is built on the principle that your personal
              data belongs to you. We operate under strict internal policies
              that govern how information is handled across every department and
              service module.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed font-semibold">
              We do not sell, rent, lease, or trade your personal information to
              any third party under any circumstances. This is a core commitment
              that applies regardless of business conditions, partnerships, or
              market changes.
            </p>
          </div>

          {/* 2 */}
          <div>
            <h2 className="text-xl font-bold tracking-tight mb-3">
              2. Information We Collect
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-3">
              We collect only the information necessary to deliver and improve
              our services. The categories of data we handle include the
              following.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed mb-2">
              Account details such as your name, email address, and password are
              collected when you register. If you choose to complete your
              profile, we may also store your business name, job title, and
              preferences.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed mb-2">
              Usage information is gathered automatically as you interact with
              the platform. This includes pages visited, features used,
              timestamps, browser type, operating system, and device
              identifiers. This data helps us understand how the platform is
              used and where we can make improvements.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed mb-2">
              Payment information is processed securely through Stripe, our
              third-party payment provider. We do not store complete credit card
              numbers, CVV codes, or banking credentials on our servers at any
              time.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Communications you send to us through the contact form, email, or
              support channels are stored so we can respond effectively and
              maintain a record of your inquiry.
            </p>
          </div>

          {/* 3 */}
          <div>
            <h2 className="text-xl font-bold tracking-tight mb-3">
              3. How We Use Your Information
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-3">
              The information we collect serves specific, legitimate purposes
              directly related to operating and improving Vintico Digital Hub.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed mb-2">
              We use your data to provide, maintain, and enhance the platform
              and all of its service modules. This includes processing
              transactions, delivering purchase confirmations, and generating
              invoices.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed mb-2">
              We send technical notices, platform updates, and security alerts
              when they are relevant to your account. We also use your contact
              information to respond to support requests, questions, and
              feedback.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed mb-2">
              Usage patterns are analyzed in aggregate to identify trends,
              measure platform performance, and improve the overall user
              experience. We may also use this data to detect and prevent
              fraudulent activity or unauthorized access.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              We never use your information for purposes unrelated to the
              services described in this policy, and we never share it with
              advertisers or data brokers.
            </p>
          </div>

          {/* 4 */}
          <div>
            <h2 className="text-xl font-bold tracking-tight mb-3">
              4. When We Share Information
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-3">
              Your data is shared only in limited, clearly defined situations.
              In every case, the minimum amount of information necessary is
              disclosed.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed mb-2">
              Trusted service providers who help us operate the platform may
              receive access to certain data. These providers include our
              hosting infrastructure, payment processor, authentication service,
              and communication tools. Each provider is bound by confidentiality
              agreements and is prohibited from using your data for any purpose
              other than delivering their contracted service.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed mb-2">
              We may disclose information when required to do so by law,
              regulation, court order, or governmental request. We may also
              share information if we believe in good faith that disclosure is
              necessary to protect the rights, property, or safety of Vintico,
              our users, or the public.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              In the event of a merger, acquisition, or sale of company assets,
              user data may be transferred as part of that transaction. If such
              a transfer occurs, the acquiring entity will be required to honor
              this Privacy Policy.
            </p>
          </div>

          {/* 5 */}
          <div>
            <h2 className="text-xl font-bold tracking-tight mb-3">
              5. Data Security
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-3">
              Protecting your information is a top priority. We employ multiple
              layers of security to ensure your data remains confidential and
              intact.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed mb-2">
              All data at rest is encrypted using AES-256, and all data in
              transit is protected with TLS 1.3. Our infrastructure undergoes
              regular security audits and penetration testing conducted by
              independent third parties.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed mb-2">
              Access to internal systems is governed by role-based controls, and
              all administrative access requires multi-factor authentication. We
              maintain logging and monitoring systems that detect and alert on
              suspicious activity in real time.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              While no system can guarantee absolute security, we are committed
              to applying industry best practices and continuously improving our
              security posture.
            </p>
          </div>

          {/* 6 */}
          <div>
            <h2 className="text-xl font-bold tracking-tight mb-3">
              6. Data Retention and Deletion
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-2">
              We retain your personal data only for as long as your account is
              active or as needed to provide you with our services. When you
              request account deletion, we will remove all personal data
              associated with your account within 30 calendar days.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Certain records may be retained beyond this period if required by
              law, such as financial transaction records or data needed to
              resolve an ongoing dispute. In those cases, the data is kept in a
              restricted state and is not used for any other purpose.
            </p>
          </div>

          {/* 7 */}
          <div>
            <h2 className="text-xl font-bold tracking-tight mb-3">
              7. Your Rights
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-3">
              Depending on your location and applicable regulations, you may
              have the following rights regarding your personal data.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed mb-2">
              You may request access to a copy of the personal data we hold
              about you. You may ask us to correct any inaccurate or incomplete
              information. You have the right to request deletion of your data,
              subject to any legal retention obligations.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed mb-2">
              You may request a portable copy of your data in a commonly used,
              machine-readable format. You also have the right to object to
              certain types of processing or to request that processing be
              restricted in specific circumstances.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              To exercise any of these rights, please reach out to us at
              support@vintico.site. We will respond to all valid requests within
              30 days.
            </p>
          </div>

          {/* 8 */}
          <div>
            <h2 className="text-xl font-bold tracking-tight mb-3">
              8. Cookies and Tracking Technologies
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-2">
              Vintico Digital Hub uses essential cookies to maintain your
              session, remember your preferences, and ensure the platform
              functions correctly. We may also use analytics cookies to
              understand usage patterns and improve platform performance.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              You can manage your cookie preferences through your browser
              settings at any time. Disabling essential cookies may affect the
              functionality of certain features. We do not use cookies for
              advertising or behavioral targeting purposes.
            </p>
          </div>

          {/* 9 */}
          <div>
            <h2 className="text-xl font-bold tracking-tight mb-3">
              9. Third-Party Integrations
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-2">
              Our platform integrates with several third-party services to
              deliver its full range of functionality. These include Clerk for
              authentication, Stripe for payment processing, Supabase for
              database management, and Twilio for communication services.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Each of these providers operates under its own privacy policy. We
              select integration partners carefully and require that they meet
              our standards for data protection. We encourage you to review
              their respective policies for additional detail.
            </p>
          </div>

          {/* 10 */}
          <div>
            <h2 className="text-xl font-bold tracking-tight mb-3">
              10. Children&apos;s Privacy
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Vintico Digital Hub is designed for business professionals and is
              not intended for use by individuals under the age of 18. We do not
              knowingly collect personal information from minors. If we become
              aware that a minor has provided us with personal data, we will
              take prompt steps to delete that information.
            </p>
          </div>

          {/* 11 */}
          <div>
            <h2 className="text-xl font-bold tracking-tight mb-3">
              11. Updates to This Policy
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              We may revise this Privacy Policy from time to time to reflect
              changes in our practices, technologies, or legal requirements. When
              we make material changes, we will update the effective date at the
              top of this page and, for active subscribers, send a notification
              by email. Your continued use of the platform after a revision
              indicates your acceptance of the updated policy.
            </p>
          </div>

          {/* 12 */}
          <div>
            <h2 className="text-xl font-bold tracking-tight mb-3">
              12. How to Contact Us
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-2">
              If you have questions, concerns, or requests related to this
              Privacy Policy or the way we handle your data, we welcome you to
              get in touch.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Email: support@vintico.site
              <br />
              You can also reach us through the Contact Us page on our website.
            </p>
          </div>

        </div>

        <div className="mt-16 pt-8 border-t text-center">
          <p className="text-sm text-muted-foreground">
            Questions about our privacy practices?{" "}
            <Link
              href="/contact"
              className="font-medium text-foreground underline underline-offset-4 hover:text-foreground/80 transition-colors"
            >
              Contact us
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}
