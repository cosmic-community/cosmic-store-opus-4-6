import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

interface ContactRequestBody {
  name: string
  email: string
  subject: string
  message: string
}

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export async function POST(request: NextRequest) {
  const apiKey = process.env.RESEND_API_KEY

  if (!apiKey) {
    return NextResponse.json(
      { error: 'Email service is not configured.' },
      { status: 500 }
    )
  }

  const resend = new Resend(apiKey)

  let body: ContactRequestBody

  try {
    body = (await request.json()) as ContactRequestBody
  } catch {
    return NextResponse.json(
      { error: 'Invalid request body.' },
      { status: 400 }
    )
  }

  const { name, email, subject, message } = body

  // Validate required fields
  if (!name || !email || !subject || !message) {
    return NextResponse.json(
      { error: 'All fields are required.' },
      { status: 400 }
    )
  }

  if (typeof name !== 'string' || name.trim().length === 0) {
    return NextResponse.json(
      { error: 'Name is required.' },
      { status: 400 }
    )
  }

  if (typeof email !== 'string' || !isValidEmail(email)) {
    return NextResponse.json(
      { error: 'A valid email address is required.' },
      { status: 400 }
    )
  }

  if (typeof subject !== 'string' || subject.trim().length === 0) {
    return NextResponse.json(
      { error: 'Subject is required.' },
      { status: 400 }
    )
  }

  if (typeof message !== 'string' || message.trim().length === 0) {
    return NextResponse.json(
      { error: 'Message is required.' },
      { status: 400 }
    )
  }

  try {
    const { error } = await resend.emails.send({
      from: 'tony@cosmicjs.com',
      to: 'tony@cosmicjs.com',
      replyTo: email.trim(),
      subject: `Contact Form: ${subject.trim()}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #111827; border-bottom: 2px solid #e5e7eb; padding-bottom: 12px;">
            New Contact Form Submission
          </h2>
          <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
            <tr>
              <td style="padding: 8px 12px; font-weight: 600; color: #374151; vertical-align: top; width: 100px;">Name</td>
              <td style="padding: 8px 12px; color: #111827;">${name.trim()}</td>
            </tr>
            <tr style="background-color: #f9fafb;">
              <td style="padding: 8px 12px; font-weight: 600; color: #374151; vertical-align: top;">Email</td>
              <td style="padding: 8px 12px; color: #111827;">
                <a href="mailto:${email.trim()}" style="color: #2563eb;">${email.trim()}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 8px 12px; font-weight: 600; color: #374151; vertical-align: top;">Subject</td>
              <td style="padding: 8px 12px; color: #111827;">${subject.trim()}</td>
            </tr>
            <tr style="background-color: #f9fafb;">
              <td style="padding: 8px 12px; font-weight: 600; color: #374151; vertical-align: top;">Message</td>
              <td style="padding: 8px 12px; color: #111827; white-space: pre-wrap;">${message.trim()}</td>
            </tr>
          </table>
          <p style="margin-top: 24px; font-size: 12px; color: #9ca3af;">
            Sent from the Cosmic Store contact form.
          </p>
        </div>
      `,
    })

    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json(
        { error: 'Failed to send email. Please try again.' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Email send error:', err)
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    )
  }
}