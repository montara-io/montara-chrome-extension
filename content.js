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
  catalogData: [],
  state: {
    isDropdownVisible: false,
    lastActiveElement: null,
    lastSelectionStart: null,
    originalEditorElement: null, // Add this new property to store the original editor
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
function showDropdown(x, y, activeElement, selectionStart) {
  if (!MontaraData.state.dropdownContainer) {
    MontaraData.state.dropdownContainer = createDropdownContainer();
  }

  MontaraData.state.lastActiveElement = activeElement;
  MontaraData.state.lastSelectionStart = selectionStart ?? null;
  MontaraData.state.originalEditorElement = activeElement; // Store the original editor element

  renderDropdown(MontaraData.catalogData, x, y);
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
      if (!MontaraData.catalogData.length) {
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
  // Use the original editor element instead of lastActiveElement to avoid targeting the dropdown
  const activeElement =
    MontaraData.state.originalEditorElement ||
    MontaraData.state.lastActiveElement;
  const selectionStart = MontaraData.state.lastSelectionStart;

  if (!activeElement) {
    console.log("Montara: No active element found for text insertion");
    return;
  }

  console.log(
    "Montara: Attempting to insert text into element:",
    activeElement
  );

  // First, try to find a CodeMirror instance in the active element or its children
  let codeMirrorInstance = null;

  // Check if the active element itself has CM6
  if (activeElement.cmView) {
    codeMirrorInstance = activeElement.cmView;
    console.log("Montara: Found CodeMirror 6 view directly on active element");
  } else if (activeElement.cmState) {
    codeMirrorInstance = activeElement.cmState;
    console.log("Montara: Found CodeMirror 6 state directly on active element");
  }

  // If not found, search for CodeMirror in children
  if (!codeMirrorInstance) {
    const cmElement = activeElement.querySelector('.cm-editor, [class*="cm-"]');
    if (cmElement) {
      if (cmElement.cmView) {
        codeMirrorInstance = cmElement.cmView;
        console.log("Montara: Found CodeMirror 6 view in child element");
      } else if (cmElement.cmState) {
        codeMirrorInstance = cmElement.cmState;
        console.log("Montara: Found CodeMirror 6 state in child element");
      }
    }
  }

  // If still not found, search more broadly for any CodeMirror instance
  if (!codeMirrorInstance) {
    const allElements = document.querySelectorAll('.cm-editor, [class*="cm-"]');
    for (const element of allElements) {
      if (element.offsetWidth > 0 && element.offsetHeight > 0) {
        if (element.cmView) {
          codeMirrorInstance = element.cmView;
          console.log("Montara: Found CodeMirror 6 view in visible element");
          break;
        } else if (element.cmState) {
          codeMirrorInstance = element.cmState;
          console.log("Montara: Found CodeMirror 6 state in visible element");
          break;
        }
      }
    }
  }

  // Handle CodeMirror editor (including Snowflake)
  if (codeMirrorInstance) {
    console.log("Montara: Using CodeMirror for text insertion");

    // Check if this is CodeMirror 6
    if (codeMirrorInstance.dispatch && codeMirrorInstance.state) {
      console.log("Montara: Using CodeMirror 6 for text insertion");
      const cmView = codeMirrorInstance;
      const state = cmView.state;
      const selection = state.selection.main;

      // Remove the @@ trigger and insert the text
      const from = Math.max(0, selection.head - 2);
      const to = selection.head;

      console.log(
        "Montara: Replacing range from",
        from,
        "to",
        to,
        "with text:",
        text
      );

      // Create a transaction to replace the text
      const transaction = state.update({
        changes: {from: from, to: to, insert: text},
      });

      cmView.dispatch(transaction);

      // Focus the editor
      cmView.focus();

      console.log("Montara: Text insertion completed via CodeMirror 6");
      return;
    }

    console.log("Montara: Unsupported CodeMirror version for text insertion");
    return;
  }

  // Handle contenteditable elements
  if (activeElement.contentEditable === "true") {
    console.log("Montara: Using contenteditable for text insertion");
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      range.deleteContents();
      range.insertNode(document.createTextNode(text));
      range.collapse(false);
      selection.removeAllRanges();
      selection.addRange(range);
    }
  }
  // Handle textarea elements
  else if (activeElement instanceof HTMLTextAreaElement) {
    console.log("Montara: Using textarea for text insertion");
    const value = activeElement.value;
    const before = value.substring(0, selectionStart - 2); // Remove the @@ trigger
    const after = value.substring(selectionStart);
    activeElement.value = before + text + after;
    activeElement.setSelectionRange(
      before.length + text.length,
      before.length + text.length
    );
  }
  // Handle input elements
  else if (activeElement instanceof HTMLInputElement) {
    console.log("Montara: Using input for text insertion");
    const value = activeElement.value;
    const before = value.substring(0, selectionStart - 2);
    const after = value.substring(selectionStart);
    activeElement.value = before + text + after;
    activeElement.setSelectionRange(
      before.length + text.length,
      before.length + text.length
    );
  }
  // Fallback: try to find any editable element that might work
  else {
    console.log("Montara: Trying fallback text insertion methods");

    // Try to find any CodeMirror instance on the page
    const allCodeMirrors = document.querySelectorAll(
      '.cm-editor, [class*="cm-"]'
    );
    for (const element of allCodeMirrors) {
      if (element.offsetWidth > 0 && element.offsetHeight > 0) {
        if (element.cmView) {
          console.log("Montara: Found fallback CodeMirror 6 view");
          const cmView = element.cmView;
          const state = cmView.state;
          const selection = state.selection.main;
          const from = Math.max(0, selection.head - 2);
          const to = selection.head;
          const transaction = state.update({
            changes: {from: from, to: to, insert: text},
          });
          cmView.dispatch(transaction);
          cmView.focus();
          return;
        } else if (element.cmState) {
          console.log("Montara: Found fallback CodeMirror 6 state");
          // For cmState, we need to find the corresponding view
          const cmView = element.cmView || element.view;
          if (cmView) {
            const state = element;
            const selection = state.selection.main;
            const from = Math.max(0, selection.head - 2);
            const to = selection.head;
            const transaction = state.update({
              changes: {from: from, to: to, insert: text},
            });
            cmView.dispatch(transaction);
            cmView.focus();
            return;
          }
        }
      }
    }

    console.log("Montara: No suitable editor found for text insertion");
  }

  // Trigger input event to notify any listeners
  activeElement.dispatchEvent(new Event("input", {bubbles: true}));
}

function isEditableElement(element) {
  // Standard HTML elements
  if (element.tagName === "TEXTAREA" || element.contentEditable === "true") {
    return true;
  }

  // CodeMirror 6
  if (element.cmView || element.cmState) {
    return true;
  }

  // Custom editors (Snowflake, etc.)
  if (
    element.classList &&
    (element.classList.contains("snowflake-editor") ||
      element.classList.contains("sql-editor") ||
      element.classList.contains("code-editor") ||
      element.classList.contains("cm-editor") ||
      element.getAttribute("data-testid")?.includes("editor") ||
      element.getAttribute("data-testid")?.includes("sql"))
  ) {
    return true;
  }

  // Check if element contains a CodeMirror editor (CM6)
  if (
    element.querySelector &&
    element.querySelector('.cm-editor, [class*="cm-"]')
  ) {
    return true;
  }

  return false;
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

    // For CodeMirror 6
    if (target.cmView || target.cmState) {
      const cmView = target.cmView || target;
      const state = cmView.state;
      const doc = state.doc;
      const selection = state.selection.main;
      const line = doc.lineAt(selection.head);
      const beforeCursor = line.text.slice(0, selection.head - line.from);
      const lastTwoChars = beforeCursor.slice(-2);

      if (lastTwoChars === "@@") {
        const coords = cmView.coordsAtPos(selection.head);
        if (coords) {
          showDropdown(coords.left, coords.bottom, target, selection.head);
        }
      } else {
        hideDropdown();
      }
      return;
    }

    // For textarea and input elements
    const text = target.textContent || target.value;
    let selectionStart = undefined;
    if (
      target instanceof HTMLTextAreaElement ||
      target instanceof HTMLInputElement
    ) {
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

    // For CodeMirror 6
    if (activeElement.cmView || activeElement.cmState) {
      const cmView = activeElement.cmView || activeElement;
      const state = cmView.state;
      const doc = state.doc;
      const selection = state.selection.main;
      const line = doc.lineAt(selection.head);
      const beforeCursor = line.text.slice(0, selection.head - line.from);
      const lastTwoChars = beforeCursor.slice(-2);

      if (lastTwoChars === "@@") {
        const coords = cmView.coordsAtPos(selection.head);
        if (coords) {
          showDropdown(
            coords.left,
            coords.bottom,
            activeElement,
            selection.head
          );
        }
      }
      return;
    }

    // For textarea and input elements
    const text = activeElement.textContent || activeElement.value;
    let selectionStart = undefined;
    if (
      activeElement instanceof HTMLTextAreaElement ||
      activeElement instanceof HTMLInputElement
    ) {
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
  // Clear the original editor element when dropdown is hidden
  MontaraData.state.originalEditorElement = null;
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

  // Add mutation observer to detect when editors are added to the page
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType === Node.ELEMENT_NODE) {
          // Check for editors within the added node
          const editors =
            node.querySelectorAll &&
            node.querySelectorAll(
              '[data-testid*="editor"], [data-testid*="sql"], .monaco-editor, .snowflake-editor, .sql-editor, .code-editor'
            );
          editors.forEach((editor) => {
            console.log("Montara: Detected editor within added node", editor);
          });
        }
      });
    });
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
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

  // Set up CodeMirror integration for Snowflake
  setupCodeMirrorIntegration();

  // Also try to detect Snowflake editor immediately and periodically
  function setupSnowflakeEditor() {
    const snowflakeEditor = detectSnowflakeEditor();
    if (snowflakeEditor) {
      console.log("Montara: Snowflake editor detected, setting up integration");

      // Check for CodeMirror 6
      if (snowflakeEditor.cmView) {
        setupCodeMirrorListeners(snowflakeEditor.cmView);
      }
      if (snowflakeEditor.cmState) {
        setupCodeMirrorListeners(snowflakeEditor.cmState);
      }

      // Also check for CodeMirror instances within the editor
      const cmElement = snowflakeEditor.querySelector(
        '.cm-editor, [class*="cm-"]'
      );
      if (cmElement) {
        if (cmElement.cmView) {
          setupCodeMirrorListeners(cmElement.cmView);
        }
        if (cmElement.cmState) {
          setupCodeMirrorListeners(cmElement.cmState);
        }
      }
    }
  }

  // Try immediately
  setupSnowflakeEditor();

  // Try after delays to ensure DOM is fully loaded
  setTimeout(setupSnowflakeEditor, 1000);
  setTimeout(setupSnowflakeEditor, 3000);
  setTimeout(setupSnowflakeEditor, 5000);
  setTimeout(setupSnowflakeEditor, 10000);

  // Also set up a periodic check for the first minute
  const checkInterval = setInterval(() => {
    setupSnowflakeEditor();
  }, 2000);

  setTimeout(() => {
    clearInterval(checkInterval);
  }, 60000);
}

