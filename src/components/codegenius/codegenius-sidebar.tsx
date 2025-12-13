'use client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area";
import DesignPanel from "./design-panel";
import TemplateGallery from "./template-gallery";
import ExportPanel from "./export-panel";
import { LayoutTemplate, Brush, Download } from 'lucide-react';


export default function CodeGeniusSidebar() {
  return (
    <aside className="w-full h-full bg-card flex flex-col">
      <Tabs defaultValue="design" className="flex-1 flex flex-col overflow-hidden">
        <TabsList className="grid w-full grid-cols-3 rounded-none h-14 shrink-0">
          <TabsTrigger value="design" className="h-full rounded-none gap-2 text-sm font-medium">
            <Brush className="w-5 h-5" /> Design
            </TabsTrigger>
          <TabsTrigger value="templates" className="h-full rounded-none gap-2 text-sm font-medium">
            <LayoutTemplate className="w-5 h-5" /> Templates
            </TabsTrigger>
          <TabsTrigger value="export" className="h-full rounded-none gap-2 text-sm font-medium">
            <Download className="w-5 h-5" /> Export
            </TabsTrigger>
        </TabsList>
        <div className="flex-1 overflow-y-auto">
            <TabsContent value="design" className="p-6">
              <DesignPanel />
            </TabsContent>
            <TabsContent value="templates" className="p-6">
              <TemplateGallery />
            </TabsContent>
            <TabsContent value="export" className="p-6">
              <ExportPanel />
            </TabsContent>
        </div>
      </Tabs>
    </aside>
  )
}
