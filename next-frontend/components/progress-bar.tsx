interface ProgressBarProps {
  progress: number
  theme: "dark" | "light"
}

export default function ProgressBar({ progress, theme }: ProgressBarProps) {
  return (
    <div className={`h-2 w-full rounded-full ${theme === "dark" ? "bg-zinc-700" : "bg-gray-200"}`}>
      <div
        className={`h-full rounded-full ${theme === "dark" ? "bg-purple-600" : "bg-purple-500"}`}
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}
