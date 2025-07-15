# Montara Chrome Extension

A Chrome extension skeleton with content scripts only.

## Features

- Content scripts that run on all web pages
- Settings popup for API token configuration
- Token storage using Chrome's local storage
- Simple notification system
- Message handling for communication with other extension parts
- Responsive design

## Installation

1. Open Chrome and navigate to `chrome://extensions/`
2. Enable "Developer mode" in the top right corner
3. Click "Load unpacked" and select this directory
4. The extension will be installed and active

## Usage

Once installed, the extension will:
- Show a green notification on every webpage for 3 seconds
- Log "Montara Chrome Extension loaded" to the console
- Be ready to handle messages from other extension parts

### Configuring API Token

1. Click on the Montara extension icon in your browser toolbar
2. Enter your Montara API token in the settings popup
3. Click "Save Token" to store it securely
4. The token will be automatically used by the extension for API calls

## File Structure

```
montara-chrome-extension/
├── manifest.json      # Extension configuration
├── content.js         # Main content script
├── content.css        # Styles for extension elements
├── popup.html         # Settings popup interface
├── popup.js           # Settings popup functionality
├── icons/             # Extension icons (placeholder)
└── README.md          # This file
```

## Development

### Adding Icons

Place your extension icons in the `icons/` directory:
- `icon16.png` (16x16 pixels)
- `icon48.png` (48x48 pixels)
- `icon128.png` (128x128 pixels)

### Modifying Content Script

Edit `content.js` to add your custom functionality. The script runs on every webpage and can:
- Modify page content
- Add event listeners
- Communicate with other extension parts
- Inject custom styles

### Styling

Edit `content.css` to customize the appearance of extension elements. The file includes:
- Base styles for extension elements
- Animation for notifications
- Utility classes
- Responsive design

## Permissions

The extension currently requests:
- `activeTab`: Access to the currently active tab
- `storage`: Access to Chrome's local storage for token persistence

Add more permissions to `manifest.json` as needed for your specific functionality.

## Testing

1. Load the extension in Chrome
2. Navigate to any website
3. You should see a green notification appear in the top-right corner
4. Check the browser console for extension logs 