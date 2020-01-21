import { CognitoUserPool, CognitoUser, CognitoUserAttribute, AuthenticationDetails } from "amazon-cognito-identity-js";

/*
Service for handling AWS Cognito Auth
Based on:
https://github.com/aws-samples/aws-serverless-workshops/blob/master/WebApplication/1_StaticWebHosting/website/js/cognito-auth.js
TODO: If using elsewhere, refactor _config to be more dependency injection friendly
(Forgive me)
*/

const _config = {
  cognito: {
    userPoolId: "us-east-1_wXDeH5iU1",
    userPoolClientId: "7bb4a44bol7f3ru4koi2mvcan5",
    region: "us-east-1"
  }
};

const poolData = {
  UserPoolId: _config.cognito.userPoolId,
  ClientId: _config.cognito.userPoolClientId
};

if (typeof AWSCognito !== "undefined") {
  AWSCognito.config.region = _config.cognito.region;
}

//TODO convert to Promise framework
class CognitoAuthService {
  constructor() {
    this.userPool = new CognitoUserPool(poolData);
  }

  register(email, password, name, onSuccess, onFailure) {
    const dataEmail = {
      Name: "email",
      Value: email
    };
    const attributeEmail = new CognitoUserAttribute(dataEmail);
    const dataName = {
      Name: "name",
      Value: name
    };
    const attributeName = new CognitoUserAttribute(dataName);

    this.userPool.signUp(email, password, [attributeEmail, attributeName], null, function signUpCallback(err, result) {
      if (!err) {
        onSuccess(result);
      } else {
        onFailure(err);
      }
    });
  }

  verify(email, code, onSuccess, onFailure) {
    this.createCognitoUser(email).confirmRegistration(code, true, function confirmCallback(err, result) {
      if (!err) {
        onSuccess(result);
      } else {
        onFailure(err);
      }
    });
  }

  createCognitoUser(email) {
    return new CognitoUser({
      Username: email,
      Pool: this.userPool
    });
  }

  signIn(email, password, onSuccess, onFailure) {
    var authenticationDetails = new AuthenticationDetails({
      Username: email,
      Password: password
    });

    var cognitoUser = this.createCognitoUser(email);
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: onSuccess,
      onFailure: onFailure
    });
  }

  signOut() {
    this.userPool.getCurrentUser().signOut();
  }

  getUser() {
    let promise = new Promise((resolve, reject) => {
      let user = this.userPool.getCurrentUser();
      if (user) {
        user.getSession((err, session) => {
          if (!session.isValid()) {
            resolve(null);
          }
          user.getUserData((err, userData) => {
            if (err) {
              reject(err.message || JSON.stringify(err));
            }
            const builtUser = this.buildUser(userData);
            resolve(builtUser);
          });
        });
      } else {
        resolve(null);
      }
    });
    return promise;
  }

  //Convert default cognito user attribut array into proper object
  buildUser(userData) {
    //Convert array of key-value properties into object
    let userProps = {};
    if (userData.UserAttributes && userData.UserAttributes.length) {
      userData.UserAttributes.forEach(attr => {
        userProps[attr.Name] = attr.Value;
      });
    }
    let builtUser = Object.assign({}, userData, userProps);
    return builtUser;
  }

  getAuthToken() {
    return new Promise(function fetchCurrentAuthToken(resolve, reject) {
      var cognitoUser = this.userPool.getCurrentUser();

      if (cognitoUser) {
        cognitoUser.getSession(function sessionCallback(err, session) {
          if (err) {
            reject(err);
          } else if (!session.isValid()) {
            resolve(null);
          } else {
            resolve(session.getIdToken().getJwtToken());
          }
        });
      } else {
        resolve(null);
      }
    });
  }
}

export default CognitoAuthService;
