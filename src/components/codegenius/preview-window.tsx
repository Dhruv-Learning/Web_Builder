'use client'
import { useEffect, useState } from 'react';
import { useCodeGenius } from '@/context/codegenius-context';
import { Card } from '../ui/card';
import { Palette, Code, Construction, Loader } from 'lucide-react';

export default function PreviewWindow() {
  const { generatedCode, config, isLoading } = useCodeGenius();
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
        body { background-color: var(--cg-background); color: var(--cg-text); }
        .bg-primary { background-color: var(--cg-primary) !important; }
        .text-primary { color: var(--cg-primary) !important; }
        .bg-secondary { background-color: var(--cg-secondary) !important; }
        .text-secondary { color: var(--cg-secondary) !important; }
        .bg-accent { background-color: var(--cg-accent) !important; }
        .text-accent { color: var(--cg-accent) !important; }
      </style>
    `;
    
    const srcDoc = `
      <html>
        <head>
          <script src="https://cdn.tailwindcss.com"></script>
          ${customStyles}
          <style>${generatedCode.css}</style>
        </head>
        <body>
          ${generatedCode.html}
        </body>
      </html>
    `;
    setIframeBody(srcDoc);
  }, [generatedCode, config]);

  const Placeholder = () => (
    <div className="flex flex-col items-center justify-center h-full text-center p-8">
      <div className="p-4 bg-primary/10 rounded-full mb-4">
        <Palette className="w-12 h-12 text-primary" />
      </div>
      <h2 className="text-xl font-bold font-headline mb-2">Welcome to CodeGenius</h2>
      <p className="text-muted-foreground max-w-sm">
        Describe your website idea in the prompt panel, pick a template, or customize your styles to start generating. Your website will appear here in real-time.
      </p>
    </div>
  );

  const LoadingState = () => (
     <div className="flex flex-col items-center justify-center h-full text-center p-8 bg-background/50 backdrop-blur-sm">
      <Loader className="w-12 h-12 text-primary animate-spin mb-4" />
      <h2 className="text-xl font-bold font-headline mb-2">Generating your masterpiece...</h2>
      <p className="text-muted-foreground max-w-sm">
        Our AI is crafting your website. This might take a moment.
      </p>
    </div>
  )

  return (
    <Card className="w-full h-full shadow-2xl shadow-primary/5 dark:shadow-black/20 overflow-hidden">
      {isLoading && <LoadingState />}
      {!isLoading && !generatedCode.html && <Placeholder />}
      {!isLoading && generatedCode.html && (
        <iframe
          srcDoc={iframeBody}
          title="Website Preview"
          className="w-full h-full border-0"
          sandbox="allow-scripts allow-same-origin"
        />
      )}
    </Card>
  );
}
