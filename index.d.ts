declare var global: any

/** react native websocket */
declare class WebSocket {
  constructor(url: string, a?: any, b?: any);
  onopen: () => void;
  onmessage: (e: {data: string}) => void;
  onerror: (e: Error) => void;
  onclose: (e: {code: any, reason: string}) => void;
  send: (str: string) => void;
  close: () => void;
}
