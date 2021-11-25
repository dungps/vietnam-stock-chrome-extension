chrome.runtime.onMessage.addListener(() => {
    chrome.storage.sync.get("pin", async (result) => {
        if (result.pin) {
            const resp = await fetch(`https://e.cafef.vn/info.ashx?type=cp&symbol=${result.pin}`)
            const body = await resp.json()
            chrome.browserAction.setBadgeText({
                text: body.Price
            })
            chrome.browserAction.setBadgeBackgroundColor({
                color: body.UpDown === 1 ? "red" : "green",
            })
        }
    })
})