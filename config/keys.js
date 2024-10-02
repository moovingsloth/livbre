if(process.env.NODE_ENV === 'production') {
    // We are in production - return the prod set of keys
    module.exports = require('./prod.js');
}
else {
    // We are in development - return the dev keys!!!
    module.exports = require('./dev.js');
}