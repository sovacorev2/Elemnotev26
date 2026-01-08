import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"

export const metadata: Metadata = {
  title: "Elem Notes - AI-Powered Study Companion",
  description: "Transform your study materials into interactive learning experiences with AI",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                function removeV0Button() {
                  // Remove by common selectors
                  const selectors = [
                    '[data-v0]',
                    '[class*="v0"]',
                    '[id*="v0"]',
                    'button[class*="fixed"][class*="bottom"]',
                    'a[href*="v0.app"]',
                    'div[class*="floating"]',
                    '[aria-label*="v0"]',
                    '[title*="v0"]'
                  ];
                  
                  selectors.forEach(selector => {
                    try {
                      const elements = document.querySelectorAll(selector);
                      elements.forEach(el => {
                        if (el && el.parentNode) {
                          el.parentNode.removeChild(el);
                        }
                      });
                    } catch (e) {}
                  });
                  
                  // Remove fixed position buttons in bottom right
                  const allButtons = document.querySelectorAll('button, a');
                  allButtons.forEach(btn => {
                    const style = window.getComputedStyle(btn);
                    if (style.position === 'fixed') {
                      const bottom = parseInt(style.bottom);
                      const right = parseInt(style.right);
                      if (bottom < 100 && right < 100) {
                        const text = btn.textContent?.toLowerCase() || '';
                        const href = btn.getAttribute('href') || '';
                        if (text.includes('v0') || href.includes('v0') || text.includes('made with')) {
                          if (btn.parentNode) {
                            btn.parentNode.removeChild(btn);
                          }
                        }
                      }
                    }
                  });
                }
                
                // Run immediately
                removeV0Button();
                
                // Run after DOM loads
                if (document.readyState === 'loading') {
                  document.addEventListener('DOMContentLoaded', removeV0Button);
                } else {
                  removeV0Button();
                }
                
                // Run periodically to catch dynamically added buttons
                setInterval(removeV0Button, 1000);
                
                // Watch for DOM changes
                const observer = new MutationObserver(removeV0Button);
                observer.observe(document.body || document.documentElement, {
                  childList: true,
                  subtree: true
                });
              })();
            `,
          }}
        />
      </head>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        <Suspense fallback={null}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  )
}
