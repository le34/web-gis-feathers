require('source-map-support/register')
module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 9);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("feathers-authentication");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("sequelize");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("feathers-sequelize");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("winston");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("feathers-hooks-common");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("feathers-authentication-local");

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("feathers-authentication-management");

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(__dirname) {const path = __webpack_require__(4);
const pug = __webpack_require__(31);
const isProd = "development" === 'production';
const returnEmail = 'noreply@le34.dk';
module.exports = function (app) {
  function getLink(type, hash) {
    var port = ':3000';
    var host = 'localhost';
    var protocal = isProd ? 'https' : 'http';
    protocal += '://';
    return `${protocal}${host}${port}/${type}/${hash}`;
  }
  function sendEmail(email) {
    return app.service('email').create(email).then(function (result) {
      console.log('Sent email', result);
    }).catch(err => {
      console.log('Error sending email', err);
    });
  }
  return {
    notifier: function (type, user, notifierOptions) {
      console.log(`-- Preparing email for ${type}`);
      var hashLink;
      var email;
      var emailAccountTemplatesPath = path.join(__dirname, 'email-templates');
      console.log('emailAccountTemplatesPath', emailAccountTemplatesPath);
      var templatePath;
      var compiledHTML;

      switch (type) {
        case 'resendVerifySignup':
          // send another email with link for verifying user's email addr

          hashLink = getLink('verify', user.verifyToken);
          console.log(hashLink);
          templatePath = path.join(emailAccountTemplatesPath, 'verify-email.pug');

          compiledHTML = pug.renderFile(templatePath, {
            logo: '',
            name: user.name || user.email,
            hashLink,
            returnEmail
          });

          email = {
            from: returnEmail,
            to: user.email,
            subject: 'Confirm Signup',
            html: compiledHTML
          };

          return sendEmail(email);
        case 'sendResetPwd':
          // inform that user's email is now confirmed

          hashLink = getLink('reset', user.resetToken);

          templatePath = path.join(emailAccountTemplatesPath, 'reset-password.pug');

          compiledHTML = pug.renderFile(templatePath, {
            logo: '',
            name: user.name || user.email,
            hashLink,
            returnEmail
          });

          email = {
            from: returnEmail,
            to: user.email,
            subject: 'Reset Password',
            html: compiledHTML
          };

          return sendEmail(email);
        case 'resetPwd':
          // inform that user's email is now confirmed

          hashLink = getLink('reset', user.resetToken);

          templatePath = path.join(emailAccountTemplatesPath, 'password-was-reset.pug');

          compiledHTML = pug.renderFile(templatePath, {
            logo: '',
            name: user.name || user.email,
            hashLink,
            returnEmail
          });

          email = {
            from: returnEmail,
            to: user.email,
            subject: 'Your password was reset',
            html: compiledHTML
          };

          return sendEmail(email);
      }
    }
  };
};
/* WEBPACK VAR INJECTION */}.call(exports, "src"))

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(10);


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

/* eslint-disable no-console */
const logger = __webpack_require__(3);
const app = __webpack_require__(11);
const port = app.get('port');
const server = app.listen(port);

process.on('unhandledRejection', (reason, p) => logger.error('Unhandled Rejection at: Promise ', p, reason));

server.on('listening', () => logger.info('Feathers application started on http://%s:%d', app.get('host'), port));

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

const path = __webpack_require__(4);
const favicon = __webpack_require__(12);
const compress = __webpack_require__(13);
const cors = __webpack_require__(14);
const helmet = __webpack_require__(15);
const bodyParser = __webpack_require__(16);

const feathers = __webpack_require__(17);
const configuration = __webpack_require__(18);
const hooks = __webpack_require__(19);
const rest = __webpack_require__(20);
const socketio = __webpack_require__(21);

const handler = __webpack_require__(22);
const notFound = __webpack_require__(23);

const middleware = __webpack_require__(24);
const services = __webpack_require__(25);
const appHooks = __webpack_require__(55);

const authentication = __webpack_require__(57);

const sequelize = __webpack_require__(59);

const app = feathers();

// Load app configuration
app.configure(configuration());
// Enable CORS, security, compression, favicon and body parsing
app.use(cors());
app.use(helmet());
app.use(compress());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(favicon(path.join(app.get('public'), 'favicon.ico')));
// Host the public folder
app.use('/', feathers.static(app.get('public')));

