const uploadArea = document.getElementById('uploadArea');
const previewImage = document.getElementById('previewImage');
const applyButton = document.getElementById('applyTheme');

// Handle image upload and preview
uploadArea.addEventListener('click', () => {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'image/*';
  input.click();
  
  input.onchange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    
    reader.onload = (e) => {
      previewImage.src = e.target.result;
      previewImage.style.display = 'block';
      applyButton.style.display = 'inline-block';
    };
    
    reader.readAsDataURL(file);
  };
});

// Apply the theme and save it in local storage
applyButton.addEventListener('click', () => {
  const themeImage = previewImage.src;
  chrome.storage.local.set({ themeImage }, () => {
    // Apply the theme to the active tab
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        function: applyThemeToPage,
      });
    });
  });
});

// Function to apply the theme on the page
function applyThemeToPage() {
  chrome.storage.local.get('themeImage', (data) => {
    if (data.themeImage) {
      document.body.style.backgroundImage = `url('${data.themeImage}')`;
      document.body.style.backgroundSize = 'cover';
      document.body.style.backgroundRepeat = 'no-repeat';
    }
  });
}
