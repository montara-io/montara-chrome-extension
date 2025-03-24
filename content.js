function performAction() {
  // Add your content script logic here
  console.log("Content script action performed");
  return { success: true };
}

function handleMessage(message, sender, sendResponse) {
  if (message.action === "performAction") {
    const result = performAction();
    sendResponse(result);
  }
  return true; // Will respond asynchronously
}

// Listen for messages from popup or background script
chrome.runtime.onMessage.addListener(handleMessage);

// Initialize content script
console.log("Content script loaded");
