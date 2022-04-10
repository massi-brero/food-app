// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const apiKey = '  apiKey: \'AIzaSyA3fWWNjS8az3EfX2fWvoyjmRRbSLvR4MI\''
export const environment = {
  production: false,
  apiUrl: 'https://ng-http-90b6e.firebaseio.com/',
  signInUrl: `https://identitytoolkit.googleapis.com/v1/accounts:signIn?key=${apiKey}`,
  signUpUrl: `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`,

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
