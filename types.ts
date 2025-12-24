
export enum DeviceStatus {
  ONLINE = 'online',
  OFFLINE = 'offline',
}

export interface Device {
  id: string;
  name: string;
  ip: string;
  mac: string;
  status: DeviceStatus;
  lastSeen: string;
  type: 'Mobile' | 'Desktop' | 'IoT' | 'Router' | 'Server';
  latency: number;
}

export interface NetworkStats {
  total: number;
  online: number;
  offline: number;
  lastScan: string;
}

export interface ScanConfig {
  interval: number;
  ipRange: string;
}
