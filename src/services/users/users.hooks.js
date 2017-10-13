const { authenticate } = require('feathers-authentication').hooks;
const commonHooks = require('feathers-hooks-common');
const { restrictToOwner } = require('feathers-authentication-hooks');
const { hashPassword } = require('feathers-authentication-local').hooks;
const verifyHooks = require('feathers-authentication-management').hooks;
const restrict = [
  authenticate('jwt'),
  restrictToOwner({
    idField: 'id',
    ownerField: 'id'
  })
];

const sendVerificationEmail = require('../../hooks/send-verification-email');

const userClient = require('../../hooks/user-client');

const userClientAfter = require('../../hooks/user-client-after');

const usersRestrict = require('../../hooks/users-restrict');

module.exports = {
  before: {
    all: [],
    find: [authenticate('jwt'), userClient()],
    get: [...restrict],
    create: [hashPassword(), verifyHooks.addVerification()],
    update: [commonHooks.disallow('external')],
    patch: [
      ...restrict,
      commonHooks.iff(commonHooks.isProvider('external'), commonHooks.preventChanges(
        'email',
        'isVerified',
        'verifyToken',
        'verifyShortToken',
        'verifyExpires',
        'verifyChanges',
        'resetToken',
        'resetShortToken',
        'resetExpires'
      ))
    ],
    remove: [authenticate('jwt'), usersRestrict()]
  },

  after: {
    all: [
      commonHooks.when(
        hook => hook.params.provider,
        commonHooks.discard('password', 'verifyExpires', 'resetExpires', 'verifyChanges')
      )
    ],
    find: [],
    get: [],
    create: [
      sendVerificationEmail(),
      verifyHooks.removeVerification(),
      userClientAfter()
    ],
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
