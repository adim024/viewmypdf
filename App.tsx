import React, { useState, Suspense, lazy } from 'react';
import { 
  Navbar, 
  ToolType 
} from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { useTheme } from '@/hooks/useTheme';
import { Lock, Cpu, Loader2 } from 'lucide-react';

// Code-split each tool module with React.lazy for instant initial page loading
const ImageResizerTool = lazy(() =>
  import('@/components/tools/ImageResizer/ImageResizerTool').then((m) => ({
    default: m.ImageResizerTool,
  }))
);
const ImageToPdfTool = lazy(() =>
  import('@/components/tools/ImageToPdf/ImageToPdfTool').then((m) => ({
    default: m.ImageToPdfTool,
  }))
);
const PdfToImageTool = lazy(() =>
  import('@/components/tools/PdfToImage/PdfToImageTool').then((m) => ({
    default: m.PdfToImageTool,
  }))
);
const DocxConverterTool = lazy(() =>
  import('@/components/tools/DocxConverter/DocxConverterTool').then((m) => ({
    default: m.DocxConverterTool,
  }))
);
const MarkdownToPdfTool = lazy(() =>
  import('@/components/tools/MarkdownToPdf/MarkdownToPdfTool').then((m) => ({
    default: m.MarkdownToPdfTool,
  }))
);

const ToolLoadingFallback = () => (
  <div className="w-full h-80 flex flex-col items-center justify-center space-y-3 bg-white/50 dark:bg-slate-900/50 rounded-3xl border border-slate-200/60 dark:border-slate-800/60 backdrop-blur-xs">
    <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
    <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
      Loading client-side conversion engine...
    </span>
  </div>
);

export const App: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [activeTool, setActiveTool] = useState<ToolType>('image-resizer');

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors selection:bg-blue-600 selection:text-white bg-grid-pattern">
      {/* Top Navigation */}
      <Navbar
        activeTool={activeTool}
        onSelectTool={setActiveTool}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
        {/* Security & Performance Assurance Banner */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-purple-500/10 border border-blue-200/50 dark:border-blue-800/50 backdrop-blur-xs text-xs">
          <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300 font-medium">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>
              <strong className="text-slate-900 dark:text-white font-semibold">Client-Side Sandbox Active:</strong> Your files remain 100% inside your local memory.
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px] text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1 font-medium">
              <Lock className="w-3.5 h-3.5 text-emerald-500" /> Zero Server Uploads
            </span>
            <span className="flex items-center gap-1 font-medium">
              <Cpu className="w-3.5 h-3.5 text-blue-500" /> GPU / Multi-Core Accelerated
            </span>
          </div>
        </div>

        {/* Active Tool View with Suspense */}
        <div className="w-full">
          <Suspense fallback={<ToolLoadingFallback />}>
            {activeTool === 'image-resizer' && <ImageResizerTool />}
            {activeTool === 'image-to-pdf' && <ImageToPdfTool />}
            {activeTool === 'pdf-to-image' && <PdfToImageTool />}
            {activeTool === 'docx-converter' && <DocxConverterTool />}
            {activeTool === 'markdown-to-pdf' && <MarkdownToPdfTool />}
          </Suspense>
        </div>
      </main>

      {/* Footer */}
      <Footer onSelectTool={setActiveTool} />
    </div>
  );
};

export default App;
