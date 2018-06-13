const Composer = require('./index');


Composer((err, server) => {

    if (err) {
        throw err;
    }

    server.start(() => {

        console.log('Started the Web Server on port ' + server.info.port); // eslint-disable-line no-console
    });
});
