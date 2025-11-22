import { useState } from 'react'
import Header from './components/Header'
import UploadForm from './components/UploadForm'
import Results from './components/Results'

function App() {
  const [result, setResult] = useState(null)

  return (
    <div className="min-h-screen bg-slate-950 text-blue-50">
      {/* background accents */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_top,rgba(37,99,235,0.15),transparent)]"/>
        <div className="absolute -left-40 top-40 w-80 h-80 rounded-full bg-blue-500/10 blur-3xl"/>
        <div className="absolute -right-40 bottom-40 w-80 h-80 rounded-full bg-cyan-400/10 blur-3xl"/>
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <Header />
        <UploadForm onResult={setResult} />
        <Results result={result} />

        <footer className="mt-16 py-8 text-center text-blue-200/60 text-sm">
          Built for investors and lenders • Upload any file to begin
        </footer>
      </div>
    </div>
  )
}

export default App
