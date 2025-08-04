import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { UseFormSetError } from 'react-hook-form';

// Interface for the contact form data
export interface ContactFormData {
  name: string;
  email: string;
  message: string;
  subject?: string;
}

// Interface for the API response
interface SendEmailResponseData {
  success: boolean;
  message: string;
  data?: unknown;
}

// API function to send email
export const sendEmail = async (
  data: ContactFormData,
): Promise<SendEmailResponseData> => {
  // Destructure data
  const { name, email, message, subject } = data;

  try {
    // Execute both API calls in parallel
    const [emailResponse, contactResponse] = await Promise.all([
      // Send email
      fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          message,
          subject: subject || 'New Contact Form Submission',
        }),
      }),
      // Add contact to audience
      fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
        }),
      }),
    ]);

    // Check if email sending failed
    if (!emailResponse.ok) {
      const errorData = await emailResponse.json();
      console.error('Error sending emailzxc:', errorData.error); 

      if (errorData.error.statusCode === 403) {
        // If the error is a 403, throw a specific error
        throw new Error('Failed to send email.');
      }

      throw new Error(errorData.error.message || 'Failed to send email.'); 
    }

    // Check if contact adding failed (but don't fail the entire operation)
    if (!contactResponse.ok) {
      const contactError = await contactResponse.json();
      console.warn('Failed to add contact to audience:', contactError);
    }

    // Return the email response data
    const emailData = await emailResponse.json();
    return emailData;
  } catch (error) {
    // Ensure a single, clear error message
    if (error instanceof Error) {
      // If the error originated from an HTTP response, its message is already specific
      throw error;
    }
    // For unexpected errors
    throw new Error('An unexpected error occurred while sending your message.');
  }
};

// Hook props interface
interface UseSendEmailProps {
  onEmailSent?: (data: SendEmailResponseData) => void;
  setError: UseFormSetError<ContactFormData>;
  reset: () => void;
}

// Custom hook for sending email
export const useSendEmail = ({
  onEmailSent,
  setError,
  reset
}: UseSendEmailProps) => {
  return useMutation({
    mutationFn: sendEmail,
    onSuccess: (response) => {
      // Debug
      console.log('Email sent successfully:', response);

      // Call optional callback
      if (onEmailSent) {
        onEmailSent(response);
      }

      // Reset form
      reset();

      // Show success toast
      toast.success('Message sent successfully!', {
        description: "We'll keep you updated with the latest news.",
        action: {
          label: 'Close',
          onClick: () => {
            toast.dismiss();
          }
        }
      });
    },
    onError: (error) => {
      // Debug
      console.log('Error sending email:', error);

      // Set form error
      setError('root', {
        message: error.message || 'Failed to send email',
      });

      // Show error toast
      toast.error('Failed to send message', {
        description: error.message || 'Please try again later.',
        action: {
          label: 'Close',
          onClick: () => {
            toast.dismiss();
          }
        }
      });

      console.error('Error sending email:', error);
    },
  });
};
