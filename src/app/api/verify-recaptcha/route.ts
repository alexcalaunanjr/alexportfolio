import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { token } = body;

    if (!token) {
      console.error('❌ No token provided');
      return NextResponse.json(
        { success: false, error: 'Token is required' },
        { status: 400 }
      );
    }

    if (!process.env.RECAPTCHA_SECRET_KEY) {
      console.error('❌ No secret key in environment');
      return NextResponse.json(
        { success: false, error: 'Server configuration error' },
        { status: 500 }
      );
    }

    // Verify the token with Google's reCAPTCHA API
    const verifyUrl = 'https://www.google.com/recaptcha/api/siteverify';
    const verifyBody = new URLSearchParams({
      secret: process.env.RECAPTCHA_SECRET_KEY,
      response: token,
    });

    const response = await fetch(verifyUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: verifyBody,
    });

    const data = await response.json();

    if (data.success && data.score >= 0.5) {
      console.log('✅ Verification successful');
      return NextResponse.json({ success: true, score: data.score });
    } else {
      console.log('❌ Verification failed');
      return NextResponse.json(
        {
          success: false,
          error: 'reCAPTCHA verification failed',
          score: data.score,
          errorCodes: data['error-codes'],
          hostname: data.hostname,
          action: data.action,
        },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('❌ Exception in reCAPTCHA verification:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