// Global function to set up CodeMirror listeners
function setupCodeMirrorListeners(cm) {
  if (cm._montaraInitialized) return; // Prevent double initialization

  console.log("Montara: Setting up listeners for CodeMirror instance", cm);

  // Check if this is CodeMirror 6 (CM6)
  if (cm.dispatch && cm.state) {
    setupCodeMirror6Listeners(cm);
    return;
  }

  console.log("Montara: Unsupported CodeMirror version detected");
}

// Function to set up CodeMirror 6 listeners
function setupCodeMirror6Listeners(cmView) {
  if (cmView._montaraInitialized) return; // Prevent double initialization

  console.log(
    "Montara: Setting up listeners for CodeMirror 6 instance",
    cmView
  );

  // Get the DOM element for positioning
  const dom = cmView.dom;

  // Create a custom event listener for changes
  const checkForTrigger = () => {
    try {
      const state = cmView.state;
      const doc = state.doc;
      const selection = state.selection.main;
      const line = doc.lineAt(selection.head);
      const beforeCursor = line.text.slice(0, selection.head - line.from);
      const lastTwoChars = beforeCursor.slice(-2);

      console.log("Montara: CodeMirror 6 change detected:", {
        selection: selection,
        line: line.text,
        beforeCursor: beforeCursor,
        lastTwoChars: lastTwoChars,
      });

      if (lastTwoChars === "@@") {
        // Get cursor position for dropdown
        const coords = cmView.coordsAtPos(selection.head);
        if (coords) {
          console.log(
            "Montara: @@ trigger detected in CM6, showing dropdown at:",
            coords
          );
          showDropdown(coords.left, coords.bottom + 5, dom, selection.head);
        }
      } else {
        hideDropdown();
      }
    } catch (error) {
      console.log("Montara: Error checking for trigger in CM6:", error);
    }
  };

  // Listen for changes using CM6's update mechanism
  const originalUpdate = cmView.update;
  cmView.update = function (updates) {
    const result = originalUpdate.call(this, updates);
    checkForTrigger();
    return result;
  };

  // Also listen for DOM changes as a fallback
  const observer = new MutationObserver(() => {
    checkForTrigger();
  });

  observer.observe(dom, {
    childList: true,
    subtree: true,
    characterData: true,
  });

  // Mark as initialized
  cmView._montaraInitialized = true;
}

