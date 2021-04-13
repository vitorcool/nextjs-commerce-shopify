import NextAuth from "next-auth"
import Providers from "next-auth/providers"
// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options

const e = process.env
export default NextAuth({
  // https://next-auth.js.org/configuration/providers
  providers: [
/*     e.EMAIL_SERVER===""?undefined: Providers.Email({
      server: e.EMAIL_SERVER,
      from: e.EMAIL_FROM,
    }), */
    !e.APPLE_ID || e.APPLE_ID===""?undefined:Providers.Apple({
      clientId: e.APPLE_ID,
      clientSecret: {
        appleId: e.APPLE_ID,
        teamId: e.APPLE_TEAM_ID,
        privateKey: e.APPLE_PRIVATE_KEY,
        keyId: e.APPLE_KEY_ID,
      },
    }),
    !e.AUTH0_ID || e.AUTH0_ID===""?undefined:Providers.Auth0({
      clientId: e.AUTH0_ID,
      clientSecret: e.AUTH0_SECRET,
      domain: e.AUTH0_DOMAIN,
    }),
    !e.FACEBOOK_ID || e.FACEBOOK_ID===""?undefined:Providers.Facebook({
      clientId: e.FACEBOOK_ID,
      clientSecret: e.FACEBOOK_SECRET,
    }),
    !e.GITHUB_ID || e.GITHUB_ID===""?undefined:Providers.GitHub({
      clientId: e.GITHUB_ID,
      clientSecret: e.GITHUB_SECRET,
    }),
    !e.GOOGLE_ID || e.GOOGLE_ID===""?undefined:Providers.Google({
      clientId: e.GOOGLE_ID,
      clientSecret: e.GOOGLE_SECRET,
    }),
    !e.TWITTER_ID || e.TWITTER_ID===""?undefined:Providers.Twitter({
      clientId: e.TWITTER_ID,
      clientSecret: e.TWITTER_SECRET,
    }),
  ].filter( v => undefined?false:v),
  // Database optional. MySQL, Maria DB, Postgres and MongoDB are supported.
  // https://next-auth.js.org/configuration/databases
  //
  // Notes:
  // * You must install an appropriate node_module for your database
  // * The Email provider requires a database (OAuth providers do not)
  database: e.DATABASE_URL,

  // The secret should be set to a reasonably long random string.
  // It is used to sign cookies and to sign and encrypt JSON Web Tokens, unless
  // a separate secret is defined explicitly for encrypting the JWT.
  secret: e.SECRET,

  session: {
    signingKey: e.JWT_SIGNING_PRIVATE_KEY,
    // Use JSON Web Tokens for session instead of database sessions.
    // This option can be used with or without a database for users/accounts.
    // Note: `jwt` is automatically set to `true` if no database is specified.
    jwt: true,

    // Seconds - How long until an idle session expires and is no longer valid.
    // maxAge: 30 * 24 * 60 * 60, // 30 days

    // Seconds - Throttle how frequently to write to database to extend a session.
    // Use it to limit write operations. Set to 0 to always update the database.
    // Note: This option is ignored if using JSON Web Tokens
    // updateAge: 24 * 60 * 60, // 24 hours
  },

  // JSON Web tokens are only used for sessions if the `jwt: true` session
  // option is set - or by default if no database is specified.
  // https://next-auth.js.org/configuration/options#jwt
  jwt: {
    // A secret to use for key generation (you should set this explicitly)
    secret: e.SECRET,
    // Set to true to use encryption (default: false)
    // encryption: true,
    // You can define your own encode/decode functions for signing and encryption
    // if you want to override the default behaviour.
    // encode: async ({ secret, token, maxAge }) => {},
    // decode: async ({ secret, token, maxAge }) => {},
  },

  // You can define custom pages to override the built-in ones. These will be regular Next.js pages
  // so ensure that they are placed outside of the '/api' folder, e.g. signIn: '/auth/mycustom-signin'
  // The routes shown here are the default URLs that will be used when a custom
  // pages is not specified for that route.
  // https://next-auth.js.org/configuration/pages
  pages: {
    signIn: '/auth/signin',  // Displays signin buttons
    // signOut: '/auth/signout', // Displays form with sign out button
    // error: '/auth/error', // Error code passed in query string as ?error=
    // verifyRequest: '/auth/verify-request', // Used for check email page
    // newUser: null // If set, new users will be directed here on first sign in
  },

  // Callbacks are asynchronous functions you can use to control what happens
  // when an action is performed.
  // https://next-auth.js.org/configuration/callbacks
  callbacks: {
    async signIn(user, account, profile) {
//      console.log('CALLBACK signin',user.name,user.email,account?.provider, account?.access_token)

      return true
    },
/*     async redirect(url, baseUrl) {
      console.log("redirect=",url,baseUrl)
      return baseUrl
    }, */
    // async redirect(url, baseUrl) { return baseUrl },
    async session(session, user) {
//      console.log('CALLBACK session',user)
      return session
    },
    async jwt(token, user, account, profile, isNewUser) {
//      console.log('CALLBACK token',user?.email,isNewUser,account?.provider, account?.access_token)
      return token
    }
  },

  // Events are useful for logging
  // https://next-auth.js.org/configuration/events
  events: {
    async signIn(message) {
      /* on successful sign in */
      //console.log('EVENTS signIn',message);
    },
    async signOut(message) {
      /* on signout */
    //  console.log('EVENTS signout',message);
    },
    async createUser(message) {
      /* user created */
     // console.log('EVENTS createUser',message);
    },
    async linkAccount(message) {
      /* account linked to a user */
    //  console.log('EVENTS linkAccount',message);
    },
    async session(message) {
      /* session is active */
    //  console.log('EVENTS session',message);
    },
    async error(message) {
      /* error in authentication flow */
    //  console.log('EVENTS error',message);
    }
  },

  // Enable debug messages in the console if you are having problems
  debug: false,
})
