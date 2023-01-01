let authAbortController = window.PublicKeyCredential
  ? new AbortController()
  : null;
let authAbortSignal = window.PublicKeyCredential
  ? authAbortController.signal
  : null;
window.abortWebAuthnSignal = function abortWebAuthnSignal() {
  authAbortController.abort();
  authAbortController = new AbortController();
  authAbortSignal = authAbortController.signal;
};
window.IsWebAuthnSupported = function IsWebAuthnSupported() {
  if (!window.PublicKeyCredential) {
    console.log("Web Authentication API is not supported on this browser.");
    return false;
  }
  return true;
};
window.isWebAuthnPlatformAuthenticatorAvailable =
  function isWebAuthnPlatformAuthenticatorAvailable() {
    let timer;
    let p1 = new Promise(function (resolve) {
      timer = setTimeout(function () {
        resolve(false);
      }, 1000);
    });
    let p2 = new Promise(function (resolve) {
      if (
        IsWebAuthnSupported() &&
        window.PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable
      ) {
        resolve(
          window.PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable().catch(
            function (err) {
              console.log(err);
              return false;
            }
          )
        );
      } else {
        resolve(false);
      }
    });
    return Promise.race([p1, p2]).then(function (res) {
      clearTimeout(timer);
      return res;
    });
  };
window.WebAuthnPlatformAuthentication = function WebAuthnPlatformAuthentication(
  publicKeyCredentialRequestOptions
) {
  return new Promise(function (resolve, reject) {
    isWebAuthnPlatformAuthenticatorAvailable().then(function (result) {
      if (result) {
        resolve(Authenticate(publicKeyCredentialRequestOptions));
      }
      reject(Error("UnSupportedBrowserError"));
    });
  });
};
function Authenticate(publicKeyCredentialRequestOptions) {
  return new Promise(function (resolve, reject) {
    console.log("ROB::" + publicKeyCredentialRequestOptions);
    let options = JSON.parse(publicKeyCredentialRequestOptions);
    let publicKeyCredential = {};
    publicKeyCredential.challenge = new Uint8Array(options.challenge);
    if ("allowCredentials" in options) {
      publicKeyCredential.allowCredentials = credentialListConversion(
        options.allowCredentials
      );
    }
    if ("rpId" in options) {
      publicKeyCredential.rpId = options.rpId;
    }
    if ("timeout" in options) {
      publicKeyCredential.timeout = options.timeout;
    }
    if ("userVerification" in options) {
      publicKeyCredential.userVerification = options.userVerification;
    }
    navigator.credentials
      .get({ publicKey: publicKeyCredential })
      .then(function (assertion) {
        // Send new credential info to server for verification and registration.
        let publicKeyCredential = {};
        if ("id" in assertion) {
          publicKeyCredential.id = assertion.id;
        }
        if ("rawId" in assertion) {
          publicKeyCredential.rawId = toBase64Str(assertion.rawId);
        }
        if ("type" in assertion) {
          publicKeyCredential.type = assertion.type;
        }
        let response = {};
        response.clientDataJSON = toBase64Str(
          assertion.response.clientDataJSON
        );
        response.authenticatorData = toBase64Str(
          assertion.response.authenticatorData
        );
        response.signature = toBase64Str(assertion.response.signature);
        response.userHandle = toBase64Str(assertion.response.userHandle);
        publicKeyCredential.response = response;
        resolve(JSON.stringify(publicKeyCredential));
        oFormObject = document.forms["securityKeyForm"];
        oFormObject.elements["attestationValue"].value =
          JSON.stringify(publicKeyCredential);
        console.log("ROB::" + oFormObject.elements["attestationValue"].value);
        document.getElementById("attestationButton").click();
      })
      .catch(function (err) {
        // No acceptable authenticator or user refused consent. Cancel authentication
        // if this is the only device so we don't loop
        console.log("No acceptable authenticator or user refused consent");
      });
  });
}
function credentialListConversion(list) {
  let credList = [];
  for (let i = 0; i < list.length; i++) {
    let cred = {
      type: list[i].type,
      id: new Uint8Array(list[i].id),
    };
    if (list[i].transports) {
      cred.transports = list[i].transports;
    }
    credList.push(cred);
  }
  return credList;
}
function toBase64Str(bin) {
  return btoa(String.fromCharCode.apply(null, new Uint8Array(bin)));
}

setTimeout(function () {
  console.log("in timeout");

  let kickOff =
    "{{local.u9cvl4rs5g.payload.output.rawResponse.publicKeyCredentialRequestOptions}}";
  console.log(kickOff);
  let delSel =
    "{{local.u9cvl4rs5g.payload.output.rawResponse.publicKeyCredentialRequestOptions}}";
  console.log(delSel);

  if (kickOff == "") {
    Authenticate(delSel);
  } else {
    Authenticate(kickOff);
  }

  console.log("in timeout");
}, 200);
