// Content script for Montara Chrome Extension
// This script runs on every webpage
const MontaraExtension = {
  montaraToken: null,
  PostMessageType: {
    MISSING_MONTARA_TOKEN: "montara_missingMontaraToken",
    CATALOG_DATA: "montara_catalogData",
    MONTARA_TOKEN: "montara_montaraToken",
    INVALID_MONTARA_TOKEN: "montara_invalidMontaraToken",
  },
  constants: {
    trigger: "@@",
    isDebugMode: true,
    montaraLogoUrl:
      "https://montara.io/wp-content/uploads/2025/03/montara_logo_MEDIUM.png",
    colors: {
      background: "#fff",
      border: "#C8C8C8",
      borderLight: "#F0F0F0",
      textPrimary: "#353B41",
      textSecondary: "#737378",
    },
  },
  catalogData: [],
  state: {
    isDropdownVisible: false,
    dropdownContainer: null,
    itemsList: null,
  },
  methods: {
    showNotification({
      text,
      duration = 3000,
      alwaysShow = false,
    }: {
      text: string;
      duration?: number;
      alwaysShow?: boolean;
    }) {
      if (!alwaysShow && !MontaraExtension.constants.isDebugMode) {
        return;
      }
      const notification = document.createElement("div");
      notification.id = "montara-notification";
      notification.style.cssText = `
        position: fixed;
        top: 10px;
        right: 10px;
        background: ${MontaraExtension.constants.colors.background};
        color: ${MontaraExtension.constants.colors.textPrimary};
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
        color: ${MontaraExtension.constants.colors.textPrimary};
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

      document.body.appendChild(notification);

      // Remove notification after specified duration (unless manually closed)
      if (duration > 0) {
        setTimeout(() => {
          if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
          }
        }, duration);
      }
    },
    renderMontaraIframe() {
      const iframe = document.createElement("iframe");
      iframe.src = "http://localhost:3000/montara-chrome-extension-sidebar";
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
      window.addEventListener(
        "message",
        this.handleIframeMessage.bind(this) as EventListener
      );
    },
    async handleIframeMessage(event: MessageEvent) {
      if (!event?.data?.type) {
        return;
      }
      switch (event.data.type) {
        case MontaraExtension.PostMessageType.MISSING_MONTARA_TOKEN:
          // Get the latest token from storage
          await this.initializeToken();
          this.sendMessageToIframe({
            type: MontaraExtension.PostMessageType.MONTARA_TOKEN,
            payload: {
              montaraToken: MontaraExtension.montaraToken,
            },
          });
          break;
        case MontaraExtension.PostMessageType.CATALOG_DATA:
          MontaraExtension.catalogData = event.data.payload;
          this.showNotification({
            text: "Catalog data received",
            duration: 3000,
          });
          break;
        case MontaraExtension.PostMessageType.INVALID_MONTARA_TOKEN:
          this.showNotification({
            text: "Invalid token, please check your token in the extension settings",
            duration: 30000,
            alwaysShow: true,
          });
          break;
      }
    },
    sendMessageToIframe({type, payload}: {type: string; payload: any}) {
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
    },

    showDropdown(x: number, y: number) {
      if (!MontaraExtension.state.dropdownContainer) {
        MontaraExtension.state.dropdownContainer =
          this.createDropdownContainer();
      }

      this.renderDropdown(MontaraExtension.catalogData, x, y);
      MontaraExtension.state.isDropdownVisible = true;
    },
    renderFilteredItems(filteredItems: any[]) {
      MontaraExtension.state.itemsList.innerHTML = "";

      if (filteredItems.length === 0) {
        const noResults = document.createElement("div");
        noResults.className = "montara-dropdown-no-results";
        noResults.style.cssText = `
          padding: 1rem;
          text-align: center;
          color: ${MontaraExtension.constants.colors.textSecondary};
          font-style: italic;
        `;
        if (!MontaraExtension.catalogData.length) {
          noResults.textContent = "Loading models...";
        } else {
          noResults.textContent = "No results found";
        }
        MontaraExtension.state.itemsList.appendChild(noResults);
        return;
      }

      filteredItems.forEach((item) => {
        const itemElement = document.createElement("div");
        itemElement.className = "montara-dropdown-item";
        itemElement.style.cssText = `
          padding: 0.5rem;
          cursor: pointer;
          border-bottom: 1px solid ${MontaraExtension.constants.colors.borderLight};
          transition: background-color 0.2s;
        `;
        const croppedCode = item.code.slice(0, 150) + "...";
        itemElement.innerHTML = `
          <div style="font-weight: 500; color: ${MontaraExtension.constants.colors.textPrimary}; margin-bottom: 4px;">${item.name}</div>
          <div style="font-family: 'Monaco', 'Menlo', monospace; font-size: 12px; color: ${MontaraExtension.constants.colors.textSecondary}; background: ${MontaraExtension.constants.colors.background}; padding: 4px 6px; border-radius: 4px; overflow-x: auto;">${croppedCode}</div>
        `;

        itemElement.addEventListener("click", () => {
          this.insertTextAtCursor(item.code);
          this.hideDropdown();
        });

        MontaraExtension.state.itemsList.appendChild(itemElement);
      });
    },
    renderDropdown(items: any, x: number, y: number) {
      const container = MontaraExtension.state.dropdownContainer;
      container.innerHTML = "";

      const dropdown = document.createElement("div");
      dropdown.id = "montara-dropdown";
      dropdown.className = "montara-dropdown";
      dropdown.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        background: ${MontaraExtension.constants.colors.background};
        border: 1px solid ${MontaraExtension.constants.colors.border};
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10001;
        width: 30rem;
        max-height: 40rem;
        overflow-y: auto;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        font-size: 14px;
      `;
      const headerContainer = document.createElement("div");
      headerContainer.className = "montara-dropdown-header-container";
      headerContainer.style.cssText = `
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem;
        border-bottom: 1px solid ${MontaraExtension.constants.colors.border};
      `;

      const header = document.createElement("div");
      header.className = "montara-dropdown-header";
      header.style.cssText = `
        font-weight: 600;
        color: ${MontaraExtension.constants.colors.textPrimary};
        background: ${MontaraExtension.constants.colors.background};
        border-radius: 8px 8px 0 0;
      `;
      header.textContent = "Insert SQL";
      const montaraLogo = document.createElement("img");
      montaraLogo.className = "montara-dropdown-powered-by-montara";
      montaraLogo.src = MontaraExtension.constants.montaraLogoUrl;
      montaraLogo.style.cssText = `
        height: 1rem;
        cursor: pointer;
        vertical-align: middle;
      `;
      montaraLogo.alt = "Montara Logo";
      montaraLogo.addEventListener("click", () => {
        window.open("https://montara.io", "_blank");
      });

      headerContainer.appendChild(header);
      headerContainer.appendChild(montaraLogo);
      dropdown.appendChild(headerContainer);

      // Add search input
      const searchContainer = document.createElement("div");
      searchContainer.className = "montara-dropdown-search-container";
      searchContainer.style.cssText = `
        padding: 1rem;
        border-bottom: 1px solid ${MontaraExtension.constants.colors.border};
      `;

      const searchInput = document.createElement("input");
      searchInput.type = "text";
      searchInput.placeholder = "Search models and code...";
      searchInput.style.cssText = `
        width: 100%;
        padding: 0.5rem;
        border: 1px solid ${MontaraExtension.constants.colors.border};
        background: ${MontaraExtension.constants.colors.background};
        border-radius: 4px;
        font-size: 14px;
        font-family: inherit;
        outline: none;
        box-sizing: border-box;
        color: ${MontaraExtension.constants.colors.textPrimary};
      `;

      // Add focus styles
      searchInput.addEventListener("focus", () => {
        searchInput.style.borderColor =
          MontaraExtension.constants.colors.border;
        searchInput.style.boxShadow = `0 0 0 1px ${MontaraExtension.constants.colors.border}`;
      });

      searchInput.addEventListener("blur", () => {
        searchInput.style.borderColor =
          MontaraExtension.constants.colors.border;
        searchInput.style.boxShadow = "none";
      });

      searchContainer.appendChild(searchInput);
      dropdown.appendChild(searchContainer);

      MontaraExtension.state.itemsList = document.createElement("div");
      MontaraExtension.state.itemsList.className =
        "montara-dropdown-items-list";
      MontaraExtension.state.itemsList.style.cssText = `
        padding: 0.5rem;
      `;

      // Initial render
      this.renderFilteredItems(items);

      // Add search functionality
      searchInput.addEventListener("input", (event: any) => {
        const target = event.target as HTMLInputElement;
        const searchTerm = target.value.toLowerCase().trim();

        if (searchTerm === "") {
          this.renderFilteredItems(items);
          return;
        }

        const filteredItems = items.filter(
          (item) =>
            item.name.toLowerCase().includes(searchTerm) ||
            item.code.toLowerCase().includes(searchTerm)
        );

        this.renderFilteredItems(filteredItems);
      });

      // Focus search input when dropdown opens
      setTimeout(() => {
        searchInput.focus();
      }, 100);

      dropdown.appendChild(MontaraExtension.state.itemsList);

      container.appendChild(dropdown);
    },
    handleClick(event) {
      if (
        MontaraExtension.state.isDropdownVisible &&
        MontaraExtension.state.dropdownContainer &&
        !MontaraExtension.state.dropdownContainer.contains(event.target)
      ) {
        this.hideDropdown();
      }
    },
    createDropdownContainer() {
      const container = document.createElement("div");
      container.id = "montara-dropdown-container";
      document.body.appendChild(container);
      return container;
    },
    subscribeToDropdownEvents() {
      document.addEventListener("click", this.handleClick.bind(this));
      document.addEventListener("keydown", (event: KeyboardEvent) => {
        if (
          event.key === "Escape" &&
          MontaraExtension.state.isDropdownVisible
        ) {
          MontaraExtension.methods.hideDropdown();
        }
        if (checkForTrigger(event.target as HTMLElement)) {
          const position = getCursorPosition(event.target as HTMLElement);
          MontaraExtension.methods.showDropdown(position.x, position.y);
        }
      });
    },
    insertTextAtCursor(text: string) {
      const codeMirrorLine = document.querySelector(".cm-activeLine.cm-line");
      if (codeMirrorLine) {
        // Replace MontaraData.constants.trigger with text
        const originalText = codeMirrorLine.textContent || "";
        const newText = originalText.replace(
          MontaraExtension.constants.trigger,
          text
        );
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
    },
    hideDropdown() {
      if (MontaraExtension.state.dropdownContainer) {
        MontaraExtension.state.dropdownContainer.innerHTML = "";
      }
      MontaraExtension.state.isDropdownVisible = false;
    },
    async initializeToken() {
      try {
        const result = await chrome.storage.local.get(["montaraToken"]);
        if (result.montaraToken && result.montaraToken.token) {
          MontaraExtension.montaraToken = result.montaraToken.token;
          this.showNotification({
            text: "Token loaded from storage: " + result.montaraToken.token,
            duration: 3000,
          });
        } else {
          this.showNotification({
            text: "No token found in storage",
            duration: 3000,
          });
        }
      } catch (error) {
        console.error("Error loading token:", error);
      }
    },
    async initializeExtension() {
      console.log("Montara Chrome Extension loaded");

      // Initialize token from storage
      await this.initializeToken();

      this.renderMontaraIframe();
      this.subscribeToDropdownEvents();
    },
  },
};

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

  return lastTwoChars === MontaraExtension.constants.trigger;
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
  document.addEventListener(
    "DOMContentLoaded",
    MontaraExtension.methods.initializeExtension
  );
} else {
  MontaraExtension.methods.initializeExtension();
}
