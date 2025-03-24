// Types are defined globally in types.ts
// No need to import them as they're available in the global namespace

function handleInstallation(details: chrome.runtime.InstalledDetails): void {
  if (details.reason === "install" || details.reason === "update") {
    // Initialize extension data
    const data: StorageData = {
      isInitialized: true,
      installDate: new Date().toISOString(),
    };
    chrome.storage.local.set(data);
    createContextMenu();
  }
}

function handleMessageInBackground(
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

function createContextMenu() {
  chrome.contextMenus.create({
    id: "createMontaraModel",
    title: "Create Montara model",
    contexts: ["selection"],
    documentUrlPatterns: ["*://*.snowflake.com/*", "*://snowflake.com/*"],
  });
}

function handleContextMenu(info: chrome.contextMenus.OnClickData) {
  if (info.menuItemId === "createMontaraModel" && info.selectionText) {
    // Store the selected text or send it to your content script
    chrome.storage.local.set({
      selectedText: info.selectionText,
    });

    // You can also send it to the content script of the active tab
    chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
      if (tab.id) {
        chrome.tabs.sendMessage(tab.id, {
          action: "processSelectedText",
          text: info.selectionText,
        });
      }
    });
  }
}

// Listen for installation
chrome.runtime.onInstalled.addListener(handleInstallation);

// Listen for messages
chrome.runtime.onMessage.addListener(handleMessageInBackground);

// Handle context menu clicks
chrome.contextMenus.onClicked.addListener(handleContextMenu);

// Make sure this runs both on install and when the extension starts
chrome.runtime.onInstalled.addListener((details) => {
  createContextMenu();
});

// Also create the menu when the service worker starts
createContextMenu();
