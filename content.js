function addButtonToMediaWrappers() {
  const mediaWrappers = document.querySelectorAll('.MediaRendererV2-wrapper:not(.button-injected)');
  console.log("Found media wrappers:", mediaWrappers.length);
  mediaWrappers.forEach(wrapper => {
    const button = document.createElement('button');
    button.innerText = '📩';
    button.style.marginLeft = '10px'; // Add some margin for better spacing
    
    button.addEventListener('click', () => {
        const videoElement = wrapper.querySelector('video');
        if (videoElement) {
          const videoSrc = videoElement.src;
          console.log("Original video src:", videoSrc);
          const regex = /^(https:\/\/cdn\.gilcdn\.com\/ContentMediaGenericFiles\/[a-zA-Z0-9]+-Full\.mp4)/;
          const match = videoSrc.match(regex);
          if (match) {
            const cleanedSrc = `${match[1]}?`;
            console.log("Cleaned video src:", cleanedSrc);
            copyToClipboard(cleanedSrc);
            alert(`Video link copied to clipboard!`);
          } else {
            console.log("No matching video src found.");
            alert("No matching video src found.");
          }
        } else {
          console.log("No video element found in the parent element");
          alert("No video element found in the parent element");
        }
      });

    wrapper.appendChild(button);
    wrapper.classList.add('button-injected'); // Mark this wrapper as processed
    console.log("Button added to:", wrapper);
  });
}

function copyToClipboard(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
  }

  console.log("Content script loaded");
  // Scan every 1 seconds
  setInterval(addButtonToMediaWrappers, 1000);
