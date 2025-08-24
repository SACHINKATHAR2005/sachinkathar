import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import { Toaster } from 'sonner'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter'
})

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair'
})

export const metadata: Metadata = {
  title: 'Portfolio - Creative Developer',
  description: 'Modern portfolio showcasing creative development work',
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`} suppressHydrationWarning>
      <head>
        {/* Apply theme before paint to avoid flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
            (function(){
              try {
                var stored = localStorage.getItem('theme');
                var dark = stored ? stored === 'dark' : window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
                if(dark){ document.documentElement.classList.add('dark'); }
                var lm = localStorage.getItem('listMode') === 'true';
                document.documentElement.setAttribute('data-list-mode', lm ? 'list' : 'grid');
              } catch(e) {}
            })();
          `}}
        />
      </head>
      <body className="antialiased bg-white text-black dark:bg-neutral-950 dark:text-white">
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  )
}
