import React from 'react';

interface EmailTemplateProps {
  name: string;
  email: string;
  message: string;
  subject?: string;
}

export const EmailTemplate: React.FC<EmailTemplateProps> = ({
  name,
  email,
  message,
  subject,
}) => {
  return (
    <div
      style={{
        fontFamily: 'Arial, sans-serif',
        maxWidth: '600px',
        margin: '0 auto',
      }}
    >
      {/* Header */}
      <div
        style={{
          background: '#475569',
          padding: '30px 20px',
          textAlign: 'center',
          borderRadius: '8px 8px 0 0',
        }}
      >
        <h1 style={{ color: 'white', margin: '0', fontSize: '24px' }}>
          New Message from Portfolio
        </h1>
        <p style={{ color: '#e2e8f0', margin: '5px 0 0 0', fontSize: '14px' }}>
          Someone reached out through your website
        </p>
      </div>

      {/* Content */}
      <div
        style={{
          backgroundColor: '#ffffff',
          padding: '30px 20px',
          border: '1px solid #e2e8f0',
          borderTop: 'none',
        }}
      >
        {/* Contact Information */}
        <div style={{ marginBottom: '25px' }}>
          <h2
            style={{ color: '#1a202c', fontSize: '18px', marginBottom: '15px' }}
          >
            Contact Information
          </h2>
          <div
            style={{
              backgroundColor: '#f7fafc',
              padding: '15px',
              borderRadius: '6px',
            }}
          >
            <p style={{ margin: '0 0 8px 0', color: '#4a5568' }}>
              <strong style={{ color: '#2d3748' }}>Name:</strong> {name}
            </p>
            <p style={{ margin: '0', color: '#4a5568' }}>
              <strong style={{ color: '#2d3748' }}>Email:</strong>{' '}
              <a
                href={`mailto:${email}`}
                style={{ color: '#3182ce', textDecoration: 'none' }}
              >
                {email}
              </a>
            </p>
            {subject && (
              <p style={{ margin: '8px 0 0 0', color: '#4a5568' }}>
                <strong style={{ color: '#2d3748' }}>Subject:</strong> {subject}
              </p>
            )}
          </div>
        </div>

        {/* Message */}
        <div style={{ marginBottom: '25px' }}>
          <h2
            style={{ color: '#1a202c', fontSize: '18px', marginBottom: '15px' }}
          >
            Message
          </h2>
          <div
            style={{
              backgroundColor: '#f7fafc',
              padding: '20px',
              borderRadius: '6px',
              borderLeft: '4px solid #475569',
            }}
          >
            <p
              style={{
                color: '#2d3748',
                lineHeight: '1.6',
                margin: '0',
                whiteSpace: 'pre-wrap',
              }}
            >
              {message}
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div
        style={{
          backgroundColor: '#f7fafc',
          padding: '20px',
          textAlign: 'center',
          border: '1px solid #e2e8f0',
          borderTop: 'none',
          borderRadius: '0 0 8px 8px',
        }}
      >
        <p style={{ color: '#718096', fontSize: '12px', margin: '0' }}>
          This email was sent from your portfolio contact form at{' '}
          <a href='https://alexcalaunanjr.vercel.app' style={{ color: '#3182ce' }}>
            https://alexcalaunanjr.vercel.app
          </a>
        </p>
        <p style={{ color: '#a0aec0', fontSize: '11px', margin: '5px 0 0 0' }}>
          Sent on{' '}
          {new Date().toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          })}
        </p>
      </div>
    </div>
  );
};
