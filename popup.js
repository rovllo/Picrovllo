document.addEventListener('DOMContentLoaded', () => {
  const copyButton = document.getElementById('copyLinks');
  const imageCountSpan = document.getElementById('imageCount');

  // Copy image links to clipboard
  copyButton.addEventListener('click', () => {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, {action: 'getImageLinks'}, (response) => {
        if (response && response.links) {
          const text = response.links.join('\n');
          navigator.clipboard.writeText(text).then(() => {
            alert('Image links copied to clipboard!');
          }).catch(err => {
            console.error('Failed to copy: ', err);
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