function setupCodeMirrorIntegration() {
  console.log("Montara: Setting up CodeMirror integration for Snowflake");

  // Check for existing CodeMirror instances
  function findCodeMirrorInstances() {
    const instances = [];

    console.log("Montara: Starting CodeMirror detection...");

    // Look for elements with CM6 properties
    let cm6ElementsFound = 0;
    document.querySelectorAll("*").forEach((element) => {
      if (element.cmView && !element.cmView._montaraInitialized) {
        console.log("Montara: Found CodeMirror 6 view on element:", element);
        instances.push(element.cmView);
        cm6ElementsFound++;
      }
      if (element.cmState && !element.cmState._montaraInitialized) {
        console.log("Montara: Found CodeMirror 6 state on element:", element);
        instances.push(element.cmState);
        cm6ElementsFound++;
      }
    });

    console.log(
      "Montara: Found",
      cm6ElementsFound,
      "CM6 elements with properties"
    );

    // Look for elements with cm-* classes (CodeMirror wrapper classes)
    const cmElements = document.querySelectorAll('.cm-editor, [class*="cm-"]');
    console.log(
      "Montara: Found",
      cmElements.length,
      "elements with cm-* classes"
    );

    cmElements.forEach((element, index) => {
      console.log(`Montara: CM element ${index + 1}:`, {
        element: element,
        hasCM6View: !!element.cmView,
        hasCM6State: !!element.cmState,
        classes: element.className,
        testId: element.getAttribute("data-testid"),
        visible: element.offsetWidth > 0 && element.offsetHeight > 0,
      });

      if (element.cmView && !element.cmView._montaraInitialized) {
        console.log(
          "Montara: Found CodeMirror 6 view with cm-* class:",
          element
        );
        instances.push(element.cmView);
      }
      if (element.cmState && !element.cmState._montaraInitialized) {
        console.log(
          "Montara: Found CodeMirror 6 state with cm-* class:",
          element
        );
        instances.push(element.cmState);
      }
    });

    // More thorough search for CodeMirror instances
    // Look for any element with cm-* classes and try to find the CodeMirror instance
    document.querySelectorAll('[class*="cm-"]').forEach((element) => {
      // Check if this element has CodeMirror (CM6)
      if (element.cmView && !element.cmView._montaraInitialized) {
        console.log(
          "Montara: Found CodeMirror 6 view on cm-* element:",
          element
        );
        instances.push(element.cmView);
        return;
      }
      if (element.cmState && !element.cmState._montaraInitialized) {
        console.log(
          "Montara: Found CodeMirror 6 state on cm-* element:",
          element
        );
        instances.push(element.cmState);
        return;
      }

      // Check if any parent has CodeMirror (CM6)
      let current = element;
      while (current && current !== document.body) {
        if (current.cmView && !current.cmView._montaraInitialized) {
          console.log(
            "Montara: Found CodeMirror 6 view on parent of cm-* element:",
            current
          );
          instances.push(current.cmView);
          break;
        }
        if (current.cmState && !current.cmState._montaraInitialized) {
          console.log(
            "Montara: Found CodeMirror 6 state on parent of cm-* element:",
            current
          );
          instances.push(current.cmState);
          break;
        }
        current = current.parentElement;
      }

      // Check if any child has CodeMirror (CM6)
      const cmElements = element.querySelectorAll('.cm-editor, [class*="cm-"]');
      for (const cmElement of cmElements) {
        if (cmElement.cmView && !cmElement.cmView._montaraInitialized) {
          console.log(
            "Montara: Found CodeMirror 6 view in child of cm-* element:",
            cmElement
          );
          instances.push(cmElement.cmView);
          break;
        }
        if (cmElement.cmState && !cmElement.cmState._montaraInitialized) {
          console.log(
            "Montara: Found CodeMirror 6 state in child of cm-* element:",
            cmElement
          );
          instances.push(cmElement.cmState);
          break;
        }
      }
    });

    // Also look for Snowflake-specific editor patterns
    const snowflakeSelectors = [
      '[data-testid*="editor"]',
      '[data-testid*="sql"]',
      ".snowflake-editor",
      ".sql-editor",
      ".code-editor",
      ".cm-editor",
      '[class*="editor"]',
      ".cm-content",
    ];

    snowflakeSelectors.forEach((selector) => {
      document.querySelectorAll(selector).forEach((element) => {
        // Check if this element or its children have CodeMirror (CM6)
        const cmElement = element.querySelector('.cm-editor, [class*="cm-"]');
        if (cmElement) {
          if (cmElement.cmView && !cmElement.cmView._montaraInitialized) {
            console.log(
              "Montara: Found CodeMirror 6 view in Snowflake editor:",
              element
            );
            instances.push(cmElement.cmView);
          }
          if (cmElement.cmState && !cmElement.cmState._montaraInitialized) {
            console.log(
              "Montara: Found CodeMirror 6 state in Snowflake editor:",
              element
            );
            instances.push(cmElement.cmState);
          }
        }
      });
    });

    // Remove duplicates
    const uniqueInstances = [...new Set(instances)];
    console.log(
      "Montara: Found",
      uniqueInstances.length,
      "unique CodeMirror instances"
    );
    return uniqueInstances;
  }

  // Set up existing instances
  const existingInstances = findCodeMirrorInstances();
  console.log("Montara: Found", existingInstances.length, "existing instances");
  existingInstances.forEach(setupCodeMirrorListeners);

  // Also try aggressive detection for React-based implementations
  const aggressiveInstances = findCodeMirrorInstancesAggressive();
  console.log(
    "Montara: Found",
    aggressiveInstances.length,
    "aggressive instances"
  );
  aggressiveInstances.forEach(setupCodeMirrorListeners);

  // Debug: Check for any elements with cm-* classes
  const allCmElements = document.querySelectorAll('[class*="cm-"]');
  console.log(
    "Montara: Total elements with cm-* classes:",
    allCmElements.length
  );
  allCmElements.forEach((element, index) => {
    console.log(`Montara: CM element ${index + 1}:`, {
      tagName: element.tagName,
      className: element.className,
      testId: element.getAttribute("data-testid"),
      hasCM6View: !!element.cmView,
      hasCM6State: !!element.cmState,
      visible: element.offsetWidth > 0 && element.offsetHeight > 0,
    });
  });

  // Debug: Check for any object that looks like a CodeMirror 6 instance
  console.log("Montara: Checking for CodeMirror 6-like objects...");
  let cm6LikeObjects = 0;
  document.querySelectorAll("*").forEach((element) => {
    // Check if element has any property that looks like CM6
    for (const key in element) {
      try {
        const value = element[key];
        if (value && typeof value === "object") {
          // Check if it has CM6-like properties
          if (value.dispatch && value.state && value.dom) {
            console.log("Montara: Found CM6-like object:", {
              element: element,
              property: key,
              value: value,
            });
            cm6LikeObjects++;
          }
        }
      } catch (e) {
        // Ignore errors when accessing properties
      }
    }
  });
  console.log("Montara: Found", cm6LikeObjects, "CM6-like objects");

  // Debug: Check for global variables that might contain CM6 instances
  console.log("Montara: Checking global variables for CM6 instances...");
  let globalCM6Objects = 0;
  for (const key in window) {
    try {
      const value = window[key];
      if (value && typeof value === "object") {
        // Check if it has CM6-like properties
        if (value.dispatch && value.state && value.dom) {
          console.log("Montara: Found global CM6-like object:", {
            key: key,
            value: value,
          });
          globalCM6Objects++;
        }
      }
    } catch (e) {
      // Ignore errors when accessing window properties
    }
  }
  console.log("Montara: Found", globalCM6Objects, "global CM6-like objects");

  // Debug: Check for React fiber nodes that might contain CM6 instances
  console.log("Montara: Checking React fiber nodes...");
  let reactCM6Objects = 0;
  document.querySelectorAll("*").forEach((element) => {
    // Check for React fiber properties
    const fiberKeys = [
      "_reactInternalFiber",
      "_reactInternalInstance",
      "__reactInternalInstance$",
      "__reactFiber$",
    ];
    fiberKeys.forEach((key) => {
      try {
        const fiber = element[key];
        if (fiber && typeof fiber === "object") {
          // Check if fiber has any CM6-like properties
          for (const fiberKey in fiber) {
            try {
              const fiberValue = fiber[fiberKey];
              if (fiberValue && typeof fiberValue === "object") {
                if (fiberValue.dispatch && fiberValue.state && fiberValue.dom) {
                  console.log("Montara: Found CM6 in React fiber:", {
                    element: element,
                    fiberKey: fiberKey,
                    fiberValue: fiberValue,
                  });
                  reactCM6Objects++;
                }
              }
            } catch (e) {
              // Ignore errors
            }
          }
        }
      } catch (e) {
        // Ignore errors
      }
    });
  });
  console.log("Montara: Found", reactCM6Objects, "CM6 objects in React fibers");

  // Set up mutation observer to detect new CodeMirror instances
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType === Node.ELEMENT_NODE) {
          // Check if the added node is a CodeMirror instance (CM6)
          if (node.cmView && !node.cmView._montaraInitialized) {
            console.log("Montara: Detected new CodeMirror 6 view", node.cmView);
            setupCodeMirrorListeners(node.cmView);
          }
          if (node.cmState && !node.cmState._montaraInitialized) {
            console.log(
              "Montara: Detected new CodeMirror 6 state",
              node.cmState
            );
            setupCodeMirrorListeners(node.cmState);
          }

          // Check for CodeMirror instances within the added node
          const cmElements =
            node.querySelectorAll &&
            node.querySelectorAll('.cm-editor, [class*="cm-"]');
          cmElements.forEach((element) => {
            if (element.cmView && !element.cmView._montaraInitialized) {
              console.log(
                "Montara: Detected CodeMirror 6 view within added node",
                element.cmView
              );
              setupCodeMirrorListeners(element.cmView);
            }
            if (element.cmState && !element.cmState._montaraInitialized) {
              console.log(
                "Montara: Detected CodeMirror 6 state within added node",
                element.cmState
              );
              setupCodeMirrorListeners(element.cmState);
            }
          });

          // Check for Snowflake editor patterns in added nodes
          const snowflakeSelectors = [
            '[data-testid*="editor"]',
            '[data-testid*="sql"]',
            ".snowflake-editor",
            ".sql-editor",
            ".code-editor",
            ".cm-editor",
            '[class*="editor"]',
          ];

          snowflakeSelectors.forEach((selector) => {
            const elements =
              node.querySelectorAll && node.querySelectorAll(selector);
            if (elements) {
              elements.forEach((element) => {
                const cmElement = element.querySelector(
                  '.cm-editor, [class*="cm-"]'
                );
                if (cmElement) {
                  if (
                    cmElement.cmView &&
                    !cmElement.cmView._montaraInitialized
                  ) {
                    console.log(
                      "Montara: Detected CodeMirror 6 view in new Snowflake editor:",
                      element
                    );
                    setupCodeMirrorListeners(cmElement.cmView);
                  }
                  if (
                    cmElement.cmState &&
                    !cmElement.cmState._montaraInitialized
                  ) {
                    console.log(
                      "Montara: Detected CodeMirror 6 state in new Snowflake editor:",
                      element
                    );
                    setupCodeMirrorListeners(cmElement.cmState);
                  }
                }
              });
            }
          });
        }
      });
    });
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });

  // Also check periodically for any missed instances
  const checkInterval = setInterval(() => {
    const instances = findCodeMirrorInstances();
    instances.forEach(setupCodeMirrorListeners);

    // Also try aggressive detection periodically
    const aggressiveInstances = findCodeMirrorInstancesAggressive();
    aggressiveInstances.forEach(setupCodeMirrorListeners);
  }, 2000);

  // Stop checking after 60 seconds
  setTimeout(() => {
    clearInterval(checkInterval);
  }, 60000);
}

