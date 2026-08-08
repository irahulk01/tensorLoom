export interface ApiResponse<T = any> {
  status: 'success' | 'error';
  message?: string;
  data?: T;
}

export interface ApiStatus {
  status: string;
  message: string;
  engine: string;
  uptime: number;
  timestamp: string;
}
