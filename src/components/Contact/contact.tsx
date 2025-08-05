import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'motion/react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
// React hooks
import { useState } from 'react';
// icons
import { Rocket } from 'lucide-react';
// form
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { ShimmerButton } from '../magicui/shimmer-button';
// query
import { useSendEmail } from '@/hooks/use-send-email';
import { useVerifyRecaptcha } from '@/hooks/use-verify-recaptcha';
import { useEffect } from 'react';

// Declare global for Google reCAPTCHA with proper typing
declare global {
  interface Window {
    grecaptcha: {
      ready: (callback: () => void) => void;
      execute: (
        siteKey: string,
        options: { action: string }
      ) => Promise<string>;
    };
  }
}

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters.',
  }),
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
  subject: z.string().min(5, {
    message: 'Subject must be at least 5 characters.',
  }),
  message: z.string().min(10, {
    message: 'Message must be at least 10 characters.',
  }),
});

export function Contact() {
  const [particles, setParticles] = useState<
    Array<{
      id: number;
      left: number;
      top: number;
      delay: number;
      duration: number;
    }>
  >([]);

  // Generate particles only on client-side to avoid hydration mismatch
  useEffect(() => {
    const newParticles = Array.from({ length: 100 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 3,
      duration: 2 + Math.random() * 2,
    }));
    setParticles(newParticles);
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
  });

  // useEffect to load reCAPTCHA script
  useEffect(() => {
    // Only load if not already loaded
    if (!window.grecaptcha) {
      const script = document.createElement('script');
      script.src = `https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`;
      script.async = true;
      script.defer = true;

      document.head.appendChild(script);

      return () => {
        // Cleanup script when component unmounts
        if (document.head.contains(script)) {
          document.head.removeChild(script);
        }
      };
    }
  }, []);

  // TANSTACK QUERY MUTATION: Send email mutation
  const sendEmailMutation = useSendEmail({
    setError: form.setError,
    reset: form.reset,
  });

  // TANSTACK QUERY MUTATION: reCAPTCHA verification mutation
  const recaptchaVerificationMutation = useVerifyRecaptcha({
    onVerificationSuccess: async () => {
      // Get the current form data
      const formData = form.getValues();
      // Send email after successful reCAPTCHA verification
      await sendEmailMutation.mutateAsync(formData);
    },

    onVerificationError: () => {
      form.setError('root', {
        type: 'manual',
        message: 'Security verification failed. Please try again.',
      });
    },
  });

  // isSubmitting state to disable button during submission
  const isSubmitting =
    sendEmailMutation.isPending || recaptchaVerificationMutation.isPending;

  async function onSubmit() {
    try {
      const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
      if (!siteKey) {
        throw new Error('reCAPTCHA site key not configured');
      }

      if (!window.grecaptcha) {
        throw new Error('reCAPTCHA not loaded');
      }

      console.log('🔄 Executing reCAPTCHA...');

      // First, get the reCAPTCHA token
      const token = await new Promise<string>((resolve, reject) => {
        window.grecaptcha.ready(() => {
          console.log('✅ reCAPTCHA ready');
          window.grecaptcha
            .execute(siteKey, {
              action: 'submit',
            })
            .then((token: string) => {
              resolve(token);
            })
            .catch((error) => {
              console.error('❌ Token generation failed:', error);
              reject(error);
            });
        });
      });

      console.log('🔄 Verifying token...');
      // Verify the token using TanStack Query
      await recaptchaVerificationMutation.mutateAsync({ token });
    } catch (error) {
      console.error('❌ Form submission error:', error);

      // Set appropriate error message
      if (error instanceof Error) {
        if (error.message.includes('reCAPTCHA')) {
          form.setError('root', {
            type: 'manual',
            message: 'Security verification failed. Please try again.',
          });
        } else {
          form.setError('root', {
            type: 'manual',
            message: 'Failed to send your message. Please try again later.',
          });
        }
      }
    }
  }

  return (
    <section
      id='contact'
      className='min-h-screen w-full flex flex-col items-start justify-start p-4 md:px-15 lg:px-40 md:py-5'
    >
      {/* TITLE */}
      <Link href={`#contact`}>
        <h2 className='relative text-3xl md:text-4xl font-bold text-white mb-6 group cursor-pointer'>
          <span className='text-slate-700'>#</span> Contact
          {/* Animated underline */}
          <span className='absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-400 to-sky-500 transition-all duration-300 ease-out group-hover:w-full'></span>
        </h2>
      </Link>

      {/* CONTENT HERE */}
      <motion.div
        className='relative flex flex-1 flex-col p-4 md:p-8 border border-slate-500 rounded-xl items-center justify-center gap-4 w-full'
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true, amount: 0.2 }}
        variants={{
          hidden: {
            opacity: 0,
            scale: 0.95,
            y: 30,
          },
          visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: {
              duration: 0.8,
              ease: [0.25, 0.46, 0.45, 0.94],
              staggerChildren: 0.3,
            },
          },
        }}
      >
        <motion.div
          variants={{
            hidden: {
              opacity: 0,
              y: 50,
              scale: 0.95,
            },
            visible: {
              opacity: 1,
              y: 0,
              scale: 1,
              transition: {
                duration: 0.6,
                ease: [0.25, 0.46, 0.45, 0.94],
              },
            },
          }}
        >
          <Card className='relative p-0 max-w-[700px] w-full border z-30 bg-black/10 backdrop-blur-xs border-white/50 shadow-xl shadow-black/20'>
            <div className='px-2 py-10 md:p-6 transition-colors rounded-xl duration-300 bg-[image:radial-gradient(50%_60%_at_10%_-10%,hsl(195,9%,79%,0.5),transparent),radial-gradient(50%_60%_at_100%_110%,hsl(195,9%,79%,0.5),transparent)]'>
              <CardHeader className=''>
                <CardTitle className='text-4xl font-bold text-center animate-gradient-x'>
                  Get in Touch
                </CardTitle>
              </CardHeader>
              <CardContent className='flex flex-col gap-6 text-slate-200'>
                <CardDescription className='text-sm md:text-base text-slate-300 text-center'>
                  Whether you have a question, want to collaborate, or just want
                  to say hi, feel free to reach out!
                </CardDescription>

                {/* Contact Form */}
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className='space-y-4'
                  >
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                      <FormField
                        control={form.control}
                        name='name'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className='text-sm font-medium text-slate-200'>
                              Name
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder='Your name'
                                className='bg-black/80 border-slate-600 text-white max-md:text-sm placeholder:text-slate-400 focus:border-indigo-400'
                                {...field}
                              />
                            </FormControl>
                            <FormMessage className='text-red-400' />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name='email'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className='text-sm font-medium text-slate-200'>
                              Email
                            </FormLabel>
                            <FormControl>
                              <Input
                                type='email'
                                placeholder='your.email@example.com'
                                className='bg-black/80 border-slate-600 text-white max-md:text-sm placeholder:text-slate-400 focus:border-emerald-400'
                                {...field}
                              />
                            </FormControl>
                            <FormMessage className='text-red-400' />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* SUBJECT FIELD */}
                    <FormField
                      control={form.control}
                      name='subject'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className='text-sm font-medium text-slate-200'>
                            Subject
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder='What would you like to discuss?'
                              className='bg-black/80 border-slate-600 text-white max-md:text-sm placeholder:text-slate-400 focus:border-indigo-400'
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className='text-red-400' />
                        </FormItem>
                      )}
                    />

                    {/* MESSAGE FIELD */}
                    <FormField
                      control={form.control}
                      name='message'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className='text-sm font-medium text-slate-200'>
                            Message
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder='Tell me about your project or idea...'
                              rows={4}
                              className='bg-black/80 border-slate-600 text-white max-md:text-sm placeholder:text-slate-400 resize-none'
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className='text-red-400' />
                        </FormItem>
                      )}
                    />

                    {/* SUBMIT BUTTON */}
                    <div className='flex justify-center pt-4'>
                      <ShimmerButton
                        type='submit'
                        disabled={isSubmitting}
                        shimmerColor='#6ee7b7'
                        className='relative z-20 shadow-2xl p-0 px-4 py-2 rounded-xl border border-slate-500 disabled:opacity-50 bg-gradient-to-br transition-all duration-300'
                      >
                        <Rocket className='w-4 h-4 mr-2 text-emerald-300' />
                        <p className='bg-gradient-to-r from-teal-400 via-sky-300 to-sky-400 bg-clip-text text-transparent'>
                          {!isSubmitting ? 'Send Message' : 'Sending...'}
                        </p>
                      </ShimmerButton>
                    </div>

                    {/* gRECAPTCHA message */}
                    <p className='text-xs text-center text-slate-400 pt-2'>
                      This site is protected by reCAPTCHA and the Google{' '}
                      <Link
                        href='https://policies.google.com/privacy'
                        className='text-brand-accent-300 hover:text-brand-accent-400 underline transition-colors duration-300'
                      >
                        Privacy Policy
                      </Link>{' '}
                      and{' '}
                      <Link
                        href='https://policies.google.com/terms'
                        className='text-brand-accent-300 hover:text-brand-accent-400 underline transition-colors duration-300'
                      >
                        Terms of Service
                      </Link>{' '}
                      apply.
                    </p>
                  </form>
                </Form>
              </CardContent>
            </div>
          </Card>
        </motion.div>

        {/* Background Particles */}
        <motion.div
          className='absolute inset-0 overflow-hidden z-10'
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { duration: 1, delay: 0.2 },
            },
          }}
        >
          {particles.length > 0 &&
            particles.map((particle) => (
              <motion.div
                key={particle.id}
                className='absolute w-1 h-1 bg-white rounded-full'
                style={{
                  left: `${particle.left}%`,
                  top: `${particle.top}%`,
                }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                }}
                transition={{
                  duration: particle.duration,
                  repeat: Infinity,
                  delay: particle.delay,
                  ease: 'easeInOut',
                }}
              />
            ))}
        </motion.div>

        {/* Moon image at the very bottom of the div */}
        <motion.div
          className='absolute inset-0'
          variants={{
            hidden: { opacity: 0, scale: 1.1 },
            visible: {
              opacity: 1,
              scale: 1,
              transition: { duration: 1, delay: 0.3 },
            },
          }}
        >
          <Image
            src='/images/moon_1.webp'
            alt='Moon'
            fill
            className='object-cover object-bottom rounded-xl z-20'
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
