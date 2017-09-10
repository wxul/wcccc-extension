var chat = document.getElementById('chatArea');
var chatArea = document.querySelector('#chatArea>div.chat_bd>div.chat_bd>div.ng-scope');

chatArea.addEventListener('DOMNodeRemoved', e => {
    var n = e.target;

    if (n && n.className && n.className.indexOf('message') >= 0) {
        try {
            var msg = {};
            msg.avatar = n.querySelector('img.avatar').src;
            msg.fromuser = n.querySelector('img.avatar').title;
            var msgbody = n.querySelector('div.bubble_cont');
            console.log(msgbody);
            var ngif = msgbody.getAttribute('ng-if');

            if (ngif.indexOf('MSGTYPE_TEXT') >= 0) {
                msg.type = 'text';
                msg.text = msgbody.querySelector('.js_message_plain').innerHTML;
            } else if (ngif.indexOf('MSGTYPE_IMAGE')) {
                msg.type = 'image';
                msg.image = msgbody.querySelector('img.msg-img').src;
            } else {
                return;
            }
            msg.time = +new Date();
            console.log(msg);
            chrome.runtime.sendMessage(msg, function (response) {
                // console.log(response);
            });
        } catch (e) {
            console.error('parse error:', e);
        }
    }
});