// Set up Plugins and providers
app.configure(hooks());
app.configure(sequelize);
app.configure(rest());
app.configure(socketio());

// Configure other middleware (see `middleware/index.js`)
app.configure(middleware);
app.configure(authentication);
// Set up our services (see `services/index.js`)
app.configure(services);

// Configure a middleware for 404s and the error handler
app.use(notFound());
app.use(handler());

app.hooks(appHooks);

module.exports = app;

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = require("serve-favicon");

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = require("compression");

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = require("cors");

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = require("helmet");

/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = require("feathers");

/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = require("feathers-configuration");

/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = require("feathers-hooks");

/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = require("feathers-rest");

/***/ }),
/* 21 */
/***/ (function(module, exports) {

module.exports = require("feathers-socketio");

/***/ }),
/* 22 */
/***/ (function(module, exports) {

module.exports = require("feathers-errors/handler");

/***/ }),
/* 23 */
/***/ (function(module, exports) {

module.exports = require("feathers-errors/not-found");

/***/ }),
/* 24 */
/***/ (function(module, exports) {

module.exports = function () {
  // Add your custom middleware here. Remember, that
  // in Express the order matters
  const app = this; // eslint-disable-line no-unused-vars
};

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

const users = __webpack_require__(26);
const roles = __webpack_require__(37);
const email = __webpack_require__(41);
const clients = __webpack_require__(45);
const cvr = __webpack_require__(49);

module.exports = function () {
  const app = this; // eslint-disable-line no-unused-vars
  app.configure(users);
  app.configure(roles);
  app.configure(email);
  app.configure(clients);
  app.configure(cvr);
};

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

// Initializes the `users` service on path `/users`
const createService = __webpack_require__(2);
const createModel = __webpack_require__(27);
const hooks = __webpack_require__(28);
const filters = __webpack_require__(36);

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'users',
    Model,
    paginate

    // Initialize our service with any options it requires
  };app.use('/users', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('users');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = __webpack_require__(1);
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const users = sequelizeClient.define('users', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4
    },
    isEnabled: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'basic'
    },
    isVerified: { type: DataTypes.BOOLEAN },
    verifyToken: { type: DataTypes.STRING },
    verifyShortToken: { type: DataTypes.STRING },
    verifyExpires: { type: DataTypes.DATE }, // or a long integer
    verifyChanges: { type: DataTypes.JSONB }, // an object (key-value map), e.g. { field: "value" }
    resetToken: { type: DataTypes.STRING },
    resetShortToken: { type: DataTypes.STRING },
    resetExpires: { type: DataTypes.DATE // or a long integer
    } }, {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });

  users.associate = function (models) {
    // eslint-disable-line no-unused-vars
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
    models.users.belongsTo(models.clients);
  };

  return users;
};

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

const { authenticate } = __webpack_require__(0).hooks;
const commonHooks = __webpack_require__(5);
const { restrictToOwner } = __webpack_require__(29);
const { hashPassword } = __webpack_require__(6).hooks;
const verifyHooks = __webpack_require__(7).hooks;
const restrict = [authenticate('jwt'), restrictToOwner({
  idField: 'id',
  ownerField: 'id'
})];

const sendVerificationEmail = __webpack_require__(30);

const userClient = __webpack_require__(32);

const userClientAfter = __webpack_require__(33);

const usersRestrict = __webpack_require__(34);

