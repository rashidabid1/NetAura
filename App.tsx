
import React, { useState, useEffect, useCallback } from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import DeviceList from './components/DeviceList';
import DeviceDetails from './components/DeviceDetails';
import Settings from './components/Settings';
import Login from './components/Login';
import ScanAnimation from './components/ScanAnimation';
import { Device, ScanConfig } from './types';
import { INITIAL_DEVICES, updateDeviceStatus } from './data';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [devices, setDevices] = useState<Device[]>(INITIAL_DEVICES);
  const [isScanning, setIsScanning] = useState(false);
  const [lastScan, setLastScan] = useState(new Date().toLocaleTimeString());
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);
  const [config, setConfig] = useState<ScanConfig>({
    interval: 10,
    ipRange: '192.168.1.0/24'
  });

  // Real-time status simulation effect
  useEffect(() => {
    if (!isAuthenticated) return;

    const intervalId = setInterval(() => {
      setDevices(prev => updateDeviceStatus(prev));
    }, config.interval * 1000);

    return () => clearInterval(intervalId);
  }, [isAuthenticated, config.interval]);

  const handleManualScan = useCallback(() => {
    setIsScanning(true);
    // Simulate deep network scan
    setTimeout(() => {
      setDevices(prev => updateDeviceStatus(prev));
      setLastScan(new Date().toLocaleTimeString());
      setIsScanning(false);
    }, 3000);
  }, []);

  const renderContent = () => {
    if (isScanning) {
      return (
        <div className="flex-1 flex items-center justify-center min-h-[60vh]">
          <ScanAnimation />
        </div>
      );
    }

    switch (activeTab) {
      case 'dashboard':
        return <Dashboard devices={devices} lastScan={lastScan} />;
      case 'devices':
        return (
          <DeviceList 
            devices={devices} 
            onScan={handleManualScan} 
            isScanning={isScanning}
            onSelectDevice={setSelectedDevice}
          />
        );
      case 'settings':
        return <Settings config={config} onUpdateConfig={setConfig} />;
      case 'export':
        return (
          <div className="flex flex-col items-center justify-center min-h-[50vh] text-center space-y-6 animate-in fade-in zoom-in duration-500">
             <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center border border-white/10">
                <div className="w-12 h-12 bg-[#39FF14] rounded-lg animate-bounce"></div>
             </div>
             <div>
                <h3 className="text-2xl font-black mb-2 uppercase">Preparing Assets</h3>
                <p className="text-white/40 max-w-md mx-auto">Compiler is generating a cryptographic audit report of your network state.</p>
             </div>
             <button className="px-8 py-3 bg-[#39FF14] text-black font-black rounded-xl shadow-[0_0_20px_rgba(57,255,20,0.3)] hover:scale-105 transition-all">
                DOWNLOAD NOW (.CSV)
             </button>
          </div>
        );
      default:
        return <Dashboard devices={devices} lastScan={lastScan} />;
    }
  };

  if (!isAuthenticated) {
    return <Login onLogin={() => setIsAuthenticated(true)} />;
  }

  return (
    <Layout 
      activeTab={activeTab} 
      setActiveTab={setActiveTab} 
      onLogout={() => setIsAuthenticated(false)}
    >
      {renderContent()}
      
      <DeviceDetails 
        device={selectedDevice} 
        onClose={() => setSelectedDevice(null)} 
      />
    </Layout>
  );
};

export default App;
