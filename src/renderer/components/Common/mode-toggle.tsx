import { useEffect, useState } from "react"
import { Button } from "../ui/button"

// Dynamically import all theme CSS files as URLs (Vite 5+ syntax)
const themeFiles = import.meta.glob("/src/assets/themes/*.css", {
  query: "?url",
  import: "default",
})

// Extract theme options from file paths
function getThemeOptions() {
  return Object.keys(themeFiles).map((path) => {
    const value = path.split("/").pop()?.replace(".css", "") || ""
    const name = value
      .replace(/-/g, " ")
      .replace(/\b\w/g, (l) => l.toUpperCase())
    return { name, value, path }
  })
}

const THEME_STYLE_ID = "tailwind-theme-style"
const LOCAL_STORAGE_KEY = "selected-theme"
const DEFAULT_THEME = "slate" // Set your default theme here (filename without ".css")

export function ThemeSwitcher() {
  const [themes] = useState(getThemeOptions())
  const [selected, setSelected] = useState(() => {
    return localStorage.getItem(LOCAL_STORAGE_KEY) || DEFAULT_THEME
  })
  const [open, setOpen] = useState(false)

  // Save selected theme to localStorage
  useEffect(() => {
    if (selected) {
      localStorage.setItem(LOCAL_STORAGE_KEY, selected)
    }
  }, [selected])

  // Load and apply the selected theme
  useEffect(() => {
    if (!selected) return
    const theme = themes.find((t) => t.value === selected)
    if (!theme) return

    const prev = document.getElementById(THEME_STYLE_ID)
    if (prev) prev.remove()

    ;(async () => {
      const url = (await themeFiles[theme.path]()) as string
      const link = document.createElement("link")
      link.id = THEME_STYLE_ID
      link.rel = "stylesheet"
      link.href = url
      document.head.appendChild(link)
      // Ensure the theme link is always the last stylesheet in <head>
      if (link !== document.head.lastElementChild) {
        document.head.appendChild(link)
      }
    })()
  }, [selected, themes])

  // Simple dropdown logic using React state
  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
      <div style={{ position: "relative" }}>
        <Button variant="outline" onClick={() => setOpen((o) => !o)}>
          Tema:{" "}
          {themes.find((t) => t.value === selected)?.name || selected}
        </Button>
        {open && (
          <div
            style={{
              position: "absolute",
              right: 0,
              marginTop: 4,
              background: "white",
              border: "1px solid #ccc",
              borderRadius: 6,
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
              zIndex: 1000,
              minWidth: 220,
              maxWidth: 320,
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: 0,
            }}
          >
            {themes.map((t) => {
              return (
                <div
                  key={t.value}
                  style={{
                    padding: "12px 20px",
                    cursor: "pointer",
                    background: t.value === selected ? "#f0f0f0" : undefined,
                    flex: 1,
                    fontSize: 16,
                    wordBreak: "break-word",
                  }}
                  onClick={() => {
                    setSelected(t.value)
                    setOpen(false)
                  }}
                >
                  {t.name}
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
