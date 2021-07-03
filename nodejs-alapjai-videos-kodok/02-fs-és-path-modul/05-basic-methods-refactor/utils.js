const fileHandlerCallback = (err) => {
    if (err) throw err;
    console.log('file method successful');
}

const fileHandlerWrapper = ( { method, path, data, callback = fileHandlerCallback } = {}) => {
    method(path, data, callback);
}

module.exports = Object.freeze(
    {
        fileHandlerWrapper
    }
)