import React, { useReducer, useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import contentArray from '../contentArray';
import SecurityModal from '../SecurityModal/securityModal';
import { parseMarkup } from "../../utils/parseMarkup";
import SearchBox from '../SearchBox/searchBox';


// Helper function to convert module name to camelCase key
const getMenuKey = (module) => {
  return module
    .split(' ')
    .map((word, index) => 
      index === 0 ? word.toLowerCase() : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    )
    .join('');
};

// Generate initial state dynamically from contentArray
const generateInitialState = () => {
  const modules = [...new Set(contentArray.map(item => item.module))];
  const state = {};
  modules.forEach(module => {
    if (module !== 'Home') { // Skip Home module
      state[getMenuKey(module)] = false;
    }
  });
  return state;
};

const initialState = generateInitialState();

const menuReducer = (state, action) => {
  switch (action.type) {
    case 'OPEN_MENU':
      return { ...state, [action.menu]: true };
    case 'CLOSE_MENU':
      return { ...state, [action.menu]: false };
    default:
      return state;
  }
};


// Helper function to determine if dropdown should align right
const useDropdownPosition = (ref, isOpen) => {
  const [alignRight, setAlignRight] = useState(false);

  useEffect(() => {
    if (isOpen && ref.current) {
      const rect = ref.current.getBoundingClientRect();
      const dropdownWidth = 200; // min-w-[200px]
      const spaceOnRight = window.innerWidth - rect.right;
      
      // If there's not enough space on the right, align to the right
      setAlignRight(spaceOnRight < dropdownWidth);
    }
  }, [isOpen, ref]);

  return alignRight;
};

// MenuItem component
const MenuItem = ({ menuKey, label, to, children, menuState, dispatch }) => {
  const menuRef = useRef(null);
  const isOpen = menuState[menuKey];
  const alignRight = useDropdownPosition(menuRef, isOpen);

const handleClick = () => {
    if (isOpen) {
        dispatch({ type: 'CLOSE_MENU', menu: menuKey });
    } else {
        dispatch({ type: 'OPEN_MENU', menu: menuKey });
    }
};

return (
    <li 
        ref={menuRef}
        className="relative"
        onMouseLeave={() => dispatch({ type: 'CLOSE_MENU', menu: menuKey })}
    >
        <Link 
            onClick={handleClick}
            className="px-2 py-2 text-white text-sm font-bold hover:text-bs-secondary rounded-md transition-colors duration-200 block flex items-center gap-1">
            {label}
            {children && (
                <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className={`h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="#FF6A39"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            )}
        </Link>
        {isOpen && children && (
            <ul className={`absolute top-8 ${alignRight ? 'right-0' : 'left-0'} mt-1 bg-white/90 shadow-lg rounded-md py-0 min-w-[200px] z-10`}>
                {children}
            </ul>
        )}
    </li>
);
};

// SubMenuItem component for sections that have subsections
const SubMenuItem = ({ label, to, subsections, moduleIndex, sectionIndex, setCurrentModule, setCurrentSection, setCurrentSubsection, setCurrentPath, setIsModalOpen, setModalContent }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [alignLeft, setAlignLeft] = useState(false);
  const subMenuRef = useRef(null);

  useEffect(() => {
    if (isOpen && subMenuRef.current) {
      const rect = subMenuRef.current.getBoundingClientRect();
      const submenuWidth = 200; // min-w-[200px]
      const spaceOnRight = window.innerWidth - rect.right;
      
      // If there's not enough space on the right, show on the left
      setAlignLeft(spaceOnRight < submenuWidth);
    }
  }, [isOpen]);

  return (
    <li 
      ref={subMenuRef}
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <div className="px-4 py-1 text-sm text-gray-700 hover:bg-blue-200 cursor-pointer flex items-center justify-between">
        {label}
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-4 w-4 ml-2"
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
      {isOpen && subsections && subsections.length > 0 && (
        <ul className={`text-sm absolute ${alignLeft ? 'right-full mr-[0px]' : 'left-full ml-[0px]'} top-0 bg-white/90 shadow-lg rounded-md py-1 min-w-[200px] z-20`}>
          {subsections.map((subsection, subIndex) => (
            <li key={subsection.id}>
              <Link 
                to={subsection.path}
                onClick={(e) => {
                  const pathParts = subsection.path.split('/').filter(part => part);
                  const module = pathParts[0]?.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) || '';
                  const section = pathParts[1]?.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) || '';
                  const subsectionName = pathParts[2]?.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) || '';
                  
                  const subsectionData = contentArray[moduleIndex].sections[sectionIndex].subsections[subIndex];
                  
                  if (subsectionData.modal) {
                    // If mult is true, show modal AND navigate (don't prevent default)
                    // If mult is false/undefined, show modal but prevent navigation
                    if (!subsectionData.mult) {
                      e.preventDefault();
                    }
                    setModalContent(subsectionData);
                    setIsModalOpen(true);
                  }
                  
                  setCurrentModule(module);
                  setCurrentSection(section);
                  setCurrentSubsection(subsectionName);
                  setCurrentPath(`contentArray[${moduleIndex}].sections[${sectionIndex}].subsections[${subIndex}]`);
                }}
                className="text-sm px-4 py-1 text-gray-700 hover:bg-blue-200 block transition-colors duration-200">
                {subsection.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};

const NavigationBar = () => {
  const [menuState, dispatch] = useReducer(menuReducer, initialState);
  const [currentModule, setCurrentModule] = useState('');
  const [currentSection, setCurrentSection] = useState('');
  const [currentSubsection, setCurrentSubsection] = useState('');
  const [currentPath, setCurrentPath] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  // Update current selection based on URL path on initial mount
  useEffect(() => {
    const path = window.location.pathname;
    const pathParts = path.split('/').filter(part => part);
    
    if (pathParts.length === 0) {
      setCurrentModule('Home');
      setCurrentSection('');
      setCurrentSubsection('');
      setCurrentPath('contentArray[0]');
    } else {
      const module = pathParts[0]?.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) || '';
      const section = pathParts[1]?.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) || '';
      const subsection = pathParts[2]?.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) || '';

      setCurrentModule(module);
      setCurrentSection(section);
      setCurrentSubsection(subsection);

      
      // Find the indices in contentArray
      const moduleIndex = contentArray.findIndex(item => item.module === module);
      if (moduleIndex !== -1) {
        const sectionIndex = contentArray[moduleIndex].sections?.findIndex(s => s.title === section);
        if (sectionIndex !== -1 && subsection) {
          const subsectionIndex = contentArray[moduleIndex].sections[sectionIndex].subsections?.findIndex(sub => sub.title === subsection);
          if (subsectionIndex !== -1) {
            setCurrentPath(`contentArray[${moduleIndex}].sections[${sectionIndex}].subsections[${subsectionIndex}]`);
          }
        } else if (sectionIndex !== -1) {
          setCurrentPath(`contentArray[${moduleIndex}].sections[${sectionIndex}]`);
        }
      }
    }
  }, []); // Empty dependency array - only run on mount

  // Generate route path from module, section, and subsection
  const getRoutePath = (module, section, subsection = '') => {
    const modulePath = module.toLowerCase().replace(/\s+/g, '-');
    const sectionPath = section.toLowerCase().replace(/\s+/g, '-');
    if (subsection) {
      const subsectionPath = subsection.toLowerCase().replace(/\s+/g, '-');
      return `/${modulePath}/${sectionPath}/${subsectionPath}`;
    }
    return `/${modulePath}/${sectionPath}`;
  };

return (
  <>
    <nav className="sticky top-0 z-50 shadow-lg bg-bs-primary px-[10%]">
        <div className="flex items-center justify-between px-2 py-3">
          <ul className="flex flex-wrap items-center gap-1">
            <li>
                    <Link 
                      to="/" 
                      onMouseDown={() => {
                        setCurrentModule('Home');
                        setCurrentSection('');
                        setCurrentSubsection('');
                        setCurrentPath('contentArray[0]');
                      }}
                      className="text-sm px-4 py-2 text-white hover:bg-bs-secondary rounded-md transition-colors duration-200 block">
                    <span className="flex items-center gap-1"></span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="white">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                    </Link>
            </li>

            {contentArray.map((item, index) => {
              // Skip the Home module as it's handled separately
              if (item.module === 'Home') return null;

              const menuKey = getMenuKey(item.module);
              
              // All modules now use nested structure with sections array
              if (!item.sections || !Array.isArray(item.sections)) return null;

              return (
                <MenuItem 
                  key={`${menuKey}-${index}`}
                  menuKey={menuKey} 
                  label={item.module} 
                  menuState={menuState} 
                  dispatch={dispatch}
                >
                  {item.sections.map((section, sectionIndex) => {
                    // Check if this section has subsections with content
                    const hasSubsections = section.subsections && 
                      section.subsections.length > 0 && 
                      section.subsections.some(sub => sub.title);
                    
                    if (hasSubsections) {
                      // Group subsections
                      const subsections = section.subsections
                        .filter(sub => sub.title)
                        .map((sub, subIndex) => ({
                          id: `${menuKey}-${sectionIndex}-${subIndex}`,
                          name: sub.title,
                          path: getRoutePath(item.module, section.title, sub.title)
                        }));
                      
                      return (
                        <SubMenuItem
                          key={`${menuKey}-${section.title}-${sectionIndex}`}
                          label={section.title}
                          subsections={subsections}
                          moduleIndex={index}
                          sectionIndex={sectionIndex}
                          setCurrentModule={setCurrentModule}
                          setCurrentSection={setCurrentSection}
                          setCurrentSubsection={setCurrentSubsection}
                          setCurrentPath={setCurrentPath}
                          setIsModalOpen={setIsModalOpen}
                          setModalContent={setModalContent}
                        />
                      );
                    } else {
                      // Regular section item without subsections
                      return (
                        <li key={`${menuKey}-${section.title}-${sectionIndex}`}>
                          <Link 
                            to={getRoutePath(item.module, section.title)}
                            onClick={(e) => {
                              const sectionData = contentArray[index].sections[sectionIndex];
                              
                              if (sectionData.modal) {
                                // If mult is true, show modal AND navigate (don't prevent default)
                                // If mult is false/undefined, show modal but prevent navigation
                                if (!sectionData.mult) {
                                  e.preventDefault();
                                }
                                setModalContent(sectionData);
                                setIsModalOpen(true);
                              }
                              
                              setCurrentModule(item.module);
                              setCurrentSection(section.title);
                              setCurrentSubsection('');
                              setCurrentPath(`contentArray[${index}].sections[${sectionIndex}]`);
                            }}
                            className="text-sm px-4 py-1 text-gray-700 hover:bg-blue-200 block transition-colors duration-200">
                            {section.title}
                          </Link>
                        </li>
                      );
                    }
                  })}
                </MenuItem>
              );
            })}

          </ul>
          
          {/* Search Box - Right Side */}
          <SearchBox />
        </div>
        
    </nav>
    
    {isModalOpen && modalContent && (
      <SecurityModal 
        title={parseMarkup(modalContent.title)}
        security={parseMarkup(modalContent.info)}
        notes={parseMarkup(modalContent.notes)}
        onClose={() => setIsModalOpen(false)}
      />
    )}
  </>
);
};


export default NavigationBar;