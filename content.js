let imageLinks = new Set();

function processImage(img) {
  if (!imageLinks.has(img.src)) {
    imageLinks.add(img.src);
    updateImageCount();
    addCheckmarkOverlay(img);
  }
}

function addCheckmarkOverlay(img) {
  const overlay = document.createElement('div');
  overlay.style.position = 'absolute';
  overlay.style.top = '5px';
  overlay.style.right = '5px';
  overlay.style.width = '20px';
  overlay.style.height = '20px';
  overlay.style.borderRadius = '50%';
  overlay.style.backgroundColor = 'rgba(0, 255, 0, 0.7)';
  overlay.style.display = 'flex';
  overlay.style.justifyContent = 'center';
  overlay.style.alignItems = 'center';
  overlay.innerHTML = '✓';
  overlay.style.color = 'white';
  overlay.style.fontSize = '14px';
  overlay.style.fontWeight = 'bold';

  const container = document.createElement('div');
  container.style.position = 'relative';
  container.style.display = 'inline-block';
  img.parentNode.insertBefore(container, img);
  container.appendChild(img);
  container.appendChild(overlay);
}

function updateImageCount() {
  chrome.runtime.sendMessage({action: 'updateImageCount', count: imageLinks.size});
}

function scanImages() {
  const images = document.getElementsByTagName('img');
  for (let img of images) {
    processImage(img);
  }
}

// Initial scan
scanImages();

// Scan on scroll
window.addEventListener('scroll', scanImages);

// Listen for messages from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'getImageLinks') {
    sendResponse({links: Array.from(imageLinks)});
  } else if (request.action === 'clearLinks') {
    imageLinks.clear();
    updateImageCount();
    scanImages();
  }
});

// Clear links on page refresh or URL change
window.addEventListener('beforeunload', () => {
  imageLinks.clear();
  updateImageCount();
});