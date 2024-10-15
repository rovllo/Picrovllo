document.addEventListener('DOMContentLoaded', () => {
    const downloadButton = document.getElementById('downloadLinks');
    const imageCountSpan = document.getElementById('imageCount');
  
    // Download image links
    downloadButton.addEventListener('click', () => {
      chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, {action: 'getImageLinks'}, (response) => {
          if (response && response.links) {
            const blob = new Blob([response.links.join('\n')], {type: 'text/plain'});
            const url = URL.createObjectURL(blob);
            chrome.downloads.download({
              url: url,
              filename: 'image_links.txt'
            });
          }
        });
      });
    });
  
    // Update image count
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      if (request.action === 'updateImageCount') {
        imageCountSpan.textContent = request.count;
      }
    });
  });