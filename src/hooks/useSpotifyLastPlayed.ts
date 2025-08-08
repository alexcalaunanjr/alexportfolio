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

// type def for currently playing response
interface SpotifyCurrentlyPlayingResponse {
  is_playing: boolean;
  item: SpotifyTrack;
  currently_playing_type: string;
}

// type def for recently played response
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

// custom hook for fetching Spotify currently playing track
export const useSpotifyCurrentlyPlaying = () => {
  return useQuery<SpotifyCurrentlyPlayingResponse, SpotifyError>({
    queryKey: ['spotify-currently-playing'],
    queryFn: async () => {
      const response = await fetch('/api/spotify-currently-playing');

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch Spotify data');
      }

      return response.json();
    },
    refetchIntervalInBackground: true,
    refetchInterval: 1 * 60 * 1000,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000), // exponential backoff
  });
};

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
    refetchIntervalInBackground: true,
    refetchInterval: 1 * 60 * 1000,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000), // exponential backoff
  });
};

// helper hook to get the formatted last played track data
export const useFormattedSpotifyTrack = () => {
  // use the custom hook to fetch currently playing track first
  const {
    data: currentlyPlayingData,
    isLoading: isCurrentlyPlayingLoading,
    error: currentlyPlayingError,
    isError: isCurrentlyPlayingError,
  } = useSpotifyCurrentlyPlaying();
  // if not, fetch the last played track
  const {
    data: lastPlayedData,
    isLoading: lastPlayedIsLoading,
    error: lastPlayedError,
    isError: lastPlayedIsError,
  } = useSpotifyLastPlayed();

  // if currently playing track is available, format it
  const currentTrack = currentlyPlayingData?.item;

  if (currentTrack) {
    return {
      track: {
        name: currentTrack.name,
        artist: currentTrack.artists.map((artist) => artist.name).join(', '),
        album: currentTrack.album.name,
        image: currentTrack.album.images[0]?.url || null,
        spotifyUrl: currentTrack.external_urls.spotify,
      },
      isLoading: isCurrentlyPlayingLoading,
      error: currentlyPlayingError,
      isError: isCurrentlyPlayingError,
      isCurrentlyPlaying: true,
    };
  }

  const lastTrack = lastPlayedData?.items?.[0];
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
    isLoading: lastPlayedIsLoading,
    error: lastPlayedError,
    isError: lastPlayedIsError,
  };
};
