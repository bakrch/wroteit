const Confidence = require('confidence');
const Dotenv = require('dotenv');


Dotenv.config();

const criteria = {
    env: process.env.NODE_ENV
};

const cookieSecret = '\'F3FX~vjvC;H^gn!UU@~y8dO-Lp9~j|o';


const config = {
    $meta: 'All configs should be listed here.',
    projectName: 'Wroteit',
    port: {
        web: {
            $filter: 'env',
            test: 9000,
            production: process.env.PORT,
            $default: 8000
        }
    },
    baseUrl: {
        $filter: 'env',
        $meta: 'values should not end in "/"',
        production: 'http://wroteit.me',
        $default: 'http://127.0.0.1:8000'
    },
    authAttempts: {
        forIp: 500,
        forIpAndUser: 200
    },
    cookieSecret: {
        $filter: 'env',
        production: process.env.COOKIE_SECRET,
        $default: cookieSecret
    },
    hapiMongoModels: {
        mongodb: {
            uri: {
                $filter: 'env',
                production: process.env.MONGODB_URI,
                test: 'mongodb://localhost:27017/wroteit-test',
                $default: 'mongodb://localhost:27017/wroteit'
            }
        },
        autoIndex: true
    },
    nodemailer: {
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASSWORD
        }
    },
    system: {
        fromAddress: {
            name: 'Wroteit',
            address: process.env.SMTP_USER
        },
        toAddress: {
            name: 'Wroteit',
            address: process.env.SMTP_USER
        }
    },
    providers: {
        $filter: 'env',
        production: {
            facebook: {
                provider: 'facebook',
                password: 'hapiauth',
                clientId: '',
                clientSecret: '',
                isSecure: false
            },
            google: {
                provider: 'google',
                password: 'hapiauth',
                clientId: '',
                clientSecret: '',
                isSecure: false
            }
        },
        // staging: {
        //     facebook: {
        //         provider: 'facebook',
        //         password: 'hapiauth',
        //         clientId: '',
        //         clientSecret: '',
        //         isSecure: false
        //     },
        //     google: {
        //         provider: 'google',
        //         password: 'hapiauth',
        //         clientId: '',
        //         clientSecret: '',
        //         isSecure: false
        //     }
        // },
        $default: {
            facebook: {
                provider: 'facebook',
                password: cookieSecret,
                clientId: '242049869888238',
                clientSecret: 'daf01f8d7b8993c843085c17bbead7d0',
                isSecure: false
            },
            google: {
                provider: 'google',
                password: cookieSecret,
                clientId: '420408915051-f00hiqu2djplc1lqi071taofjlfqfklb.apps.googleusercontent.com',
                clientSecret: '50FnTecGR4k0Tz4kpSLVD-bD',
                isSecure: false
            }
        }
    }
};


const store = new Confidence.Store(config);


exports.get = (key) => store.get(key, criteria);


exports.meta = (key) => store.meta(key, criteria);
