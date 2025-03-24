function handleInstallation(details) {
  if (details.reason === "install") {
    // Initialize extension data
    chrome.storage.local.set({
      isInitialized: true,
      installDate: new Date().toISOString(),
    });
  }
}

function handleMessage(message, sender, sendResponse) {
  // Handle messages from content script or popup
  if (message.type === "getData") {
    chrome.storage.local.get(["isInitialized", "installDate"], (result) => {
      sendResponse(result);
    });
    return true; // Will respond asynchronously
  }
}

// Listen for installation
chrome.runtime.onInstalled.addListener(handleInstallation);

// Listen for messages
chrome.runtime.onMessage.addListener(handleMessage);
