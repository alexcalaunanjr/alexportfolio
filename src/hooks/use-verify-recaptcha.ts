import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

// Interface for reCAPTCHA verification data
interface VerifyRecaptchaData {
  token: string;
}

// Interface for reCAPTCHA verification response
interface VerifyRecaptchaResponse {
  success: boolean;
  score?: number;
  error?: string;
}

// API function to verify reCAPTCHA
export const verifyRecaptcha = async (
  data: VerifyRecaptchaData
): Promise<VerifyRecaptchaResponse> => {
  try {
    const response = await fetch('/api/verify-recaptcha', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    // Parse JSON response
    let result: VerifyRecaptchaResponse;
    try {
      result = await response.json();
    } catch {
      throw new Error(`HTTP ${response.status}: Failed to parse response`);
    }

    if (!response.ok) {
      throw new Error(
        result.error || `HTTP ${response.status}: reCAPTCHA verification failed`
      );
    }

    return result;
  } catch (error) {
    console.error('reCAPTCHA verification error:', error);
    throw error instanceof Error ? error : new Error('Unknown error occurred');
  }
};

// Hook props interface
interface UseVerifyRecaptchaProps {
  onVerificationSuccess?: (data: VerifyRecaptchaResponse) => void;
  onVerificationError?: (error: Error) => void;
}

// Custom hook for reCAPTCHA verification
export const useVerifyRecaptcha = ({
  onVerificationSuccess,
  onVerificationError,
}: UseVerifyRecaptchaProps = {}) => {
  return useMutation({
    mutationFn: verifyRecaptcha,
    onSuccess: (data) => {
      onVerificationSuccess?.(data);
    },
    onError: (error: Error) => {
      console.error('reCAPTCHA verification failed:', error);
      toast.error('Security verification failed. Please try again.', {
        action: {
          label: 'Close',
          onClick: () => {
            toast.dismiss();
          }
        }
      });
      onVerificationError?.(error);
    },
  });
};
