import './App.css'
import { BrowserRouter, Route, Routes, useParams } from 'react-router-dom'
import NavigationBar from './components/NavigationBar/navigationBar.jsx'
import HomePage from './components/HomePage/homePage.jsx'

/**
 * App component sets up client-side routing for the dashboard.
 *
 * Uses React Router to map paths to pages:
 * - The `:` prefix denotes a dynamic URL segment (route parameter).
 *   For example, `/module/:moduleName` captures the `moduleName` part of the URL
 *   and makes it available to the rendered component (e.g., via `useParams`).
 */
function App() {

  return (
    <>
    <BrowserRouter>
    <NavigationBar />
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/module/:moduleName" element={<ModulePage />} />
      <Route path="/module/:moduleName/section/:sectionName" element={<SectionPage />} />
      <Route path="/module/:moduleName/section/:sectionName/subsection/:subsectionName" element={<SubsectionPage />} />
    </Routes>
    </BrowserRouter>
    </>
  )
}

function ModulePage() {
  const { moduleName } = useParams();
  return <div>Module: {moduleName}</div>;
}

function SectionPage() {
  const { moduleName, sectionName } = useParams();
  return <div>Module: {moduleName}, Section: {sectionName}</div>;
}

function SubsectionPage() {
  const { moduleName, sectionName, subsectionName } = useParams();
  return <div>Module: {moduleName}, Section: {sectionName}, Subsection: {subsectionName}</div>;
}

export default App
