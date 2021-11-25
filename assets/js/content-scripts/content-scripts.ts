console.log(chrome)

setInterval(() => {
    chrome.runtime.sendMessage("update-badge")
}, 1000)