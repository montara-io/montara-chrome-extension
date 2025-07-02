// Content script for Montara Chrome Extension
// This script runs on every webpage
const MontaraData = {
  UrlParams: {
    MontaraExtensionRedirectUrl: "MontaraExtensionRedirectUrl",
    MontaraToken: "MontaraToken",
  },
  PostMessageType: {
    MONTARA_TOKEN: "montara_montaraToken",
    MONTARA_OPEN_OAUTH_POPUP: "montara_openOAuthPopup",
  },
};

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

  // Handle OAuth-related messages from iframe
  if (
    event.data.type === MontaraData.PostMessageType.MONTARA_OPEN_OAUTH_POPUP
  ) {
    const urlParams = new URLSearchParams(window.location.search);
    const montaraToken = urlParams.get(MontaraData.UrlParams.MontaraToken);
    if (montaraToken) {
      sendMessageToIframe({
        type: MontaraData.PostMessageType.MONTARA_TOKEN,
        payload: {
          montaraToken,
        },
      });
    } else {
      showNotification({
        text: "Please log in to Montara to continue",
        ctaText: "Log in",
        onCtaClick: () => {
          const url = new URL("http://localhost:3000");
          url.searchParams.set(
            MontaraData.UrlParams.MontaraExtensionRedirectUrl,
            encodeURIComponent(window.location.href)
          );
          window.location.href = url.toString();
        },
        duration: 60000,
      });
    }
  }
}

function sendMessageToIframe({type, payload}) {
  if (window.montaraIframe && window.montaraIframe.contentWindow) {
    window.montaraIframe.contentWindow.postMessage({type, payload}, "*");
  } else {
    console.warn("Iframe not ready for communication");
  }
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

function showNotification({text, ctaText, onCtaClick, duration = 3000}) {
  const notification = document.createElement("div");
  notification.id = "montara-notification";
  notification.textContent = text;
  notification.style.cssText = `
    position: fixed;
    top: 10px;
    right: 10px;
    background: #4CAF50;
    color: white;
    padding: 10px 15px;
    border-radius: 5px;
    z-index: 10000;
    font-family: Arial, sans-serif;
    font-size: 14px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.2);
  `;
  if (ctaText && onCtaClick) {
    const ctaButton = document.createElement("button");
    ctaButton.textContent = ctaText;
    ctaButton.addEventListener("click", onCtaClick);
    notification.appendChild(ctaButton);
  }
  document.body.appendChild(notification);

  // Remove notification after 3 seconds
  setTimeout(() => {
    if (notification.parentNode) {
      notification.parentNode.removeChild(notification);
    }
  }, duration);
}

function initializeExtension() {
  console.log("Montara Chrome Extension loaded");

  // Add your content script logic here
  // Example: Modify page content, add event listeners, etc.
  showNotification({
    text: "Montara Extension Active",
    duration: 3000,
  });
  renderMontaraIframe();
}

// Run initialization when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeExtension);
} else {
  initializeExtension();
}
