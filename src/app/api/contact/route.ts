import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

// Initialize Resend with your API key
// You'll need to add your API key to your environment variables
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, message, moveInDate } = body;
    
    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }
    
    // Format move-in date for better readability
    const formattedMoveInDate = moveInDate ? new Date(moveInDate).toLocaleDateString() : 'Not specified';
    
    // Create email content
    const emailContent = `
      <h2>New Inquiry from Steeple Lofts Website</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
      <p><strong>Desired Move-in Date:</strong> ${formattedMoveInDate}</p>
      <p><strong>Message:</strong></p>
      <p>${message.replace(/\n/g, '<br>')}</p>
    `;
    
    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: 'Steeple Lofts <noreply@steepleapartments.com>', // Update with your domain
      to: ['leasing@madisonparke.com'], // Primary recipient
      cc: [email], // Send a copy to the sender
      subject: 'New Inquiry from Steeple Lofts',
      html: emailContent,
    });
    
    if (error) {
      console.error('Resend API error:', error);
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      { success: true, message: 'Email sent successfully', data },
      { status: 200 }
    );
    
  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}