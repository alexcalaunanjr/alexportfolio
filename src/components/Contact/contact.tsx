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
import { Button } from '@/components/ui/button';
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
// magic ui card
import { MagicCard } from '../magicui/magic-card';
// particles
import { ParticlesComponent } from '@/lib/particles/Particles';
import { contactOption } from '@/lib/particles/contactOption';
// icons
import { Send } from 'lucide-react';
// form
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

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
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // TODO: Handle form submission
    console.log(values);
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
          <Card className='relative p-0 max-w-[700px] w-full border-none z-30 bg-transparent'>
            <MagicCard
              gradientColor='#4D4D4D'
              gradientOpacity={1000}
              gradientFrom='#34d399'
              gradientTo='#7dd3fc'
              className='px-2 py-6 md:p-6 border border-slate-500 transition-colors duration-300'
            >
              <CardHeader className=''>
                <CardTitle className='text-4xl font-bold text-center'>
                  Get in Touch
                </CardTitle>
              </CardHeader>
              <CardContent className='flex flex-col gap-6 text-slate-200'>
                <CardDescription className='text-sm text-slate-300 text-center'>
                  I&apos;m always open to discussing new projects, creative
                  ideas, or opportunities to be part of your vision. Whether you
                  have a question, want to collaborate, or just want to say hi,
                  feel free to reach out!
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
                                className='bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-indigo-400'
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
                                className='bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-emerald-400'
                                {...field}
                              />
                            </FormControl>
                            <FormMessage className='text-red-400' />
                          </FormItem>
                        )}
                      />
                    </div>

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
                              className='bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-indigo-400'
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className='text-red-400' />
                        </FormItem>
                      )}
                    />

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
                              className='bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400 resize-none'
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className='text-red-400' />
                        </FormItem>
                      )}
                    />

                    <div className='flex justify-end'>
                      <Button
                        type='submit'
                        className='relative z-20 shadow-2xl rounded-xl border border-slate-500 bg-gradient-to-br from-emerald-600 to-sky-600 hover:from-emerald-500 hover:to-sky-500 transition-all duration-300 before:absolute before:inset-0 before:-z-10 before:rounded-xl before:bg-gradient-to-r before:from-emerald-400 before:via-sky-400 before:to-teal-500 before:opacity-100 before:blur-sm hover:before:opacity-100 hover:before:-inset-1 hover:before:blur-md before:transition-all before:duration-300'
                      >
                        <Send className='w-4 h-4 mr-2' />
                        Send Message
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </MagicCard>
          </Card>
        </motion.div>

        {/* Background Particles */}
        <motion.div
          className='absolute left-0 right-0 h-full z-10'
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { duration: 1, delay: 0.5 },
            },
          }}
        >
          <ParticlesComponent options={contactOption} id={'tsparticles2'} />
        </motion.div>

        {/* Moon image at the very bottom of the div */}
        <motion.div
          className='absolute inset-0'
          variants={{
            hidden: { opacity: 0, scale: 1.1 },
            visible: {
              opacity: 1,
              scale: 1,
              transition: { duration: 1.2, delay: 0.2 },
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
