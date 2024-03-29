var authAbortController = window.PublicKeyCredential ? new AbortController() : null;
var authAbortSignal = window.PublicKeyCredential ? authAbortController.signal : null;

function isWebAuthnSupported() {
    if (!window.PublicKeyCredential) {
        console.log("Web Authentication API is not supported on this browser.");
        return false;
    }
    return true;
}

function webAuthnRegistration(publicKeyCredentialCreationOptions) {
  return new Promise(function(resolve, reject) {
        if (!isWebAuthnSupported()) {
            reject(Error("UnSupportedBrowserError"));
        }
        resolve(register(publicKeyCredentialCreationOptions));
    });
}

function register(publicKeyCredentialCreationOptions) {
    return new Promise(function(resolve, reject) {
        var options = JSON.parse(publicKeyCredentialCreationOptions);
        var publicKeyCredential = {};
        publicKeyCredential.rp = options.rp;
        publicKeyCredential.user = options.user;
        publicKeyCredential.user.id = new Uint8Array(options.user.id);
        publicKeyCredential.challenge = new Uint8Array(options.challenge);
        publicKeyCredential.pubKeyCredParams = options.pubKeyCredParams;
        // Optional parameters
        if ('timeout' in options) {
            publicKeyCredential.timeout = options.timeout;
        }
        if ('excludeCredentials' in options) {
            publicKeyCredential.excludeCredentials = credentialListConversion(options.excludeCredentials);
        }
        if ('authenticatorSelection' in options) {
            publicKeyCredential.authenticatorSelection = options.authenticatorSelection;
        }
        if ('attestation' in options) {
            publicKeyCredential.attestation = options.attestation;
        }
        if ('extensions' in options) {
            publicKeyCredential.extensions = options.extensions;
        }
        console.log(publicKeyCredential);
        navigator.credentials.create({"publicKey": publicKeyCredential, "signal": authAbortSignal})
            .then(function (newCredentialInfo) {
                // Send new credential info to server for verification and registration.
                console.log(newCredentialInfo);
                var publicKeyCredential = {};
                if ('id' in newCredentialInfo) {
                    publicKeyCredential.id = newCredentialInfo.id;
                }
                if ('type' in newCredentialInfo) {
                    publicKeyCredential.type = newCredentialInfo.type;
                }
                if ('rawId' in newCredentialInfo) {
                    publicKeyCredential.rawId = toBase64Str(newCredentialInfo.rawId);
                }
                if (!newCredentialInfo.response) {
                    throw "Missing 'response' attribute in credential response";
                }
                var response = {};
                response.clientDataJSON = toBase64Str(newCredentialInfo.response.clientDataJSON);
                response.attestationObject = toBase64Str(newCredentialInfo.response.attestationObject);
                publicKeyCredential.response = response;
                resolve(JSON.stringify(publicKeyCredential));

                oFormObject = document.forms['securityKeyForm'];
                            oFormObject.elements["attestationValue"].value = JSON.stringify(publicKeyCredential);
                             console.log("ROB::" + oFormObject.elements["attestationValue"].value);
                            document.getElementById('attestationButton').click();


                //document.getElementById("attestationValue").value = JSON.stringify(publicKeyCredential);

                //document.getElementById("securityKeyForm").submit();
            }).catch(function (err) {
                if (err.name==="InvalidStateError") {
                    document.getElementById("errorButton").click();
                } else {
                    console.log(err);
                    reject(Error(err.name));
                }
        });
    });
}

function credentialListConversion(list) {
    var credList = [];
    for (var i=0; i < list.length; i++) {
        var cred = {
            type: list[i].type,
            id: new Uint8Array(list[i].id)
        };
        if (list[i].transports) {
            cred.transports = list[i].transports;
        }
        credList.push(cred);
    }
    return credList;
}

function toBase64Str(bin){
    return btoa(String.fromCharCode.apply(null, new Uint8Array(bin)));
}


function startFido() {
    webAuthnRegistration('{{local.455tt1bl25.payload.output.rawResponse.publicKeyCredentialCreationOptions}}');
}

startFido();