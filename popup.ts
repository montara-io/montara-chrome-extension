interface TokenData {
  token: string;
  timestamp: number;
}

function getStoredToken(): Promise<string | null> {
  return new Promise((resolve) => {
    chrome.storage.local.get(["montaraToken"], (result) => {
      if (chrome.runtime.lastError) {
        console.error("Error retrieving token:", chrome.runtime.lastError);
        resolve(null);
        return;
      }

      const tokenData = result.montaraToken as TokenData | undefined;
      if (tokenData && tokenData.token) {
        resolve(tokenData.token);
      } else {
        resolve(null);
      }
    });
  });
}

function setStoredToken(token: string): Promise<boolean> {
  return new Promise((resolve) => {
    const tokenData: TokenData = {
      token: token,
      timestamp: Date.now(),
    };

    chrome.storage.local.set({montaraToken: tokenData}, () => {
      if (chrome.runtime.lastError) {
        console.error("Error saving token:", chrome.runtime.lastError);
        resolve(false);
      } else {
        resolve(true);
      }
    });
  });
}

function clearStoredToken(): Promise<boolean> {
  return new Promise((resolve) => {
    chrome.storage.local.remove(["montaraToken"], () => {
      if (chrome.runtime.lastError) {
        console.error("Error clearing token:", chrome.runtime.lastError);
        resolve(false);
      } else {
        resolve(true);
      }
    });
  });
}

function isTokenValid(token: string): boolean {
  return Boolean(token && token.trim().length > 0);
}

function showStatus(message: string, isSuccess: boolean = true): void {
  const statusElement = document.getElementById("status") as HTMLDivElement;
  if (statusElement) {
    statusElement.textContent = message;
    statusElement.className = `status ${isSuccess ? "success" : "error"}`;
    statusElement.style.display = "block";

    // Hide status after 3 seconds
    setTimeout(() => {
      statusElement.style.display = "none";
    }, 3000);
  }
}

function saveToken(): void {
  const tokenInput = document.getElementById("token") as HTMLInputElement;
  const saveButton = document.getElementById("saveBtn") as HTMLButtonElement;

  if (!tokenInput || !saveButton) {
    console.error("Required elements not found");
    return;
  }

  const token = tokenInput.value.trim();

  if (!isTokenValid(token)) {
    showStatus("Please enter a valid token", false);
    return;
  }

  // Disable button during save
  saveButton.disabled = true;
  saveButton.textContent = "Saving...";

  setStoredToken(token).then((success) => {
    if (success) {
      showStatus("Token saved successfully!");
      tokenInput.value = token;
    } else {
      showStatus("Failed to save token. Please try again.", false);
    }

    // Re-enable button
    saveButton.disabled = false;
    saveButton.textContent = "Save Token";
  });
}

function loadToken(): void {
  const tokenInput = document.getElementById("token") as HTMLInputElement;

  if (!tokenInput) {
    console.error("Token input element not found");
    return;
  }

  getStoredToken().then((token) => {
    if (token) {
      tokenInput.value = token;
    }
  });
}

function initializePopup(): void {
  // Load existing token when popup opens
  loadToken();

  // Add event listeners
  const saveButton = document.getElementById("saveBtn");
  if (saveButton) {
    saveButton.addEventListener("click", saveToken);
  }

  const tokenInput = document.getElementById("token") as HTMLInputElement;
  if (tokenInput) {
    // Allow saving with Enter key
    tokenInput.addEventListener("keypress", (event) => {
      if (event.key === "Enter") {
        saveToken();
      }
    });

    // Focus on input when popup opens
    tokenInput.focus();
  }
}

// Initialize popup when DOM is loaded
document.addEventListener("DOMContentLoaded", initializePopup);