// Enhanced CodeMirror detection for React-based implementations
function findCodeMirrorInstancesAggressive() {
  const instances = [];

  console.log("Montara: Performing aggressive CodeMirror detection...");

  // Method 1: Look for CodeMirror 6 (CM6) instances
  const cmElements = document.querySelectorAll('.cm-editor, [class*="cm-"]');
  console.log(
    "Montara: Aggressive detection found",
    cmElements.length,
    "cm-* elements"
  );

  cmElements.forEach((element) => {
    // Check for CM6 view property
    if (element.cmView && !element.cmView._montaraInitialized) {
      console.log(
        "Montara: Found CodeMirror 6 view on cm-editor element:",
        element
      );
      instances.push(element.cmView);
      return;
    }

    // Check for CM6 state property
    if (element.cmState && !element.cmState._montaraInitialized) {
      console.log(
        "Montara: Found CodeMirror 6 state on cm-editor element:",
        element
      );
      instances.push(element.cmState);
      return;
    }

    // Check all parents up to body for CM6 properties
    let current = element;
    while (current && current !== document.body) {
      if (current.cmView && !current.cmView._montaraInitialized) {
        console.log("Montara: Found CodeMirror 6 view on parent:", current);
        instances.push(current.cmView);
        break;
      }
      if (current.cmState && !current.cmState._montaraInitialized) {
        console.log("Montara: Found CodeMirror 6 state on parent:", current);
        instances.push(current.cmState);
        break;
      }
      current = current.parentElement;
    }

    // Check all children recursively for CM6 properties
    const allChildren = element.querySelectorAll("*");
    for (const child of allChildren) {
      if (child.cmView && !child.cmView._montaraInitialized) {
        console.log("Montara: Found CodeMirror 6 view on child:", child);
        instances.push(child.cmView);
        break;
      }
      if (child.cmState && !child.cmState._montaraInitialized) {
        console.log("Montara: Found CodeMirror 6 state on child:", child);
        instances.push(child.cmState);
        break;
      }
    }
  });

  // Method 3: Look for React component patterns that might wrap CodeMirror
  const reactSelectors = [
    '[data-testid*="editor"]',
    '[data-testid*="sql"]',
    '[class*="editor"]',
    '[class*="sql"]',
    '[class*="code"]',
  ];

  reactSelectors.forEach((selector) => {
    document.querySelectorAll(selector).forEach((element) => {
      // Look for any CodeMirror instance within this element
      const cmElements = element.querySelectorAll('[class*="cm-"]');
      cmElements.forEach((cmElement) => {
        let current = cmElement;
        while (current && current !== element) {
          // Check for CM6
          if (current.cmView && !current.cmView._montaraInitialized) {
            console.log(
              "Montara: Found CodeMirror 6 view in React component:",
              current
            );
            instances.push(current.cmView);
            break;
          }
          if (current.cmState && !current.cmState._montaraInitialized) {
            console.log(
              "Montara: Found CodeMirror 6 state in React component:",
              current
            );
            instances.push(current.cmState);
            break;
          }

          current = current.parentElement;
        }
      });
    });
  });

  // Remove duplicates
  const uniqueInstances = [...new Set(instances)];
  console.log(
    "Montara: Aggressive detection found",
    uniqueInstances.length,
    "CodeMirror instances"
  );
  return uniqueInstances;
}

