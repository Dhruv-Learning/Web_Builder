'use client';
import Image from 'next/image';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { templates } from "@/lib/templates";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { useCodeGenius } from '@/context/codegenius-context';
import { Layers } from 'lucide-react';

export default function TemplateGallery() {
  const { loadTemplate } = useCodeGenius();

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg font-headline">Explore Templates</h3>
      <div className="space-y-4">
        {templates.map((template) => {
          const placeholder = PlaceHolderImages.find(p => p.id === template.id);
          return (
            <Card key={template.id}>
              <CardContent className="p-4 space-y-3">
                {placeholder && (
                  <Image
                    src={placeholder.imageUrl}
                    alt={template.name}
                    width={600}
                    height={400}
                    data-ai-hint={placeholder.imageHint}
                    className="rounded-md aspect-video object-cover"
                  />
                )}
                <div className="space-y-1">
                  <h4 className="font-semibold font-headline">{template.name}</h4>
                  <p className="text-sm text-muted-foreground">{template.description}</p>
                </div>
                <Button className="w-full gap-2" onClick={() => loadTemplate(template)}>
                  <Layers className="w-4 h-4" /> Load Template
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  );
}
