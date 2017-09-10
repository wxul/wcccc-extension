chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    // console.log(message);
    chrome.storage.local.get(null, function (result) {
        // console.log(result);
        if (!result.deletedMsg) result.deletedMsg = [];
        result.deletedMsg.push(message);
        chrome.storage.local.set(result, function () {
            sendResponse('success!');
        });
    });
});