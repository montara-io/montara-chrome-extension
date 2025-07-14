// Content script for Montara Chrome Extension
// This script runs on every webpage
const MontaraData = {
  montaraToken:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImMwMTcxMGQyLTljMDctNDIyNC1iYzE0LTMxZDY3ZjU1MzgxMSIsInRlbmFudElkIjoiNTkzYTM4ZjgtNTZjMS00NWM0LWJmNDEtZGU2MGZmYjFjMDhlIiwicGVybWlzc2lvbnMiOlt7InByb2plY3RJZCI6IkdMT0JBTCIsInBlcm1pc3Npb25zIjpbImFjY291bnRpbmcucmVhZCIsImFjY291bnRpbmcud3JpdGUiLCJwcm9qZWN0X2FjY291bnRpbmcucmVhZCIsInVzZXJzLnJlYWQiLCJ1c2Vycy53cml0ZSIsInNlbGYucmVhZCIsInRlbmFudC1zdHJ1Y3R1cmUucmVhZCIsImF1ZGl0LnJlYWQiLCJkYnQucmVhZCIsInBhdCJdfSx7InByb2plY3RJZCI6ImY4YjFlMzg1LTQxZjEtNDNhZi04NWQ5LTAzNWVhMmMzNDg3YyIsInBlcm1pc3Npb25zIjpbInJlcG9ydC5yZWFkIiwicmVwb3J0LndyaXRlIiwicmVwb3J0LmV4ZWN1dGUiLCJkYnQucmVhZCIsImRidC53cml0ZSIsImRidC5leGVjdXRlIiwidXNlcnMucmVhZCIsInNlbGYucmVhZCIsInRlbmFudC1zdHJ1Y3R1cmUucmVhZCIsInZlcnNpb24ucmVhZCIsInZlcnNpb24ud3JpdGUiLCJwaXBlbGluZS5yZWFkIiwicGlwZWxpbmUud3JpdGUiLCJwaXBlbGluZS5leGVjdXRlIiwicHJvamVjdF9hY2NvdW50aW5nLnJlYWQiLCJhdWRpdC5yZWFkIiwicmMud3JpdGUiLCJyYy5yZWFkIiwicGF0IiwicHJvamVjdF9hY2NvdW50aW5nLndyaXRlIiwicmMuYWRtaW4iLCJyYy5yZXZpZXciXX0seyJwcm9qZWN0SWQiOiI4NTVjZmUwMi01OTk0LTQ2ODYtODQ0MS0xMjlmYzYwZTNiMWMiLCJwZXJtaXNzaW9ucyI6WyJyZXBvcnQucmVhZCIsInJlcG9ydC53cml0ZSIsInJlcG9ydC5leGVjdXRlIiwiZGJ0LnJlYWQiLCJkYnQud3JpdGUiLCJkYnQuZXhlY3V0ZSIsInVzZXJzLnJlYWQiLCJzZWxmLnJlYWQiLCJ0ZW5hbnQtc3RydWN0dXJlLnJlYWQiLCJ2ZXJzaW9uLnJlYWQiLCJ2ZXJzaW9uLndyaXRlIiwicGlwZWxpbmUucmVhZCIsInBpcGVsaW5lLndyaXRlIiwicGlwZWxpbmUuZXhlY3V0ZSIsInByb2plY3RfYWNjb3VudGluZy5yZWFkIiwiYXVkaXQucmVhZCIsInJjLndyaXRlIiwicmMucmVhZCIsInBhdCIsInByb2plY3RfYWNjb3VudGluZy53cml0ZSIsInJjLmFkbWluIiwicmMucmV2aWV3Il19LHsicHJvamVjdElkIjoiMjUyMGYyMzQtODE5Yi00NzY1LTg5YmEtMzI0ZWQ1NTI1NmVjIiwicGVybWlzc2lvbnMiOlsicmVwb3J0LnJlYWQiLCJyZXBvcnQud3JpdGUiLCJyZXBvcnQuZXhlY3V0ZSIsImRidC5yZWFkIiwiZGJ0LndyaXRlIiwiZGJ0LmV4ZWN1dGUiLCJ1c2Vycy5yZWFkIiwic2VsZi5yZWFkIiwidGVuYW50LXN0cnVjdHVyZS5yZWFkIiwidmVyc2lvbi5yZWFkIiwidmVyc2lvbi53cml0ZSIsInBpcGVsaW5lLnJlYWQiLCJwaXBlbGluZS53cml0ZSIsInBpcGVsaW5lLmV4ZWN1dGUiLCJwcm9qZWN0X2FjY291bnRpbmcucmVhZCIsImF1ZGl0LnJlYWQiLCJyYy53cml0ZSIsInJjLnJlYWQiLCJwYXQiLCJwcm9qZWN0X2FjY291bnRpbmcud3JpdGUiLCJyYy5hZG1pbiIsInJjLnJldmlldyJdfSx7InByb2plY3RJZCI6ImRmMjViYzk0LWM1NWMtNDQ1MS1hNTcxLWZiN2U1MWNlMGI4OCIsInBlcm1pc3Npb25zIjpbInJlcG9ydC5yZWFkIiwicmVwb3J0LndyaXRlIiwicmVwb3J0LmV4ZWN1dGUiLCJkYnQucmVhZCIsImRidC53cml0ZSIsImRidC5leGVjdXRlIiwidXNlcnMucmVhZCIsInNlbGYucmVhZCIsInRlbmFudC1zdHJ1Y3R1cmUucmVhZCIsInZlcnNpb24ucmVhZCIsInZlcnNpb24ud3JpdGUiLCJwaXBlbGluZS5yZWFkIiwicGlwZWxpbmUud3JpdGUiLCJwaXBlbGluZS5leGVjdXRlIiwicHJvamVjdF9hY2NvdW50aW5nLnJlYWQiLCJhdWRpdC5yZWFkIiwicmMud3JpdGUiLCJyYy5yZWFkIiwicGF0IiwicHJvamVjdF9hY2NvdW50aW5nLndyaXRlIiwicmMuYWRtaW4iLCJyYy5yZXZpZXciXX0seyJwcm9qZWN0SWQiOiI0ZmI1MmE3OC02MzAyLTRhNjAtYmY4ZS03NmRkNGNkYTMxYzIiLCJwZXJtaXNzaW9ucyI6WyJyZXBvcnQucmVhZCIsInJlcG9ydC53cml0ZSIsInJlcG9ydC5leGVjdXRlIiwiZGJ0LnJlYWQiLCJkYnQud3JpdGUiLCJkYnQuZXhlY3V0ZSIsInVzZXJzLnJlYWQiLCJzZWxmLnJlYWQiLCJ0ZW5hbnQtc3RydWN0dXJlLnJlYWQiLCJ2ZXJzaW9uLnJlYWQiLCJ2ZXJzaW9uLndyaXRlIiwicGlwZWxpbmUucmVhZCIsInBpcGVsaW5lLndyaXRlIiwicGlwZWxpbmUuZXhlY3V0ZSIsInByb2plY3RfYWNjb3VudGluZy5yZWFkIiwiYXVkaXQucmVhZCIsInJjLndyaXRlIiwicmMucmVhZCIsInBhdCIsInByb2plY3RfYWNjb3VudGluZy53cml0ZSIsInJjLmFkbWluIiwicmMucmV2aWV3Il19LHsicHJvamVjdElkIjoiYjNiZjI5ZTctYmE5Yy00YWJhLWI2Y2QtODA2YmIxNjU0ZDBkIiwicGVybWlzc2lvbnMiOlsicmVwb3J0LnJlYWQiLCJyZXBvcnQud3JpdGUiLCJyZXBvcnQuZXhlY3V0ZSIsImRidC5yZWFkIiwiZGJ0LndyaXRlIiwiZGJ0LmV4ZWN1dGUiLCJ1c2Vycy5yZWFkIiwic2VsZi5yZWFkIiwidGVuYW50LXN0cnVjdHVyZS5yZWFkIiwidmVyc2lvbi5yZWFkIiwidmVyc2lvbi53cml0ZSIsInBpcGVsaW5lLnJlYWQiLCJwaXBlbGluZS53cml0ZSIsInBpcGVsaW5lLmV4ZWN1dGUiLCJwcm9qZWN0X2FjY291bnRpbmcucmVhZCIsImF1ZGl0LnJlYWQiLCJyYy53cml0ZSIsInJjLnJlYWQiLCJwYXQiLCJwcm9qZWN0X2FjY291bnRpbmcud3JpdGUiLCJyYy5hZG1pbiIsInJjLnJldmlldyJdfV0sInJvbGVzIjp7Imdsb2JhbCI6WyJnbG9iYWwtYWRtaW4iXSwicHJvamVjdHMiOlt7ImlkIjoiZjhiMWUzODUtNDFmMS00M2FmLTg1ZDktMDM1ZWEyYzM0ODdjIiwicm9sZXMiOlsiYW5hbHlzdCIsInByb2plY3RfYWRtaW4iLCJhcHByb3ZlciJdfSx7ImlkIjoiODU1Y2ZlMDItNTk5NC00Njg2LTg0NDEtMTI5ZmM2MGUzYjFjIiwicm9sZXMiOlsiYW5hbHlzdCIsInByb2plY3RfYWRtaW4iLCJhcHByb3ZlciJdfSx7ImlkIjoiMjUyMGYyMzQtODE5Yi00NzY1LTg5YmEtMzI0ZWQ1NTI1NmVjIiwicm9sZXMiOlsiYW5hbHlzdCIsInByb2plY3RfYWRtaW4iLCJhcHByb3ZlciJdfSx7ImlkIjoiZGYyNWJjOTQtYzU1Yy00NDUxLWE1NzEtZmI3ZTUxY2UwYjg4Iiwicm9sZXMiOlsiYW5hbHlzdCIsInByb2plY3RfYWRtaW4iLCJhcHByb3ZlciJdfSx7ImlkIjoiNGZiNTJhNzgtNjMwMi00YTYwLWJmOGUtNzZkZDRjZGEzMWMyIiwicm9sZXMiOlsiYW5hbHlzdCIsInByb2plY3RfYWRtaW4iLCJhcHByb3ZlciJdfSx7ImlkIjoiYjNiZjI5ZTctYmE5Yy00YWJhLWI2Y2QtODA2YmIxNjU0ZDBkIiwicm9sZXMiOlsiYW5hbHlzdCIsInByb2plY3RfYWRtaW4iLCJhcHByb3ZlciJdfV19LCJmaXJzdE5hbWUiOiIiLCJsYXN0TmFtZSI6IiIsImlzRGVtbyI6ZmFsc2UsInRva2VuVHlwZSI6InBhdCIsImV4cCI6OTUwNDQzMTcyMTgsImlhdCI6MTc1MjE0NDY5Nn0.0qg4k0oPZXnoOlnM8wWlkJ7Y9HePxb-BrWh5nbshGCo",
  PostMessageType: {
    MISSING_MONTARA_TOKEN: "montara_missingMontaraToken",
    CATALOG_DATA: "montara_catalogData",
    MONTARA_TOKEN: "montara_montaraToken",
  },
  constants: {
    trigger: "@@",
    isDebugMode: true,
  },
  catalogData: [],
  state: {
    isDropdownVisible: false,
    dropdownContainer: null,
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
  (window as any).montaraIframe = iframe;

  // Listen for messages from the iframe
  window.addEventListener("message", handleIframeMessage as EventListener);
}

function handleIframeMessage(event: MessageEvent) {
  if (!event?.data?.type) {
    return;
  }
  switch (event.data.type) {
    case MontaraData.PostMessageType.MISSING_MONTARA_TOKEN:
      sendMessageToIframe({
        type: MontaraData.PostMessageType.MONTARA_TOKEN,
        payload: {
          montaraToken: MontaraData.montaraToken,
        },
      });
      break;
    case MontaraData.PostMessageType.CATALOG_DATA:
      MontaraData.catalogData = event.data.payload;
      showNotification({
        text: "Catalog data received",
        duration: 3000,
      });
      break;
  }
}

function sendMessageToIframe({type, payload}: {type: string; payload: any}) {
  if (
    (window as any).montaraIframe &&
    (window as any).montaraIframe.contentWindow
  ) {
    (window as any).montaraIframe.contentWindow.postMessage(
      {type, payload},
      "*"
    );
  } else {
    console.warn("Iframe not ready for communication");
  }
}

function showNotification({
  text,
  ctaText,
  onCtaClick,
  duration = 3000,
}: {
  text: string;
  ctaText?: string;
  onCtaClick?: () => void;
  duration?: number;
}) {
  if (!MontaraData.constants.isDebugMode) {
    return;
  }
  const notification = document.createElement("div");
  notification.id = "montara-notification";
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
    display: flex;
    align-items: center;
    gap: 10px;
    max-width: 400px;
  `;

  // Create text container
  const textContainer = document.createElement("div");
  textContainer.textContent = text;
  textContainer.style.cssText = `
    flex: 1;
    word-wrap: break-word;
  `;
  notification.appendChild(textContainer);

  // Create close button
  const closeButton = document.createElement("button");
  closeButton.innerHTML = "&times;";
  closeButton.style.cssText = `
    background: none;
    border: none;
    color: white;
    font-size: 18px;
    font-weight: bold;
    cursor: pointer;
    padding: 0;
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    transition: background-color 0.2s;
    flex-shrink: 0;
  `;

  closeButton.addEventListener("mouseenter", () => {
    closeButton.style.backgroundColor = "rgba(255, 255, 255, 0.2)";
  });

  closeButton.addEventListener("mouseleave", () => {
    closeButton.style.backgroundColor = "transparent";
  });

  closeButton.addEventListener("click", () => {
    if (notification.parentNode) {
      notification.parentNode.removeChild(notification);
    }
  });

  notification.appendChild(closeButton);

  // Add CTA button if provided
  if (ctaText && onCtaClick) {
    const ctaButton = document.createElement("button");
    ctaButton.textContent = ctaText;
    ctaButton.style.cssText = `
      background: rgba(255, 255, 255, 0.2);
      border: 1px solid rgba(255, 255, 255, 0.3);
      color: white;
      padding: 5px 10px;
      border-radius: 3px;
      cursor: pointer;
      font-size: 12px;
      transition: background-color 0.2s;
      flex-shrink: 0;
    `;

    ctaButton.addEventListener("mouseenter", () => {
      ctaButton.style.backgroundColor = "rgba(255, 255, 255, 0.3)";
    });

    ctaButton.addEventListener("mouseleave", () => {
      ctaButton.style.backgroundColor = "rgba(255, 255, 255, 0.2)";
    });

    ctaButton.addEventListener("click", onCtaClick);
    notification.appendChild(ctaButton);
  }

  document.body.appendChild(notification);

  // Remove notification after specified duration (unless manually closed)
  if (duration > 0) {
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, duration);
  }
}

function createDropdownContainer() {
  const container = document.createElement("div");
  container.id = "montara-dropdown-container";
  document.body.appendChild(container);
  return container;
}
function showDropdown(
  x: number,
  y: number,
  activeElement: HTMLElement,
  selectionStart: number
) {
  if (!MontaraData.state.dropdownContainer) {
    MontaraData.state.dropdownContainer = createDropdownContainer();
  }

  renderDropdown(MontaraData.catalogData, x, y);
  MontaraData.state.isDropdownVisible = true;
}

function renderDropdown(items: any, x: number, y: number) {
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
  function renderFilteredItems(filteredItems: any[]) {
    itemsList.innerHTML = "";

    if (filteredItems.length === 0) {
      const noResults = document.createElement("div");
      noResults.style.cssText = `
        padding: 1rem;
        text-align: center;
        color: #666;
        font-style: italic;
      `;
      if (!MontaraData.catalogData.length) {
        noResults.textContent = "Loading models...";
      } else {
        noResults.textContent = "No results found";
      }
      itemsList.appendChild(noResults);
      return;
    }

    filteredItems.forEach((item) => {
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
  searchInput.addEventListener("input", (event: any) => {
    const target = event.target as HTMLInputElement;
    const searchTerm = target.value.toLowerCase().trim();

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

function insertTextAtCursor(text: string) {
  const codeMirrorLine = document.querySelector(".cm-activeLine.cm-line");
  if (codeMirrorLine) {
    // Replace MontaraData.constants.trigger with text
    const originalText = codeMirrorLine.textContent || "";
    const newText = originalText.replace(MontaraData.constants.trigger, text);
    codeMirrorLine.textContent = newText;

    // Put the cursor at the end of the text using a safer approach
    const selection = window.getSelection();
    if (selection) {
      // Create a new range
      const range = document.createRange();

      // Find the last text node in the element
      const walker = document.createTreeWalker(
        codeMirrorLine,
        NodeFilter.SHOW_TEXT,
        null
      );

      let lastTextNode = null;
      let currentNode;
      while ((currentNode = walker.nextNode())) {
        lastTextNode = currentNode;
      }

      if (lastTextNode) {
        // Set the range to the end of the last text node
        const textLength = lastTextNode.textContent?.length || 0;
        range.setStart(lastTextNode, textLength);
        range.setEnd(lastTextNode, textLength);

        // Clear existing selection and set the new range
        selection.removeAllRanges();
        selection.addRange(range);
      } else {
        // Fallback: set position at the end of the element
        const childNodes = codeMirrorLine.childNodes;
        if (childNodes.length > 0) {
          const lastChild = childNodes[childNodes.length - 1];
          range.setStartAfter(lastChild);
          range.setEndAfter(lastChild);
          selection.removeAllRanges();
          selection.addRange(range);
        }
      }
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
  document.addEventListener("click", handleClick);
  document.addEventListener("keydown", (event: KeyboardEvent) => {
    if (event.key === "Escape" && MontaraData.state.isDropdownVisible) {
      hideDropdown();
    }
    if (checkForTrigger(event.target as HTMLElement)) {
      const position = getCursorPosition(event.target as HTMLElement);
      showDropdown(position.x, position.y, event.target as HTMLElement, 0);
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
  subscribeToDropdownEvents();
}

function checkForTrigger(element: HTMLElement) {
  let text: string;
  let cursorPosition: number;

  // Handle different element types
  if (
    element instanceof HTMLInputElement ||
    element instanceof HTMLTextAreaElement
  ) {
    text = element.value;
    cursorPosition = element.selectionStart || 0;
  } else if (element.contentEditable === "true") {
    // For contenteditable elements, get text and cursor position from selection
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) {
      return false;
    }

    const range = selection.getRangeAt(0);
    const container = range.startContainer;

    // Get the text content up to the cursor position
    if (container.nodeType === Node.TEXT_NODE) {
      text = container.textContent || "";
      cursorPosition = range.startOffset;
    } else {
      // If cursor is in an element, get all text content
      text = element.textContent || "";
      cursorPosition = text.length;
    }
  } else {
    return false;
  }

  if (!text || cursorPosition === null || cursorPosition === undefined) {
    return false;
  }

  // Check if the user typed "@@" at the current position
  const beforeCursor = text.substring(0, cursorPosition);
  const lastTwoChars = beforeCursor.slice(-2);

  return lastTwoChars === MontaraData.constants.trigger;
}

function getCursorPosition(element: HTMLElement) {
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

// Run initialization when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeExtension);
} else {
  initializeExtension();
}
