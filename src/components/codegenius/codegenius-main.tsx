'use client';
import Header from '@/components/codegenius/header';
import CodeGeniusSidebar from '@/components/codegenius/codegenius-sidebar';
import PreviewWindow from '@/components/codegenius/preview-window';
import { useCodeGenius } from '@/context/codegenius-context';
import Head from 'next/head';

export default function CodeGeniusMain() {
  const { config } = useCodeGenius();
  const headlineFont = config.fonts.headline.replace(/ /g, '+');
  const bodyFont = config.fonts.body.replace(/ /g, '+');
  
  return (
    <>
      <Head>
        <link href={`https://fonts.googleapis.com/css2?family=${headlineFont}:wght@400;500;600;700&family=${bodyFont}:wght@400;500;600;700&display=swap`} rel="stylesheet" />
      </Head>
      <div className="flex flex-col h-screen bg-background text-foreground font-body">
        <Header />
        <main className="flex flex-1 border-t border-border overflow-hidden">
          <div className="w-full md:w-80 lg:w-96 border-r border-border flex-shrink-0">
            <CodeGeniusSidebar />
          </div>
          <div className="flex-1 p-4 md:p-6 lg:p-8 bg-muted/30 dark:bg-muted/10 overflow-y-auto">
            <PreviewWindow />
          </div>
        </main>
      </div>
    </>
  );
}
