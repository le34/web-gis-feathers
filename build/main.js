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
/******/ 	return __webpack_require__(__webpack_require__.s = 19);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("sequelize");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("feathers-sequelize");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("@feathersjs/authentication");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("feathers-authentication-hooks");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

module.exports = function (options = {}) {
  // eslint-disable-line no-unused-vars
  return context => {
    return context.service.get(context.result.id).then(result => {
      context.result = result;
      return context;
    });
  };
};

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("winston");

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("feathers-hooks-common");

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("@feathersjs/authentication-local");

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("feathers-authentication-management");

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(__dirname) {const path = __webpack_require__(4);
const pug = __webpack_require__(36);
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
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

/* eslint no-new: 0 */
var geojsonvt = __webpack_require__(67);
var MBTiles = __webpack_require__(13);
var path = __webpack_require__(4);
var vtpbf = __webpack_require__(68);
var zlib = __webpack_require__(14);
var fs = __webpack_require__(6);
var bbox = __webpack_require__(69);
var centerOfMass = __webpack_require__(70);
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
        let layername = feature.tags.feature || this._id;
        if (this._features.indexOf(layername) === -1) {
          this._features.push(layername);
        }
        if (!layers.hasOwnProperty(layername)) {
          layers[layername] = [];
        }
        layers[layername].push(feature);
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
/* 13 */
/***/ (function(module, exports) {

module.exports = require("@mapbox/mbtiles");

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = require("zlib");

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = require("wellknown");

/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = require("reproject");

/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = require("epsg");

/***/ }),
/* 18 */
/***/ (function(module, exports) {

// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

module.exports = function (options = {}) {
  // eslint-disable-line no-unused-vars
  return hook => {
    return hook.app.service('datasources').get(hook.id).then(result => {
      hook.params.data = result;
      return Promise.resolve(hook);
    });
  };
};

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(20);


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

/* eslint-disable no-console */
const logger = __webpack_require__(7);
const app = __webpack_require__(21);
const port = app.get('port');
const server = app.listen(port);

process.on('unhandledRejection', (reason, p) => logger.error('Unhandled Rejection at: Promise ', p, reason));

server.on('listening', () => logger.info('Feathers application started on http://%s:%d', app.get('host'), port));

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

const path = __webpack_require__(4);
const favicon = __webpack_require__(22);
const compress = __webpack_require__(23);
const cors = __webpack_require__(24);
const helmet = __webpack_require__(25);
const logger = __webpack_require__(7);

const feathers = __webpack_require__(26);
const configuration = __webpack_require__(27);
const express = __webpack_require__(28);
// const rest = require('@feathersjs/express/rest')
const socketio = __webpack_require__(29);

// const handler = require('@feathersjs/express/errors')
// const notFound = require('feathers-errors/not-found')

const middleware = __webpack_require__(30);
const services = __webpack_require__(31);
const appHooks = __webpack_require__(122);
const channels = __webpack_require__(124);

const authentication = __webpack_require__(125);

const sequelize = __webpack_require__(129);

const app = express(feathers());

// Load app configuration
app.configure(configuration());
// Enable CORS, security, compression, favicon and body parsing
app.use(cors());
app.use(helmet());
app.use(compress());
app.use(express.json({ limit: '1gb' }));
app.use(express.urlencoded({ extended: true }));
app.use(favicon(path.join(app.get('public'), 'favicon.ico')));
// Host the public folder
app.use('/', express.static(app.get('public')));

// Set up Plugins and providers
app.configure(express.rest());
app.configure(socketio());

app.configure(sequelize);

// Configure other middleware (see `middleware/index.js`)
app.configure(middleware);
app.configure(authentication);
// Set up our services (see `services/index.js`)
app.configure(services);
// Set up event channels (see channels.js)
app.configure(channels);

// Configure a middleware for 404s and the error handler
app.use(express.notFound());
app.use(express.errorHandler({ logger }));

app.hooks(appHooks);

module.exports = app;

/***/ }),
/* 22 */
/***/ (function(module, exports) {

module.exports = require("serve-favicon");

/***/ }),
/* 23 */
/***/ (function(module, exports) {

module.exports = require("compression");

/***/ }),
/* 24 */
/***/ (function(module, exports) {

module.exports = require("cors");

/***/ }),
/* 25 */
/***/ (function(module, exports) {

module.exports = require("helmet");

/***/ }),
/* 26 */
/***/ (function(module, exports) {

module.exports = require("@feathersjs/feathers");

/***/ }),
/* 27 */
/***/ (function(module, exports) {

module.exports = require("@feathersjs/configuration");

/***/ }),
/* 28 */
/***/ (function(module, exports) {

module.exports = require("@feathersjs/express");

/***/ }),
/* 29 */
/***/ (function(module, exports) {

module.exports = require("@feathersjs/socketio");

/***/ }),
/* 30 */
/***/ (function(module, exports) {

module.exports = function () {
  // Add your custom middleware here. Remember, that
  // in Express the order matters
  const app = this; // eslint-disable-line no-unused-vars
};

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

const users = __webpack_require__(32);
const roles = __webpack_require__(41);
const email = __webpack_require__(44);
const companies = __webpack_require__(48);
const cvr = __webpack_require__(51);
const fonts = __webpack_require__(56);
const files = __webpack_require__(59);
const datasources = __webpack_require__(63);
const projects = __webpack_require__(73);
const geometries = __webpack_require__(77);
const totals = __webpack_require__(81);
const db = __webpack_require__(86);
const extent = __webpack_require__(89);
const styles = __webpack_require__(92);
const layers = __webpack_require__(96);
// const layerstyles = require('./layerstyles/layerstyles.service.js')
const clients = __webpack_require__(100);

const datasourcetypes = __webpack_require__(104);

const tiles = __webpack_require__(107);

const tools = __webpack_require__(111);

const projectsTools = __webpack_require__(115);

const logos = __webpack_require__(119);

module.exports = function (app) {
  app.configure(users);
  app.configure(roles);
  app.configure(email);
  app.configure(companies);
  app.configure(cvr);
  app.configure(fonts);
  app.configure(files);
  app.configure(datasources);
  app.configure(projects);
  app.configure(geometries);
  app.configure(totals);
  app.configure(db);
  app.configure(extent);
  app.configure(styles);
  app.configure(layers);
  // app.configure(layerstyles)
  app.configure(clients);
  app.configure(datasourcetypes);
  app.configure(tiles);
  app.configure(tools);
  app.configure(projectsTools);
  app.configure(logos);
};

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

// Initializes the `users` service on path `/users`
const createService = __webpack_require__(1);
const createModel = __webpack_require__(33);
const hooks = __webpack_require__(34);

module.exports = function (app) {
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
};

/***/ }),
/* 33 */
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
    models.users.belongsTo(models.companies);
    models.users.belongsTo(models.roles);
  };

  return users;
};

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

