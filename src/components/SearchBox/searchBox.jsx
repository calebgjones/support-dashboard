import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import contentArray from '../contentArray';

// Helper function to highlight matching text with brand color
const highlightText = (text, searchTerms) => {
  if (!text || !searchTerms || searchTerms.length === 0) return text;
  
  // Create a regex pattern that matches any of the search terms
  const pattern = searchTerms
    .map(term => term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')) // Escape special regex chars
    .join('|');
  
  const regex = new RegExp(`(${pattern})`, 'gi');
  const parts = text.split(regex);
  
  return parts.map((part, index) => {
    const isMatch = searchTerms.some(term => 
      part.toLowerCase() === term.toLowerCase()
    );
    
    if (isMatch) {
      return (
        <span key={index} className="text-bs-secondary font-semibold">
          {part}
        </span>
      );
    }
    return part;
  });
};

// Helper function to strip markup tags from text
const stripMarkup = (text) => {
  if (!text) return '';
  return text.replace(/~[ibun]/g, '');
};

// Helper function to generate route path
const getRoutePath = (module, section = '', subsection = '') => {
  const modulePath = module.toLowerCase().replace(/\s+/g, '-');
  if (!section) return `/${modulePath}`;
  const sectionPath = section.toLowerCase().replace(/\s+/g, '-');
  if (!subsection) return `/${modulePath}/${sectionPath}`;
  const subsectionPath = subsection.toLowerCase().replace(/\s+/g, '-');
  return `/${modulePath}/${sectionPath}/${subsectionPath}`;
};

// Build searchable index from contentArray
const buildSearchIndex = () => {
  const index = [];

  contentArray.forEach((item, moduleIndex) => {
    // Add module-level entry
    index.push({
      type: 'module',
      module: item.module,
      title: item.module,
      path: item.module === 'Home' ? '/' : getRoutePath(item.module),
      info: stripMarkup(item.info),
      searchText: [
        item.module,
        stripMarkup(item.security),
        stripMarkup(item.info),
        item.article
      ].filter(Boolean).join(' ').toLowerCase()
    });

    // Add sections
    if (item.sections && Array.isArray(item.sections)) {
      item.sections.forEach((section, sectionIndex) => {
        index.push({
          type: 'section',
          module: item.module,
          section: section.title,
          title: `${item.module} > ${section.title}`,
          path: getRoutePath(item.module, section.title),
          info: stripMarkup(section.info),
          searchText: [
            item.module,
            section.title,
            stripMarkup(section.security),
            stripMarkup(section.info),
            section.article
          ].filter(Boolean).join(' ').toLowerCase()
        });

        // Add subsections
        if (section.subsections && Array.isArray(section.subsections)) {
          section.subsections.forEach((subsection, subIndex) => {
            if (subsection.title) {
              index.push({
                type: 'subsection',
                module: item.module,
                section: section.title,
                subsection: subsection.title,
                title: `${item.module} > ${section.title} > ${subsection.title}`,
                path: getRoutePath(item.module, section.title, subsection.title),
                info: stripMarkup(subsection.info),
                searchText: [
                  item.module,
                  section.title,
                  subsection.title,
                  stripMarkup(subsection.security),
                  stripMarkup(subsection.info),
                  subsection.article
                ].filter(Boolean).join(' ').toLowerCase()
              });
            }
          });
        }
      });
    }
  });

  return index;
};

const searchIndex = buildSearchIndex();

const SearchBox = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const searchRef = useRef(null);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Search function
  const handleSearch = (searchQuery) => {
    setQuery(searchQuery);
    
    if (searchQuery.trim().length < 2) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    const searchTerms = searchQuery.toLowerCase().split(/\s+/).filter(Boolean);
    
    const matches = searchIndex.filter(item => {
      return searchTerms.every(term => item.searchText.includes(term));
    });

    // Sort results: modules first, then sections, then subsections
    const sortedMatches = matches.sort((a, b) => {
      const typeOrder = { module: 0, section: 1, subsection: 2 };
      return typeOrder[a.type] - typeOrder[b.type];
    });

    setResults(sortedMatches.slice(0, 10)); // Limit to 10 results
    setIsOpen(sortedMatches.length > 0);
    setSelectedIndex(-1);
  };

  // Handle keyboard navigation
  const handleKeyDown = (e) => {
    if (!isOpen) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < results.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && results[selectedIndex]) {
          navigateToResult(results[selectedIndex]);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setSelectedIndex(-1);
        break;
    }
  };

  // Navigate to selected result
  const navigateToResult = (result) => {
    navigate(result.path);
    setQuery('');
    setResults([]);
    setIsOpen(false);
    inputRef.current?.blur();
  };

  // Get icon based on result type
  const getTypeIcon = (type) => {
    switch (type) {
      case 'module':
        return '📦';
      case 'section':
        return '📄';
      case 'subsection':
        return '📎';
      default:
        return '🔍';
    }
  };

  return (
    <div ref={searchRef} className="relative">
      <div className="flex items-center">
        <input
          ref={inputRef}
          type="text"
          placeholder="Search..."
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          onFocus={() => {
            if (results.length > 0) setIsOpen(true);
          }}
          onKeyDown={handleKeyDown}
          className="m:w-50 sm:w-80 lg:w-85 px-3 py-1.5 text-sm text-gray-900 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-bs-secondary focus:border-transparent bg-white/90 placeholder-gray-500"
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 absolute right-3 text-gray-400 pointer-events-none"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      {/* Search Results Dropdown */}
      {isOpen && results.length > 0 && (
        <ul className="absolute right-0 top-full mt-1 w-80 max-h-96 overflow-y-auto bg-white shadow-lg rounded-md py-1 z-50 border border-gray-200">
          {results.map((result, index) => (
            <li
              key={`${result.type}-${result.path}`}
              className={`px-4 py-2 cursor-pointer transition-colors duration-150 ${
                index === selectedIndex
                  ? 'bg-blue-100'
                  : 'hover:bg-gray-100'
              }`}
              onClick={() => navigateToResult(result)}
              onMouseEnter={() => setSelectedIndex(index)}
            >
              <div className="flex items-start gap-2">
                <span className="text-md">{getTypeIcon(result.type)}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-md font-medium text-gray-900 truncate">
                    {highlightText(
                      result.type === 'module' ? result.module : 
                      result.type === 'section' ? result.section : 
                      result.subsection,
                      query.toLowerCase().split(/\s+/).filter(Boolean)
                    )}
                  </p>
                  <p className="text-sm text-gray-500 truncate">
                    {highlightText(result.title, query.toLowerCase().split(/\s+/).filter(Boolean))}
                  </p>
                  <p className="text-xs italic text-gray-400">
                    {highlightText(result.info, query.toLowerCase().split(/\s+/).filter(Boolean))}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBox;
