import { AppShell } from '../components/AppShell'
import { Mail, Phone, MessageCircle, FileText, HelpCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function HelpContactPage() {
  return (
    <AppShell>
      <div className="space-y-8">
        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-bold text-stone-900 dark:text-stone-100 mb-2">
            Help & Contact
          </h1>
          <p className="text-stone-600 dark:text-stone-400">
            Get help with bookings, find answers to common questions, or contact support.
          </p>
        </div>

        {/* Contact Methods */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border border-stone-200 dark:border-stone-700 rounded-lg p-6 bg-white dark:bg-stone-900">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-[#E6EEF7] dark:bg-stone-800 flex items-center justify-center">
                <Mail className="w-5 h-5 text-[#33649E]" />
              </div>
              <div>
                <h3 className="font-semibold text-stone-900 dark:text-stone-100">Email</h3>
                <p className="text-sm text-stone-600 dark:text-stone-400">Send us an email</p>
              </div>
            </div>
            <p className="text-sm text-stone-600 dark:text-stone-400 mb-4">
              support@digilist.no
            </p>
            <Button
              variant="outline"
              className="w-full"
            >
              <Mail className="w-4 h-4 mr-2" />
              Send Email
            </Button>
          </div>

          <div className="border border-stone-200 dark:border-stone-700 rounded-lg p-6 bg-white dark:bg-stone-900">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-[#E6EEF7] dark:bg-stone-800 flex items-center justify-center">
                <Phone className="w-5 h-5 text-[#33649E]" />
              </div>
              <div>
                <h3 className="font-semibold text-stone-900 dark:text-stone-100">Phone</h3>
                <p className="text-sm text-stone-600 dark:text-stone-400">Call us directly</p>
              </div>
            </div>
            <p className="text-sm text-stone-600 dark:text-stone-400 mb-4">
              +47 12 34 56 78
            </p>
            <p className="text-xs text-stone-500 dark:text-stone-500 mb-4">
              Monday - Friday, 9:00 - 16:00
            </p>
            <Button
              variant="outline"
              className="w-full"
            >
              <Phone className="w-4 h-4 mr-2" />
              Call Now
            </Button>
          </div>
        </div>

        {/* FAQ Section */}
        <div>
          <h2 className="text-2xl font-bold text-stone-900 dark:text-stone-100 mb-4">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {[
              {
                question: 'How do I make a booking?',
                answer: 'Search for available listings, select your preferred date and time, and complete the booking form. You will receive a confirmation email once your booking is approved.',
              },
              {
                question: 'Can I cancel my booking?',
                answer: 'Yes, you can cancel bookings that are still pending or confirmed. Cancellation policies may vary depending on the listing type and time of cancellation.',
              },
              {
                question: 'What payment methods are accepted?',
                answer: 'Payment methods vary by listing. Most bookings accept credit cards and bank transfers. Payment details will be shown during the booking process.',
              },
              {
                question: 'How do I view my booking history?',
                answer: 'Go to "My Bookings" in the navigation menu to see all your past and upcoming bookings, including their status and details.',
              },
            ].map((faq, i) => (
              <div
                key={i}
                className="border border-stone-200 dark:border-stone-700 rounded-lg p-5 bg-white dark:bg-stone-900"
              >
                <div className="flex items-start gap-3">
                  <HelpCircle className="w-5 h-5 text-[#33649E] shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-stone-900 dark:text-stone-100 mb-2">
                      {faq.question}
                    </h3>
                    <p className="text-sm text-stone-600 dark:text-stone-400">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Resources */}
        <div>
          <h2 className="text-2xl font-bold text-stone-900 dark:text-stone-100 mb-4">
            Additional Resources
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <a
              href="/privacy"
              className="border border-stone-200 dark:border-stone-700 rounded-lg p-4 hover:shadow-md transition-shadow bg-white dark:bg-stone-900 group"
            >
              <FileText className="w-6 h-6 text-stone-400 group-hover:text-[#33649E] mb-2 transition-colors" />
              <h3 className="font-semibold text-stone-900 dark:text-stone-100 mb-1">
                Privacy Policy
              </h3>
              <p className="text-sm text-stone-600 dark:text-stone-400">
                Learn how we protect your data
              </p>
            </a>
            <a
              href="/terms"
              className="border border-stone-200 dark:border-stone-700 rounded-lg p-4 hover:shadow-md transition-shadow bg-white dark:bg-stone-900 group"
            >
              <FileText className="w-6 h-6 text-stone-400 group-hover:text-[#33649E] mb-2 transition-colors" />
              <h3 className="font-semibold text-stone-900 dark:text-stone-100 mb-1">
                Terms of Service
              </h3>
              <p className="text-sm text-stone-600 dark:text-stone-400">
                Read our terms and conditions
              </p>
            </a>
            <a
              href="/accessibility"
              className="border border-stone-200 dark:border-stone-700 rounded-lg p-4 hover:shadow-md transition-shadow bg-white dark:bg-stone-900 group"
            >
              <FileText className="w-6 h-6 text-stone-400 group-hover:text-[#33649E] mb-2 transition-colors" />
              <h3 className="font-semibold text-stone-900 dark:text-stone-100 mb-1">
                Accessibility
              </h3>
              <p className="text-sm text-stone-600 dark:text-stone-400">
                Our commitment to accessibility
              </p>
            </a>
          </div>
        </div>
      </div>
    </AppShell>
  )
}
