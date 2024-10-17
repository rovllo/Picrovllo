chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete') {
    chrome.tabs.get(tabId, (tab) => {
      if (chrome.runtime.lastError) {
        console.log(chrome.runtime.lastError.message);
        return;
      }
      if (tab && tab.url && tab.url.startsWith('https://www.pinterest.com')) {
        chrome.tabs.sendMessage(tabId, { action: 'clearLinks' }, (response) => {
          if (chrome.runtime.lastError) {
            console.log('Failed to send message: ', chrome.runtime.lastError.message);
          }
        });
      }
    });
  }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'downloadImage') {
    chrome.downloads.download({
      url: request.url,
      filename: 'pinterest_image.jpg'
    }, (downloadId) => {
      if (chrome.runtime.lastError) {
        console.error('Download failed:', chrome.runtime.lastError);
      }
    });
  } else if (request.action === 'updateImageCount') {
    chrome.action.setBadgeText({ text: request.count.toString() });
    chrome.action.setBadgeBackgroundColor({ color: '#FF0000' });
  }
});
