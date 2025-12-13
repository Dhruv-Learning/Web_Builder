'use client';
import { CodeGeniusProvider } from '@/context/codegenius-context';
import Header from '@/components/codegenius/header';
import CodeGeniusSidebar from '@/components/codegenius/codegenius-sidebar';
import PreviewWindow from '@/components/codegenius/preview-window';

export default function CodeGeniusMain() {
  return (
    <CodeGeniusProvider>
      <div className="flex flex-col h-screen bg-background text-foreground font-body">
        <Header />
        <main className="flex flex-1 border-t border-border overflow-hidden">
          <div className="lg:w-1/4 xl:w-1/5 border-r border-border">
            <CodeGeniusSidebar />
          </div>
          <div className="flex-1 p-4 md:p-6 lg:p-8 bg-muted/30 dark:bg-muted/10 overflow-y-auto">
            <PreviewWindow />
          </div>
        </main>
      </div>
    </CodeGeniusProvider>
  );
}
