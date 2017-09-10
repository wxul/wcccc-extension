const keypair = require('keypair');
const fs = require('fs');
const path = require('path');

const pair = keypair();
// console.log(pair);

const out = path.resolve(__dirname, '../out');
const public = path.resolve(__dirname, '../out/public.pem');
const private = path.resolve(__dirname, '../out/private.pem');

fs.mkdir(out, err => {
    // if (err) console.log(err);
    try {
        fs.writeFileSync(public, pair.public);
        fs.writeFileSync(private, pair.private);
        console.log('success!');
    } catch (e) {
        console.error(e);
        throw e;
    }
});