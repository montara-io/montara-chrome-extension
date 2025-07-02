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
  }

  MontaraData.state.lastActiveElement = activeElement;
  MontaraData.state.lastSelectionStart = selectionStart ?? null;

  renderDropdown(MontaraData.CatalogData, x, y);
  MontaraData.state.isDropdownVisible = true;
}

function renderDropdown(items, x, y) {
  const container = MontaraData.state.dropdownContainer;
  container.innerHTML = "";

  const dropdown = document.createElement("div");
  dropdown.id = "montara-dropdown";
  dropdown.style.cssText = `
    position: fixed;
    left: ${x}px;
    top: ${y}px;
    background: white;
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    z-index: 10001;
    width: 30rem;
    max-height: 400px;
    overflow-y: auto;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    font-size: 14px;
  `;

  const header = document.createElement("div");
  header.style.cssText = `
    padding: 12px 16px;
    border-bottom: 1px solid #eee;
    font-weight: 600;
    color: #333;
    background: #f8f9fa;
    border-radius: 8px 8px 0 0;
  `;
  header.textContent = "Insert SQL";
  dropdown.appendChild(header);

  // Add search input
  const searchContainer = document.createElement("div");
  searchContainer.style.cssText = `
    padding: 8px 16px;
    border-bottom: 1px solid #eee;
  `;

  const searchInput = document.createElement("input");
  searchInput.type = "text";
  searchInput.placeholder = "Search models and code...";
  searchInput.style.cssText = `
    width: 100%;
    padding: 8px 12px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 14px;
    font-family: inherit;
    outline: none;
    box-sizing: border-box;
  `;

  // Add focus styles
  searchInput.addEventListener("focus", () => {
    searchInput.style.borderColor = "#007bff";
    searchInput.style.boxShadow = "0 0 0 2px rgba(0, 123, 255, 0.25)";
  });

  searchInput.addEventListener("blur", () => {
    searchInput.style.borderColor = "#ddd";
    searchInput.style.boxShadow = "none";
  });

  searchContainer.appendChild(searchInput);
  dropdown.appendChild(searchContainer);

  const itemsList = document.createElement("div");
  itemsList.style.cssText = `
    padding: 8px 0;
  `;

  // Function to render filtered items
  function renderFilteredItems(filteredItems) {
    itemsList.innerHTML = "";

    if (filteredItems.length === 0) {
      const noResults = document.createElement("div");
      noResults.style.cssText = `
        padding: 1rem;
        text-align: center;
        color: #666;
        font-style: italic;
      `;
      if (!MontaraData.CatalogData.length) {
        noResults.textContent = "Loading models...";
      } else {
        noResults.textContent = "No results found";
      }
      itemsList.appendChild(noResults);
      return;
    }

    filteredItems.forEach((item, index) => {
      const itemElement = document.createElement("div");
      itemElement.style.cssText = `
        padding: 12px 16px;
        cursor: pointer;
        border-bottom: 1px solid #f0f0f0;
        transition: background-color 0.2s;
      `;

      itemElement.innerHTML = `
        <div style="font-weight: 500; color: #333; margin-bottom: 4px;">${item.name}</div>
        <div style="font-family: 'Monaco', 'Menlo', monospace; font-size: 12px; color: #666; background: #f5f5f5; padding: 4px 6px; border-radius: 4px; overflow-x: auto;">${item.code}</div>
      `;

      itemElement.addEventListener("mouseenter", () => {
        itemElement.style.backgroundColor = "#f0f8ff";
      });

      itemElement.addEventListener("mouseleave", () => {
        itemElement.style.backgroundColor = "transparent";
      });

      itemElement.addEventListener("click", () => {
        insertTextAtCursor(item.code);
        hideDropdown();
      });

      itemsList.appendChild(itemElement);
    });
  }

  // Initial render
  renderFilteredItems(items);

  // Add search functionality
  searchInput.addEventListener("input", (event) => {
    const searchTerm = event.target.value.toLowerCase().trim();

    if (searchTerm === "") {
      renderFilteredItems(items);
      return;
    }

    const filteredItems = items.filter(
      (item) =>
        item.name.toLowerCase().includes(searchTerm) ||
        item.code.toLowerCase().includes(searchTerm)
    );

    renderFilteredItems(filteredItems);
  });

  // Focus search input when dropdown opens
  setTimeout(() => {
    searchInput.focus();
  }, 100);

  dropdown.appendChild(itemsList);
  container.appendChild(dropdown);
}

