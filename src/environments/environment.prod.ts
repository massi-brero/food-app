const apiKey = 'AIzaSyA3fWWNjS8az3EfX2fWvoyjmRRbSLvR4MI'
export const environment = {
  production: true,
  apiUrl: 'https://ng-http-90b6e.firebaseio.com/',
  signInUrl: `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`,
  signUpUrl: `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`,
};
