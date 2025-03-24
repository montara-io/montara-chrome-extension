function initializePopup() {
  const actionButton = document.getElementById("actionButton");
  const statusElement = document.getElementById("status");

  actionButton.addEventListener("click", async () => {
    try {
      statusElement.textContent = "Processing...";

      // Get the active tab
      const [tab] = await chrome.tabs.query({
        active: true,
        currentWindow: true,
      });

      // Send message to content script
      const response = await chrome.tabs.sendMessage(tab.id, {
        action: "performAction",
      });

      statusElement.textContent = response?.success
        ? "Action completed!"
        : "Action failed";
    } catch (error) {
      statusElement.textContent = "Error: " + error.message;
    }
  });
}

// Initialize when the popup is loaded
document.addEventListener("DOMContentLoaded", initializePopup);
