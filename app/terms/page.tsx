import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions | Vintico Digital Hub",
  description:
    "Review the terms and conditions that govern your use of Vintico Digital Hub, a professional SaaS platform for business management.",
};

export default function TermsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero */}
      <section className="border-b">
        <div className="mx-auto max-w-4xl px-6 py-16 sm:py-20">
          <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            Legal
          </p>
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
            Terms &amp; Conditions
          </h1>
          <p className="mt-4 text-muted-foreground leading-relaxed max-w-2xl">
            These Terms and Conditions form a binding agreement between you and
            Vintico Digital Hub. Please read them carefully before accessing or
            using our platform. By creating an account or using any of our
            services, you confirm that you have read, understood, and agreed to
            these terms in full.
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
              1. Agreement to Terms
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-2">
              By accessing or using the Vintico Digital Hub platform, you agree
              to be bound by these Terms and Conditions along with our Privacy
              Policy, which is incorporated by reference. If you do not agree
              with any part of these terms, you must not use the platform.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              By creating an account, you confirm that you are at least 18 years
              old and that you have the legal authority to enter into this
              agreement on behalf of yourself or the organization you represent.
            </p>
          </div>

          {/* 2 */}
          <div>
            <h2 className="text-xl font-bold tracking-tight mb-3">
              2. Platform and Services
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-2">
              Vintico Digital Hub is a cloud-based software-as-a-service
              platform that provides integrated business management tools. The
              platform currently includes five core service modules: Quote Nudge
              for quote management and follow-up automation, Distill Guard for
              compliance and license monitoring, Leave Guard for employee leave
              management, Cyber Guard for cybersecurity threat detection, and
              Vintico Pulse for business analytics and performance tracking.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              We may introduce new modules, modify existing ones, or
              discontinue features at our discretion. When material changes
              affect active subscribers, we will provide reasonable advance
              notice.
            </p>
          </div>

          {/* 3 */}
          <div>
            <h2 className="text-xl font-bold tracking-tight mb-3">
              3. Account Registration and Security
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-2">
              To access the platform, you must create an account using accurate
              and complete information. You are responsible for keeping your
              registration details current and for maintaining the
              confidentiality of your login credentials.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed mb-2">
              You accept full responsibility for all activity that occurs under
              your account, whether or not you have authorized it. If you become
              aware of any unauthorized access or suspicious activity, you must
              notify us immediately at support@vintico.site.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              We reserve the right to suspend or terminate any account that we
              reasonably believe to be fraudulent, compromised, or in violation
              of these terms.
            </p>
          </div>

          {/* 4 */}
          <div>
            <h2 className="text-xl font-bold tracking-tight mb-3">
              4. Subscriptions and Payment
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-2">
              Certain features of the platform require a paid subscription. By
              subscribing, you agree to pay all applicable fees at the rates
              displayed at the time of purchase. Payments are processed securely
              through Stripe, and by subscribing you authorize recurring charges
              to your designated payment method.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed mb-2">
              Subscription fees are billed in advance on a recurring basis. All
              fees are non-refundable except where required by applicable law or
              as specifically stated in a separate refund policy.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              We may adjust subscription pricing from time to time. Any pricing
              changes will take effect no earlier than 30 days after we provide
              notice. Continued use of the platform following a price adjustment
              constitutes your acceptance of the new pricing.
            </p>
          </div>

          {/* 5 */}
          <div>
            <h2 className="text-xl font-bold tracking-tight mb-3">
              5. Acceptable Use
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-2">
              You agree to use the platform only for lawful purposes and in
              accordance with these terms. You must not use the platform to
              violate any applicable law or regulation, transmit harmful or
              offensive material, attempt to gain unauthorized access to any
              system or account, or interfere with the normal operation of the
              platform.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed mb-2">
              You must not upload malicious code, use automated tools such as
              bots or scrapers without our written permission, send unsolicited
              communications through the platform, or reverse engineer any part
              of our software.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              We reserve the right to investigate any suspected violation and to
              take appropriate action, including immediate account termination,
              without prior notice.
            </p>
          </div>

          {/* 6 */}
          <div>
            <h2 className="text-xl font-bold tracking-tight mb-3">
              6. Intellectual Property
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-2">
              The platform, including all original content, features,
              functionality, software, design elements, and branding, is the
              exclusive property of Vintico and is protected by copyright,
              trademark, and other intellectual property laws. You may not copy,
              modify, distribute, or create derivative works based on any part
              of the platform without our prior written consent.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed mb-2">
              The Vintico name, logo, and all related product names are
              registered trademarks. Use of these marks without written
              authorization is strictly prohibited.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Any content you upload or create through the platform remains your
              property. By uploading content, you grant Vintico a limited,
              non-exclusive license to store, process, and display that content
              solely as necessary to deliver the services you have requested.
            </p>
          </div>

          {/* 7 */}
          <div>
            <h2 className="text-xl font-bold tracking-tight mb-3">
              7. Data Protection and Privacy
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-2">
              Your use of the platform is subject to our Privacy Policy, which
              describes how we collect, use, and protect your personal
              information. By using the platform, you acknowledge and consent to
              the practices outlined in that policy.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              We implement industry-standard security measures including
              encryption, access controls, and continuous monitoring. However,
              you acknowledge that no method of electronic storage or
              transmission can be guaranteed to be completely secure.
            </p>
          </div>

          {/* 8 */}
          <div>
            <h2 className="text-xl font-bold tracking-tight mb-3">
              8. Service Availability
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-2">
              We make commercially reasonable efforts to maintain high
              availability of the platform at all times. However, we do not
              guarantee uninterrupted service. Downtime may occur due to
              scheduled maintenance, emergency security updates, or
              circumstances beyond our reasonable control such as natural
              disasters, utility failures, or third-party service disruptions.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              For paid subscribers, our target uptime is 99.9 percent.
              Enterprise customers may request detailed service level agreement
              documentation by contacting our support team.
            </p>
          </div>

          {/* 9 */}
          <div>
            <h2 className="text-xl font-bold tracking-tight mb-3">
              9. Limitation of Liability
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-2">
              The platform is provided on an as-is and as-available basis. To
              the fullest extent permitted by law, Vintico disclaims all
              warranties, whether express or implied, including warranties of
              merchantability, fitness for a particular purpose, and
              non-infringement.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed mb-2">
              Vintico shall not be liable for any indirect, incidental, special,
              consequential, or punitive damages arising from your use of or
              inability to use the platform, including but not limited to loss
              of revenue, data, or business opportunity.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              In no event shall our total liability for all claims related to
              the platform exceed the aggregate amount you have paid to Vintico
              during the twelve months immediately preceding the event giving
              rise to the claim. These limitations apply regardless of the legal
              theory under which a claim is made.
            </p>
          </div>

          {/* 10 */}
          <div>
            <h2 className="text-xl font-bold tracking-tight mb-3">
              10. Indemnification
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              You agree to indemnify, defend, and hold harmless Vintico, its
              officers, directors, employees, and agents from and against any
              claims, damages, losses, liabilities, costs, and expenses,
              including reasonable legal fees, arising from or related to your
              use of the platform, your violation of these terms, your
              infringement of any third-party rights, or any content you upload,
              submit, or transmit through the platform.
            </p>
          </div>

          {/* 11 */}
          <div>
            <h2 className="text-xl font-bold tracking-tight mb-3">
              11. Termination
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-2">
              You may cancel your account at any time through your account
              settings or by contacting us at support@vintico.site. Upon
              cancellation, your access to the platform will end at the close of
              your current billing period.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed mb-2">
              We may suspend or terminate your access if you violate these terms
              or engage in conduct that we determine, in our sole discretion, to
              be harmful to the platform, other users, or third parties. Where
              practicable, we will provide notice before taking such action.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Following termination, we will retain your data for 30 days to
              allow you to export it. After that period, all personal data
              associated with your account will be permanently deleted unless
              retention is required by law.
            </p>
          </div>

          {/* 12 */}
          <div>
            <h2 className="text-xl font-bold tracking-tight mb-3">
              12. Governing Law and Dispute Resolution
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-2">
              These terms are governed by and construed in accordance with the
              laws of the jurisdiction in which Vintico is incorporated, without
              regard to its conflict of law provisions.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Any dispute arising from or relating to these terms or the
              platform shall first be addressed through good-faith negotiation.
              If a resolution is not reached within 30 days, the dispute shall
              be submitted to binding arbitration under applicable arbitration
              rules, except where you are eligible to bring a claim in small
              claims court.
            </p>
          </div>

          {/* 13 */}
          <div>
            <h2 className="text-xl font-bold tracking-tight mb-3">
              13. Modifications to These Terms
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-2">
              We reserve the right to update or modify these terms at any time.
              When material changes are made, we will revise the effective date
              at the top of this page and notify active subscribers by email.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Your continued use of the platform after any modification
              constitutes your acceptance of the revised terms. If you do not
              agree with the changes, you should stop using the platform and
              contact us to close your account.
            </p>
          </div>

          {/* 14 */}
          <div>
            <h2 className="text-xl font-bold tracking-tight mb-3">
              14. Severability
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              If any provision of these terms is found to be unenforceable or
              invalid by a court of competent jurisdiction, that provision will
              be limited or removed to the minimum extent necessary, and the
              remaining provisions will continue in full force and effect.
            </p>
          </div>

          {/* 15 */}
          <div>
            <h2 className="text-xl font-bold tracking-tight mb-3">
              15. Contact Information
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-2">
              If you have questions or concerns about these Terms and
              Conditions, we are here to help.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Email: support@vintico.site
              <br />
              You may also reach us through the Contact Us page on our website.
            </p>
          </div>

        </div>

        <div className="mt-16 pt-8 border-t text-center">
          <p className="text-sm text-muted-foreground">
            Have questions about our terms?{" "}
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
