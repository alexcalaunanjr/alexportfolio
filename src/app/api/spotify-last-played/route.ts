// app/api/spotify-last-played/route.ts

import { NextResponse } from 'next/server';

// These should be environment variables. Make sure they are set.
const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
let SPOTIFY_REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN; // Initial refresh token

// In-memory cache for the access token and its expiry.
// For production, especially with multiple instances of serverless functions,
// you might need a more persistent store (e.g., Redis, a small database)
// for `accessToken`, `tokenExpiry`, and `SPOTIFY_REFRESH_TOKEN` if it updates.
// For a simple portfolio on Vercel/similar, this simple in-memory cache often suffices
// because serverless functions stay "warm" for a bit, and a fresh function call
// will just re-fetch/re-refresh.
let accessToken: string | null = null;
let tokenExpiry: number = 0; // Unix timestamp in milliseconds

// Function to refresh the Spotify access token
async function refreshAccessToken(): Promise<string> {
  if (!CLIENT_ID || !CLIENT_SECRET || !SPOTIFY_REFRESH_TOKEN) {
    throw new Error(
      'Spotify API credentials or refresh token are not configured.'
    );
  }

  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      // Basic Auth header for Client Credentials and Refresh Token flows
      Authorization:
        'Basic ' +
        Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64'),
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: SPOTIFY_REFRESH_TOKEN,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error('Failed to refresh Spotify token:', errorData);
    // Important: If the refresh token itself becomes invalid (e.g., user revoked access)
    // you might need to manually re-authenticate yourself and update SPOTIFY_REFRESH_TOKEN.
    throw new Error(
      `Failed to refresh Spotify token: ${
        errorData.error_description || errorData.error
      }`
    );
  }

  const data: {
    access_token: string;
    refresh_token?: string;
    expires_in: number;
  } = await response.json();
  accessToken = data.access_token;
  tokenExpiry = Date.now() + data.expires_in * 1000; // expires_in is in seconds, convert to ms

  // If Spotify issues a new refresh token, update our stored one.
  // In a production app, you'd persist this update.
  if (data.refresh_token) {
    SPOTIFY_REFRESH_TOKEN = data.refresh_token;
    console.log(
      'Spotify sent a new refresh token. Remember to update your deployed environment variable if this is a production environment!'
    );
  }
  return accessToken;
}

// GET handler for your API route
export async function GET() {
  try {
    // Ensure tokens are available and valid
    if (!accessToken || Date.now() >= tokenExpiry) {
      console.log('Access token expired or not available. Refreshing...');
      await refreshAccessToken();
    }

    // Fetch recently played track from Spotify
    const spotifyResponse = await fetch(
      'https://api.spotify.com/v1/me/player/recently-played?limit=1',
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        cache: 'no-store', // Important for dynamic data
      }
    );

    if (spotifyResponse.status === 204) {
      // No content
      return NextResponse.json({ is_playing: false }, { status: 200 });
    }

    if (!spotifyResponse.ok) {
      const errorData = await spotifyResponse.json();
      console.error('Error fetching Spotify data:', errorData);
      return NextResponse.json(
        {
          message: 'Error from Spotify API',
          details: errorData.error?.message || errorData,
        },
        { status: spotifyResponse.status }
      );
    }

    const data = await spotifyResponse.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error('Server error in Spotify Route Handler:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return NextResponse.json(
      { message: 'Internal server error', details: errorMessage },
      { status: 500 }
    );
  }
}
