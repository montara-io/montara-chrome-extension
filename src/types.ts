export {};

declare global {
  interface Message {
    action: "performAction" | "processSelectedText";
    type?: "getData";
    text?: string;
  }

  interface ActionResponse {
    success: boolean;
  }

  interface StorageData {
    isInitialized: boolean;
    installDate: string;
  }
}
