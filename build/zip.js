const fs = require('fs');
const path = require('path');
const archiver = require('archiver');

const out = path.resolve(__dirname, '../out');
fs.mkdir(out, err => {
    var output = fs.createWriteStream(path.resolve(__dirname, '../out/wcccc-extension.zip'));
    var archive = archiver('zip', {
        zlib: {
            level: 9
        } // Sets the compression level.
    });
    output.on('close', function () {
        console.log(archive.pointer() + ' total bytes');
        console.log('archiver has been finalized and the output file descriptor has closed.');
    });
    archive.on('warning', function (err) {
        if (err.code === 'ENOENT') {
            // log warning
        } else {
            // throw error
            throw err;
        }
    });
    archive.on('error', function (err) {
        throw err;
    });
    archive.pipe(output);
    archive.directory(path.resolve(__dirname, '../dist'), false);
    archive.finalize();
});