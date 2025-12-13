'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useCodeGenius } from "@/context/codegenius-context";
import { FileJson, FileText, Share2, Zap, Archive } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import JSZip from "jszip";

export default function ExportPanel() {
  const { generatedCode, config } = useCodeGenius();
  const { toast } = useToast();

  const handleExportZip = () => {
    if (!generatedCode.html) return;

    const zip = new JSZip();
    const fullHtml = `
      <html>
        <head>
          <title>My Awesome Website</title>
          <script src="https://cdn.tailwindcss.com"></script>
          <link rel="stylesheet" href="style.css">
        </head>
        <body>
          ${generatedCode.html}
        </body>
      </html>
    `;
    zip.file("index.html", fullHtml);
    zip.file("style.css", generatedCode.css);
    zip.generateAsync({ type: "blob" }).then((content) => {
      const link = document.createElement("a");
      link.href = URL.createObjectURL(content);
      link.download = "website.zip";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
    toast({
      title: "Exporting as ZIP",
      description: "Your website is being downloaded.",
    });
  };

  const handleDownloadFiles = () => {
    if (!generatedCode.html) return;

    const download = (filename: string, text: string, type: string) => {
      const element = document.createElement("a");
      element.setAttribute("href", `data:${type};charset=utf-8,` + encodeURIComponent(text));
      element.setAttribute("download", filename);
      element.style.display = "none";
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    };

    const fullHtml = `
      <html>
        <head>
          <title>My Awesome Website</title>
          <script src="https://cdn.tailwindcss.com"></script>
          <link rel="stylesheet" href="style.css">
        </head>
        <body>
          ${generatedCode.html}
        </body>
      </html>
    `;
    download("index.html", fullHtml, "text/html");
    download("style.css", generatedCode.css, "text/css");

    toast({
      title: "Downloading Files",
      description: "Your files are being downloaded.",
    });
  };
  
  const handleExportJson = () => {
    if(!config) return;
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify({config, generatedCode}, null, 2)
    )}`;
    const link = document.createElement("a");
    link.href = jsonString;
    link.download = "codegenius-config.json";
    link.click();
    toast({
      title: "Exporting JSON",
      description: "Your configuration is being downloaded.",
    });
  }

  const handleFeatureInDev = () => {
    toast({
      title: "Feature in development",
      description: "This functionality is coming soon!",
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
          <Button variant="outline" className="w-full justify-start gap-2" onClick={handleExportZip} disabled={!generatedCode.html}>
            <Archive className="w-4 h-4" /> Export as ZIP
          </Button>
          <Button variant="outline" className="w-full justify-start gap-2" onClick={handleDownloadFiles} disabled={!generatedCode.html}>
            <FileText className="w-4 h-4" /> Download Files
          </Button>
          <Button variant="outline" className="w-full justify-start gap-2" onClick={handleExportJson} disabled={!generatedCode.html}>
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
           <Button variant="outline" className="w-full justify-start gap-2" onClick={handleFeatureInDev} disabled={!generatedCode.html}>
            <Share2 className="w-4 h-4" /> Get Shareable Link
          </Button>
           <Button variant="outline" className="w-full justify-start gap-2" onClick={handleFeatureInDev} disabled={!generatedCode.html}>
            <Zap className="w-4 h-4" /> Generate Logo
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
