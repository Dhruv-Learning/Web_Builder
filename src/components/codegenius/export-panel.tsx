'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useCodeGenius } from "@/context/codegenius-context";
import { FileJson, FileText, Share2, Zap, Archive } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function ExportPanel() {
  const { generatedCode } = useCodeGenius();
  const { toast } = useToast();

  const handleExport = () => {
    toast({
      title: "Feature in development",
      description: "Export functionality is coming soon!",
    });
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Export Project</CardTitle>
          <CardDescription>Download your generated website files.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <Button variant="outline" className="w-full justify-start gap-2" onClick={handleExport} disabled={!generatedCode.html}>
            <Archive className="w-4 h-4" /> Export as ZIP
          </Button>
          <Button variant="outline" className="w-full justify-start gap-2" onClick={handleExport} disabled={!generatedCode.html}>
            <FileText className="w-4 h-4" /> Download Files
          </Button>
          <Button variant="outline" className="w-full justify-start gap-2" onClick={handleExport} disabled={!generatedCode.html}>
            <FileJson className="w-4 h-4" /> Export JSON Config
          </Button>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">More Features</CardTitle>
          <CardDescription>Explore other capabilities.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
           <Button variant="outline" className="w-full justify-start gap-2" onClick={handleExport} disabled={!generatedCode.html}>
            <Share2 className="w-4 h-4" /> Get Shareable Link
          </Button>
           <Button variant="outline" className="w-full justify-start gap-2" onClick={handleExport} disabled={!generatedCode.html}>
            <Zap className="w-4 h-4" /> Generate Logo
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
