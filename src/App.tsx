import ViolinPracticeTracker from "./features/violin/components/violin-practice-tracker"
export function App() {
  return (
    <div className="flex flex-col gap-6 mx-auto max-w-4xl min-h-svh p-6">
      <h1 className="text-2xl font-bold">Violin Practice Tracker</h1>
      {/* <div className="flex max-w-2xl min-w-0 flex-col gap-4 text-sm leading-loose"> */}
        <div>
          <ViolinPracticeTracker />
        </div>
        <div className="font-mono text-xs text-muted-foreground">
          (Press <kbd>d</kbd> to toggle dark mode)
        </div>
      {/* </div> */}
    </div>
  )
}

export default App
