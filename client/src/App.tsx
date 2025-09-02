import React, { useState } from 'react';

interface Component {
  id: string;
  type: string;
  x: number;
  y: number;
}

const App: React.FC = () => {
  const [components, setComponents] = useState<Component[]>([]);
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  const componentTypes = [
    { type: 'server', icon: 'dns', label: 'Server' },
    { type: 'database', icon: 'storage', label: 'Database' },
    { type: 'loadbalancer', icon: 'account_tree', label: 'Load Balancer' },
    { type: 'cache', icon: 'bolt', label: 'Cache' },
    { type: 'cdn', icon: 'language', label: 'CDN' },
    { type: 'k8s', icon: 'splitscreen_add', label: 'K8s Cluster' },
  ];

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, type: string) => {
    setDraggedItem(type);
    e.dataTransfer.setData('text/plain', type);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!draggedItem) return;

    const canvasRect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - canvasRect.left;
    const y = e.clientY - canvasRect.top;

    const newComponent: Component = {
      id: `${draggedItem}-${Date.now()}`,
      type: draggedItem,
      x,
      y
    };

    setComponents([...components, newComponent]);
    setDraggedItem(null);
  };

  const handleClearCanvas = () => {
    setComponents([]);
  };

  const getComponentIcon = (type: string) => {
    const component = componentTypes.find(c => c.type === type);
    return component ? component.icon : 'help';
  };

  const getComponentLabel = (type: string) => {
    const component = componentTypes.find(c => c.type === type);
    return component ? component.label : 'Unknown';
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gradient-to-br from-gray-900 to-gray-800' : 'bg-gradient-to-br from-gray-50 to-gray-100'} transition-colors duration-300`}>
      {/* Modern Header with enhanced styling */}
      <header className={`${isDarkMode ? 'bg-gradient-to-r from-blue-900 to-indigo-900 text-white' : 'bg-gradient-to-r from-blue-600 to-indigo-700 text-white'} shadow-2xl transition-all duration-300`}>
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <span className="material-symbols-outlined text-4xl text-blue-300 drop-shadow-lg">dns</span>
              <h1 className="text-3xl font-bold tracking-tight drop-shadow-md">Axiom</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => console.log('Save Design')} 
                className={`px-5 py-2.5 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2 ${
                  isDarkMode 
                    ? 'bg-gradient-to-r from-green-600 to-emerald-700 text-white shadow-lg hover:shadow-xl' 
                    : 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-md hover:shadow-lg'
                }`}
              >
                Save Design
              </button>
              <button 
                onClick={handleClearCanvas}
                className={`px-5 py-2.5 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-300 focus:ring-offset-2 ${
                  isDarkMode 
                    ? 'bg-gradient-to-r from-red-600 to-rose-700 text-white shadow-lg hover:shadow-xl' 
                    : 'bg-gradient-to-r from-red-500 to-rose-600 text-white shadow-md hover:shadow-lg'
                }`}
              >
                Clear Canvas
              </button>
              <button 
                onClick={toggleDarkMode}
                className={`p-3 rounded-full transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:ring-offset-2 ${
                  isDarkMode 
                    ? 'bg-gradient-to-r from-amber-700 to-yellow-800 text-yellow-300 shadow-lg hover:shadow-xl' 
                    : 'bg-gradient-to-r from-amber-400 to-yellow-500 text-amber-900 shadow-md hover:shadow-lg'
                }`}
                aria-label="Toggle dark mode"
              >
                {isDarkMode ? (
                  <span className="material-symbols-outlined text-xl">light_mode</span>
                ) : (
                  <span className="material-symbols-outlined text-xl">dark_mode</span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      <main>
        <div className="max-w-7xl mx-auto py-8 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Component Palette with enhanced styling */}
              <div className={`lg:w-1/4 rounded-2xl shadow-xl p-6 h-fit transition-all duration-300 ${
                isDarkMode 
                  ? 'bg-gray-800/80 backdrop-blur-sm border border-gray-700' 
                  : 'bg-white/80 backdrop-blur-sm border border-gray-200'
              }`}>
                <h2 className="text-2xl font-bold mb-6 pb-2 border-b border-gray-300 dark:border-gray-600">Components</h2>
                <div className="space-y-3">
                  {componentTypes.map((component) => (
                    <div 
                      key={component.type}
                      draggable="true" 
                      onDragStart={(e) => handleDragStart(e, component.type)}
                      className={`flex items-center p-4 rounded-xl cursor-move transition-all duration-300 transform hover:scale-[1.02] ${
                        isDarkMode 
                          ? 'bg-gray-700/50 hover:bg-gray-700 shadow-md hover:shadow-lg' 
                          : 'bg-gray-100 hover:bg-gray-200 shadow-sm hover:shadow-md'
                      }`}
                    >
                      <span className={`material-symbols-outlined text-3xl mr-3 ${
                        isDarkMode ? 'text-blue-400' : 'text-blue-600'
                      }`}>
                        {component.icon}
                      </span>
                      <span className="font-medium">{component.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Canvas Area with enhanced styling */}
              <div className="lg:w-3/4">
                <div 
                  id="canvas" 
                  className={`rounded-2xl shadow-xl h-[600px] relative overflow-hidden transition-all duration-300 ${
                    isDarkMode 
                      ? 'bg-gray-800/50 border-2 border-dashed border-gray-700' 
                      : 'bg-white/50 border-2 border-dashed border-gray-300'
                  }`}
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <p className={`text-center p-6 rounded-xl max-w-md ${
                      isDarkMode 
                        ? 'bg-gray-800/80 text-gray-300' 
                        : 'bg-white/80 text-gray-600'
                    }`}>
                      <span className="block text-lg font-medium mb-2">Drag components here to build your infrastructure design</span>
                      <span className="text-sm opacity-75">Click and drag to move components after placing them</span>
                    </p>
                  </div>
                  {components.map((component) => (
                    <div
                      key={component.id}
                      className={`rounded-xl p-4 shadow-lg cursor-move flex items-center transition-all duration-300 transform hover:scale-105 ${
                        isDarkMode 
                          ? 'bg-gradient-to-br from-gray-700 to-gray-800 border border-gray-600' 
                          : 'bg-gradient-to-br from-white to-gray-50 border border-gray-200'
                      }`}
                      style={{ left: component.x, top: component.y, position: 'absolute' }}
                    >
                      <span className={`material-symbols-outlined text-2xl mr-2 ${
                        isDarkMode ? 'text-blue-400' : 'text-blue-600'
                      }`}>
                        {getComponentIcon(component.type)}
                      </span>
                      <span className={`font-medium ${
                        isDarkMode ? 'text-gray-200' : 'text-gray-700'
                      }`}>
                        {getComponentLabel(component.type)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;