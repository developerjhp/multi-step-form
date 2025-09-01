import { bookHandlers } from './books';

export async function startMSW() {
  if (typeof window === 'undefined') {
    return;
  }

  if (process.env.NODE_ENV === 'development') {
    const { setupWorker } = await import('msw/browser');
    const worker = setupWorker(...bookHandlers);

    return worker.start({
      onUnhandledRequest: 'bypass',
      serviceWorker: {
        url: '/mockServiceWorker.js',
      },
    });
  }
}
