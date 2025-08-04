import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { token } = body;

    console.log('=== reCAPTCHA Verification Debug ===');
    console.log(
      'Token received:',
      token ? `${token.substring(0, 20)}...` : 'null'
    );
    console.log('Token length:', token?.length || 0);
    console.log('Secret key present:', !!process.env.RECAPTCHA_SECRET_KEY);
    console.log(
      'Request headers:',
      Object.fromEntries(request.headers.entries())
    );

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

    console.log('🔄 Sending to Google:', verifyUrl);
    console.log('🔄 Request body keys:', Array.from(verifyBody.keys()));

    const response = await fetch(verifyUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: verifyBody,
    });

    console.log('Google response status:', response.status);
    console.log(
      'Google response headers:',
      Object.fromEntries(response.headers.entries())
    );

    const data = await response.json();

    // Enhanced logging for debugging
    console.log('=== Google reCAPTCHA Response ===');
    console.log('Success:', data.success);
    console.log('Score:', data.score);
    console.log('Action:', data.action);
    console.log('Hostname:', data.hostname);
    console.log('Challenge timestamp:', data.challenge_ts);
    console.log('Error codes:', data['error-codes']);
    console.log('Full response:', JSON.stringify(data, null, 2));

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
