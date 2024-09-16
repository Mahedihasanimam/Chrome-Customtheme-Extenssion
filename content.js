chrome.storage.local.get('themeImage', (data) => {
    if (data.themeImage) {
      document.body.style.backgroundImage = `url('${data.themeImage}')`;
      document.body.style.backgroundSize = 'cover';
      document.body.style.backgroundRepeat = 'no-repeat';
    }
  });
  