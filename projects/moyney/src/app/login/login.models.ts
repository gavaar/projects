enum AuthType {
  Fb = 'facebook',
  Google = 'google',
}

interface PendingAuth {
  credential: firebase.auth.AuthCredential;
  message: string;
  newType: AuthType;
}

export { AuthType, PendingAuth };
