# Picrovllo: Advanced Image Link Collector

Picrovllo is a powerful Chrome extension designed to simplify the process of collecting and downloading image links from web pages. This tool is ideal for researchers, designers, and anyone who needs to quickly gather visual resources from the internet.

## Key Features:

1. **Automatic Image Detection**: Picrovllo automatically scans web pages for images as you browse, identifying all image elements regardless of their size or format.

2. **Visual Feedback**: The extension provides immediate visual feedback by placing a small green checkmark overlay on each detected image, allowing users to easily see which images have been processed.

3. **Real-time Link Collection**: As images are detected, their URLs are instantly added to a collection, eliminating the need for manual link copying.

4. **Dynamic Updating**: The extension continues to scan for new images as you scroll through a page, ensuring that even dynamically loaded content is captured.

5. **One-Click Download**: With a single click, users can download a text file containing all collected image links, making it easy to save and share the results.

6. **Live Counter**: A badge on the extension icon displays the current count of collected image links, providing at-a-glance information about the number of images found.

7. **Automatic Clearing**: The link collection is automatically cleared when navigating to a new page or refreshing the current one, ensuring that each browsing session starts fresh.

## Technical Implementation:

- **Content Script (content.js)**: Handles the core functionality of detecting images, adding visual overlays, and maintaining the collection of image links. It uses DOM manipulation to interact with the page content and MutationObserver to detect dynamically added images.

- **Popup Interface (popup.html and popup.js)**: Provides a simple user interface for downloading the collected links and displaying the current image count.

- **Background Script (background.js)**: Manages the extension's badge text update and handles communication between different parts of the extension.

- **Manifest (manifest.json)**: Defines the extension's permissions, script declarations, and metadata.

The extension is built using vanilla JavaScript and utilizes Chrome's extension APIs, including:

- `chrome.tabs` for interacting with browser tabs
- `chrome.runtime` for message passing between different scripts
- `chrome.downloads` for initiating file downloads

Picrovllo is designed with efficiency and user experience in mind, operating seamlessly in the background without interfering with normal browsing activities. Its modular structure allows for easy maintenance and future enhancements.

This tool streamlines the often tedious process of collecting image resources from the web, making it an invaluable asset for professionals and enthusiasts alike who work extensively with online visual content.

## Installation Guide

To add Picrovllo to your Google Chrome browser, follow these steps:

1. **Download the Extension Files**: 
   - Clone the repository or download the ZIP file containing all the extension files.
   - If you downloaded a ZIP file, extract its contents to a folder on your computer.

2. **Open Chrome Extensions Page**: 
   - Open Google Chrome and navigate to `chrome://extensions/`
   - Alternatively, you can access this page by clicking on the three dots menu in the top right corner of Chrome, then selecting "More tools" > "Extensions".

3. **Enable Developer Mode**: 
   - In the top right corner of the Extensions page, toggle on "Developer mode".

4. **Load the Extension**: 
   - Click on the "Load unpacked" button that appears after enabling Developer mode.
   - Navigate to the folder containing the Picrovllo extension files and select it.

5. **Verify Installation**: 
   - Picrovllo should now appear in your list of extensions.
   - You should see the Picrovllo icon in your Chrome toolbar.

6. **Pin the Extension (Optional)**: 
   - Click on the puzzle piece icon in the Chrome toolbar to see a list of your extensions.
   - Find Picrovllo in this list and click the pin icon next to it to keep it visible in your toolbar for easy access.

7. **Start Using Picrovllo**: 
   - Navigate to any webpage and Picrovllo will automatically start detecting images.
   - Click on the Picrovllo icon in your toolbar to see the number of images detected and to download the list of image links.

Remember to keep your extension up to date by periodically checking for updates in the repository and repeating the installation process with the latest files.
