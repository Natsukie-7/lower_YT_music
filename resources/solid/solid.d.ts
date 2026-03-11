export {};

declare global {
  interface Window {
    __APP__: {
      csrf: string;
    };
  }

  interface User {
    id: number;
    name: string;
    email: string;
  }
}
