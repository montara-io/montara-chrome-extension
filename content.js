// Content script for Montara Chrome Extension
// This script runs on every webpage
const MontaraData = {
  UrlParams: {
    MontaraExtensionRedirectUrl: "MontaraExtensionRedirectUrl",
    MontaraToken: "MontaraToken",
  },
  PostMessageType: {
    MONTARA_TOKEN: "montara_montaraToken",
    IS_LOGGED_OUT: "montara_isLoggedOut",
    CATALOG_DATA: "montara_catalogData",
  },
  CatalogData: [],
  state: {
    isDropdownVisible: false,
    lastActiveElement: null,
    lastSelectionStart: null,
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
  if (event.data.type === MontaraData.PostMessageType.IS_LOGGED_OUT) {
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
  } else if (event.data.type === MontaraData.PostMessageType.CATALOG_DATA) {
    MontaraData.CatalogData = event.data.payload;
    showNotification({
      text: "Catalog data received",
      duration: 3000,
    });
  }
}

function sendMessageToIframe({type, payload}) {
  if (window.montaraIframe && window.montaraIframe.contentWindow) {
    window.montaraIframe.contentWindow.postMessage({type, payload}, "*");
  } else {
    console.warn("Iframe not ready for communication");
  }
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

function createDropdownContainer() {
  const container = document.createElement("div");
  container.id = "montara-dropdown-container";
  document.body.appendChild(container);
  return container;
}
function showDropdown(x, y, activeElement, selectionStart) {
  if (!MontaraData.state.dropdownContainer) {
    MontaraData.state.dropdownContainer = createDropdownContainer();
    MontaraData.state.dropdownRoot = createRoot(
      MontaraData.state.dropdownContainer
    );
  }
  MontaraData.state.lastActiveElement = activeElement;
  MontaraData.state.lastSelectionStart = selectionStart ?? null;
  dropdownRoot.render(
    <SqlModelDropdown
      position={{x, y}}
      onClose={hideDropdown}
      activeElement={activeElement}
      selectionStart={selectionStart}
    />
  );
  MontaraData.state.isDropdownVisible = true;
}

function isEditableElement(element) {
  return element.tagName === "TEXTAREA" || element.contentEditable === "true";
}
function handleInput(event) {
  let target = event.target;
  if (target && isEditableElement(target)) {
    // For contenteditable, always use the root
    if (target.contentEditable === "true") {
      const root = getRootContentEditable(target) || target;
      const text = root.textContent || "";
      const selectionStart = getContentEditableSelectionOffset(root);
      if (checkForTrigger(text, selectionStart)) {
        const position = getCursorPosition(root);
        showDropdown(position.x, position.y, root, selectionStart);
      } else {
        hideDropdown();
      }
      return;
    }
    // For textarea
    const text = target.textContent || target.value;
    let selectionStart = undefined;
    if (target instanceof HTMLTextAreaElement) {
      selectionStart = target.selectionStart;
    }
    if (checkForTrigger(text, selectionStart)) {
      const position = getCursorPosition(target);
      showDropdown(position.x, position.y, target, selectionStart);
    } else {
      hideDropdown();
    }
  }
}

function handleKeyDown(event) {
  let activeElement = document.activeElement;
  if (activeElement && isEditableElement(activeElement)) {
    if (activeElement.contentEditable === "true") {
      const root = getRootContentEditable(activeElement) || activeElement;
      const text = root.textContent || "";
      const selectionStart = getContentEditableSelectionOffset(root);
      if (checkForTrigger(text, selectionStart)) {
        const position = getCursorPosition(root);
        showDropdown(position.x, position.y, root, selectionStart);
      }
      return;
    }
    // For textarea
    const text = activeElement.textContent || activeElement.value;
    let selectionStart = undefined;
    if (activeElement instanceof HTMLTextAreaElement) {
      selectionStart = activeElement.selectionStart;
    }
    if (checkForTrigger(text, selectionStart)) {
      const position = getCursorPosition(activeElement);
      showDropdown(position.x, position.y, activeElement, selectionStart);
    }
  }
}

function handleClick(event) {
  if (
    MontaraData.state.isDropdownVisible &&
    dropdownContainer &&
    !dropdownContainer.contains(event.target)
  ) {
    hideDropdown();
  }
}

function subscribeToDropdownEvents() {
  document.addEventListener("input", handleInput);
  document.addEventListener("keydown", handleKeyDown);
  document.addEventListener("click", handleClick);
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && isDropdownVisible) {
      hideDropdown();
    }
  });
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
  const urlParams = new URLSearchParams(window.location.search);
  const montaraToken = decodeURIComponent(
    urlParams.get(MontaraData.UrlParams.MontaraToken)
  );
  if (montaraToken) {
    sendMessageToIframe({
      type: MontaraData.PostMessageType.MONTARA_TOKEN,
      payload: {
        montaraToken,
      },
    });
  }
  subscribeToDropdownEvents();
}

// Run initialization when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeExtension);
} else {
  initializeExtension();
}