// Helper functions for dropdown functionality
function detectSnowflakeEditor() {
  console.log("Montara: Detecting Snowflake editor...");

  // Look for common Snowflake editor selectors
  const selectors = [
    '[data-testid*="editor"]',
    '[data-testid*="sql"]',
    ".snowflake-editor",
    ".sql-editor",
    ".code-editor",
    ".cm-editor",
    '[class*="editor"]',
  ];

  for (const selector of selectors) {
    const elements = document.querySelectorAll(selector);
    console.log(
      `Montara: Found ${elements.length} elements with selector: ${selector}`
    );
    for (const element of elements) {
      if (element.offsetWidth > 0 && element.offsetHeight > 0) {
        console.log("Montara: Found visible editor element:", element);

        // Check if it has CodeMirror (CM6)
        if (element.cmView) {
          console.log(
            "Montara: Element has CodeMirror 6 view:",
            element.cmView
          );
          return element;
        }
        if (element.cmState) {
          console.log(
            "Montara: Element has CodeMirror 6 state:",
            element.cmState
          );
          return element;
        }

        // Check if it contains a CodeMirror instance (CM6)
        const cmElement = element.querySelector('.cm-editor, [class*="cm-"]');
        if (cmElement) {
          if (cmElement.cmView) {
            console.log(
              "Montara: Element contains CodeMirror 6 view:",
              cmElement.cmView
            );
            return element;
          }
          if (cmElement.cmState) {
            console.log(
              "Montara: Element contains CodeMirror 6 state:",
              cmElement.cmState
            );
            return element;
          }
        }
      }
    }
  }

  // Also look for any element with CodeMirror properties
  document.querySelectorAll("*").forEach((element) => {
    if (element.cmView) {
      console.log("Montara: Found element with CodeMirror 6 view:", element);
      console.log("Montara: CodeMirror 6 view:", element.cmView);
    }
    if (element.cmState) {
      console.log("Montara: Found element with CodeMirror 6 state:", element);
      console.log("Montara: CodeMirror 6 state:", element.cmState);
    }
  });

  // Try to find any visible CodeMirror editor (CM6)
  const allCodeMirrors = document.querySelectorAll(
    '.cm-editor, [class*="cm-"]'
  );
  for (const element of allCodeMirrors) {
    if (element.offsetWidth > 0 && element.offsetHeight > 0) {
      if (element.cmView) {
        console.log(
          "Montara: Found visible CodeMirror 6 view element:",
          element
        );
        return element;
      }
      if (element.cmState) {
        console.log(
          "Montara: Found visible CodeMirror 6 state element:",
          element
        );
        return element;
      }
    }
  }

  return null;
}

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
