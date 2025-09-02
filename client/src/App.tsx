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
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'} transition-colors duration-300`}>
      {/* Modern Header */}
      <header className={`${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'} shadow-lg transition-colors duration-300`}>
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <span className="material-symbols-outlined text-3xl text-blue-600">dns</span>
              <h1 className="text-3xl font-bold">Axiom</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => console.log('Save Design')} 
                className={`px-4 py-2 rounded-md transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                  isDarkMode 
                    ? 'bg-blue-600 text-white hover:bg-blue-700' 
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                Save Design
              </button>
              <button 
                onClick={handleClearCanvas}
                className={`px-4 py-2 rounded-md transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 ${
                  isDarkMode 
                    ? 'bg-red-600 text-white hover:bg-red-700' 
                    : 'bg-red-600 text-white hover:bg-red-700'
                }`}
              >
                Clear Canvas
              </button>
              <button 
                onClick={toggleDarkMode}
                className={`p-2 rounded-full ${
                  isDarkMode 
                    ? 'bg-gray-700 text-yellow-300 hover:bg-gray-600' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
                aria-label="Toggle dark mode"
              >
                {isDarkMode ? (
                  <span className="material-symbols-outlined">light_mode</span>
                ) : (
                  <span className="material-symbols-outlined">dark_mode</span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Component Palette */}
              <div className="lg:w-1/4 bg-white rounded-lg shadow p-6 h-fit">
                <h2 className="text-xl font-semibold mb-4">Components</h2>
                <div className="space-y-2">
                  {componentTypes.map((component) => (
                    <div 
                      key={component.type}
                      draggable="true" 
                      onDragStart={(e) => handleDragStart(e, component.type)}
                      className="flex items-center p-3 bg-gray-100 rounded cursor-move hover:bg-gray-200"
                    >
                      <span className="material-symbols-outlined text-2xl mr-2 text-blue-600">
                        {component.icon}
                      </span>
                      <span>{component.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Canvas Area */}
              <div className="lg:w-3/4">
                <div 
                  id="canvas" 
                  className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-300'} border-2 border-dashed rounded-lg h-[600px] relative overflow-hidden transition-colors duration-300`}
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                >
                  <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                    <p className="text-center p-4">
                      Drag components here to build your infrastructure design
                      <br />
                      <span className="text-sm">Click and drag to move components after placing them</span>
                    </p>
                  </div>
                  {components.map((component) => (
                    <div
                      key={component.id}
                      className={`${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'} border rounded-lg p-3 shadow-md cursor-move flex items-center transition-colors duration-300`}
                      style={{ left: component.x, top: component.y, position: 'absolute' }}
                    >
                      <span className={`material-symbols-outlined text-xl mr-1 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                        {getComponentIcon(component.type)}
                      </span>
                      <span className={`text-sm ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>{getComponentLabel(component.type)}</span>
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