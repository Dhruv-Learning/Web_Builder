'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useCodeGenius } from "@/context/codegenius-context";
import { Bot, Sparkles, Wand2 } from "lucide-react";
import StylePanel from "./style-panel";

export default function DesignPanel() {
  const { prompt, setPrompt, generateWebsite, isLoading, generatedCode, writeText, fixDesign } = useCodeGenius();

  return (
    <div className="space-y-6">
      <Accordion type="multiple" defaultValue={['prompt', 'style']} className="w-full">
        <AccordionItem value="prompt">
          <AccordionTrigger className="font-semibold">
            <div className="flex items-center gap-2">
              <Bot className="w-4 h-4" />
              AI Prompt
            </div>
          </AccordionTrigger>
          <AccordionContent className="space-y-4 pt-4">
            <Textarea
              placeholder="e.g., A modern portfolio for a photographer named John Doe."
              className="h-24"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
            <Button className="w-full" onClick={() => generateWebsite(prompt)} disabled={isLoading}>
              {isLoading ? 'Generating...' : 'Generate Website'}
              <Sparkles className="ml-2 w-4 h-4" />
            </Button>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="style">
          <AccordionTrigger className="font-semibold">
            <div className="flex items-center gap-2">
              <Wand2 className="w-4 h-4" />
              Styling
            </div>
          </AccordionTrigger>
          <AccordionContent className="pt-4">
            <StylePanel />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      
      <div className="space-y-2">
        <h3 className="font-semibold text-sm">AI Tools</h3>
        <Button variant="outline" className="w-full justify-start gap-2" onClick={writeText} disabled={!generatedCode.html || isLoading}>
            <Bot className="w-4 h-4" /> Write Website Text
        </Button>
        <Button variant="outline" className="w-full justify-start gap-2" onClick={fixDesign} disabled={!generatedCode.html || isLoading}>
            <Sparkles className="w-4 h-4 text-primary" /> AI Fix Design
        </Button>
      </div>
    </div>
  )
}
