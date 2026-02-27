import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import NavigationBar from './components/NavigationBar/navigationBar.jsx'
import HomePage from './components/HomePage/homePage.jsx'
import DynamicPage from './components/DynamicPage/DynamicPage.jsx'

/**
 * App component sets up client-side routing for the dashboard.
 *
 * Routes automatically resolve to:
 * 1. A file-based component in /Modules/ (if it exists)
 * 2. Content from contentArray.js (fallback)
 * 
 * File structure examples:
 * - /teams/tier-1/tyler → tries /Modules/teams/tier-1/tyler.jsx
 * - /teams/tier-1 → tries /Modules/teams/tier-1/index.jsx or /Modules/teams/tier-1.jsx
 * - /teams → tries /Modules/teams/index.jsx or /Modules/teams.jsx
 */
function App() {

  return (
    <>
    <BrowserRouter>
    <NavigationBar />
    <Routes>
      <Route path="/" element={<HomePage />} />
      {/* Dynamic routes - automatically check for file or use contentArray */}
      <Route path="/:moduleName" element={<DynamicPage />} />
      <Route path="/:moduleName/:sectionName" element={<DynamicPage />} />
      <Route path="/:moduleName/:sectionName/:subsectionName" element={<DynamicPage />} />
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
