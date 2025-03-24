// These types are defined globally in types.ts
// No need to import them as they're available in the global namespace

function performAction(): ActionResponse {
  // Add your content script logic here
  console.log("Content script action performed");
  return { success: true };
}

function handleMessageInContent(
  message: Message & { text?: string },
  sender: chrome.runtime.MessageSender,
  sendResponse: (response: ActionResponse) => void
): boolean {
  if (message.action === "performAction") {
    const result = performAction();
    sendResponse(result);
  } else if (message.action === "processSelectedText" && message.text) {
    console.log("Processing selected text:", message.text);
    // Add your text processing logic here
    sendResponse({ success: true });
  }
  return true;
}

// Listen for messages from popup or background script
chrome.runtime.onMessage.addListener(handleMessageInContent);

// Initialize content script
console.log("MontaraContent script loaded!!");
