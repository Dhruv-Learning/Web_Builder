'use client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area";
import DesignPanel from "./design-panel";
import TemplateGallery from "./template-gallery";
import ExportPanel from "./export-panel";
import { LayoutTemplate, Brush, Download } from 'lucide-react';


export default function CodeGeniusSidebar() {
  return (
    <aside className="w-full max-w-sm border-r bg-card flex flex-col">
      <Tabs defaultValue="design" className="flex-1 flex flex-col">
        <TabsList className="grid w-full grid-cols-3 rounded-none h-14">
          <TabsTrigger value="design" className="h-full rounded-none gap-2">
            <Brush className="w-4 h-4" /> Design
            </TabsTrigger>
          <TabsTrigger value="templates" className="h-full rounded-none gap-2">
            <LayoutTemplate className="w-4 h-4" /> Templates
            </TabsTrigger>
          <TabsTrigger value="export" className="h-full rounded-none gap-2">
            <Download className="w-4 h-4" /> Export
            </TabsTrigger>
        </TabsList>
        <ScrollArea className="flex-1">
          <TabsContent value="design" className="p-4">
            <DesignPanel />
          </TabsContent>
          <TabsContent value="templates" className="p-4">
            <TemplateGallery />
          </TabsContent>
          <TabsContent value="export" className="p-4">
            <ExportPanel />
          </TabsContent>
        </ScrollArea>
      </Tabs>
    </aside>
  )
}
