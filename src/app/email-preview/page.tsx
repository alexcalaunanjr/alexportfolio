'use client';

import { EmailTemplate } from '@/components/Contact/email-template';

export default function EmailPreview() {
  // Sample data to preview the email template
  const sampleData = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    subject: 'Collaboration Opportunity',
    message: `Cool portfolio bro :)`,
  };

  return (
    <div className='min-h-screen bg-gray-100 p-8'>
      <EmailTemplate {...sampleData} />
    </div>
  );
}
