'use client'
import { useEffect, useState } from 'react';
import { useCodeGenius } from '@/context/codegenius-context';
import { Card } from '../ui/card';
import { Palette, Bot, Sparkles, Wand2, Loader2 } from 'lucide-react';
import { Button } from '../ui/button';

export default function PreviewWindow() {
  const { generatedCode, config, isLoading, setPrompt } = useCodeGenius();
  const [iframeBody, setIframeBody] = useState('');

  useEffect(() => {
    const customStyles = `
      <style>
        body { font-family: ${config.fonts.body}, sans-serif !important; }
        h1, h2, h3, h4, h5, h6 { font-family: ${config.fonts.headline}, sans-serif !important; }
        :root {
          --cg-primary: ${config.colors.primary};
          --cg-secondary: ${config.colors.secondary};
          --cg-accent: ${config.colors.accent};
          --cg-background: ${config.colors.background};
          --cg-text: ${config.colors.text};
        }
        body { background-color: var(--cg-background); color: var(--cg-text); transition: background-color 0.3s, color 0.3s; }
        .bg-primary { background-color: var(--cg-primary) !important; }
        .text-primary { color: var(--cg-primary) !important; }
        .bg-secondary { background-color: var(--cg-secondary) !important; }
        .text-secondary { color: var(--cg-secondary) !important; }
        .bg-accent { background-color: var(--cg-accent) !important; }
        .text-accent { color: var(--cg-accent) !important; }
        ::selection {
          background-color: var(--cg-primary);
          color: white;
        }
      </style>
    `;
    
    const srcDoc = `
      <html>
        <head>
          <script src="https://cdn.tailwindcss.com"></script>
          ${customStyles}
          <style>${generatedCode.css}</style>
        </head>
        <body class="antialiased">
          ${generatedCode.html}
        </body>
      </html>
    `;
    setIframeBody(srcDoc);
  }, [generatedCode, config]);

  const Placeholder = () => (
    <div className="flex flex-col items-center justify-center h-full text-center p-8 bg-grid-pattern">
      <div className="p-5 bg-primary/10 rounded-full mb-6 shadow-lg">
        <Palette className="w-16 h-16 text-primary" />
      </div>
      <h2 className="text-3xl font-bold font-headline mb-3">Welcome to CodeGenius</h2>
      <p className="text-muted-foreground max-w-md text-lg">
        Your AI-powered web design partner. Describe your vision, and watch it come to life in real-time.
      </p>
      <div className="mt-8 space-y-2 w-full max-w-md">
        <Button size="lg" variant="outline" className="w-full" onClick={() => setPrompt('A modern portfolio for a photographer named Jane Doe.')}>
          <Sparkles className="w-4 h-4 mr-2"/> Try a photographer portfolio
        </Button>
        <Button size="lg" variant="outline" className="w-full" onClick={() => setPrompt('A landing page for a new SaaS product called "SynthWave".')}>
          <Bot className="w-4 h-4 mr-2"/> Create a landing page for a SaaS
        </Button>
        <Button size="lg" variant="outline" className="w-full" onClick={() => setPrompt('A clean, modern blog about cooking and recipes.')}>
          <Wand2 className="w-4 h-4 mr-2"/> Start a cooking blog
        </Button>
      </div>
    </div>
  );

  const LoadingState = () => (
     <div className="absolute inset-0 z-10 flex flex-col items-center justify-center h-full text-center p-8 bg-background/80 backdrop-blur-sm transition-opacity duration-300">
      <Loader2 className="w-16 h-16 text-primary animate-spin mb-6" />
      <h2 className="text-3xl font-bold font-headline mb-3 animate-pulse">Generating your masterpiece...</h2>
      <p className="text-muted-foreground max-w-md text-lg">
        Our AI is crafting your website. This might take a moment.
      </p>
    </div>
  )

  return (
    <Card className="w-full h-full shadow-2xl shadow-primary/5 dark:shadow-black/20 overflow-hidden relative">
      {isLoading && <LoadingState />}
      <div className={`transition-opacity duration-500 ${isLoading && !generatedCode.html ? 'opacity-0' : 'opacity-100'} h-full`}>
        {!generatedCode.html ? (
          <Placeholder />
        ) : (
          <iframe
            srcDoc={iframeBody}
            title="Website Preview"
            className="w-full h-full border-0"
            sandbox="allow-scripts allow-same-origin"
          />
        )}
      </div>
    </Card>
  );
}
