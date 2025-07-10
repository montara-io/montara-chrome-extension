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
  const activeElement = MontaraData.state.lastActiveElement;
  const selectionStart = MontaraData.state.lastSelectionStart;

  if (!activeElement) return;

  // Try CodeMirror editor
  if (activeElement.CodeMirror) {
    const cm = activeElement.CodeMirror;
    const cursor = cm.getCursor();

    // Remove the @@ trigger and insert the text
    const from = {line: cursor.line, ch: cursor.ch - 2};
    const to = {line: cursor.line, ch: cursor.ch};

    cm.replaceRange(text, from, to);

    // Set cursor position after the inserted text
    const newCursor = {line: cursor.line, ch: from.ch + text.length};
    cm.setCursor(newCursor);

    // Focus the editor
    cm.focus();
    return;
  }

  // Try Ace editor
  if (activeElement.env && activeElement.env.editor) {
    const aceEditor = activeElement.env.editor;
    const session = aceEditor.getSession();
    const cursor = aceEditor.getCursorPosition();
    const line = session.getLine(cursor.row);
    const newLine =
      line.substring(0, cursor.column - 2) +
      text +
      line.substring(cursor.column);
    session.replace(
      new ace.Range(cursor.row, 0, cursor.row, line.length),
      newLine
    );
    aceEditor.setCursorPosition(cursor.row, cursor.column - 2 + text.length);
    return;
  }

  // Try PrismJS editor
  if (
    activeElement.classList &&
    activeElement.classList.contains("prism-editor")
  ) {
    const prismEditor = activeElement.__prism;
    if (prismEditor) {
      const cursor = prismEditor.getCursor();
      const line = prismEditor.getLine(cursor.line);
      const newLine =
        line.substring(0, cursor.ch - 2) + text + line.substring(cursor.ch);
      prismEditor.replaceRange(
        newLine,
        {line: cursor.line, ch: 0},
        {line: cursor.line, ch: line.length}
      );
      prismEditor.setCursor({
        line: cursor.line,
        ch: cursor.ch - 2 + text.length,
      });
      return;
    }
  }

  // Try custom Snowflake editor (look for common patterns)
  if (
    activeElement.classList &&
    (activeElement.classList.contains("snowflake-editor") ||
      activeElement.classList.contains("sql-editor") ||
      activeElement.classList.contains("code-editor") ||
      activeElement.getAttribute("data-testid")?.includes("editor") ||
      activeElement.getAttribute("data-testid")?.includes("sql"))
  ) {
    // Try to find CodeMirror instance within the element
    const cmElement = activeElement.querySelector(
      '.CodeMirror, [class*="cm-"]'
    );
    if (cmElement && cmElement.CodeMirror) {
      const cm = cmElement.CodeMirror;
      const cursor = cm.getCursor();

      // Remove the @@ trigger and insert the text
      const from = {line: cursor.line, ch: cursor.ch - 2};
      const to = {line: cursor.line, ch: cursor.ch};

      cm.replaceRange(text, from, to);

      // Set cursor position after the inserted text
      const newCursor = {line: cursor.line, ch: from.ch + text.length};
      cm.setCursor(newCursor);

      // Focus the editor
      cm.focus();
      return;
    }
  }

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
  } else if (activeElement instanceof HTMLInputElement) {
    // For input elements
    const value = activeElement.value;
    const before = value.substring(0, selectionStart - 2);
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
  // Standard HTML elements
  if (element.tagName === "TEXTAREA" || element.contentEditable === "true") {
    return true;
  }

  // CodeMirror
  if (element.CodeMirror) {
    return true;
  }

  // Ace Editor
  if (element.env && element.env.editor) {
    return true;
  }

  // PrismJS Editor
  if (element.classList && element.classList.contains("prism-editor")) {
    return true;
  }

  // Custom editors (Snowflake, etc.)
  if (
    element.classList &&
    (element.classList.contains("snowflake-editor") ||
      element.classList.contains("sql-editor") ||
      element.classList.contains("code-editor") ||
      element.getAttribute("data-testid")?.includes("editor") ||
      element.getAttribute("data-testid")?.includes("sql"))
  ) {
    return true;
  }

  // Check if element contains a CodeMirror editor
  if (
    element.querySelector &&
    element.querySelector('.CodeMirror, [class*="cm-"]')
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

    // For CodeMirror
    if (target.CodeMirror) {
      const cm = target.CodeMirror;
      const cursor = cm.getCursor();
      const line = cm.getLine(cursor.line);
      const beforeCursor = line.substring(0, cursor.ch);
      const lastTwoChars = beforeCursor.slice(-2);

      if (lastTwoChars === "@@") {
        const coords = cm.cursorCoords(cursor);
        showDropdown(coords.left, coords.bottom, target, cursor.ch);
      } else {
        hideDropdown();
      }
      return;
    }

    // For Ace Editor
    if (target.env && target.env.editor) {
      const aceEditor = target.env.editor;
      const cursor = aceEditor.getCursorPosition();
      const line = aceEditor.getSession().getLine(cursor.row);
      const beforeCursor = line.substring(0, cursor.column);
      const lastTwoChars = beforeCursor.slice(-2);

      if (lastTwoChars === "@@") {
        const coords = aceEditor.renderer.textToScreenCoordinates(
          cursor.row,
          cursor.column
        );
        showDropdown(coords.pageX, coords.pageY + 20, target, cursor.column);
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

    // For CodeMirror
    if (activeElement.CodeMirror) {
      const cm = activeElement.CodeMirror;
      const cursor = cm.getCursor();
      const line = cm.getLine(cursor.line);
      const beforeCursor = line.substring(0, cursor.ch);
      const lastTwoChars = beforeCursor.slice(-2);

      if (lastTwoChars === "@@") {
        const coords = cm.cursorCoords(cursor);
        showDropdown(coords.left, coords.bottom, activeElement, cursor.ch);
      }
      return;
    }

    // For Ace Editor
    if (activeElement.env && activeElement.env.editor) {
      const aceEditor = activeElement.env.editor;
      const cursor = aceEditor.getCursorPosition();
      const line = aceEditor.getSession().getLine(cursor.row);
      const beforeCursor = line.substring(0, cursor.column);
      const lastTwoChars = beforeCursor.slice(-2);

      if (lastTwoChars === "@@") {
        const coords = aceEditor.renderer.textToScreenCoordinates(
          cursor.row,
          cursor.column
        );
        showDropdown(
          coords.pageX,
          coords.pageY + 20,
          activeElement,
          cursor.column
        );
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
          // Check if the added node is an editor or contains editors
          if (isEditableElement(node)) {
            console.log("Montara: Detected new editor element", node);
          }

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

  // Also try to detect Snowflake editor immediately
  setTimeout(() => {
    const snowflakeEditor = detectSnowflakeEditor();
    if (snowflakeEditor) {
      console.log("Montara: Snowflake editor detected, setting up integration");
      if (snowflakeEditor.CodeMirror) {
        setupCodeMirrorListeners(snowflakeEditor.CodeMirror);
      }
    }
  }, 1000);
}

// Global function to set up CodeMirror listeners
function setupCodeMirrorListeners(cm) {
  if (cm._montaraInitialized) return; // Prevent double initialization

  console.log("Montara: Setting up listeners for CodeMirror instance", cm);

  // Listen for changes in the editor
  cm.on("change", (cm, changeObj) => {
    const cursor = cm.getCursor();
    const line = cm.getLine(cursor.line);
    const beforeCursor = line.substring(0, cursor.ch);
    const lastTwoChars = beforeCursor.slice(-2);

    if (lastTwoChars === "@@") {
      const coords = cm.cursorCoords(cursor);
      showDropdown(
        coords.left,
        coords.bottom + 5,
        cm.getWrapperElement(),
        cursor.ch
      );
    } else {
      hideDropdown();
    }
  });

  // Listen for cursor activity
  cm.on("cursorActivity", (cm) => {
    const cursor = cm.getCursor();
    const line = cm.getLine(cursor.line);
    const beforeCursor = line.substring(0, cursor.ch);
    const lastTwoChars = beforeCursor.slice(-2);

    if (lastTwoChars === "@@") {
      const coords = cm.cursorCoords(cursor);
      showDropdown(
        coords.left,
        coords.bottom + 5,
        cm.getWrapperElement(),
        cursor.ch
      );
    } else {
      hideDropdown();
    }
  });

  // Mark as initialized
  cm._montaraInitialized = true;
}

function setupCodeMirrorIntegration() {
  console.log("Montara: Setting up CodeMirror integration for Snowflake");

  // Check for existing CodeMirror instances
  function findCodeMirrorInstances() {
    const instances = [];

    // Look for elements with CodeMirror property
    document.querySelectorAll("*").forEach((element) => {
      if (element.CodeMirror && !element.CodeMirror._montaraInitialized) {
        instances.push(element.CodeMirror);
      }
    });

    // Look for elements with cm-* classes (CodeMirror wrapper classes)
    document
      .querySelectorAll('.cm-s-default, .CodeMirror, [class*="cm-"]')
      .forEach((element) => {
        if (element.CodeMirror && !element.CodeMirror._montaraInitialized) {
          instances.push(element.CodeMirror);
        }
      });

    return instances;
  }

  // Set up existing instances
  const existingInstances = findCodeMirrorInstances();
  existingInstances.forEach(setupCodeMirrorListeners);

  // Override CodeMirror constructor to catch new instances
  if (window.CodeMirror) {
    const originalCodeMirror = window.CodeMirror;
    window.CodeMirror = function (place, options) {
      const cm = originalCodeMirror.call(this, place, options);
      setupCodeMirrorListeners(cm);
      return cm;
    };

    // Copy static properties
    Object.setPrototypeOf(window.CodeMirror, originalCodeMirror);
    Object.assign(window.CodeMirror, originalCodeMirror);
  }

  // Set up mutation observer to detect new CodeMirror instances
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType === Node.ELEMENT_NODE) {
          // Check if the added node is a CodeMirror instance
          if (node.CodeMirror && !node.CodeMirror._montaraInitialized) {
            console.log(
              "Montara: Detected new CodeMirror instance",
              node.CodeMirror
            );
            setupCodeMirrorListeners(node.CodeMirror);
          }

          // Check for CodeMirror instances within the added node
          const cmElements =
            node.querySelectorAll &&
            node.querySelectorAll('.CodeMirror, [class*="cm-"]');
          cmElements.forEach((element) => {
            if (element.CodeMirror && !element.CodeMirror._montaraInitialized) {
              console.log(
                "Montara: Detected CodeMirror instance within added node",
                element.CodeMirror
              );
              setupCodeMirrorListeners(element.CodeMirror);
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
  }, 2000);

  // Stop checking after 60 seconds
  setTimeout(() => {
    clearInterval(checkInterval);
  }, 60000);
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

    '[class*="editor"]',
    ".CodeMirror",
    '[class*="cm-"]',
  ];

  for (const selector of selectors) {
    const elements = document.querySelectorAll(selector);
    console.log(
      `Montara: Found ${elements.length} elements with selector: ${selector}`
    );
    for (const element of elements) {
      if (element.offsetWidth > 0 && element.offsetHeight > 0) {
        console.log("Montara: Found visible editor element:", element);

        // Check if it has CodeMirror
        if (element.CodeMirror) {
          console.log(
            "Montara: Element has CodeMirror instance:",
            element.CodeMirror
          );
        }

        return element;
      }
    }
  }

  // Also look for any element with CodeMirror property
  document.querySelectorAll("*").forEach((element) => {
    if (element.CodeMirror) {
      console.log("Montara: Found element with CodeMirror:", element);
      console.log("Montara: CodeMirror instance:", element.CodeMirror);
    }
  });

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
