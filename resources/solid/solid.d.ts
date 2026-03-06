export {};

declare global {
  interface Window {
    __APP__: {
      user: {
        id: number;
        name: string;
        email: string;
      } | null;
      csrf: string;
    };
  }
}
