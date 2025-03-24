// Types are defined globally in types.ts
// No need to import them as they're available in the global namespace

function handleInstallation(details: chrome.runtime.InstalledDetails): void {
  if (details.reason === "install") {
    // Initialize extension data
    const data: StorageData = {
      isInitialized: true,
      installDate: new Date().toISOString(),
    };
    chrome.storage.local.set(data);
  }
}

function handleMessage(
  message: Message,
  sender: chrome.runtime.MessageSender,
  sendResponse: (response: StorageData) => void
): boolean {
  if (message.type === "getData") {
    chrome.storage.local.get(["isInitialized", "installDate"], (result) => {
      sendResponse(result as StorageData);
    });
    return true; // Will respond asynchronously
  }
  return false;
}

// Listen for installation
chrome.runtime.onInstalled.addListener(handleInstallation);

// Listen for messages
chrome.runtime.onMessage.addListener(handleMessage);
