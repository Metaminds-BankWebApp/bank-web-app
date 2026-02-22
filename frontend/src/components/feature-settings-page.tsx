"use client";

import { useState } from "react";
import { useTheme } from "next-themes";
import { X, ChevronDown } from "lucide-react";
import { cn } from "@/src/lib/utils";

export function FeatureSettingsPage({ featureColorClass = "bg-[#0a234c]" }: { featureColorClass?: string }) {
  const { theme, setTheme } = useTheme();
  const [fontStyle, setFontStyle] = useState("Poppins");
  const [fontSize, setFontSize] = useState("16 px");
  const [zoom, setZoom] = useState("100% (normal)");

  // Extract the hex color from the tailwind class if possible, or fallback to a default dark blue for text/borders
  const hexColorMatch = featureColorClass.match(/bg-\[([^\]]+)\]/);
  const hexColor = hexColorMatch ? hexColorMatch[1] : "#0a234c";

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className={cn("rounded-[32px] p-4 md:p-6 shadow-xl", featureColorClass)}>
        <div className="bg-white rounded-[24px] p-8 md:p-12 relative min-h-[600px]">
          {/* Close Button */}
          <button 
            className="absolute top-6 right-6 hover:bg-slate-100 p-2 rounded-full transition-colors"
            style={{ color: hexColor }}
          >
            <X size={28} strokeWidth={2.5} />
          </button>

          <div className="max-w-4xl mx-auto mt-4">
            <h2 className="text-xl font-bold mb-8" style={{ color: hexColor }}>Preference mode</h2>

            {/* Theme Toggles */}
            <div className="flex flex-col md:flex-row gap-8 mb-16">
              {/* Light Mode Option */}
              <button
                onClick={() => setTheme("light")}
                className={cn(
                  "flex-1 rounded-3xl overflow-hidden border-2 transition-all text-left group",
                  theme !== "dark" ? "border-[#3ca3e4] shadow-[0_0_20px_rgba(60,163,228,0.2)]" : "border-transparent shadow-md hover:shadow-lg"
                )}
              >
                <div className="bg-[#e2e8f0] p-8 aspect-[4/2.5] flex items-center justify-center">
                  {/* Wireframe */}
                  <div className="w-full h-full bg-white rounded-xl shadow-sm overflow-hidden flex flex-col">
                    {/* Header */}
                    <div className="h-10 flex items-center px-4 gap-3" style={{ backgroundColor: hexColor }}>
                      <div className="w-5 h-5 rounded-full bg-[#3ca3e4]"></div>
                      <div className="h-4 w-32 bg-white rounded-full"></div>
                      <div className="ml-auto w-5 h-5 rounded-full bg-[#3ca3e4]"></div>
                    </div>
                    <div className="flex flex-1">
                      {/* Sidebar */}
                      <div className="w-1/3 p-3 flex flex-col gap-3" style={{ backgroundColor: hexColor }}>
                        <div className="h-4 w-full bg-white rounded-full"></div>
                        <div className="h-4 w-full bg-white rounded-full"></div>
                        <div className="h-4 w-full bg-white rounded-full"></div>
                        <div className="mt-auto h-4 w-full bg-white rounded-full"></div>
                      </div>
                      {/* Content */}
                      <div className="flex-1 bg-white p-3">
                        <div className="w-full h-full bg-[#e2e8f0] rounded-lg"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-5 flex items-center gap-4" style={{ backgroundColor: hexColor }}>
                  <div className={cn(
                    "w-7 h-7 rounded-full border-2 flex items-center justify-center",
                    theme !== "dark" ? "border-[#3ca3e4]" : "border-white/50"
                  )}>
                    {theme !== "dark" && <div className="w-3.5 h-3.5 rounded-full bg-[#3ca3e4]"></div>}
                  </div>
                  <span className="text-white font-medium text-lg">Light mode</span>
                </div>
              </button>

              {/* Dark Mode Option */}
              <button
                onClick={() => setTheme("dark")}
                className={cn(
                  "flex-1 rounded-3xl overflow-hidden border-2 transition-all text-left group",
                  theme === "dark" ? "border-[#3ca3e4] shadow-[0_0_20px_rgba(60,163,228,0.2)]" : "border-transparent shadow-md hover:shadow-lg"
                )}
              >
                <div className="bg-[#e2e8f0] p-8 aspect-[4/2.5] flex items-center justify-center">
                  {/* Wireframe */}
                  <div className="w-full h-full bg-[#1e293b] rounded-xl shadow-sm overflow-hidden flex flex-col">
                    {/* Header */}
                    <div className="h-10 bg-[#334155] flex items-center px-4 gap-3">
                      <div className="w-5 h-5 rounded-full" style={{ backgroundColor: hexColor }}></div>
                      <div className="h-4 w-32 bg-[#94a3b8] rounded-full"></div>
                      <div className="ml-auto w-5 h-5 rounded-full" style={{ backgroundColor: hexColor }}></div>
                    </div>
                    <div className="flex flex-1">
                      {/* Sidebar */}
                      <div className="w-1/3 bg-[#334155] p-3 flex flex-col gap-3">
                        <div className="h-4 w-full bg-[#94a3b8] rounded-full"></div>
                        <div className="h-4 w-full bg-[#94a3b8] rounded-full"></div>
                        <div className="h-4 w-full bg-[#94a3b8] rounded-full"></div>
                        <div className="mt-auto h-4 w-full bg-[#94a3b8] rounded-full"></div>
                      </div>
                      {/* Content */}
                      <div className="flex-1 bg-[#1e293b] p-3">
                        <div className="w-full h-full bg-[#94a3b8] rounded-lg"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-5 flex items-center gap-4" style={{ backgroundColor: hexColor }}>
                  <div className={cn(
                    "w-7 h-7 rounded-full border-2 flex items-center justify-center",
                    theme === "dark" ? "border-[#3ca3e4]" : "border-white/50"
                  )}>
                    {theme === "dark" && <div className="w-3.5 h-3.5 rounded-full bg-[#3ca3e4]"></div>}
                  </div>
                  <span className="text-white font-medium text-lg">Dark Mode</span>
                </div>
              </button>
            </div>

            {/* Dropdowns */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Font Style */}
              <div className="space-y-3">
                <label className="font-bold block" style={{ color: hexColor }}>Font Style</label>
                <div className="relative">
                  <select 
                    value={fontStyle}
                    onChange={(e) => setFontStyle(e.target.value)}
                    className="w-full appearance-none bg-white border-2 border-slate-200 rounded-xl py-3 px-4 font-medium focus:outline-none focus:border-[#3ca3e4] cursor-pointer"
                    style={{ color: hexColor }}
                  >
                    <option>Poppins</option>
                    <option>Inter</option>
                    <option>Roboto</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" size={20} strokeWidth={3} style={{ color: hexColor }} />
                </div>
              </div>

              {/* Font Size */}
              <div className="space-y-3">
                <label className="font-bold block" style={{ color: hexColor }}>Font Size</label>
                <div className="relative">
                  <select 
                    value={fontSize}
                    onChange={(e) => setFontSize(e.target.value)}
                    className="w-full appearance-none bg-white border-2 border-slate-200 rounded-xl py-3 px-4 font-medium focus:outline-none focus:border-[#3ca3e4] cursor-pointer"
                    style={{ color: hexColor }}
                  >
                    <option>14 px</option>
                    <option>16 px</option>
                    <option>18 px</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" size={20} strokeWidth={3} style={{ color: hexColor }} />
                </div>
              </div>

              {/* Zoom Display */}
              <div className="space-y-3">
                <label className="font-bold block" style={{ color: hexColor }}>Zoom Display</label>
                <div className="relative">
                  <select 
                    value={zoom}
                    onChange={(e) => setZoom(e.target.value)}
                    className="w-full appearance-none bg-white border-2 border-slate-200 rounded-xl py-3 px-4 font-medium focus:outline-none focus:border-[#3ca3e4] cursor-pointer"
                    style={{ color: hexColor }}
                  >
                    <option>90%</option>
                    <option>100% (normal)</option>
                    <option>110%</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" size={20} strokeWidth={3} style={{ color: hexColor }} />
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
