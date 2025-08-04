import { useQuery } from '@tanstack/react-query';

// Type definitions for Spotify API response
interface SpotifyTrack {
  name: string;
  artists: Array<{ name: string }>;
  album: {
    name: string;
    images: Array<{ url: string; height: number; width: number }>;
  };
  external_urls: {
    spotify: string;
  };
}

interface SpotifyRecentlyPlayedResponse {
  items: Array<{
    track: SpotifyTrack;
    played_at: string;
  }>;
}

interface SpotifyError {
  message: string;
  details?: string;
}

// custom hook for fetching Spotify last played track
export const useSpotifyLastPlayed = () => {
  return useQuery<SpotifyRecentlyPlayedResponse, SpotifyError>({
    queryKey: ['spotify-last-played'],
    queryFn: async () => {
      const response = await fetch('/api/spotify-last-played');

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch Spotify data');
      }

      return response.json();
    },
    refetchIntervalInBackground: true, // Keep the data fresh in the background
    refetchInterval: 1 * 60 * 1000, // Refetch every 1 minute
    retry: 3, // TanStack Query will retry 3 times with exponential backoff
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000), // Exponential backoff, max 30s
  });
};

// helper hook to get the formatted last played track data
export const useFormattedSpotifyTrack = () => {
  const { data, isLoading, error, isError } = useSpotifyLastPlayed();

  const lastTrack = data?.items?.[0];

  return {
    track: lastTrack
      ? {
          name: lastTrack.track.name,
          artist: lastTrack.track.artists
            .map((artist) => artist.name)
            .join(', '),
          album: lastTrack.track.album.name,
          image: lastTrack.track.album.images[0]?.url || null,
          spotifyUrl: lastTrack.track.external_urls.spotify,
        }
      : null,
    isLoading,
    error,
    isError,
  };
};
