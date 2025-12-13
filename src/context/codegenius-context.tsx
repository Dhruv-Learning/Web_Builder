'use client';
import { createContext, useContext, useState, type ReactNode } from 'react';
import { generateWebsiteLayout } from '@/ai/flows/generate-website-layout';
import { generateWebsiteText } from '@/ai/flows/generate-website-text';
import { autoFixDesign } from '@/ai/flows/auto-fix-design';
import { useToast } from '@/hooks/use-toast';
import { type Template, templates } from '@/lib/templates';
import { WEBSITE_TYPES, FONT_FACES, COLOR_PALETTES } from '@/lib/constants';

type GeneratedCode = {
  html: string;
  css: string;
  sections: string[];
};

type AppConfig = {
  websiteType: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
  };
  fonts: {
    headline: string;
    body: string;
  };
};

type CodeGeniusContextType = {
  prompt: string;
  setPrompt: (prompt: string) => void;
  generatedCode: GeneratedCode;
  config: AppConfig;
  setConfig: (config: AppConfig) => void;
  isLoading: boolean;
  generateWebsite: (prompt: string) => Promise<void>;
  writeText: () => Promise<void>;
  fixDesign: () => Promise<void>;
  loadTemplate: (template: Template) => void;
};

const defaultState: CodeGeniusContextType = {
  prompt: '',
  setPrompt: () => {},
  generatedCode: { html: '', css: '', sections: [] },
  config: {
    websiteType: WEBSITE_TYPES[0].id,
    colors: COLOR_PALETTES[0].colors,
    fonts: {
      headline: FONT_FACES[1].name,
      body: FONT_FACES[0].name,
    },
  },
  setConfig: () => {},
  isLoading: false,
  generateWebsite: async () => {},
  writeText: async () => {},
  fixDesign: async () => {},
  loadTemplate: () => {},
};

const CodeGeniusContext = createContext<CodeGeniusContextType>(defaultState);

export function useCodeGenius() {
  return useContext(CodeGeniusContext);
}

export function CodeGeniusProvider({ children }: { children: ReactNode }) {
  const [prompt, setPrompt] = useState('');
  const [generatedCode, setGeneratedCode] = useState<GeneratedCode>({ html: '', css: '', sections: [] });
  const [config, setConfig] = useState<AppConfig>(defaultState.config);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const generateWebsite = async (currentPrompt: string) => {
    if (!currentPrompt) {
      toast({ title: "Prompt is empty", description: "Please describe the website you want to create.", variant: "destructive" });
      return;
    }
    setIsLoading(true);
    try {
      const result = await generateWebsiteLayout({ prompt: currentPrompt });
      setGeneratedCode({
        html: result.html,
        css: result.css,
        sections: result.sections,
      });
    } catch (error) {
      console.error(error);
      toast({ title: "Generation Failed", description: "Something went wrong while generating the website.", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  const writeText = async () => {
    setIsLoading(true);
    toast({ title: "Writing content...", description: "AI is generating text for your website." });
    try {
        const textResult = await generateWebsiteText({ prompt });
        // This is a simplified approach. A real implementation would parse the HTML and replace placeholders.
        const newHtml = generatedCode.html.replace(/Lorem Ipsum/gi, textResult.websiteText);
        setGeneratedCode(prev => ({ ...prev, html: newHtml }));
    } catch (error) {
        console.error(error);
        toast({ title: "Failed to write text", description: "Could not generate website text.", variant: "destructive" });
    } finally {
        setIsLoading(false);
    }
  }

  const fixDesign = async () => {
    setIsLoading(true);
    toast({ title: "Fixing design...", description: "AI is improving your website's design." });
    try {
        const designResult = await autoFixDesign({ websiteContent: generatedCode.html + `<style>${generatedCode.css}</style>` });
        // This is simplified. We'd need to parse the HTML and CSS apart.
        const htmlMatch = designResult.improvedWebsiteContent.match(/<body>([\s\S]*)<\/body>/);
        const cssMatch = designResult.improvedWebsiteContent.match(/<style>([\s\S]*)<\/style>/);
        setGeneratedCode({
            html: htmlMatch ? htmlMatch[1] : generatedCode.html,
            css: cssMatch ? cssMatch[1] : generatedCode.css,
            sections: generatedCode.sections,
        });
    } catch (error) {
        console.error(error);
        toast({ title: "Failed to fix design", description: "Could not improve the design.", variant: "destructive" });
    } finally {
        setIsLoading(false);
    }
  }

  const loadTemplate = (template: Template) => {
    setPrompt(template.config.prompt);
    setConfig(template.config);
    generateWebsite(template.config.prompt);
    toast({ title: `Template "${template.name}" loaded`, description: "Generating the website with the new template." });
  };

  const value = {
    prompt,
    setPrompt,
    generatedCode,
    config,
    setConfig,
    isLoading,
    generateWebsite,
    writeText,
    fixDesign,
    loadTemplate,
  };

  return <CodeGeniusContext.Provider value={value}>{children}</CodeGeniusContext.Provider>;
}
