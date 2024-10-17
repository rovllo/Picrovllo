# Pinterest Image Extractor

## Overview

Pinterest Image Extractor is a Chrome extension designed to enhance your Pinterest browsing experience by automatically extracting high-quality image links from Pinterest pages. This extension allows users to easily collect and copy links to the highest resolution images available for each pin they encounter while scrolling through Pinterest.

## Features

- Automatically detects and extracts high-quality image links from Pinterest pins
- Displays a counter of found images on the extension icon
- Allows users to copy all collected image links to the clipboard with a single click
- Works seamlessly in the background as you browse Pinterest

## Installation

1. Clone this repository or download the source code.
2. Open Google Chrome and navigate to `chrome://extensions/`.
3. Enable "Developer mode" in the top right corner.
4. Click "Load unpacked" and select the directory containing the extension files.
5. The Pinterest Image Extractor icon should now appear in your Chrome toolbar.

## Usage

1. Navigate to Pinterest (https://www.pinterest.com/).
2. As you browse and scroll, the extension will automatically detect and extract high-quality image links.
3. The number on the extension icon will update to show how many image links have been collected.
4. Click on the extension icon to open the popup.
5. In the popup, click the "Copy Image Links" button to copy all collected links to your clipboard.
6. Paste the links wherever you need them (e.g., a text document or spreadsheet).

## Key Files and Their Functions

### `manifest.json`

This file contains the extension's metadata and configuration. It specifies:

- The extension's name, version, and description
- Permissions required by the extension
- Scripts to be injected into web pages
- The extension's icon and popup HTML file

### `content.js`

This is the main script that runs in the context of the Pinterest web page. Its key functions include:

- `getLargestImageUrl(srcset)`: Parses the srcset attribute of an image to find the URL of the highest resolution version.
- `processImage(imgElement)`: Extracts the largest image URL from a Pinterest pin and adds it to the collection.
- `updateImageCount()`: Sends a message to the background script to update the counter on the extension icon.
- `scanImages()`: Scans the page for new Pinterest pins and processes their images.
- `observePins()`: Sets up an Intersection Observer to efficiently detect when new pins come into view.

The script also uses a `setInterval` to periodically scan for new pins, ensuring that it catches dynamically loaded content as the user scrolls.

### `popup.html` and `popup.js`

These files define the extension's popup interface and its functionality.

`popup.js` contains the logic for:
- Copying collected image links to the clipboard when the user clicks the "Copy Image Links" button.
- Updating the displayed image count in the popup.

### `background.js`

This script runs in the background and is responsible for:
- Updating the badge text on the extension icon to show the current count of collected images.
- Handling image download requests (if implemented).

## How It Works

1. When a Pinterest page is loaded, `content.js` is injected into the page.
2. The script starts scanning for Pinterest pins and extracting high-quality image URLs.
3. As new pins are loaded (e.g., when scrolling), the Intersection Observer detects them, and their images are processed.
4. Each time a new image URL is added to the collection, the count is updated on the extension icon.
5. When the user opens the popup and clicks "Copy Image Links", all collected URLs are copied to the clipboard.

## Contributing

Contributions to improve Pinterest Image Extractor are welcome. Please feel free to submit pull requests or create issues for bugs and feature requests.

## License

[MIT License](LICENSE)

## Disclaimer

This extension is not affiliated with, endorsed by, or sponsored by Pinterest. It is an independent tool created for educational purposes and personal use. Always respect Pinterest's terms of service and use this extension responsibly.
