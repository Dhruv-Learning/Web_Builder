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
import { Separator } from "../ui/separator";

export default function DesignPanel() {
  const { prompt, setPrompt, generateWebsite, isLoading, generatedCode, writeText, fixDesign } = useCodeGenius();

  return (
    <div className="space-y-6">
      <Accordion type="multiple" defaultValue={['prompt']} className="w-full">
        <AccordionItem value="prompt">
          <AccordionTrigger className="font-semibold text-base">
            <div className="flex items-center gap-3">
              <Bot className="w-5 h-5" />
              AI Prompt
            </div>
          </AccordionTrigger>
          <AccordionContent className="space-y-4 pt-4">
            <Textarea
              placeholder="e.g., A modern portfolio for a photographer named John Doe."
              className="h-28 text-base"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
            <Button size="lg" className="w-full text-base font-semibold" onClick={() => generateWebsite(prompt)} disabled={isLoading}>
              {isLoading ? 'Generating...' : 'Generate Website'}
              <Sparkles className="ml-2 w-5 h-5" />
            </Button>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="style">
          <AccordionTrigger className="font-semibold text-base">
            <div className="flex items-center gap-3">
              <Wand2 className="w-5 h-5" />
              Styling
            </div>
          </AccordionTrigger>
          <AccordionContent className="pt-6">
            <StylePanel />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      
      <Separator />

      <div className="space-y-4">
        <h3 className="font-semibold text-base flex items-center gap-3"><Sparkles className="w-5 h-5 text-primary"/> AI Tools</h3>
        <div className="grid grid-cols-2 gap-2">
            <Button variant="outline" className="w-full justify-center gap-2 py-6 flex-col h-auto" onClick={writeText} disabled={!generatedCode.html || isLoading}>
                <Bot className="w-5 h-5" /> Write Text
            </Button>
            <Button variant="outline" className="w-full justify-center gap-2 py-6 flex-col h-auto" onClick={fixDesign} disabled={!generatedCode.html || isLoading}>
                <Sparkles className="w-5 h-5 text-primary" /> Fix Design
            </Button>
        </div>
      </div>
    </div>
  )
}
