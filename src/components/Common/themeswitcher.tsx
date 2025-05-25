import { useEffect, useState } from "react";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

// Dynamically import all theme CSS files as URLs (Vite 5+ syntax)
const themeFiles = import.meta.glob("../../assets/themes/*.css", { query: "?url", import: "default" });

function getThemeOptions() {
  return Object.keys(themeFiles).map((path) => {
    const value = path.split("/").pop()?.replace(".css", "") || "";
    const name = value.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
    return { name, value, path };
  });
}

const THEME_STYLE_ID = "tailwind-theme-style";

export default function ThemeSwitcher() {
  const [themes] = useState(getThemeOptions());
  const [selected, setSelected] = useState(themes[0]?.value || "");

  // Load and apply the selected theme
  useEffect(() => {
    if (!selected) return;
    const theme = themes.find((t) => t.value === selected);
    if (!theme) return;

    // Remove previous theme style
    const prev = document.getElementById(THEME_STYLE_ID);
    if (prev) prev.remove();

    // Dynamically import the CSS file as a URL and inject as <link>
    (async () => {
      const url = await themeFiles[theme.path]() as string;
      const link = document.createElement("link");
      link.id = THEME_STYLE_ID;
      link.rel = "stylesheet";
      link.href = url;
      document.head.appendChild(link);
    })();
  }, [selected, themes]);

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      <Select value={selected} onValueChange={setSelected}>
        <SelectTrigger className="w-64">
          <SelectValue placeholder="Select theme" />
        </SelectTrigger>
        <SelectContent>
          {themes.map((t) => (
            <SelectItem key={t.value} value={t.value}>
              {t.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