function insertTextAtCursor(text) {
  const activeElement = MontaraData.state.lastActiveElement;
  const selectionStart = MontaraData.state.lastSelectionStart;

  if (!activeElement) return;

  if (activeElement.contentEditable === "true") {
    // For contenteditable elements
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      range.deleteContents();
      range.insertNode(document.createTextNode(text));
      range.collapse(false);
      selection.removeAllRanges();
      selection.addRange(range);
    }
  } else if (activeElement instanceof HTMLTextAreaElement) {
    // For textarea elements
    const value = activeElement.value;
    const before = value.substring(0, selectionStart - 2); // Remove the @@ trigger
    const after = value.substring(selectionStart);
    activeElement.value = before + text + after;
    activeElement.setSelectionRange(
      before.length + text.length,
      before.length + text.length
    );
  }

  // Trigger input event to notify any listeners
  activeElement.dispatchEvent(new Event("input", {bubbles: true}));
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

function hideDropdown() {
  if (MontaraData.state.dropdownContainer) {
    MontaraData.state.dropdownContainer.innerHTML = "";
  }
  MontaraData.state.isDropdownVisible = false;
}

function handleClick(event) {
  if (
    MontaraData.state.isDropdownVisible &&
    MontaraData.state.dropdownContainer &&
    !MontaraData.state.dropdownContainer.contains(event.target)
  ) {
    hideDropdown();
  }
}

function subscribeToDropdownEvents() {
  document.addEventListener("input", handleInput);
  document.addEventListener("keydown", handleKeyDown);
  document.addEventListener("click", handleClick);
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && MontaraData.state.isDropdownVisible) {
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

// Helper functions for dropdown functionality
function checkForTrigger(text, selectionStart) {
  if (!text || selectionStart === null || selectionStart === undefined)
    return false;

  // Check if the user typed "@@" at the current position
  const beforeCursor = text.substring(0, selectionStart);
  const lastTwoChars = beforeCursor.slice(-2);

  return lastTwoChars === "@@";
}

function getCursorPosition(element) {
  const rect = element.getBoundingClientRect();
  let x, y;

  if (element.contentEditable === "true") {
    // For contenteditable elements, try to get position from selection
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const tempRange = range.cloneRange();
      tempRange.collapse(true);
      const tempRect = tempRange.getBoundingClientRect();
      x = tempRect.left + window.scrollX;
      y = tempRect.bottom + window.scrollY;
    } else {
      // Fallback to element position
      x = rect.left + window.scrollX;
      y = rect.bottom + window.scrollY;
    }
  } else {
    // For textarea/input elements
    x = rect.left + window.scrollX;
    y = rect.bottom + window.scrollY;
  }

  return {x, y};
}

function getRootContentEditable(element) {
  // Find the root contenteditable element
  let current = element;
  while (current && current.contentEditable !== "true") {
    current = current.parentElement;
  }
  return current;
}

function getContentEditableSelectionOffset(element) {
  const selection = window.getSelection();
  if (selection.rangeCount === 0) return 0;

  const range = selection.getRangeAt(0);
  const preCaretRange = range.cloneRange();
  preCaretRange.selectNodeContents(element);
  preCaretRange.setEnd(range.endContainer, range.endOffset);

  return preCaretRange.toString().length;
}

// Run initialization when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeExtension);
} else {
  initializeExtension();
}
