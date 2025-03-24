// These types are defined globally in types.ts
// No need to import them as they're available in the global namespace

function performAction(): ActionResponse {
  // Add your content script logic here
  console.log("Content script action performed");
  return { success: true };
}

function processMessage(
  message: Message,
  sender: chrome.runtime.MessageSender,
  sendResponse: (response: ActionResponse) => void
): boolean {
  if (message.action === "performAction") {
    const result = performAction();
    sendResponse(result);
  }
  return true; // Will respond asynchronously
}

// Listen for messages from popup or background script
chrome.runtime.onMessage.addListener(processMessage);

// Initialize content script
console.log("MontaraContent script loaded");
