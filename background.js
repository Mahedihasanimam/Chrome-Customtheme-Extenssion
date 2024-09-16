chrome.runtime.onInstalled.addListener(() => {
    console.log('Custom Chrome Theme extension installed.');
  });
  
  chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete') {
      chrome.scripting.executeScript({
        target: { tabId: tabId },
        function: applyThemeToPage,
      });
    }
  });
  
  function applyThemeToPage() {
    chrome.storage.local.get('themeImage', (data) => {
      if (data.themeImage) {
        document.body.style.backgroundImage = `url('${data.themeImage}')`;
        document.body.style.backgroundSize = 'cover';
        document.body.style.backgroundRepeat = 'no-repeat';
      }
    });
  }
  