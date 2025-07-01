// Content script for Montara Chrome Extension
// This script runs on every webpage

function renderMontaraIframe() {
  const iframe = document.createElement("iframe");
  iframe.src = "http://localhost:3000/montara-chrome-extention-sidebar";
  iframe.id = "montara-iframe";
  iframe.style.cssText = `
    position: fixed;
    top: 0;
    right: 0;
    width: 1px;
    height: 1px;
    z-index: 10000;
    border: none;
    background: transparent;
    pointer-events: none;
    opacity: 0;
  `;
  document.body.appendChild(iframe);

  // Store iframe reference for communication
  window.montaraIframe = iframe;

  // Listen for messages from the iframe
  window.addEventListener("message", handleIframeMessage);
}

function handleIframeMessage(event) {
  // Security: Only accept messages from our iframe origin
  // if (event.origin !== "http://localhost:3000") {
  //   console.warn("Rejected message from unauthorized origin:", event.origin);
  //   return;
  // }

  console.log("Message received from iframe:", event.data);

  // Handle storage requests from iframe
  if (event.data.type === "getStorage") {
    chrome.storage.local.get(null, function (items) {
      sendMessageToIframe({
        type: "storageData",
        data: items,
      });
    });
  }

  // Handle OAuth-related messages from iframe
  if (event.data.type === "montara_openOAuthPopup") {
    openOAuthPopup(event.data.payload.url);
  }

  if (event.data.type === "oauthResult") {
    handleOAuthResult(event.data.result);
  }
}

function sendMessageToIframe(message) {
  if (window.montaraIframe && window.montaraIframe.contentWindow) {
    window.montaraIframe.contentWindow.postMessage(message, "*");
  } else {
    console.warn("Iframe not ready for communication");
  }
}

function openOAuthPopup(url) {
  console.log("Opening OAuth popup with URL:", url);

  // Open popup window
  const popup = window.open(
    url,
    "oauth_popup",
    "width=500,height=600,scrollbars=yes,resizable=yes"
  );

  // Listen for popup close or message
  const checkClosed = setInterval(() => {
    if (popup.closed) {
      clearInterval(checkClosed);
      console.log("OAuth popup closed");

      // Notify iframe that popup was closed
      sendMessageToIframe({
        type: "oauthPopupClosed",
      });
    }
  }, 1000);

  // Listen for messages from popup (if it sends any)
  window.addEventListener("message", function popupMessageHandler(event) {
    if (event.source === popup) {
      console.log("Message from OAuth popup:", event.data);

      // Handle OAuth result from popup
      if (event.data.type === "oauthResult") {
        clearInterval(checkClosed);
        popup.close();
        window.removeEventListener("message", popupMessageHandler);

        handleOAuthResult(event.data.result);
      }
    }
  });
}

function handleOAuthResult(result) {
  console.log("Handling OAuth result:", result);

  // Store OAuth tokens securely
  if (result.access_token) {
    chrome.storage.local.set(
      {
        oauthToken: result.access_token,
        oauthRefreshToken: result.refresh_token,
        oauthExpiresAt: result.expires_in
          ? Date.now() + result.expires_in * 1000
          : null,
        oauthUser: result.user,
      },
      function () {
        console.log("OAuth tokens stored successfully");
      }
    );
  }

  // Send result back to iframe
  sendMessageToIframe({
    type: "oauthResultReceived",
    result: result,
  });
}

function initializeExtension() {
  console.log("Montara Chrome Extension loaded");

  // Add your content script logic here
  // Example: Modify page content, add event listeners, etc.

  // Example: Add a simple notification
  const notification = document.createElement("div");
  notification.id = "montara-notification";
  notification.textContent = "Montara Extension Active";
  notification.style.cssText = `
    position: fixed;
    top: 10px;
    right: 10px;
    background: #4CAF50;
    color: white;
    padding: 10px 15px;
    border-radius: 5px;1
    z-index: 10000;
    font-family: Arial, sans-serif;
    font-size: 14px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.2);
  `;

  document.body.appendChild(notification);

  // Remove notification after 3 seconds
  setTimeout(() => {
    if (notification.parentNode) {
      notification.parentNode.removeChild(notification);
    }
  }, 3000);

  renderMontaraIframe();
}

// Run initialization when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeExtension);
} else {
  initializeExtension();
}

// Listen for messages from other parts of the extension (if needed)
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log("Message received in content script:", request);

  // Handle different message types
  switch (request.action) {
    case "getPageInfo":
      sendResponse({
        title: document.title,
        url: window.location.href,
        timestamp: new Date().toISOString(),
      });
      break;
    default:
      sendResponse({status: "unknown action"});
  }

  return true; // Keep message channel open for async response
});
