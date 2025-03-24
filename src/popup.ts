function initializePopup(): void {
  const actionButton = document.getElementById(
    "actionButton"
  ) as HTMLButtonElement;
  const statusElement = document.getElementById("status") as HTMLDivElement;

  // Check if we're on snowflake.com
  chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
    if (!tab.url) return;

    const url = new URL(tab.url);
    const isSnowflake = url.hostname.includes("snowflake.com");

    if (!isSnowflake) {
      statusElement.textContent = "This extension only works on snowflake.com";
      actionButton.disabled = true;
      return;
    }

    actionButton.addEventListener("click", async () => {
      try {
        statusElement.textContent = "Processing...";

        if (!tab.id) throw new Error("No tab ID found");

        // Send message to content script
        const response = (await chrome.tabs.sendMessage(tab.id, {
          action: "performAction",
        } as Message)) as ActionResponse;

        statusElement.textContent = response?.success
          ? "Action completed!"
          : "Action failed";
      } catch (error) {
        statusElement.textContent = `Error: ${
          error instanceof Error ? error.message : "Unknown error"
        }`;
      }
    });
  });
}

// Initialize when the popup is loaded
document.addEventListener("DOMContentLoaded", initializePopup);
