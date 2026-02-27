import React, { Suspense, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import contentArray from '../contentArray';
import { parseMarkup } from '../../utils/parseMarkup';

// Dynamically import all module components using Vite's glob import
const moduleComponents = import.meta.glob('../Modules/**/*.jsx');

// Create a case-insensitive lookup map for module components
const moduleComponentsLowercase = Object.fromEntries(
  Object.entries(moduleComponents).map(([path, loader]) => [path.toLowerCase(), loader])
);

// Helper to convert URL params to file path
const getComponentPath = (moduleName, sectionName, subsectionName) => {
  const parts = ['../Modules'];
  if (moduleName) parts.push(moduleName.toLowerCase());
  if (sectionName) parts.push(sectionName.toLowerCase());
  if (subsectionName) parts.push(`${subsectionName.toLowerCase()}.jsx`);
  else if (sectionName) parts.push('index.jsx'); // Try index.jsx for section-level
  else if (moduleName) parts.push('index.jsx'); // Try index.jsx for module-level
  
  return parts.join('/');
};

// Helper to find content from contentArray
const findContent = (moduleName, sectionName, subsectionName) => {
  // Normalize names for comparison (URL uses hyphens, contentArray uses spaces)
  const normalizeForCompare = (str) => str?.toLowerCase().replace(/-/g, ' ') || '';
  
  const moduleData = contentArray.find(
    item => normalizeForCompare(item.module) === normalizeForCompare(moduleName)
  );
  
  if (!moduleData) return null;
  
  if (!sectionName) {
    return { type: 'module', data: moduleData };
  }
  
  const sectionData = moduleData.sections?.find(
    s => normalizeForCompare(s.title) === normalizeForCompare(sectionName)
  );
  
  if (!sectionData) return null;
  
  if (!subsectionName) {
    return { type: 'section', data: sectionData, module: moduleData };
  }
  
  const subsectionData = sectionData.subsections?.find(
    sub => normalizeForCompare(sub.title) === normalizeForCompare(subsectionName)
  );
  
  if (!subsectionData) return null;
  
  return { type: 'subsection', data: subsectionData, section: sectionData, module: moduleData };
};

// Fallback component that renders content from contentArray
const ContentFallback = ({ moduleName, sectionName, subsectionName }) => {
  const content = findContent(moduleName, sectionName, subsectionName);
  
  if (!content) {
    return (
      <div className="bg-gray-800 py-10 my-2 mx-[10vw] rounded-lg shadow-lg">
        <div className="max-w-5xl mx-auto px-8 text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Page Not Found</h1>
          <p className="text-gray-300">
            No content found for this path.
          </p>
        </div>
      </div>
    );
  }

  const { type, data, section, module } = content;
  
  // Build breadcrumb
  const breadcrumb = [moduleName];
  if (sectionName) breadcrumb.push(sectionName);
  if (subsectionName) breadcrumb.push(subsectionName);

  return (
    <div>
    <div className="bg-gray-800 py-10 my-2 mx-[10vw] rounded-lg shadow-lg">
      <div className="max-w-5xl mx-auto px-8">
        {/* Breadcrumb */}
        <p className="text-gray-400 text-sm mb-4">
          {breadcrumb.map((item, i) => {
            const isLast = i === breadcrumb.length - 1;
            return (
              <span key={i}>
                {i > 0 && <span className="text-gray-500"> &gt; </span>}
                {isLast ? (
                  <span className="capitalize text-bs-primary-100">{item.replace(/-/g, ' ')}</span>
                ) : (
                  <a className="capitalize text-bs-primary-300 hover:text-white" href={`/${breadcrumb.slice(0, i + 1).join('/')}`}>
                    {item.replace(/-/g, ' ')}
                  </a>
                )}
              </span>
            );
          })}
        </p>

        {/* Title */}
        <h1 className="text-4xl font-bold text-white mb-6 capitalize">
          {(data.title || data.module || subsectionName || sectionName || moduleName).replace(/-/g, ' ')}
        </h1>

        {/* Info */}
        {data.info && (
          <div className="bg-gray-600 p-6 rounded-lg mb-6">
            <h2 className="text-xl font-semibold text-bs-secondary-300 mb-3">Information</h2>
            <p className="text-gray-300">{parseMarkup(data.info)}</p>
          </div>
        )}

        {/* Notes */}
        {data.notes && (
          <div className="bg-gray-700 p-6 rounded-lg mb-6">
            <h2 className="text-xl font-semibold text-bs-secondary-300 mb-3">Notes</h2>
            <p className="text-gray-300">{parseMarkup(data.notes)}</p>
          </div>
        )}

        {/* Article link */}
        {data.article && (
          <div className="bg-gray-700 p-6 rounded-lg mb-6">
            <h2 className="text-xl font-semibold text-bs-secondary-300 mb-3">Knowledge Base Article</h2>
            <p className="text-gray-300">Article #{data.article}</p>
          </div>
        )}

        {/* List sections if this is a module page */}
        {type === 'module' && data.sections && (
          <div className="mt-8">
            <h2 className="text-2xl font-semibold text-white mb-4">Sections</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {data.sections.map((section, idx) => (
                <a
                  key={idx}
                  href={`/${moduleName}/${section.title.toLowerCase().replace(/\s+/g, '-')}`}
                  className="bg-gray-700 p-4 rounded-lg hover:bg-gray-600 transition-colors"
                >
                  <h3 className="text-lg font-semibold text-white">{section.title}</h3>
                  {section.info && (
                    <p className="text-gray-400 text-sm mt-1">{parseMarkup(section.info)}</p>
                  )}
                </a>
              ))}
            </div>
          </div>
        )}

        {/* List subsections if this is a section page */}
        {type === 'section' && data.subsections && (
          <div className="mt-8">
            <h2 className="text-2xl font-semibold text-white mb-4">Subsections</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {data.subsections.map((sub, idx) => (
                <a
                  key={idx}
                  href={`/${moduleName}/${sectionName}/${sub.title.toLowerCase().replace(/\s+/g, '-')}`}
                  className="bg-gray-700 p-4 rounded-lg hover:bg-gray-600 transition-colors"
                >
                  <h3 className="text-lg font-semibold text-white">{sub.title}</h3>
                  {sub.info && (
                    <p className="text-gray-400 text-sm mt-1">{parseMarkup(sub.info)}</p>
                  )}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
    <div className="bg-bs-secondary-300 my-2 mx-[10vw] py-1 rounded-lg shadow-lg"></div>
    </div>
  );
};

// Loading component
const LoadingSpinner = () => (
  <div className="bg-gray-800 py-10 my-2 mx-[10vw] rounded-lg shadow-lg">
    <div className="max-w-5xl mx-auto px-8 text-center">
      <p className="text-gray-300">Loading...</p>
    </div>
  </div>
);

// Main DynamicPage component
const DynamicPage = () => {
  const { moduleName, sectionName, subsectionName } = useParams();
  const [Component, setComponent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [useContentFallback, setUseContentFallback] = useState(false);

  useEffect(() => {
    const loadComponent = async () => {
      setLoading(true);
      setComponent(null);

      // Build possible paths to check based on current route
      const pathsToTry = [];
      
      if (subsectionName) {
        // Subsection level: /Modules/teams/tier-1/tyler.jsx
        pathsToTry.push(`../modules/${moduleName.toLowerCase()}/${sectionName.toLowerCase()}/${subsectionName.toLowerCase()}.jsx`);
      } else if (sectionName) {
        // Section level: try both index.jsx and sectionName.jsx
        pathsToTry.push(`../modules/${moduleName.toLowerCase()}/${sectionName.toLowerCase()}/index.jsx`);
        pathsToTry.push(`../modules/${moduleName.toLowerCase()}/${sectionName.toLowerCase()}/${sectionName.toLowerCase()}.jsx`);
      } else if (moduleName) {
        // Module level: try both index.jsx and moduleName.jsx
        pathsToTry.push(`../modules/${moduleName.toLowerCase()}/index.jsx`);
        pathsToTry.push(`../modules/${moduleName.toLowerCase()}/${moduleName.toLowerCase()}.jsx`);
      }

      console.log('Looking for component at:', pathsToTry);
      console.log('Available paths:', Object.keys(moduleComponentsLowercase));

      // Try each path until one works
      for (const pathToTry of pathsToTry) {
        if (moduleComponentsLowercase[pathToTry]) {
          try {
            const module = await moduleComponentsLowercase[pathToTry]();
            console.log('Loaded component:', module.default);
            setComponent(() => module.default);
            break;
          } catch (e) {
            console.log(`Failed to load ${pathToTry}:`, e);
          }
        }
      }

      setLoading(false);
    };

    loadComponent();
  }, [moduleName, sectionName, subsectionName]);

  if (loading) {
    return <LoadingSpinner />;
  }

  // Always show ContentFallback at the top, then the file-based component below (if it exists)
  return (
    <>
      <ContentFallback 
        moduleName={moduleName} 
        sectionName={sectionName} 
        subsectionName={subsectionName} 
      />
      {Component && (
        <Suspense fallback={<LoadingSpinner />}>
          <Component />
        </Suspense>
      )}
    </>
  );
};

export default DynamicPage;
