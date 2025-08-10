// For client-side components, we can access nonce via meta tag
export function getClientNonce(): string {
  if (typeof window === 'undefined') return '';

  const meta = document.querySelector('meta[name="csp-nonce"]');
  return meta?.getAttribute('content') || '';
}
