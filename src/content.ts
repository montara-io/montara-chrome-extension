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

interface Position {
  x: number;
  y: number;
}

function createPopup(): HTMLElement {
  const popup = document.createElement("div");
  popup.id = "montara-popup";
  popup.style.cssText = `
    position: fixed;
    z-index: 10001;
    padding: 16px;
    background: white;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    min-width: 300px;
    display: none;
  `;

  // Add popup content
  popup.innerHTML = `
    <h3 style="margin: 0 0 12px 0">Create Montara Model</h3>
    <div id="montara-selected-text" style="margin-bottom: 12px; font-size: 14px;"></div>
    <button id="montara-process" style="
      padding: 8px 16px;
      background: #4CAF50;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    ">Process</button>
  `;

  return popup;
}

// Create and append popup (only once)
document.body.appendChild(createPopup());
