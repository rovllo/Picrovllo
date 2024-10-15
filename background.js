chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete') {
      chrome.tabs.get(tabId, (tab) => {
        if (chrome.runtime.lastError) {
          console.log(chrome.runtime.lastError.message);
          return;
        }
        if (tab.url.startsWith('http') || tab.url.startsWith('https')) {
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
    if (request.action === 'updateImageCount') {
      chrome.action.setBadgeText({ text: request.count.toString() });
    }
  });