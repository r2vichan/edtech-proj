import type { Metadata } from 'next';
import './globals.css';
import Provider from './_trpc/Provider';

export const metadata: Metadata = {
  title: 'EduLearn AI - Learn Machine Learning & AI',
  description: 'Master AI and Machine Learning with expert-led courses',
};

/**
 * Root Layout Component
 * This wraps your entire application
 * We wrap everything with the tRPC Provider to enable API calls
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
