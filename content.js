let imageLinks = new Set();

function getLargestImageUrl(srcset) {
  const sources = srcset.split(',').map(s => {
    const [url, size] = s.trim().split(' ');
    return { url, size: size ? parseInt(size) : 1 };
  });
  return sources.reduce((largest, current) => 
    current.size > largest.size ? current : largest
  ).url;
}

function processImage(imgElement) {
  const srcset = imgElement.srcset;
  if (srcset) {
    const largestImageUrl = getLargestImageUrl(srcset);
    if (!imageLinks.has(largestImageUrl)) {
      imageLinks.add(largestImageUrl);
      updateImageCount();
    }
  }
}

function updateImageCount() {
  chrome.runtime.sendMessage({action: 'updateImageCount', count: imageLinks.size}, response => {
    if (chrome.runtime.lastError) {
      console.error('Error updating image count:', chrome.runtime.lastError);
    }
  });
}

function scanImages() {
  const images = document.querySelectorAll('.XiG.zI7.iyn.Hsu img.hCL.kVc.L4E.MIw');
  images.forEach(img => {
    if (!img.dataset.processed) {
      processImage(img);
      img.dataset.processed = 'true';
    }
  });
}

// Initial scan
scanImages();

// Use Intersection Observer for efficient scanning
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target.querySelector('img.hCL.kVc.L4E.MIw');
      if (img && !img.dataset.processed) {
        processImage(img);
        img.dataset.processed = 'true';
      }
    }
  });
}, {rootMargin: '200px'});

function observePins() {
  const pinWrappers = document.querySelectorAll('.XiG.sLG.zI7.iyn.Hsu');
  pinWrappers.forEach(wrapper => {
    if (!wrapper.dataset.observed) {
      observer.observe(wrapper);
      wrapper.dataset.observed = 'true';
    }
  });
}

// Initial observation
observePins();

// Periodically scan for new pins and observe them
setInterval(() => {
  observePins();
  scanImages();
}, 2000);

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
