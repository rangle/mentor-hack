/* global exports */

exports.schemas = [{
  name: 'userProviderAccounts',
  properties: {
    username: {
      type: String
    }, // Assigned by us
    provider: {
      type: String,
      enum: ['google', 'twitter', 'facebook'],
      required: true
    },
    idWithProvider: {
      type: String,
      required: true
    }, // Assigned by the provider
    emails: [{
      type: String
    }],
    displayName: {
      type: String
    },
    oauthToken: {
      type: String
    },
    oauthSecret: {
      type: String
    },
    tokenExpirationDate: {
      type: Date
    }
  }
}, {
  name: 'users',
  properties: {
    name: String,
    isMentor: Boolean,
    isAdmin: Boolean,
    role: {
      type: String,
      enum: ['designer', 'clinitian', 'developer']
    },
    email: String,
    bio: String,
    skills: [
      String
    ],
    photo: String,
    bookings: [
      String
    ]
  }
}, {
  name: 'teams',
  properties: {
    displayName: String
  }
}];