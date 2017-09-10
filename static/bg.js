chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    // console.log(message);
    chrome.storage.sync.get(null, function (result) {
        // console.log(result);
        if (!result.deletedMsg) result.deletedMsg = [];
        result.deletedMsg.push(message);
        chrome.storage.sync.set(result, function () {
            sendResponse('success!');
        });
    });
});