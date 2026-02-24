import contentArray from "../contentArray";
import './homePage.css';

const HomePage = () => {
    return (
      <div className="bg-gray-800 py-10 my-2 mx-[10vw] rounded-lg shadow-lg">
        <div className="max-w-5xl mx-auto px-8">
                <div className="text-center mb-12">
                <div className="inline-flex items-center gap-4 mb-4">
                  <h1 className="text-5xl font-bold text-bs-secondary-600 [text-shadow:2px_2px_4px_rgba(0,0,0,0.4)]">Lightspeed Support Dashboard</h1>
                </div>
                <p className="text-xl text-gray-300 mb-2">Your comprehensive resource for Lightspeed DMS support</p>
                </div>

          {/* About Section */}
          <div className="mb-10">
            <h2 className="text-3xl font-semibold text-white mb-4">About This Dashboard</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              The Lightspeed DMS Support Dashboard is designed to help support teams quickly find the information 
              they need when assisting dealerships with Lightspeed Dealer Management System. Access security requirements, 
              module documentation, knowledgebase articles, and support analytics all in one centralized location.
            </p>
          </div>

          {/* Key Features */}
          <div className="mb-10">
            <h2 className="text-3xl font-semibold text-white mb-4">Key Resources</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-700 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-bs-secondary-300 mb-3">☎️ Useful Contacts</h3>
                <p className="text-gray-300">
                  Quickly look up useful contacts for various departments and teams. 
                </p>
              </div>
              <div className="bg-gray-700 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-bs-secondary-300 mb-3">📊 Support Analytics</h3>
                <p className="text-gray-300">
                  Track ticket volumes, response times, and workload trends to help 
                  the support team monitor performance and prioritize efforts.
                </p>
              </div>   
              <div className="bg-gray-700 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-bs-secondary-300 mb-3">📝 Support Notes</h3>
                <p className="text-gray-300">
                  Important notes, tips, and caveats for specific functions to help resolve 
                  issues faster and avoid common pitfalls.
                </p>
              </div>

              <div className="bg-gray-700 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-bs-secondary-300 mb-3">🔍 Quick Search</h3>
                <p className="text-gray-300">
                  Use the search bar to instantly find modules, sections, and documentation 
                  across the entire support dashboard.
                </p>
              </div>
            </div>
          </div>

          {/* Sections Overview */}
          <div className="mb-10">
            <h2 className="text-3xl font-semibold text-white mb-4">Dashboard Pages</h2>
            <div className="bg-gray-700 p-6 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-0 text-gray-300">
                {contentArray.filter(item => item.module !== 'Home').map((item, index) => {
                  const sectionCount = item.sections ? item.sections.length : 0;
                  const subsectionCount = item.sections ? 
                    item.sections.reduce((total, section) => 
                      total + (section.subsections ? section.subsections.length : 0), 0
                    ) : 0;
                  
                  return (
                    <a key={index} href={`/${item.module}`} className="rounded-lg bg-gray-600 p-4 mx-2.5 my-2 hover:bg-gray-900 transition-colors duration-300">
                      <div className="rounded-lg flex items-start mb-2">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-white">{item.module}</h3>
                        </div>
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Getting Started */}
          <div className="mb-10">
            <h2 className="text-3xl font-semibold text-white mb-4">How to Use This Dashboard</h2>
            <div className="bg-gray-700 p-6 rounded-lg">
              <ol className="list-decimal list-inside space-y-3 text-gray-300">
                <li>Use the <strong>search bar</strong> in the navigation to quickly find what you need</li>
                <li>Select a <strong>Lightspeed DMS module</strong> from the navigation menu</li>
                <li>Browse <strong>sections and subsections</strong> for the specific function</li>
                <li>Check <strong>security requirements</strong> to verify user permissions</li>
                <li>Click <strong>knowledgebase article links</strong> for detailed documentation</li>
                <li>Review <strong>support notes</strong> for tips and important caveats</li>
              </ol>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center pt-8 border-t border-gray-600">
            <p className="text-gray-400 text-sm">
                Lightspeed  © 2026
            </p>
          </div>
        </div>
      </div>
    );
}

export default HomePage;