<template>
    <div class="message">
        <div class="btns">
            <a href="javascript:;" class="clear" @click="clear">清空</a>
        </div>
        <div class="msg-item" v-for="(msg,i) in messages" :key="i">
            <img :src="msg.avatar" class="avatar">
            <span class="username">{{msg.fromuser}}</span>
            <time class="time">于 {{msg.time|time}}</time>
            <span class="username">撤回消息: </span>
            <span class="text" v-if="msg.type=='text'">{{msg.text}}</span>
            <a :href="msg.image|img" target="_blank" v-if="msg.type=='image'"><img :src="msg.image" class="image"></a>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            messages: []
        };
    },
    filters: {
        time(v) {
            return (new Date(v)).toLocaleString();
        },
        img(v) {
            return v ? v.replace('&type=slave', '') : '';
        }
    },
    mounted() {
        this.watch();
        this.getList().then(d => {
            this.messages = d;
        });
    },
    computed: {
        msgs() {
            return this.messages.reverse();
        }
    },
    methods: {
        clear() {
            chrome.storage.sync.clear(function() {
                //do something
            });
        },
        watch(cb) {
            chrome.storage.onChanged.addListener((changes, areaName) => {
                console.log('Value in ' + areaName + ' has been changed:');
                console.log(changes);
                this.messages = changes.deletedMsg.newValue;
                typeof cb == 'function' && cb(changes);
            });
        },
        getList() {
            return new Promise((resolve, reject) => {
                chrome.storage.sync.get(null, (result) => {
                    resolve(result.deletedMsg);
                });
            });
        }
    }
};
</script>
<style lang="less" scoped>
.message {
    padding: 20px;
    .btns {
        margin-bottom: 10px;
    }
    .msg-item {
        font-size: 0;
        margin-bottom: 20px;
        line-height: 40px;
        vertical-align: middle;
        &>* {
            vertical-align: middle;
        }
        .avatar {
            display: inline-block;
            width: 40px;
            height: 40px;
        }
        .username {
            margin: 0 10px;
            font-size: 14px;
            color: #333;
        }
        .time {
            font-size: 12px;
            color: #555;
        }
        .text {
            font-size: 16px;
        }
        a>img {
            vertical-align: bottom;
        }
    }
}
</style>