const { authenticate } = __webpack_require__(2).hooks;
const commonHooks = __webpack_require__(8);
const { restrictToOwner } = __webpack_require__(3);
const { hashPassword } = __webpack_require__(9).hooks;
const verifyHooks = __webpack_require__(10).hooks;
const restrict = [authenticate('jwt'), restrictToOwner({
  idField: 'id',
  ownerField: 'id'
})];

const sendVerificationEmail = __webpack_require__(35);

const userBefore = __webpack_require__(37);

const userClientAfter = __webpack_require__(38);

const usersRestrict = __webpack_require__(39);

module.exports = {
  before: {
    all: [],
    find: [authenticate('jwt'), userBefore()],
    get: [authenticate('jwt'), userBefore()],
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
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const accountService = __webpack_require__(11);
module.exports = function (options = {}) {
  // eslint-disable-line no-unused-vars
  return function sendVerificationEmail(hook) {
    const user = hook.result;
    if (hook.params.provider && user) {
      accountService(hook.app).notifier('resendVerifySignup', user);
      return Promise.resolve(hook);
    }
    // Hooks can either return nothing or a promise
    // that resolves with the `hook` object for asynchronous operations
    return Promise.resolve(hook);
  };
};

/***/ }),
/* 36 */
/***/ (function(module, exports) {

module.exports = require("pug");

/***/ }),
/* 37 */
/***/ (function(module, exports) {

// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

module.exports = function (options = {}) {
  // eslint-disable-line no-unused-vars
  return hook => {
    hook.params.sequelize = {
      include: [{ model: hook.app.services.companies.Model }, { model: hook.app.services.roles.Model }]
    };
    return Promise.resolve(hook);
  };
};

/***/ }),
/* 38 */
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
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const errors = __webpack_require__(40);
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
/* 40 */
/***/ (function(module, exports) {

module.exports = require("@feathersjs/errors");

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

// Initializes the `roles` service on path `/roles`
const createService = __webpack_require__(1);
const createModel = __webpack_require__(42);
const hooks = __webpack_require__(43);

module.exports = function (app) {
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
};

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = __webpack_require__(0);
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const roles = sequelizeClient.define('roles', {
    name: {
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
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

const { authenticate } = __webpack_require__(2).hooks;

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
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

// Initializes the `email` service on path `/email`
const Mailer = __webpack_require__(45);
const hooks = __webpack_require__(46);
const smtpTransport = __webpack_require__(47);

module.exports = function (app) {
  // Initialize our service with any options it requires
  app.use('/email', Mailer(smtpTransport(app.get('mail'))));
  // Get our initialized service so that we can register hooks and filters
  const service = app.service('email');

  service.hooks(hooks);
};

/***/ }),
/* 45 */
/***/ (function(module, exports) {

module.exports = require("feathers-mailer");

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

const { disallow } = __webpack_require__(8);

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
/* 47 */
/***/ (function(module, exports) {

module.exports = require("nodemailer-smtp-transport");

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

// Initializes the `company` service on path `/company`
const createService = __webpack_require__(1);
const createModel = __webpack_require__(49);
const hooks = __webpack_require__(50);

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'companies',
    Model,
    paginate

    // Initialize our service with any options it requires
  };app.use('/companies', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('companies');

  service.hooks(hooks);
};

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = __webpack_require__(0);
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const companies = sequelizeClient.define('companies', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    cvr: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });

  companies.associate = function (models) {// eslint-disable-line no-unused-vars
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
  };

  return companies;
};

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

const { authenticate } = __webpack_require__(2).hooks;

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
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

// Initializes the `cvr` service on path `/cvr`
const createService = __webpack_require__(52);
const createModel = __webpack_require__(53);
const hooks = __webpack_require__(55);

module.exports = function (app) {
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

const { authenticate } = __webpack_require__(2).hooks;

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
/***/ (function(module, exports, __webpack_require__) {

// Initializes the `fonts` service on path `/fonts`
const createService = __webpack_require__(57);
const hooks = __webpack_require__(58);

module.exports = function (app) {
  const paginate = app.get('paginate');

  const options = {
    name: 'fonts',
    paginate

    // Initialize our service with any options it requires
  };app.use('/fonts', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('fonts');

  service.hooks(hooks);
};

/***/ }),
/* 57 */
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
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

const { authenticate } = __webpack_require__(2).hooks;

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
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

// Initializes the `files` service on path `/files`
const createService = __webpack_require__(60);
const hooks = __webpack_require__(61);
/*
const blobService = require('feathers-blob')
const fs = require('fs-blob-store')
const path = require('path')
const filePath = process.env.MBTILES || path.join(__dirname, '../../../../../survey/mbtiles')
const blobStorage = fs(filePath)
*/
const multer = __webpack_require__(62);
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.env.MBTILES);
  },
  filename: function (req, file, cb) {
    cb(null, req.body.id + '.mbtiles');
  }
});
const multipartMiddleware = multer({ storage });
module.exports = function (app) {
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
};

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

const fs = __webpack_require__(6);
const path = __webpack_require__(4);
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
/* 61 */
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
/* 62 */
/***/ (function(module, exports) {

module.exports = require("multer");

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

// Initializes the `data` service on path `/data`
const createService = __webpack_require__(1);
const createModel = __webpack_require__(64);
const hooks = __webpack_require__(65);

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'datasources',
    Model,
    paginate

    // Initialize our service with any options it requires
  };app.use('/datasources', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('datasources');

  service.hooks(hooks);
};

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = __webpack_require__(0);
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const datasources = sequelizeClient.define('datasources', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    data: {
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

  datasources.associate = function (models) {
    // eslint-disable-line no-unused-vars
    models.datasources.belongsTo(models.projects, { onDelete: 'CASCADE' }); // generates projectId
    models.datasources.belongsTo(models.companies, { onDelete: 'CASCADE' }); // generates companyId
    models.datasources.belongsTo(models.users); // generates userId
    models.datasources.belongsTo(models.datasourcetypes); // generates datasourcetypeId
  };

  return datasources;
};

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

const { authenticate } = __webpack_require__(2).hooks;
// const { discard } = require('feathers-hooks-common')
const tile = __webpack_require__(66);
const removeMbtile = __webpack_require__(71);
const datasourcesBefore = __webpack_require__(72);
// const noReturning = require('../../hooks/no-returning')
const getAfter = __webpack_require__(5);
// const createGeometries = require('../../hooks/create-geometries')
const { associateCurrentUser } = __webpack_require__(3);
module.exports = {
  before: {
    all: [],
    find: [datasourcesBefore()],
    get: [datasourcesBefore()],
    create: [authenticate('jwt'), associateCurrentUser({ idField: 'id' })],
    update: [authenticate('jwt'), associateCurrentUser({ idField: 'id' })],
    patch: [authenticate('jwt'), associateCurrentUser({ idField: 'id' })], //, noReturning()],
    remove: [authenticate('jwt')]
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [tile(), getAfter()],
    update: [tile(), getAfter()],
    patch: [getAfter()],
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
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

// Use this context to manipulate incoming or outgoing data.
// For more information on contexts see: http://docs.feathersjs.com/api/contexts.html
const fs = __webpack_require__(6);
const path = __webpack_require__(4);
const Tiler = __webpack_require__(12);
module.exports = function (options = {}) {
  // eslint-disable-line no-unused-vars
  return context => {
    Promise.resolve().then(() => {
      console.log(context.data);
      if (context.data.geojson) {
        return context.data.geojson;
      } else if (context.data.data && context.data.data.tile) {
        return context.app.service('db').get(context.result.id);
      }
    }).then(geojson => {
      if (geojson) {
        console.log('geojson');
        fs.unlink(path.join(process.env.MBTILES, context.id + '.mbtiles'), err => {
          if (err) {
            console.log('remove-mbtile', err);
          }

          context.data.geojson = geojson;
          const tiler = new Tiler(context.result.id, context.data, context.service);
          tiler.create();
          const geometryService = context.app.service('geometries');
          let data = [];
          context.data.geojson.features.forEach(feature => {
            const geometry = Object.assign({}, feature.geometry);
            geometry.crs = { type: 'name', properties: { name: 'EPSG:4326' } };
            data.push({ datasourceId: context.result.id, properties: feature.properties, geom: geometry });
          });
          geometryService.remove(null, {
            query: {
              datasourceId: context.result.id
            }
          }).then(res => {
            geometryService.create(data);
          });
        });
      } else {
        console.log('patch');
        context.service.patch(context.result.id, { progress: 100 });
      }
    });
    return context;
  };
};

/***/ }),
/* 67 */
/***/ (function(module, exports) {

module.exports = require("geojson-vt");

/***/ }),
/* 68 */
/***/ (function(module, exports) {

module.exports = require("vt-pbf");

/***/ }),
/* 69 */
/***/ (function(module, exports) {

module.exports = require("@turf/bbox");

/***/ }),
/* 70 */
/***/ (function(module, exports) {

module.exports = require("@turf/center-of-mass");

/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const fs = __webpack_require__(6);
const path = __webpack_require__(4);
module.exports = function (options = {}) {
  // eslint-disable-line no-unused-vars
  return context => {
    // Hooks can either return nothing or a promise
    // that resolves with the `hook` object for asynchronous operations
    fs.unlink(path.join(process.env.MBTILES, context.id + '.mbtiles'), err => {
      if (err) {
        console.log('remove-mbtile', err);
      }
    });
    return context;
  };
};

/***/ }),
/* 72 */
/***/ (function(module, exports) {

// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

module.exports = function (options = {}) {
  // eslint-disable-line no-unused-vars
  return context => {
    context.params.sequelize = {
      include: [{ model: context.app.services.companies.Model, attributes: ['name'] }, { model: context.app.services.projects.Model, attributes: ['name'] }, { model: context.app.services.datasourcetypes.Model, attributes: ['name'] }, { model: context.app.services.users.Model, attributes: ['email'] }]
    };
    return context;
  };
};

/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

// Initializes the `projects` service on path `/projects`
const createService = __webpack_require__(1);
const createModel = __webpack_require__(74);
const hooks = __webpack_require__(75);

module.exports = function (app) {
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
};

/***/ }),
/* 74 */
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
      defaultValue: false
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
    models.projects.belongsTo(models.companies, { onDelete: 'CASCADE' }); // generates companyId
    models.projects.belongsTo(models.users); // generates userId
  };

  return projects;
};

/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

const { authenticate } = __webpack_require__(2).hooks;
const { associateCurrentUser } = __webpack_require__(3);
const projectsBefore = __webpack_require__(76);
const getAfter = __webpack_require__(5);
module.exports = {
  before: {
    all: [],
    find: [projectsBefore()],
    get: [projectsBefore()],
    create: [authenticate('jwt'), associateCurrentUser({ idField: 'id' })],
    update: [authenticate('jwt'), associateCurrentUser({ idField: 'id' })],
    patch: [authenticate('jwt'), associateCurrentUser({ idField: 'id' })],
    remove: [authenticate('jwt')]
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [getAfter()],
    update: [getAfter()],
    patch: [getAfter()],
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
/* 76 */
/***/ (function(module, exports) {

// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

module.exports = function (options = {}) {
  // eslint-disable-line no-unused-vars
  return context => {
    context.params.sequelize = {
      include: [{ model: context.app.services.users.Model, attributes: ['email'] }, { model: context.app.services.companies.Model, attributes: ['name'] }]
    };
    return context;
  };
};

/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

// Initializes the `geometries` service on path `/geometries`
const createService = __webpack_require__(1);
const createModel = __webpack_require__(78);
const hooks = __webpack_require__(79);

module.exports = function (app) {
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
};

/***/ }),
/* 78 */
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
    models.geometries.belongsTo(models.datasources, { onDelete: 'CASCADE' }); // generates datasourceId
  };

  return geometries;
};

/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {


const geometriesBeforeFind = __webpack_require__(80);
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
/* 80 */
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
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

// Initializes the `totals` service on path `/totals`
const createService = __webpack_require__(82);
const hooks = __webpack_require__(84);

module.exports = function (app) {
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
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

/* eslint-disable no-unused-vars */
const { Pool } = __webpack_require__(83);

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
          COALESCE(properties->>'feature', "datasourceId"::text) as id, 
          st_geometrytype(geom) as st_geometrytype, 
          st_length(st_transform(geom, 25832)) as st_length, 
          st_area(st_transform(geom, 25832)) as st_area, 
          st_perimeter(st_transform(geom, 25832)) as st_perimeter
        from geometries
      `;
      if (params.query) {
        if (params.query.datasourceId) {
          sql += 'where "datasourceId"=\'' + params.query.datasourceId + '\'';
        } else if (params.query.projectId) {
          sql += 'inner join data on geometries."datasourceId" = data.id where data."projectId" = \'' + params.query.projectId + '\'';
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
/* 83 */
/***/ (function(module, exports) {

module.exports = require("pg");

/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {


const totalsBefore = __webpack_require__(85);
module.exports = {
  before: {
    all: [],
    find: [totalsBefore()],
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
/* 85 */
/***/ (function(module, exports) {

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

module.exports = function (options = {}) {
  // eslint-disable-line no-unused-vars
  return (() => {
    var _ref = _asyncToGenerator(function* (context) {
      return context;
    });

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  })();
};

/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

// Initializes the `db` service on path `/db`
const createService = __webpack_require__(87);
const hooks = __webpack_require__(88);

module.exports = function (app) {
  const paginate = app.get('paginate');

  const options = {
    name: 'db',
    paginate

    // Initialize our service with any options it requires
  };app.use('/db', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('db');

  service.hooks(hooks);
};

/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

/* eslint-disable no-unused-vars */
// const { Pool } = require('pg')
const Sequelize = __webpack_require__(0);
const parse = __webpack_require__(15);
const reproj = __webpack_require__(16);
var epsg = __webpack_require__(17);
class Service {
  constructor(options) {
    this.options = options || {};
  }

  find(params) {
    return Promise.resolve([]);
  }

  get(id, params) {
    // return new Promise((resolve, reject) => {
    // const pool = new Pool({
    //  connectionString: params.data.meta.connectionString
    // })
    const mssql = params.data.meta.connectionString.indexOf('mssql') === 0;
    const sequelize = new Sequelize(params.data.meta.connectionString);
    let sql = `select *, st_asgeojson(st_transform(${params.data.meta.geometryColumn},4326),10) from ${params.data.meta.dbTable}`;
    if (mssql) {
      sql = `select *, ${params.data.meta.geometryColumn}.STAsText() as wkt, geom.STSrid as srid from ${params.data.meta.dbTable}`;
    }
    return sequelize.query(sql, { type: sequelize.QueryTypes.SELECT }).then(res => {
      if (mssql) {
        return {
          id: id,
          type: 'FeatureCollection',
          features: res.map(item => {
            const properties = Object.assign({}, item);
            delete properties[params.data.meta.geometryColumn];
            delete properties.wkt;
            delete properties.srid;
            const geojson = parse(item.wkt);
            return {
              type: 'Feature',
              properties,
              geometry: reproj.toWgs84(geojson, `EPSG:${item.srid}`, epsg)
            };
          })
        };
      }
      return {
        id: id,
        type: 'FeatureCollection',
        features: res.map(item => {
          const properties = Object.assign({}, item);
          delete properties[params.data.meta.geometryColumn];
          delete properties.st_asgeojson;
          return {
            type: 'Feature',
            properties,
            geometry: JSON.parse(item.st_asgeojson)
          };
        })
      };
    }).catch(err => {
      console.log(err);
    });
    /*
    pool.query(sql, (err, res) => {
      if (err) {
        return reject(err)
      }
       const geojson = {
        id: id,
        type: 'FeatureCollection',
        features: res.rows.map(item => {
          const properties = Object.assign({}, item)
          delete properties[params.data.meta.geometryColumn]
          delete properties.st_asgeojson
          return {
            type: 'Feature',
            properties,
            geometry: JSON.parse(item.st_asgeojson)
          }
        })
      }
      resolve(geojson)
    })
    */
    // })
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
/* 88 */
/***/ (function(module, exports, __webpack_require__) {


const dbBefore = __webpack_require__(18);
module.exports = {
  before: {
    all: [],
    find: [],
    get: [dbBefore()],
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
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

// Initializes the `extent` service on path `/extent`
const createService = __webpack_require__(90);
const hooks = __webpack_require__(91);

module.exports = function (app) {
  const paginate = app.get('paginate');

  const options = {
    name: 'extent',
    paginate

    // Initialize our service with any options it requires
  };app.use('/extent', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('extent');

  service.hooks(hooks);
};

/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

/* eslint-disable no-unused-vars */
// const { Pool } = require('pg')
const Sequelize = __webpack_require__(0);
const parse = __webpack_require__(15);
const reproj = __webpack_require__(16);
var epsg = __webpack_require__(17);

class Service {
  constructor(options) {
    this.options = options || {};
  }

  find(params) {
    return Promise.resolve([]);
  }

  get(id, params) {
    const mssql = params.data.data.connectionString.indexOf('mssql') === 0;
    const sequelize = new Sequelize(params.data.data.connectionString);
    let sql = `select st_asgeojson(st_extent(st_transform(${params.data.meta.geometryColumn},4326)),10) from ${params.data.data.dbTable}`;
    if (mssql) {
      sql = `select a.geom.STAsText() as wkt, a.geom.STSrid as srid from (select GEOMETRY::EnvelopeAggregate(${params.data.data.geometryColumn}) as geom from ${params.data.data.dbTable}) as a`;
    }
    return sequelize.query(sql, { type: sequelize.QueryTypes.SELECT }).then(res => {
      if (res.length > 0) {
        const item = res[0];
        if (mssql) {
          const geojson = parse(item.wkt);
          return {
            id: id,
            type: 'Feature',
            properties: {},
            geometry: reproj.toWgs84(geojson, `EPSG:${item.srid}`, epsg)
          };
        }
        return {
          id: id,
          type: 'Feature',
          properties: {},
          geometry: JSON.parse(item.st_asgeojson)
        };
      }
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
/* 91 */
/***/ (function(module, exports, __webpack_require__) {


const dbBefore = __webpack_require__(18);
module.exports = {
  before: {
    all: [],
    find: [],
    get: [dbBefore()],
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
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

// Initializes the `styles` service on path `/styles`
const createService = __webpack_require__(1);
const createModel = __webpack_require__(93);
const hooks = __webpack_require__(94);

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'styles',
    Model,
    paginate

    // Initialize our service with any options it requires
  };app.use('/styles', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('styles');

  service.hooks(hooks);
};

/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = __webpack_require__(0);
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const styles = sequelizeClient.define('styles', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    light: {
      type: DataTypes.JSONB,
      allowNull: true
    },
    dark: {
      type: DataTypes.JSONB,
      allowNull: true
    }

  }, {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });

  styles.associate = function (models) {
    // eslint-disable-line no-unused-vars
    models.styles.belongsTo(models.projects, { onDelete: 'CASCADE' }); // generates projectId
    models.styles.belongsTo(models.users); // generates userId
  };

  return styles;
};

/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

const { authenticate } = __webpack_require__(2).hooks;
const { associateCurrentUser } = __webpack_require__(3);
const stylesBefore = __webpack_require__(95);
const getAfter = __webpack_require__(5);
module.exports = {
  before: {
    all: [authenticate('jwt')],
    find: [stylesBefore()],
    get: [stylesBefore()],
    create: [associateCurrentUser({ idField: 'id' })],
    update: [associateCurrentUser({ idField: 'id' })],
    patch: [associateCurrentUser({ idField: 'id' })],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [getAfter()],
    update: [getAfter()],
    patch: [getAfter()],
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
/* 95 */
/***/ (function(module, exports) {

// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

module.exports = function (options = {}) {
  // eslint-disable-line no-unused-vars
  return context => {
    context.params.sequelize = {
      include: [{ model: context.app.services.users.Model, attributes: ['email'] }, { model: context.app.services.projects.Model }]
    };
    return context;
  };
};

/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

// Initializes the `layers` service on path `/layers`
const createService = __webpack_require__(1);
const createModel = __webpack_require__(97);
const hooks = __webpack_require__(98);

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'layers',
    Model,
    paginate

    // Initialize our service with any options it requires
  };app.use('/layers', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('layers');

  service.hooks(hooks);
};

/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = __webpack_require__(0);
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const layers = sequelizeClient.define('layers', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    priority: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    isDark: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    isBasemap: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });

  layers.associate = function (models) {
    // eslint-disable-line no-unused-vars
    models.layers.belongsTo(models.projects, { onDelete: 'CASCADE' }); // generates projectId
    models.layers.belongsTo(models.styles, { onDelete: 'CASCADE' }); // generates styleId
    models.layers.belongsTo(models.users); // generates userId
  };

  return layers;
};

/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

const { authenticate } = __webpack_require__(2).hooks;
const layersBefore = __webpack_require__(99);
const getAfter = __webpack_require__(5);
const { associateCurrentUser } = __webpack_require__(3);
module.exports = {
  before: {
    all: [],
    find: [layersBefore()],
    get: [layersBefore()],
    create: [authenticate('jwt'), associateCurrentUser({ idField: 'id' })],
    update: [authenticate('jwt'), associateCurrentUser({ idField: 'id' })],
    patch: [authenticate('jwt'), associateCurrentUser({ idField: 'id' })],
    remove: [authenticate('jwt')]
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [getAfter()],
    update: [getAfter()],
    patch: [getAfter()],
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
/* 99 */
/***/ (function(module, exports) {

// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

module.exports = function (options = {}) {
  // eslint-disable-line no-unused-vars
  return context => {
    context.params.sequelize = {
      include: [{ model: context.app.services.styles.Model, attributes: ['name'] }, { model: context.app.services.projects.Model, attributes: ['name'] }, { model: context.app.services.users.Model, attributes: ['email'] }]
    };
    return context;
  };
};

/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

// Initializes the `clients` service on path `/clients`
const createService = __webpack_require__(1);
const createModel = __webpack_require__(101);
const hooks = __webpack_require__(102);

module.exports = function (app) {
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
};

/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = __webpack_require__(0);
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const clients = sequelizeClient.define('clients', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    }
  }, {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });

  clients.associate = function (models) {
    // eslint-disable-line no-unused-vars
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
    models.clients.belongsTo(models.projects, { onDelete: 'CASCADE' }); // generates projectId
    models.clients.belongsTo(models.companies, { onDelete: 'CASCADE' }); // generates companyId
    models.clients.belongsTo(models.users); // generates userId
  };

  return clients;
};

/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {


const clientsBefore = __webpack_require__(103);
const getAfter = __webpack_require__(5);
const { associateCurrentUser } = __webpack_require__(3);
module.exports = {
  before: {
    all: [],
    find: [clientsBefore()],
    get: [clientsBefore()],
    create: [associateCurrentUser({ idField: 'id' })],
    update: [associateCurrentUser({ idField: 'id' })],
    patch: [associateCurrentUser({ idField: 'id' })],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [getAfter()],
    update: [getAfter()],
    patch: [getAfter()],
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
/* 103 */
/***/ (function(module, exports) {

// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

module.exports = function (options = {}) {
  // eslint-disable-line no-unused-vars
  return context => {
    context.params.sequelize = {
      include: [{ model: context.app.services.users.Model, attributes: ['email'] }, { model: context.app.services.companies.Model, attributes: ['name'] }]
    };
    return context;
  };
};

/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

// Initializes the `datasourcetypes` service on path `/datasourcetypes`
const createService = __webpack_require__(1);
const createModel = __webpack_require__(105);
const hooks = __webpack_require__(106);

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'datasourcetypes',
    Model,
    paginate

    // Initialize our service with any options it requires
  };app.use('/datasourcetypes', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('datasourcetypes');

  service.hooks(hooks);
};

/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = __webpack_require__(0);
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const datasourcetypes = sequelizeClient.define('datasourcetypes', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });

  datasourcetypes.associate = function (models) {// eslint-disable-line no-unused-vars
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
  };

  return datasourcetypes;
};

/***/ }),
/* 106 */
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
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

// Initializes the `tiles` service on path `/tiles`
const zlib = __webpack_require__(14);
const createService = __webpack_require__(108);
const hooks = __webpack_require__(109);
const sharp = __webpack_require__(110);
let empty = null;
sharp({
  create: {
    width: 256,
    height: 256,
    channels: 4,
    background: { r: 0, g: 0, b: 0, alpha: 0 }
  }
}).png().toBuffer().then(buffer => {
  empty = buffer;
});
module.exports = function (app) {
  const paginate = app.get('paginate');

  const options = {
    name: 'tiles',
    paginate
    // Initialize our service with any options it requires
  };app.use('/tiles', createService(options), (req, res, next) => {
    if (res.hook.params.query.hasOwnProperty('format')) {
      if (res.hook.params.query.format === 'png') {
        res.set('Content-Type', 'image/png');
        if (res.data) {
          res.send(res.data);
        } else {
          console.log('empty');
          res.send(empty);
        }
      } else {
        res.set('Content-Encoding', 'gzip');
        res.set('Content-Type', 'application/x-protobuf');
        const isGzipped = res.data.slice(0, 2).indexOf(Buffer.from([0x1f, 0x8b])) === 0;
        if (isGzipped) {
          return res.send(res.data);
        }
        zlib.gzip(res.data, (err, result) => {
          if (err) {
            return res.status(500).json(err);
          }
          res.send(result);
        });
      }
    } else {
      next();
    }
  });

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('tiles');

  service.hooks(hooks);
};

/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/* eslint-disable no-unused-vars */
const fs = __webpack_require__(6);
const path = __webpack_require__(4);
var MBTiles = __webpack_require__(13);

const port = process.env.PORT || 3030;
const filePath = process.env.MBTILES;
const urlPrefix = process.env.URL_PREFIX || 'http://localhost:' + port;
class Service {
  constructor(options) {
    this.options = options || {};
  }

  find(params) {
    return _asyncToGenerator(function* () {
      return [];
    })();
  }

  get(id, params) {
    return _asyncToGenerator(function* () {
      const mbtilesFile = path.join(filePath, id + '.mbtiles');
      if (params.query.hasOwnProperty('format')) {
        try {
          const z = params.query.z | 0;
          const x = params.query.x | 0;
          const y = params.query.y | 0;
          const format = params.query.format;
          const data = yield new Promise(function (resolve, reject) {
            const source = new MBTiles(mbtilesFile, function (err) {
              if (err) {
                reject(err);
              } else {
                source.getTile(z, x, y, function (err, data, headers) {
                  if (err) {
                    reject(err);
                  } else {
                    resolve(data);
                  }
                });
              }
            });
          });
          return data;
        } catch (err) {
          console.log(err);
        }
      } else {
        console.log('info');
        const data = yield new Promise(function (resolve, reject) {
          fs.stat(mbtilesFile, function (err, stats) {
            if (err || !stats.isFile() || stats.size === 0) {
              return reject(err);
            }
            const instance = new MBTiles(mbtilesFile, function (err) {
              if (err) {
                return reject(err);
              }
              instance.getInfo(function (err, info) {
                if (err || !info) {
                  return reject(err);
                }
                info.tiles = ['le34://tiles/' + id + '?z={z}&x={x}&y={y}&format=' + info.format];
                resolve(info);
              });
            });
          });
        });
        return data;
      }
    })();
  }

  create(data, params) {
    return _asyncToGenerator(function* () {
      return data;
    })();
  }

  update(id, data, params) {
    return _asyncToGenerator(function* () {
      return data;
    })();
  }

  patch(id, data, params) {
    return _asyncToGenerator(function* () {
      return data;
    })();
  }

  remove(id, params) {
    return _asyncToGenerator(function* () {
      return { id };
    })();
  }
}

module.exports = function (options) {
  return new Service(options);
};

module.exports.Service = Service;

/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {


const { authenticate } = __webpack_require__(2).hooks;
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
/* 110 */
/***/ (function(module, exports) {

module.exports = require("sharp");

/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

// Initializes the `tools` service on path `/tools`
const createService = __webpack_require__(1);
const createModel = __webpack_require__(112);
const hooks = __webpack_require__(113);

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'tools',
    Model,
    paginate

    // Initialize our service with any options it requires
  };app.use('/tools', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('tools');

  service.hooks(hooks);
};

/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = __webpack_require__(0);
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const tools = sequelizeClient.define('tools', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });

  tools.associate = function (models) {
    // eslint-disable-line no-unused-vars
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
    models.tools.belongsTo(models.users); // generates userId
  };

  return tools;
};

/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {


const { authenticate } = __webpack_require__(2).hooks;
const { associateCurrentUser } = __webpack_require__(3);
const toolsBefore = __webpack_require__(114);
const getAfter = __webpack_require__(5);
module.exports = {
  before: {
    all: [authenticate('jwt')],
    find: [toolsBefore()],
    get: [toolsBefore()],
    create: [associateCurrentUser({ idField: 'id' })],
    update: [associateCurrentUser({ idField: 'id' })],
    patch: [associateCurrentUser({ idField: 'id' })],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [getAfter()],
    update: [getAfter()],
    patch: [getAfter()],
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
/* 114 */
/***/ (function(module, exports) {

// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

module.exports = function (options = {}) {
  // eslint-disable-line no-unused-vars
  return context => {
    context.params.sequelize = {
      include: [{ model: context.app.services.users.Model, attributes: ['email'] }]
    };
    return context;
  };
};

/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

// Initializes the `projects-tools` service on path `/projects-tools`
const createService = __webpack_require__(1);
const createModel = __webpack_require__(116);
const hooks = __webpack_require__(117);

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'projects-tools',
    Model,
    paginate

    // Initialize our service with any options it requires
  };app.use('/projects-tools', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('projects-tools');

  service.hooks(hooks);
};

/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = __webpack_require__(0);
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const projectsTools = sequelizeClient.define('projects_tools', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    priority: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });

  projectsTools.associate = function (models) {
    // eslint-disable-line no-unused-vars
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
    models.projects_tools.belongsTo(models.projects, { onDelete: 'CASCADE' }); // generates projectId
    models.projects_tools.belongsTo(models.tools, { onDelete: 'CASCADE' }); // generates toolId
    models.projects_tools.belongsTo(models.users); // generates userId
  };

  return projectsTools;
};

/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

const { authenticate } = __webpack_require__(2).hooks;
const { associateCurrentUser } = __webpack_require__(3);
const projectsToolsBefore = __webpack_require__(118);
const getAfter = __webpack_require__(5);
module.exports = {
  before: {
    all: [authenticate('jwt')],
    find: [projectsToolsBefore()],
    get: [projectsToolsBefore()],
    create: [associateCurrentUser({ idField: 'id' })],
    update: [associateCurrentUser({ idField: 'id' })],
    patch: [associateCurrentUser({ idField: 'id' })],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [getAfter()],
    update: [getAfter()],
    patch: [getAfter()],
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
/* 118 */
/***/ (function(module, exports) {

// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

module.exports = function (options = {}) {
  // eslint-disable-line no-unused-vars
  return context => {
    context.params.sequelize = {
      include: [{ model: context.app.services.tools.Model, attributes: ['name'] }, { model: context.app.services.projects.Model, attributes: ['name'] }, { model: context.app.services.users.Model, attributes: ['email'] }]
    };
    return context;
  };
};

/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

// Initializes the `logos` service on path `/logos`
const createService = __webpack_require__(1);
const createModel = __webpack_require__(120);
const hooks = __webpack_require__(121);

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'logos',
    Model,
    paginate

    // Initialize our service with any options it requires
  };app.use('/logos', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('logos');

  service.hooks(hooks);
};

/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = __webpack_require__(0);
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const logos = sequelizeClient.define('logos', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    data: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });

  logos.associate = function (models) {
    // eslint-disable-line no-unused-vars
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
    models.logos.belongsTo(models.companies, { onDelete: 'CASCADE' }); // generates companyId
  };

  return logos;
};

/***/ }),
/* 121 */
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
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

// Application hooks that run for every service
const logger = __webpack_require__(123);

module.exports = {
  before: {
    all: [logger()],
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
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

// A hook that logs service method before, after and error
// See https://github.com/winstonjs/winston for documentation
// about the logger.
const logger = __webpack_require__(7);

// To see more detailed messages, uncomment the following line
// logger.level = 'debug';

module.exports = function () {
  return context => {
    // This debugs the service call and a stringified version of the hook context
    // You can customize the mssage (and logger) to your needs
    logger.debug(`${context.type} app.service('${context.path}').${context.method}()`);

    if (typeof context.toJSON === 'function') {
      logger.debug('Hook Context', JSON.stringify(context, null, '  '));
    }

    if (context.error) {
      logger.error(context.error);
    }
  };
};

/***/ }),
/* 124 */
/***/ (function(module, exports) {

module.exports = function (app) {
  if (typeof app.channel !== 'function') {
    // If no real-time functionality has been configured just return
    return;
  }

  app.on('connection', connection => {
    // On a new real-time connection, add it to the anonymous channel
    app.channel('anonymous').join(connection);
  });
  app.on('logout', (authResult, { connection }) => {
    if (connection) {
      app.channel('authenticated').leave(connection);
    }
    console.log('logout', app.channel('authenticated').length);
  });

  app.on('login', (authResult, { connection }) => {
    console.log('login', app.channel('authenticated').connections.length);
    // connection can be undefined if there is no
    // real-time connection, e.g. when logging in via REST
    if (connection) {
      // Obtain the logged in user from the connection
      // const user = connection.user;

      // The connection is no longer anonymous, remove it
      app.channel('anonymous').leave(connection);

      // Add it to the authenticated user channel
      app.channel('authenticated').join(connection);

      // Channels can be named anything and joined on any condition

      // E.g. to send real-time events only to admins use
      // if(user.isAdmin) { app.channel('admins').join(connection); }

      // If the user has joined e.g. chat rooms
      // if(Array.isArray(user.rooms)) user.rooms.forEach(room => app.channel(`rooms/${room.id}`).join(channel));

      // Easily organize users by email and userid for things like messaging
      // app.channel(`emails/${user.email}`).join(channel);
      // app.channel(`userIds/$(user.id}`).join(channel);
    }
  });
  app.publish((data, hook) => {
    // eslint-disable-line no-unused-vars
    // Here you can add event publishers to channels set up in `channels.js`
    // To publish only for a specific event use `app.publish(eventname, () => {})`

    // e.g. to publish all service events to all authenticated users use
    // return app.channel('authenticated');
    return app.channel('authenticated');
    // console.log('publish', data)
  });
  // Here you can also add service specific event publishers
  // e..g the publish the `users` service `created` event to the `admins` channel
  // app.service('users').publish('created', () => app.channel('admins'));

  // With the userid and email organization from above you can easily select involved users
  // app.service('messages').publish(() => {
  //   return [
  //     app.channel(`userIds/${data.createdBy}`),
  //     app.channel(`emails/${data.recipientEmail}`)
  //   ];
  // });
};

/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

const authentication = __webpack_require__(2);
const jwt = __webpack_require__(126);
const local = __webpack_require__(9);
const authManagement = __webpack_require__(10);
const notifier = __webpack_require__(11);
const ldap = __webpack_require__(127);
const LDAPVerifier = __webpack_require__(128);

module.exports = function (app) {
  const config = app.get('authentication');

  // Set up authentication with the secret
  app.configure(authentication(config));
  app.configure(jwt());
  app.configure(local());
  app.configure(ldap({
    // Optional: overwrite Verifier function
    Verifier: LDAPVerifier
  }));
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
/* 126 */
/***/ (function(module, exports) {

module.exports = require("@feathersjs/authentication-jwt");

/***/ }),
/* 127 */
/***/ (function(module, exports) {

module.exports = require("feathers-authentication-ldap");

/***/ }),
/* 128 */
/***/ (function(module, exports) {

class LDAPVerifier {
  constructor(app, options = {}) {
    this.app = app;
    this.options = options;
    this.service = typeof options.service === 'string' ? app.service(options.service) : options.service;
    if (!this.service) {
      throw new Error(`options.service does not exist.\n\tMake sure you are passing a valid service path or service instance and it is initialized before ldap.js.`);
    }
    this.verify = this.verify.bind(this);
  }
  _normalizeResult(results) {
    // Paginated services return the array of results in the data attribute.
    let entities = results.data ? results.data : results;
    let entity = entities[0];

    // Handle bad username.
    if (!entity) {
      return Promise.reject(false); // eslint-disable-line
    }
    return Promise.resolve(entity);
  }
  verify(req, user, done) {
    const id = this.service.id;
    const usernameField = this.options.entityUsernameField || this.options.usernameField;
    const params = {
      'query': {
        [usernameField]: user.mail,
        '$limit': 1
      }
    };

    if (id === null || id === undefined) {
      return done(new Error('the `id` property must be set on the entity service for authentication'));
    }

    // Look up the entity
    this.service.find(params).then(response => {
      const results = response.data || response;
      if (!results.length) {
        return this.service.create({ email: user.mail, companyId: '6714a515-bec0-4d2b-a5e4-76d16cb845c0' }).then(response => {
          return this._normalizeResult(response);
        });
      }
      return this._normalizeResult(response);
    }).then(entity => {
      const id = entity[this.service.id];
      const payload = { [`${this.options.entity}Id`]: id };
      done(null, entity, payload);
    }).catch(error => error ? done(error) : done(null, error, { message: 'Invalid login' }));
  }
}

module.exports = LDAPVerifier;

/***/ }),
/* 129 */
/***/ (function(module, exports, __webpack_require__) {

const Sequelize = __webpack_require__(0);
const seed = __webpack_require__(130);
module.exports = function (app) {
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
/* 130 */
/***/ (function(module, exports, __webpack_require__) {

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const rolesData = __webpack_require__(131);
// const usersData = require('./users.js')
const companiesData = __webpack_require__(133);
const datasourcetypesData = __webpack_require__(134);
const Tiler = __webpack_require__(12);

module.exports = function (app) {
  const ifEmptyCreate2 = ifEmptyCreate.bind(this);
  app.configure(ifEmptyCreate2('roles', rolesData));
  // app.configure(ifEmptyCreate2('users', usersData))
  app.configure(ifEmptyCreate2('companies', companiesData));
  app.configure(ifEmptyCreate2('datasourcetypes', datasourcetypesData));
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
  const service = this.service('datasources');
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
/* 131 */
/***/ (function(module, exports) {

const system = {
  name: 'system'
};

const admin = {
  name: 'admin'
};

const basic = {
  name: 'basic'
};

module.exports = [system, admin, basic];

/***/ }),
/* 132 */,
/* 133 */
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
    name: client.name,
    cvr: client.cvrno
  };
});

/***/ }),
/* 134 */
/***/ (function(module, exports) {

const database = {
  name: 'database'
};

const geotiff = {
  name: 'geotiff'
};

const geojson = {
  name: 'geojson'
};

module.exports = [geojson, geotiff, database];

/***/ })
/******/ ]);
//# sourceMappingURL=main.map