module.exports = {
  before: {
    all: [],
    find: [authenticate('jwt'), userClient()],
    get: [...restrict],
    create: [hashPassword(), verifyHooks.addVerification()],
    update: [commonHooks.disallow('external')],
    patch: [...restrict, commonHooks.iff(commonHooks.isProvider('external'), commonHooks.preventChanges('email', 'isVerified', 'verifyToken', 'verifyShortToken', 'verifyExpires', 'verifyChanges', 'resetToken', 'resetShortToken', 'resetExpires'))],
    remove: [authenticate('jwt'), usersRestrict()]
  },

  after: {
    all: [commonHooks.when(hook => hook.params.provider, commonHooks.discard('password', 'verifyExpires', 'resetExpires', 'verifyChanges'))],
    find: [],
    get: [],
    create: [sendVerificationEmail(), verifyHooks.removeVerification(), userClientAfter()],
    update: [userClientAfter()],
    patch: [userClientAfter()],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};

/***/ }),
/* 29 */
/***/ (function(module, exports) {

module.exports = require("feathers-authentication-hooks");

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const accountService = __webpack_require__(8);
module.exports = function (options = {}) {
  // eslint-disable-line no-unused-vars
  return function sendVerificationEmail(hook) {
    const user = hook.result;
    if (user) {
      accountService(hook.app).notifier('resendVerifySignup', user);
      return Promise.resolve(hook);
    }
    // Hooks can either return nothing or a promise
    // that resolves with the `hook` object for asynchronous operations
    return Promise.resolve(hook);
  };
};

/***/ }),
/* 31 */
/***/ (function(module, exports) {

module.exports = require("pug");

/***/ }),
/* 32 */
/***/ (function(module, exports) {

// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

module.exports = function (options = {}) {
  // eslint-disable-line no-unused-vars
  return function userClient(hook) {
    hook.params.sequelize = {
      include: [{ model: hook.app.services.clients.Model }]
    };
    return Promise.resolve(hook);
  };
};

/***/ }),
/* 33 */
/***/ (function(module, exports) {

// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

module.exports = function (options = {}) {
  // eslint-disable-line no-unused-vars
  return function userClientAfter(hook) {
    return hook.app.service('/users').find({ query: { id: hook.result.id } }).then(result => {
      hook.result = result.data[0];
      return Promise.resolve(hook);
    });
  };
};

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const errors = __webpack_require__(35);
module.exports = function (options = {}) {
  // eslint-disable-line no-unused-vars
  return function usersRestrict(hook) {
    if (!hook.params.user) {
      throw new errors.NotAuthenticated();
    }
    if (hook.params.user.id === hook.id) {
      throw new errors.NotAcceptable('Du må ikke slette dig selv');
    }
    if (hook.params.user.role === 'system') {
      return Promise.resolve(hook);
    }
    return hook.app.service('/users').find({ query: { id: hook.id } }).then(result => {
      if (result.data.length === 1) {
        const user = result.data[0];
        if (hook.params.user.role === 'admin' && hook.params.user.clientId === user.clientId) {
          return Promise.resolve(hook);
        }
        throw new errors.Forbidden('Du har ikke rettigheder til denne handling');
      }
      throw new errors.NotFound();
    });
  };
};

/***/ }),
/* 35 */
/***/ (function(module, exports) {

module.exports = require("feathers-errors");

/***/ }),
/* 36 */
/***/ (function(module, exports) {

/* eslint no-console: 1 */
console.warn('You are using the default filter for the users service. For more information about event filters see https://docs.feathersjs.com/api/events.html#event-filtering'); // eslint-disable-line no-console

module.exports = function (data, connection, hook) {
  // eslint-disable-line no-unused-vars
  return data;
};

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

// Initializes the `roles` service on path `/roles`
const createService = __webpack_require__(2);
const createModel = __webpack_require__(38);
const hooks = __webpack_require__(39);
const filters = __webpack_require__(40);

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'roles',
    Model,
    paginate

    // Initialize our service with any options it requires
  };app.use('/roles', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('roles');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = __webpack_require__(1);
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const roles = sequelizeClient.define('roles', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  }, {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });

  roles.associate = function (models) {// eslint-disable-line no-unused-vars
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
  };

  return roles;
};

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

const { authenticate } = __webpack_require__(0).hooks;

