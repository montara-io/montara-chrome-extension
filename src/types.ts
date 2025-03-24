export {};

declare global {
  interface Message {
    action: "performAction";
    type?: "getData";
  }

  interface ActionResponse {
    success: boolean;
  }

  interface StorageData {
    isInitialized: boolean;
    installDate: string;
  }
}
