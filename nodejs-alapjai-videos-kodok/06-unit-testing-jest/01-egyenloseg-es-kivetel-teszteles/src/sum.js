const sum = (a,b) => {
    if (Number.isFinite(a) && Number.isFinite(b)) {
        return a + b;
    }
    throw new Error('One or more parameters are not a number.');
}

module.exports = sum;
