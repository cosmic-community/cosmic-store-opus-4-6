import type { Metadata } from 'next'
import ContactForm from '@/components/ContactForm'

export const metadata: Metadata = {
  title: 'Contact Us — Cosmic Store',
  description: 'Get in touch with the Cosmic Store team. We\'d love to hear from you.',
}

export default function ContactPage() {
  return (
    <div className="min-h-[calc(100vh-200px)]">
      {/* Hero */}
      <section className="bg-gray-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <div className="max-w-2xl">
            <p className="text-sm font-medium text-brand-600 uppercase tracking-wider">
              Get In Touch
            </p>
            <h1 className="mt-3 text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
              Contact Us
            </h1>
            <p className="mt-4 text-lg text-gray-500 leading-relaxed">
              Have a question, feedback, or just want to say hello? Fill out the form below and we&apos;ll get back to you as soon as possible.
            </p>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Contact Form */}
          <div className="lg:col-span-3">
            <ContactForm />
          </div>

          {/* Sidebar Info */}
          <div className="lg:col-span-2">
            <div className="sticky top-24 space-y-8">
              <div>
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">
                  Email
                </h3>
                <p className="mt-2 text-gray-600">
                  <a
                    href="mailto:tony@cosmicjs.com"
                    className="text-brand-600 hover:text-brand-700 font-medium transition-colors"
                  >
                    tony@cosmicjs.com
                  </a>
                </p>
              </div>

              <div>
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">
                  Response Time
                </h3>
                <p className="mt-2 text-gray-600 text-sm leading-relaxed">
                  We typically respond within 24–48 hours during business days.
                </p>
              </div>

              <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100">
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">
                  Powered By
                </h3>
                <p className="mt-2 text-sm text-gray-500 leading-relaxed">
                  This store is built with{' '}
                  <a
                    href="https://www.cosmicjs.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand-600 hover:text-brand-700 font-medium transition-colors"
                  >
                    Cosmic
                  </a>
                  , Next.js, and Tailwind CSS. Emails are delivered via{' '}
                  <a
                    href="https://resend.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand-600 hover:text-brand-700 font-medium transition-colors"
                  >
                    Resend
                  </a>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}