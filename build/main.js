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
/******/ 	return __webpack_require__(__webpack_require__.s = 11);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("sequelize");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("feathers-authentication");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("feathers-sequelize");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("winston");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("feathers-hooks-common");

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("feathers-authentication-local");

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("feathers-authentication-management");

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(__dirname) {const path = __webpack_require__(3);
const pug = __webpack_require__(33);
const isProd = "development" === 'production';
const returnEmail = 'noreply@le34.dk';
module.exports = function (app) {
  function getLink(type, hash) {
    var port = isProd ? '' : ':3000';
    var host = isProd ? 'survey.le34.dk' : 'localhost';
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
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

/* eslint no-new: 0 */
var geojsonvt = __webpack_require__(70);
var MBTiles = __webpack_require__(71);
var path = __webpack_require__(3);
var vtpbf = __webpack_require__(72);
var zlib = __webpack_require__(73);
var fs = __webpack_require__(4);
var bbox = __webpack_require__(74);
var centerOfMass = __webpack_require__(75);
const filePath = process.env.MBTILES;
module.exports = Tiler;

function Tiler(id, data, service) {
  this._service = service;
  this._features = [];
  this._current = 0;
  this._last = 0;
  this._data = Object.assign({}, data);
  this._id = id;
  // this._mbtilesFile = path.join(__dirname, 'data', data.id + '.mbtiles')
  this._mbtilesFile = path.join(filePath, id + '.mbtiles');
}

Tiler.prototype.remove = function () {
  return new Promise((resolve, reject) => {
    fs.unlink(this._mbtilesFile, () => {
      resolve();
    });
  });
};

Tiler.prototype.putTile = function () {
  if (this._current === this._tileIndex.tileCoords.length) {
    var center = centerOfMass(this._data.geojson);
    this._mbtiles.putInfo({
      bounds: bbox(this._data.geojson),
      center: [center.geometry.coordinates[0], center.geometry.coordinates[1], 16],
      version: '2',
      name: this._id,
      description: this._data.name,
      type: 'overlay',
      format: 'pbf',
      'vector_layers': this._features.map(id => {
        return {
          id: id, description: '', minzoom: 0, maxzoom: 22, fields: {}
        };
      })
    }, () => {
      this._mbtiles.stopWriting(() => {
        this._mbtiles.close(() => {
          console.log('closed');
        });
      });
    });
  } else {
    const progress = Math.round(100 * (this._current + 1) / this._tileIndex.tileCoords.length);
    Promise.resolve().then(() => {
      if (progress > this._last) {
        this._last = progress;
        return this._service.patch(this._id, { progress });
      }
    }).then(() => {
      const item = this._tileIndex.tileCoords[this._current];
      var tile = this._tileIndex.getTile(item.z, item.x, item.y);
      var layers = {};
      tile.features.forEach(feature => {
        if (this._features.indexOf(feature.tags.feature) === -1) {
          this._features.push(feature.tags.feature);
        }
        if (!layers.hasOwnProperty(feature.tags.feature)) {
          layers[feature.tags.feature] = [];
        }
        layers[feature.tags.feature].push(feature);
      });
      var layers2 = {};
      Object.keys(layers).forEach(key => {
        var layer = new vtpbf.GeoJSONWrapper(layers[key]);
        layer.name = key;
        layer.version = 2;
        layers2[key] = layer;
      });
      var buff = vtpbf.fromVectorTileJs({
        layers: layers2
      });
      var buffer = Buffer.from(buff);
      zlib.gzip(buffer, (err, result) => {
        if (!err) {
          this._mbtiles.putTile(item.z, item.x, item.y, result, () => {
            this._current++;
            this.putTile();
          });
        }
      });
    });
  }
};

Tiler.prototype.create = function () {
  Promise.resolve().then(() => {
    return geojsonvt(this._data.geojson, { debug: 0, maxZoom: 20, indexMaxZoom: 20, indexMaxPoints: 0 });
  }).then(tileIndex => {
    this._tileIndex = tileIndex;
    return this.remove();
  }).then(() => {
    return new Promise((resolve, reject) => {
      new MBTiles(this._mbtilesFile, (err, mbtiles) => {
        if (err) {
          reject(err);
        } else {
          resolve(mbtiles);
        }
      });
    });
  }).then(mbtiles => {
    this._mbtiles = mbtiles;
    return new Promise((resolve, reject) => {
      mbtiles.startWriting(err => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }).then(() => {
    this.putTile();
  }).catch(err => {
    console.log(err);
  });
};

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(12);


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

/* eslint-disable no-console */
const logger = __webpack_require__(5);
const app = __webpack_require__(13);
const port = app.get('port');
const server = app.listen(port);

process.on('unhandledRejection', (reason, p) => logger.error('Unhandled Rejection at: Promise ', p, reason));

server.on('listening', () => logger.info('Feathers application started on http://%s:%d', app.get('host'), port));

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

const path = __webpack_require__(3);
const favicon = __webpack_require__(14);
const compress = __webpack_require__(15);
const cors = __webpack_require__(16);
const helmet = __webpack_require__(17);
const bodyParser = __webpack_require__(18);

const feathers = __webpack_require__(19);
const configuration = __webpack_require__(20);
const hooks = __webpack_require__(21);
const rest = __webpack_require__(22);
const socketio = __webpack_require__(23);

const handler = __webpack_require__(24);
const notFound = __webpack_require__(25);

const middleware = __webpack_require__(26);
const services = __webpack_require__(27);
const appHooks = __webpack_require__(96);

const authentication = __webpack_require__(98);

const sequelize = __webpack_require__(100);

const app = feathers();

// Load app configuration
app.configure(configuration());
// Enable CORS, security, compression, favicon and body parsing
app.use(cors());
app.use(helmet());
app.use(compress());
app.use(bodyParser.json({ limit: '1gb' }));
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
/* 14 */
/***/ (function(module, exports) {

module.exports = require("serve-favicon");

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = require("compression");

/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = require("cors");

/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = require("helmet");

/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = require("feathers");

/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = require("feathers-configuration");

/***/ }),
/* 21 */
/***/ (function(module, exports) {

module.exports = require("feathers-hooks");

/***/ }),
/* 22 */
/***/ (function(module, exports) {

module.exports = require("feathers-rest");

/***/ }),
/* 23 */
/***/ (function(module, exports) {

module.exports = require("feathers-socketio");

/***/ }),
/* 24 */
/***/ (function(module, exports) {

module.exports = require("feathers-errors/handler");

/***/ }),
/* 25 */
/***/ (function(module, exports) {

module.exports = require("feathers-errors/not-found");

/***/ }),
/* 26 */
/***/ (function(module, exports) {

module.exports = function () {
  // Add your custom middleware here. Remember, that
  // in Express the order matters
  const app = this; // eslint-disable-line no-unused-vars
};

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

const users = __webpack_require__(28);
const roles = __webpack_require__(39);
const email = __webpack_require__(43);
const company = __webpack_require__(47);
const cvr = __webpack_require__(51);

const fonts = __webpack_require__(57);

const files = __webpack_require__(61);

const data = __webpack_require__(66);

const projects = __webpack_require__(83);

const geometries = __webpack_require__(87);

const totals = __webpack_require__(92);

module.exports = function () {
  const app = this; // eslint-disable-line no-unused-vars
  app.configure(users);
  app.configure(roles);
  app.configure(email);
  app.configure(company);
  app.configure(cvr);
  app.configure(fonts);
  app.configure(files);
  app.configure(data);
  app.configure(projects);
  app.configure(geometries);
  app.configure(totals);
};

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

// Initializes the `users` service on path `/users`
const createService = __webpack_require__(2);
const createModel = __webpack_require__(29);
const hooks = __webpack_require__(30);
const filters = __webpack_require__(38);

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  // const paginate = app.get('paginate')

  const options = {
    name: 'users',
    Model,
    paginate: {
      default: 100,
      max: 1000
    }

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
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = __webpack_require__(0);
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
    models.users.belongsTo(models.company);
  };

  return users;
};

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

const { authenticate } = __webpack_require__(1).hooks;
const commonHooks = __webpack_require__(6);
const { restrictToOwner } = __webpack_require__(31);
const { hashPassword } = __webpack_require__(7).hooks;
const verifyHooks = __webpack_require__(8).hooks;
const restrict = [authenticate('jwt'), restrictToOwner({
  idField: 'id',
  ownerField: 'id'
})];

const sendVerificationEmail = __webpack_require__(32);

const userClient = __webpack_require__(34);

const userClientAfter = __webpack_require__(35);

const usersRestrict = __webpack_require__(36);

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
/* 31 */
/***/ (function(module, exports) {

module.exports = require("feathers-authentication-hooks");

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const accountService = __webpack_require__(9);
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
/* 33 */
/***/ (function(module, exports) {

module.exports = require("pug");

/***/ }),
/* 34 */
/***/ (function(module, exports) {

// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

module.exports = function (options = {}) {
  // eslint-disable-line no-unused-vars
  return function userClient(hook) {
    hook.params.sequelize = {
      include: [{ model: hook.app.services.company.Model }]
    };
    return Promise.resolve(hook);
  };
};

/***/ }),
/* 35 */
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
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const errors = __webpack_require__(37);
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
        if (hook.params.user.role === 'admin' && hook.params.user.companyId === user.companyId) {
          return Promise.resolve(hook);
        }
        throw new errors.Forbidden('Du har ikke rettigheder til denne handling');
      }
      throw new errors.NotFound();
    });
  };
};

/***/ }),
/* 37 */
/***/ (function(module, exports) {

module.exports = require("feathers-errors");

/***/ }),
/* 38 */
/***/ (function(module, exports) {

/* eslint no-console: 1 */
console.warn('You are using the default filter for the users service. For more information about event filters see https://docs.feathersjs.com/api/events.html#event-filtering'); // eslint-disable-line no-console

module.exports = function (data, connection, hook) {
  // eslint-disable-line no-unused-vars
  return data;
};

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

// Initializes the `roles` service on path `/roles`
const createService = __webpack_require__(2);
const createModel = __webpack_require__(40);
const hooks = __webpack_require__(41);
const filters = __webpack_require__(42);

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
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = __webpack_require__(0);
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
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

const { authenticate } = __webpack_require__(1).hooks;

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
/* 42 */
/***/ (function(module, exports) {

/* eslint no-console: 1 */
console.warn('You are using the default filter for the roles service. For more information about event filters see https://docs.feathersjs.com/api/events.html#event-filtering'); // eslint-disable-line no-console

module.exports = function (data, connection, hook) {
  // eslint-disable-line no-unused-vars
  return data;
};

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

// Initializes the `email` service on path `/email`
const Mailer = __webpack_require__(44);
const hooks = __webpack_require__(45);
const smtpTransport = __webpack_require__(46);

module.exports = function () {
  const app = this;

  // Initialize our service with any options it requires
  app.use('/email', Mailer(smtpTransport(app.get('mail'))));
  // Get our initialized service so that we can register hooks and filters
  const service = app.service('email');

  service.hooks(hooks);
};

/***/ }),
/* 44 */
/***/ (function(module, exports) {

module.exports = require("feathers-mailer");

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

const { disallow } = __webpack_require__(6);

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
/* 46 */
/***/ (function(module, exports) {

module.exports = require("nodemailer-smtp-transport");

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

// Initializes the `company` service on path `/company`
const createService = __webpack_require__(2);
const createModel = __webpack_require__(48);
const hooks = __webpack_require__(49);
const filters = __webpack_require__(50);

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'company',
    Model,
    paginate

    // Initialize our service with any options it requires
  };app.use('/company', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('company');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = __webpack_require__(0);
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const company = sequelizeClient.define('company', {
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

  company.associate = function (models) {// eslint-disable-line no-unused-vars
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
  };

  return company;
};

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

const { authenticate } = __webpack_require__(1).hooks;

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
/* 50 */
/***/ (function(module, exports) {

/* eslint no-console: 1 */
console.warn('You are using the default filter for the company service. For more information about event filters see https://docs.feathersjs.com/api/events.html#event-filtering'); // eslint-disable-line no-console

module.exports = function (data, connection, hook) {
  // eslint-disable-line no-unused-vars
  return data;
};

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

// Initializes the `cvr` service on path `/cvr`
const createService = __webpack_require__(52);
const createModel = __webpack_require__(53);
const hooks = __webpack_require__(55);
const filters = __webpack_require__(56);

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
/* 52 */
/***/ (function(module, exports) {

module.exports = require("feathers-elasticsearch");

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const elasticsearch = __webpack_require__(54);

module.exports = function (app) {
  return new elasticsearch.Client({
    host: 'http://LE34_CVR_I_SKYEN:33614fd2-976e-4e1a-af11-acaa0e1ec994@distribution.virk.dk',
    apiVersion: '1.7'
  });
};

/***/ }),
/* 54 */
/***/ (function(module, exports) {

module.exports = require("elasticsearch");

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

const { authenticate } = __webpack_require__(1).hooks;

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
/* 56 */
/***/ (function(module, exports) {

/* eslint no-console: 1 */
console.warn('You are using the default filter for the cvr service. For more information about event filters see https://docs.feathersjs.com/api/events.html#event-filtering'); // eslint-disable-line no-console

module.exports = function (data, connection, hook) {
  // eslint-disable-line no-unused-vars
  return data;
};

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

// Initializes the `fonts` service on path `/fonts`
const createService = __webpack_require__(58);
const hooks = __webpack_require__(59);
const filters = __webpack_require__(60);

module.exports = function () {
  const app = this;
  const paginate = app.get('paginate');

  const options = {
    name: 'fonts',
    paginate

    // Initialize our service with any options it requires
  };app.use('/fonts', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('fonts');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};

/***/ }),
/* 58 */
/***/ (function(module, exports) {

/* eslint-disable no-unused-vars */
class Service {
  constructor(options) {
    this.options = options || {};
  }

  find(params) {
    return Promise.resolve([]);
  }

  get(id, params) {
    return Promise.resolve({
      id, text: `A new message with ID: ${id}!`
    });
  }

  create(data, params) {
    if (Array.isArray(data)) {
      return Promise.all(data.map(current => this.create(current)));
    }

    return Promise.resolve(data);
  }

  update(id, data, params) {
    return Promise.resolve(data);
  }

  patch(id, data, params) {
    return Promise.resolve(data);
  }

  remove(id, params) {
    return Promise.resolve({ id });
  }
}

module.exports = function (options) {
  return new Service(options);
};

module.exports.Service = Service;

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

const { authenticate } = __webpack_require__(1).hooks;

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
/* 60 */
/***/ (function(module, exports) {

/* eslint no-console: 1 */
console.warn('You are using the default filter for the fonts service. For more information about event filters see https://docs.feathersjs.com/api/events.html#event-filtering'); // eslint-disable-line no-console

module.exports = function (data, connection, hook) {
  // eslint-disable-line no-unused-vars
  return data;
};

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

// Initializes the `files` service on path `/files`
const createService = __webpack_require__(62);
const hooks = __webpack_require__(63);
const filters = __webpack_require__(64);
/*
const blobService = require('feathers-blob')
const fs = require('fs-blob-store')
const path = require('path')
const filePath = process.env.MBTILES || path.join(__dirname, '../../../../../survey/mbtiles')
const blobStorage = fs(filePath)
*/
const multer = __webpack_require__(65);
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.env.MBTILES);
  },
  filename: function (req, file, cb) {
    cb(null, req.body.id + '.mbtiles');
  }
});
const multipartMiddleware = multer({ storage });
module.exports = function () {
  const app = this;
  const paginate = app.get('paginate');

  const options = {
    name: 'files',
    paginate
    // app.use('/files', blobService({Model: blobStorage}))
  };app.use('/files', multipartMiddleware.single('mbtile'), createService(options));
  // Initialize our service with any options it requires
  // app.use('/files', createService(options))

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('files');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

const fs = __webpack_require__(4);
const path = __webpack_require__(3);
const filePath = process.env.MBTILES;

class Service {
  constructor(options) {
    this.options = options || {};
  }

  find(params) {
    return new Promise((resolve, reject) => {
      fs.readdir(filePath, (err, files) => {
        if (err) {
          return reject(err);
        }
        const result = files.filter(file => {
          return path.extname(file) === '.mbtiles';
        }).map(file => {
          return { id: path.basename(file, path.extname(file)) };
        });
        resolve(result);
      });
    });
  }

  get(id, params) {
    console.log(params);
    return new Promise((resolve, reject) => {
      fs.readFile(path.join(filePath, id + '.mbtiles'), (err, data) => {
        if (err) {
          return reject(err);
        }
        resolve(data);
      });
    });
  }

  create(data, params) {
    console.log('create', data, params);
    /*
    if (params.file && data.id) {
      return new Promise((resolve, reject) => {
        fs.writeFile(path.join(filePath, data.id + '.mbtiles'), params.file.buffer, err => {
          if (err) {
            console.log('file error', err)
            return reject(err)
          }
          return resolve(data)
        })
      })
    }
    */
    return Promise.resolve(data);
  }

  update(id, data, params) {
    return Promise.resolve(data);
  }

  patch(id, data, params) {
    return Promise.resolve(data);
  }

  remove(id, params) {
    return Promise.resolve({ id });
  }
}

module.exports = function (options) {
  return new Service(options);
};

module.exports.Service = Service;

/***/ }),
/* 63 */
/***/ (function(module, exports) {

// const { authenticate } = require('feathers-authentication').hooks

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
/* 64 */
/***/ (function(module, exports) {

/* eslint no-console: 1 */
console.warn('You are using the default filter for the files service. For more information about event filters see https://docs.feathersjs.com/api/events.html#event-filtering'); // eslint-disable-line no-console

module.exports = function (data, connection, hook) {
  // eslint-disable-line no-unused-vars
  return data;
};

/***/ }),
/* 65 */
/***/ (function(module, exports) {

module.exports = require("multer");

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

// Initializes the `data` service on path `/data`
const createService = __webpack_require__(2);
const createModel = __webpack_require__(67);
const hooks = __webpack_require__(68);
const filters = __webpack_require__(82);

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'data',
    Model,
    paginate

    // Initialize our service with any options it requires
  };app.use('/data', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('data');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = __webpack_require__(0);
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const data = sequelizeClient.define('data', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    meta: {
      type: DataTypes.JSONB,
      allowNull: true
    },
    style: {
      type: DataTypes.JSONB,
      allowNull: true
    },
    progress: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });

  data.associate = function (models) {
    // eslint-disable-line no-unused-vars
    models.data.belongsTo(models.projects); // generates projectId
    models.data.belongsTo(models.company); // generates clientId
    models.data.belongsTo(models.users); // generates userId
    // models.data.hasMany(models.geometries)
  };

  return data;
};

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

const { authenticate } = __webpack_require__(1).hooks;
// const { discard } = require('feathers-hooks-common')
const tile = __webpack_require__(69);
const removeMbtile = __webpack_require__(76);
const dataBeforeFind = __webpack_require__(77);
const noReturning = __webpack_require__(78);
const dataAfterPatch = __webpack_require__(79);
const dataAfterCreate = __webpack_require__(80);
const createGeometries = __webpack_require__(81);

module.exports = {
  before: {
    all: [],
    find: [dataBeforeFind()],
    get: [],
    create: [authenticate('jwt')],
    update: [authenticate('jwt')],
    patch: [authenticate('jwt'), noReturning()],
    remove: [authenticate('jwt')]
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [tile(), createGeometries(), dataAfterCreate()],
    update: [tile()],
    patch: [dataAfterPatch()],
    remove: [removeMbtile()]
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
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const Tiler = __webpack_require__(10);
module.exports = function (options = {}) {
  // eslint-disable-line no-unused-vars
  return function tile(hook) {
    const service = hook.app.service('data');
    if (hook.data.geojson) {
      const tiler = new Tiler(hook.result.id, hook.data, service);
      tiler.create();
      // Hooks can either return nothing or a promise
      // that resolves with the `hook` object for asynchronous operations
    } else {
      service.patch(hook.result.id, { progress: 100 });
    }
    return Promise.resolve(hook);
  };
};

/***/ }),
/* 70 */
/***/ (function(module, exports) {

module.exports = require("geojson-vt");

/***/ }),
/* 71 */
/***/ (function(module, exports) {

module.exports = require("@mapbox/mbtiles");

/***/ }),
/* 72 */
/***/ (function(module, exports) {

module.exports = require("vt-pbf");

/***/ }),
/* 73 */
/***/ (function(module, exports) {

module.exports = require("zlib");

/***/ }),
/* 74 */
/***/ (function(module, exports) {

module.exports = require("@turf/bbox");

/***/ }),
/* 75 */
/***/ (function(module, exports) {

module.exports = require("@turf/center-of-mass");

/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const fs = __webpack_require__(4);
const path = __webpack_require__(3);
module.exports = function (options = {}) {
  // eslint-disable-line no-unused-vars
  return function removeMbtile(hook) {
    // Hooks can either return nothing or a promise
    // that resolves with the `hook` object for asynchronous operations
    fs.unlink(path.join(process.env.MBTILES, hook.id + '.mbtiles'), err => {
      if (err) {
        console.log('remove-mbtile', err);
      }
    });
    return Promise.resolve(hook);
  };
};

/***/ }),
/* 77 */
/***/ (function(module, exports) {

// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

module.exports = function (options = {}) {
  // eslint-disable-line no-unused-vars
  return hook => {
    hook.params.sequelize = {
      include: [{ model: hook.app.services.company.Model, attributes: ['data'] }]
    };
    return hook;
  };
};

/***/ }),
/* 78 */
/***/ (function(module, exports) {

// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

module.exports = function (options = {}) {
  // eslint-disable-line no-unused-vars
  return hook => {
    hook.params.$returning = false;
    return Promise.resolve(hook);
  };
};

/***/ }),
/* 79 */
/***/ (function(module, exports) {

// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

module.exports = function (options = {}) {
  // eslint-disable-line no-unused-vars
  return hook => {
    hook.bypass = true;
    return hook.app.service('/data').find({
      query: {
        id: hook.id,
        $select: ['id', 'projectId', 'name', 'meta', 'style', 'createdAt', 'progress']
      }
    }).then(result => {
      hook.result = result[0];
      return Promise.resolve(hook);
    });
  };
};

/***/ }),
/* 80 */
/***/ (function(module, exports) {

// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

module.exports = function (options = {}) {
  // eslint-disable-line no-unused-vars
  return hook => {
    return hook.app.service('/data').find({
      query: {
        id: hook.result.id,
        $select: ['id', 'projectId', 'name', 'meta', 'style', 'createdAt', 'progress']
      }
    }).then(result => {
      hook.result = result[0];
      return Promise.resolve(hook);
    });
  };
};

/***/ }),
/* 81 */
/***/ (function(module, exports) {

// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

module.exports = function (options = {}) {
  // eslint-disable-line no-unused-vars
  return function tile(hook) {
    if (hook.data.geojson && hook.data.geojson.features) {
      const service = hook.app.service('geometries');
      hook.data.geojson.features.forEach(feature => {
        /*
        const properties = Object.assign({}, feature.properties)
        if (properties.hasOwnProperty('Længde')) {
          properties['Længde'] = parseFloat(properties['Længde'])
        }
        if (properties.hasOwnProperty('Areal')) {
          properties['Areal'] = parseFloat(properties['Areal'])
        }
        if (properties.hasOwnProperty('HalvPerimeter')) {
          properties['HalvPerimeter'] = parseFloat(properties['HalvPerimeter'])
        }
        */
        const geometry = Object.assign({}, feature.geometry);
        geometry.crs = { type: 'name', properties: { name: 'EPSG:4326' } };
        service.create({ dataId: hook.result.id, properties: feature.properties, geom: geometry });
      });
    }
    // Hooks can either return nothing or a promise
    // that resolves with the `hook` object for asynchronous operations
    return Promise.resolve(hook);
  };
};

/***/ }),
/* 82 */
/***/ (function(module, exports) {

/* eslint no-console: 1 */
console.warn('You are using the default filter for the data service. For more information about event filters see https://docs.feathersjs.com/api/events.html#event-filtering'); // eslint-disable-line no-console

module.exports = function (data, connection, hook) {
  // eslint-disable-line no-unused-vars
  return data;
};

/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

// Initializes the `projects` service on path `/projects`
const createService = __webpack_require__(2);
const createModel = __webpack_require__(84);
const hooks = __webpack_require__(85);
const filters = __webpack_require__(86);

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'projects',
    Model,
    paginate

    // Initialize our service with any options it requires
  };app.use('/projects', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('projects');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};

/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = __webpack_require__(0);
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const projects = sequelizeClient.define('projects', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    public: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  }, {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });

  projects.associate = function (models) {
    // eslint-disable-line no-unused-vars
    models.projects.belongsTo(models.company); // generates companyId
  };

  return projects;
};

/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

const { authenticate } = __webpack_require__(1).hooks;
module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [authenticate('jwt')],
    update: [authenticate('jwt')],
    patch: [authenticate('jwt')],
    remove: [authenticate('jwt')]
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
/* 86 */
/***/ (function(module, exports) {

/* eslint no-console: 1 */
console.warn('You are using the default filter for the projects service. For more information about event filters see https://docs.feathersjs.com/api/events.html#event-filtering'); // eslint-disable-line no-console

module.exports = function (data, connection, hook) {
  // eslint-disable-line no-unused-vars
  return data;
};

/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

// Initializes the `geometries` service on path `/geometries`
const createService = __webpack_require__(2);
const createModel = __webpack_require__(88);
const hooks = __webpack_require__(89);
const filters = __webpack_require__(91);

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'geometries',
    Model,
    paginate

    // Initialize our service with any options it requires
  };app.use('/geometries', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('geometries');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};

/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = __webpack_require__(0);
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const geometries = sequelizeClient.define('geometries', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    properties: {
      type: DataTypes.JSONB,
      allowNull: true
    },
    geom: {
      type: DataTypes.GEOMETRY,
      allowNull: false
    }
  }, {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });

  geometries.associate = function (models) {
    // eslint-disable-line no-unused-vars
    models.geometries.belongsTo(models.data, { as: 'data', onDelete: 'CASCADE' });
  };

  return geometries;
};

/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {


const geometriesBeforeFind = __webpack_require__(90);
module.exports = {
  before: {
    all: [],
    find: [geometriesBeforeFind()],
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
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const Sequelize = __webpack_require__(0);
module.exports = function (options = {}) {
  // eslint-disable-line no-unused-vars
  return hook => {
    hook.params.$pagination = false;
    hook.params.sequelize = {
      attributes: [[Sequelize.fn('SUM', Sequelize.cast(Sequelize.json('properties.HalvPerimeter'), 'float')), 'length'], [Sequelize.json('properties.feature'), 'feature']],
      group: ['feature']
    };
    return hook;
  };
};

/***/ }),
/* 91 */
/***/ (function(module, exports) {

/* eslint no-console: 1 */
console.warn('You are using the default filter for the geometries service. For more information about event filters see https://docs.feathersjs.com/api/events.html#event-filtering'); // eslint-disable-line no-console

module.exports = function (data, connection, hook) {
  // eslint-disable-line no-unused-vars
  return data;
};

/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

// Initializes the `totals` service on path `/totals`
const createService = __webpack_require__(93);
const hooks = __webpack_require__(95);

module.exports = function () {
  const app = this;
  const paginate = app.get('paginate');

  const options = {
    name: 'totals',
    connectionString: app.get('postgres'),
    paginate

    // Initialize our service with any options it requires
  };app.use('/totals', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('totals');

  service.hooks(hooks);
};

/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

/* eslint-disable no-unused-vars */
const { Pool } = __webpack_require__(94);

class Service {
  constructor(options) {
    this.options = options || {};
    this.pool = new Pool({
      connectionString: options.connectionString
    });
  }

  find(params) {
    return new Promise((resolve, reject) => {
      let sql = `
      select a.id, count(*)::integer as antal, a.st_geometrytype, sum(a.st_length) as st_length, sum(a.st_area) as st_area, sum(a.st_perimeter) as st_perimeter from (
        select
          properties->>'feature' as id, 
          st_geometrytype(geom) as st_geometrytype, 
          st_length(st_transform(geom, 25832)) as st_length, 
          st_area(st_transform(geom, 25832)) as st_area, 
          st_perimeter(st_transform(geom, 25832)) as st_perimeter
        from geometries
      `;
      if (params.query) {
        if (params.query.dataId) {
          sql += 'where "dataId"=\'' + params.query.dataId + '\'';
        } else if (params.query.projectId) {
          sql += 'inner join data on geometries."dataId" = data.id where data."projectId" = \'' + params.query.projectId + '\'';
        }
      }
      if (params.query.geojson && params.query.geojson.features.length > 0) {
        sql += ' and ';
        params.query.geojson.features.forEach(feature => {
          sql += 'ST_Contains(ST_SetSRID(ST_GeomFromGeoJSON(\'' + JSON.stringify(feature.geometry) + '\'),4326), geom) or ';
        });
        sql = sql.substring(0, sql.length - 3);
      }

      sql += `) as a
      group by a.id, a.st_geometrytype`;
      console.log(sql);
      this.pool.query(sql, (err, res) => {
        if (err) {
          return reject(err);
        }
        resolve(res.rows);
      });
    });
  }

  get(id, params) {
    return Promise.resolve({
      id, text: `A new message with ID: ${id}!`
    });
  }

  create(data, params) {
    if (Array.isArray(data)) {
      return Promise.all(data.map(current => this.create(current)));
    }

    return Promise.resolve(data);
  }

  update(id, data, params) {
    return Promise.resolve(data);
  }

  patch(id, data, params) {
    return Promise.resolve(data);
  }

  remove(id, params) {
    return Promise.resolve({ id });
  }
}

module.exports = function (options) {
  return new Service(options);
};

module.exports.Service = Service;

/***/ }),
/* 94 */
/***/ (function(module, exports) {

module.exports = require("pg");

/***/ }),
/* 95 */
/***/ (function(module, exports) {


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
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

// Application hooks that run for every service
const logger = __webpack_require__(97);

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
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

// A hook that logs service method before, after and error
const logger = __webpack_require__(5);

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
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

const authentication = __webpack_require__(1);
const jwt = __webpack_require__(99);
const local = __webpack_require__(7);
const authManagement = __webpack_require__(8);
const notifier = __webpack_require__(9);

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
/* 99 */
/***/ (function(module, exports) {

module.exports = require("feathers-authentication-jwt");

/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

const Sequelize = __webpack_require__(0);
const seed = __webpack_require__(101);
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
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const rolesData = __webpack_require__(102);
const usersData = __webpack_require__(103);
const companyData = __webpack_require__(104);
const Tiler = __webpack_require__(10);

module.exports = function () {
  const app = this;
  const ifEmptyCreate2 = ifEmptyCreate.bind(this);
  app.configure(ifEmptyCreate2('roles', rolesData));
  app.configure(ifEmptyCreate2('users', usersData));
  app.configure(ifEmptyCreate2('company', companyData));
  app.configure(tile);
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

function tile() {
  const service = this.service('data');
  return service.find({
    query: {
      progress: {
        $lt: 100
      }
    }
  }).then(data => {
    data.forEach(item => {
      if (item.meta && item.meta === 0) {
        const tiler = new Tiler(item, service);
        tiler.create();
      }
    });
  }).catch(function (error) {
    console.error(error);
  });
}

/***/ }),
/* 102 */
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
/* 103 */
/***/ (function(module, exports) {

const system = {
  role: 'system',
  email: 'rut@le34.dk',
  password: process.env.PASSWORD || 'admin',
  isVerified: true,
  companyId: '6714a515-bec0-4d2b-a5e4-76d16cb845c0'
};

module.exports = [system];

/***/ }),
/* 104 */
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