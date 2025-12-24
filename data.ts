
import { Device, DeviceStatus } from './types';

export const INITIAL_DEVICES: Device[] = [
  { id: '1', name: 'Main Router', ip: '192.168.1.1', mac: '00:1A:2B:3C:4D:5E', status: DeviceStatus.ONLINE, lastSeen: 'Just now', type: 'Router', latency: 12 },
  { id: '2', name: 'Admin PC', ip: '192.168.1.10', mac: 'A1:B2:C3:D4:E5:F6', status: DeviceStatus.ONLINE, lastSeen: 'Just now', type: 'Desktop', latency: 45 },
  { id: '3', name: 'iPhone 15 Pro', ip: '192.168.1.25', mac: '11:22:33:44:55:66', status: DeviceStatus.OFFLINE, lastSeen: '2 hours ago', type: 'Mobile', latency: 0 },
  { id: '4', name: 'Samsung Smart Fridge', ip: '192.168.1.50', mac: 'AA:BB:CC:DD:EE:FF', status: DeviceStatus.ONLINE, lastSeen: 'Just now', type: 'IoT', latency: 89 },
  { id: '5', name: 'Development Server', ip: '192.168.1.100', mac: '77:88:99:00:AA:BB', status: DeviceStatus.ONLINE, lastSeen: 'Just now', type: 'Server', latency: 5 },
  { id: '6', name: 'MacBook Pro M2', ip: '192.168.1.15', mac: 'FF:EE:DD:CC:BB:AA', status: DeviceStatus.OFFLINE, lastSeen: '15 mins ago', type: 'Desktop', latency: 0 },
  { id: '7', name: 'Smart Bulb Living Room', ip: '192.168.1.75', mac: '44:55:66:77:88:99', status: DeviceStatus.ONLINE, lastSeen: 'Just now', type: 'IoT', latency: 120 },
  { id: '8', name: 'Cisco Switch v2', ip: '192.168.1.2', mac: 'B1:C2:D3:E4:F5:G6', status: DeviceStatus.ONLINE, lastSeen: 'Just now', type: 'Router', latency: 2 },
];

export const generateRandomLatency = () => Math.floor(Math.random() * 150) + 1;

export const updateDeviceStatus = (devices: Device[]): Device[] => {
  return devices.map(d => {
    // Randomly flip status for some devices to simulate real-time changes
    if (Math.random() > 0.85) {
      const isOnline = d.status === DeviceStatus.ONLINE;
      return {
        ...d,
        status: isOnline ? DeviceStatus.OFFLINE : DeviceStatus.ONLINE,
        lastSeen: isOnline ? 'Last seen 1 min ago' : 'Just now',
        latency: isOnline ? 0 : generateRandomLatency()
      };
    }
    // Update latency for online devices
    if (d.status === DeviceStatus.ONLINE) {
      return { ...d, latency: generateRandomLatency() };
    }
    return d;
  });
};