module.exports = {
  before: {
    all: [authenticate('jwt')],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};

/***/ }),
/* 40 */
/***/ (function(module, exports) {

/* eslint no-console: 1 */
console.warn('You are using the default filter for the roles service. For more information about event filters see https://docs.feathersjs.com/api/events.html#event-filtering'); // eslint-disable-line no-console

module.exports = function (data, connection, hook) {
  // eslint-disable-line no-unused-vars
  return data;
};

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

// Initializes the `email` service on path `/email`
const Mailer = __webpack_require__(42);
const hooks = __webpack_require__(43);
const smtpTransport = __webpack_require__(44);

module.exports = function () {
  const app = this;

  // Initialize our service with any options it requires
  app.use('/email', Mailer(smtpTransport({
    host: 'mail.le34.dk',
    port: 26 // 25 DMZ
  })));
  // Get our initialized service so that we can register hooks and filters
  const service = app.service('email');

  service.hooks(hooks);
};

/***/ }),
/* 42 */
/***/ (function(module, exports) {

module.exports = require("feathers-mailer");

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

const { disallow } = __webpack_require__(5);

module.exports = {
  before: {
    all: [disallow('external')],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};

/***/ }),
/* 44 */
/***/ (function(module, exports) {

module.exports = require("nodemailer-smtp-transport");

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

// Initializes the `clients` service on path `/clients`
const createService = __webpack_require__(2);
const createModel = __webpack_require__(46);
const hooks = __webpack_require__(47);
const filters = __webpack_require__(48);

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'clients',
    Model,
    paginate

    // Initialize our service with any options it requires
  };app.use('/clients', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('clients');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = __webpack_require__(1);
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const clients = sequelizeClient.define('clients', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    data: {
      type: DataTypes.JSONB,
      allowNull: false
    }
  }, {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });

  clients.associate = function (models) {// eslint-disable-line no-unused-vars
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
  };

  return clients;
};

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

const { authenticate } = __webpack_require__(0).hooks;

module.exports = {
  before: {
    all: [authenticate('jwt')],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};

/***/ }),
/* 48 */
/***/ (function(module, exports) {

/* eslint no-console: 1 */
console.warn('You are using the default filter for the clients service. For more information about event filters see https://docs.feathersjs.com/api/events.html#event-filtering'); // eslint-disable-line no-console

module.exports = function (data, connection, hook) {
  // eslint-disable-line no-unused-vars
  return data;
};

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

// Initializes the `cvr` service on path `/cvr`
const createService = __webpack_require__(50);
const createModel = __webpack_require__(51);
const hooks = __webpack_require__(53);
const filters = __webpack_require__(54);

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');
  const elasticsearch = {
    index: 'cvr-permanent',
    type: 'virksomhed'
  };
  const options = {
    id: 'id',
    Model,
    elasticsearch,
    paginate

    // Initialize our service with any options it requires
  };app.use('/cvr', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('cvr');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};

/***/ }),
/* 50 */
/***/ (function(module, exports) {

module.exports = require("feathers-elasticsearch");

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const elasticsearch = __webpack_require__(52);

module.exports = function (app) {
  return new elasticsearch.Client({
    host: 'http://LE34_CVR_I_SKYEN:33614fd2-976e-4e1a-af11-acaa0e1ec994@distribution.virk.dk',
    apiVersion: '1.7'
  });
};

/***/ }),
/* 52 */
/***/ (function(module, exports) {

module.exports = require("elasticsearch");

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

const { authenticate } = __webpack_require__(0).hooks;

module.exports = {
  before: {
    all: [authenticate('jwt')],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};

/***/ }),
/* 54 */
/***/ (function(module, exports) {

/* eslint no-console: 1 */
console.warn('You are using the default filter for the cvr service. For more information about event filters see https://docs.feathersjs.com/api/events.html#event-filtering'); // eslint-disable-line no-console

module.exports = function (data, connection, hook) {
  // eslint-disable-line no-unused-vars
  return data;
};

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

// Application hooks that run for every service
const logger = __webpack_require__(56);

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [logger()],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [logger()],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

// A hook that logs service method before, after and error
const logger = __webpack_require__(3);

module.exports = function () {
  return function (hook) {
    let message = `${hook.type}: ${hook.path} - Method: ${hook.method}`;

    if (hook.type === 'error') {
      message += `: ${hook.error.message}`;
    }

    logger.info(message);
    logger.debug('hook.data', hook.data);
    logger.debug('hook.params', hook.params);

    if (hook.result) {
      logger.debug('hook.result', hook.result);
    }

    if (hook.error) {
      logger.error(hook.error);
    }
  };
};

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

const authentication = __webpack_require__(0);
const jwt = __webpack_require__(58);
const local = __webpack_require__(6);
const authManagement = __webpack_require__(7);
const notifier = __webpack_require__(8);

module.exports = function () {
  const app = this;
  const config = app.get('authentication');

  // Set up authentication with the secret
  app.configure(authentication(config));
  app.configure(jwt());
  app.configure(local());
  app.configure(authManagement(notifier(app)));
  // The `authentication` service is used to create a JWT.
  // The before `create` hook registers strategies that can be used
  // to create a new valid JWT (e.g. local or oauth2)
  app.service('authentication').hooks({
    before: {
      create: [authentication.hooks.authenticate(config.strategies)],
      remove: [authentication.hooks.authenticate('jwt')]
    }
  });
};

/***/ }),
/* 58 */
/***/ (function(module, exports) {

module.exports = require("feathers-authentication-jwt");

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

const Sequelize = __webpack_require__(1);
const seed = __webpack_require__(60);
module.exports = function () {
  const app = this;
  const connectionString = app.get('postgres');
  const sequelize = new Sequelize(connectionString, {
    dialect: 'postgres',
    logging: false,
    define: {
      freezeTableName: true
    }
  });
  const oldSetup = app.setup;

  app.set('sequelizeClient', sequelize);

  app.setup = function (...args) {
    const result = oldSetup.apply(this, args);

    // Set up data relationships
    const models = sequelize.models;
    Object.keys(models).forEach(name => {
      if ('associate' in models[name]) {
        models[name].associate(models);
      }
    });

    // Sync to the database
    sequelize.sync().then(() => {
      app.configure(seed);
    });

    return result;
  };
};

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const rolesData = __webpack_require__(61);
const usersData = __webpack_require__(62);
const clientsData = __webpack_require__(63);

module.exports = function () {
  const app = this;
  const ifEmptyCreate2 = ifEmptyCreate.bind(this);
  app.configure(ifEmptyCreate2('roles', rolesData));
  app.configure(ifEmptyCreate2('users', usersData));
  app.configure(ifEmptyCreate2('clients', clientsData));
};

// ### ifEmptyCreate(model, data)
/**
 * If the model is empty then populate it's data
 * @param {object} model Mongoose Model
 * @param {object|object[]} data Object data or Array of Object data to insert
 * @return {function} Returns a method to be called by configure
 */
function ifEmptyCreate(name, data) {
  var _this = this;

  return _asyncToGenerator(function* () {
    try {
      let found = yield _this.service(name).find({ query: {} });
      if (found && Number.isInteger(found.total) && Array.isArray(found.data)) {
        found = found.data;
      }
      if (found.length !== 0) {
        return false;
      }
      yield _this.service(name).create(data);
      console.log('default ' + name + ' created');
    } catch (err) {
      if (err) {
        console.log('trouble seeding ' + name + ': ', err);
      }
    }
  });
}

/***/ }),
/* 61 */
/***/ (function(module, exports) {

const system = {
  role: 'system'
};

const admin = {
  role: 'admin'
};

const basic = {
  role: 'basic'
};

module.exports = [system, admin, basic];

/***/ }),
/* 62 */
/***/ (function(module, exports) {

const system = {
  role: 'system',
  email: 'rut@le34.dk',
  password: process.env.PASSWORD || 'admin',
  isVerified: true,
  clientId: '6714a515-bec0-4d2b-a5e4-76d16cb845c0'
};

module.exports = [system];

/***/ }),
/* 63 */
/***/ (function(module, exports) {

const clients = [{
  id: '5b9462c3-bd11-4bd0-8937-7db762fb22c0',
  name: 'Wicotec Kirkebjerg A/S',
  cvrno: '73585511',
  type: 'opdragsgiver',
  clients: ['edaf7d39-985a-4396-85ff-d5a5d4450a16', 'b927d198-351f-4c5d-9054-424bf6fb7c94']
}, {
  id: '6714a515-bec0-4d2b-a5e4-76d16cb845c0',
  name: 'LE34',
  cvrno: '27758592',
  type: 'opdragsgiver',
  clients: ['0b67b5af-ed80-4860-9c49-864060d8ae25', 'b927d198-351f-4c5d-9054-424bf6fb7c94']
}, {
  id: '1ec75ea6-7022-4813-9e2d-2630003ea392',
  name: 'JFE A/S',
  cvrno: '74760716',
  type: 'opdragsgiver',
  clients: ['b428964d-13b3-4aea-91ad-4e32f3481959', '7282afcb-b458-4c6b-b57b-a5cb9e5a6a68', 'bd52f4a5-2cfe-4aff-a0dc-cca6e50f463b']
}, {
  id: 'edaf7d39-985a-4396-85ff-d5a5d4450a16',
  name: 'Albertslund Varmeværk',
  cvrno: '1003267160',
  type: 'slutbruger'
}, {
  id: 'b927d198-351f-4c5d-9054-424bf6fb7c94',
  name: 'Hvalsø Kraftvarmeværk',
  cvrno: '44057212',
  type: 'slutbruger'
}, {
  id: '0b67b5af-ed80-4860-9c49-864060d8ae25',
  name: 'Egedal Fjernvarme',
  cvrno: '35410538',
  type: 'slutbruger'
}, {
  id: '1d95ef7d-e51a-42f4-82fa-91b277f4c148',
  name: 'EnergiMidt',
  cvrno: '36423544',
  type: 'slutbruger'
}, {
  id: 'b428964d-13b3-4aea-91ad-4e32f3481959',
  name: 'Solrød Fjernvarme amba',
  cvrno: '23104113',
  type: 'slutbruger'
}, {
  id: '7282afcb-b458-4c6b-b57b-a5cb9e5a6a68',
  name: 'Rødovre Kommunale Fjernvarmeforsyning',
  cvrno: '6530731677',
  type: 'slutbruger'
}, {
  id: 'bd52f4a5-2cfe-4aff-a0dc-cca6e50f463b',
  name: 'Norfors I/S',
  cvrno: '14748539',
  type: 'slutbruger'
}, {
  id: '7c830e38-9903-44e6-98f7-7f79941b16ff',
  name: 'DONG',
  cvrno: '1234',
  type: 'slutbruger'
}, {
  id: 'c06ea06e-25b5-473e-80ec-abd894a27ddc',
  name: 'KE_Transmission',
  cvrno: '',
  type: 'opdragsgiver',
  clients: ['7c830e38-9903-44e6-98f7-7f79941b16ff']
}, {
  id: 'f4e2bbf9-55b7-4e59-9ff0-2155544fc1fe',
  name: 'Kemp_Lauritzen',
  cvrno: '',
  type: 'opdragsgiver',
  clients: ['7c830e38-9903-44e6-98f7-7f79941b16ff']
}, {
  id: 'aa160aff-b9be-4cdc-8590-fd203644c5e7',
  name: 'NCC',
  cvrno: '',
  type: 'opdragsgiver',
  clients: ['7c830e38-9903-44e6-98f7-7f79941b16ff']
}, {
  id: 'b9e22955-89ce-43e6-87f6-4de131436a22',
  name: 'Demo',
  cvrno: '',
  type: 'opdragsgiver',
  clients: ['7c830e38-9903-44e6-98f7-7f79941b16ff']
}, {
  id: '2e8df1dd-458d-4c8e-8498-7f79931b15ff',
  name: 'MTH',
  cvrno: '',
  type: 'opdragsgiver',
  clients: ['7c830e38-9903-44e6-98f7-7f79941b16ff']
}, {
  id: 'd78ae731-0026-46fd-be2b-c05e6663cfe5',
  name: 'Bravida',
  cvrno: '',
  type: 'opdragsgiver',
  clients: ['7c830e38-9903-44e6-98f7-7f79941b16ff']
}, {
  id: '020c4051-b910-438c-a50b-8a3fe1898fda',
  name: 'Nordkysten',
  cvrno: '',
  type: 'opdragsgiver',
  clients: ['7c830e38-9903-44e6-98f7-7f79941b16ff']
}, {
  id: '7c730e38-9903-44e6-98f7-9c32c87c9c03',
  name: 'Munck',
  cvrno: '',
  type: 'opdragsgiver',
  clients: ['7c830e38-9903-44e6-98f7-7f79941b16ff']
}];

module.exports = clients.map(client => {
  return {
    id: client.id,
    data: {
      name: client.name,
      cvrno: client.cvrno,
      type: client.type,
      clients: client.clients
    }
  };
});

/***/ })
/******/ ]);
//# sourceMappingURL=main.map