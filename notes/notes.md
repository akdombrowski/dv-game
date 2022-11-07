{{local.icv9ot1nro.payload.output.matchedUser.username}}

{{local.o9qu0nvyje.payload.output.matchedUser.username}}

<https://auth.pingone.com/6f04905c-9d86-4012-95c1-16486d20e26e/as/authorize?response_type=code&client_id=c3a4c8cd-99dd-4086-b32c-a470bc29dd92&scope=openid&redirect_uri=https://httpbin.org/anything>

{{authPath}}/{{envID}}/as/authorize?response_type=code&client_id={{appID}}&scope=openid
profile p1:read:user&redirect_uri={{redirect_uri}}

<https://auth.pingone.com/6f04905c-9d86-4012-95c1-16486d20e26e/as/authorize?response_type=code&client_id=68687231-fbbf-4a80-8d84-10f94d452a89&scope=openid&redirect_uri=https://httpbin.org/anything>

```html
<button
  class="bxi-button bxi-button--submit mb-3"
  data-skcomponent="skbutton"
  data-skbuttontype="form-submit"
  data-skform="frmStart"
  data-st-tag="btnStartContinue"
  data-skbuttonvalue="btnStartContinue"
>
  Continue
</button>

<button
  data-skcomponent="skbutton"
  data-skbuttontype="form-submit"
  data-skform="frmStart"
  data-skbuttonvalue="btnStartContinue"
></button>
```

## from OOTB sign on flow

```html
<button
  class="field is-primary mt-2 button file-input--button button--primary brand-primary-bg"
  data-id="button"
  type="submit"
  data-skcomponent="skbutton"
  data-skbuttontype="form-submit"
  data-skform="usernamePasswordForm"
  data-skbuttonvalue="submit"
>
  Sign On
  <i class="fas fa-forward ml-2"></i>
</button>

<button
  data-skbuttonvalue="submit"
  data-skform="usernamePasswordForm"
  data-skbuttontype="form-submit"
  data-skcomponent="skbutton"
  type="submit"
  data-id="button"
  class="field is-primary mt-2 button file-input--button button--primary brand-primary-bg"
  id="skbutton_form-submit"
>
  <div>
    Sign On
    <i class="fas fa-forward ml-2"></i>
  </div>
</button>
```

## think i figured it out!!!

## **e.g.**

_this code here..._

```html
<button
  data-id="button"
  type="submit"
  class="btn btn-primary mb-3"
  data-skcomponent="skbutton"
  data-skbuttontype="form-submit"
  data-skform="usernamePasswordForm"
  data-skbuttonvalue="submit"
>
  Sign On
</button>
```

### will POST an object to a url like this

<br>

[https://auth.pingone.com/d0dd90cf-dbb9-42aa-89c5-56fefdba73c9/davinci/connections/481e952e6b11db8360587b8711620786/capabilities/customHTMLTemplate]("")

<br>

env of the current DV being used envID: d0dd90cf-dbb9-42aa-89c5-56fefdba73c9
connector info of the custom html template node doing the POST

**CONNECTOR INFO**:

```
HTTP                                              <=== This is the type of connector
id: howu8n9hsc                                    <=== This is the node instance's node ID
connectionId: 481e952e6b11db8360587b8711620786    <=== Particular node instance's connectionID
```

```
{
  "id": "howu8n9hsc",
  "nextEvent": {
    "constructType": "skEvent",
    "eventName": "continue",
    "params": [],
    "eventType": "post",
    "postProcess": {}
  },
  "parameters": {
    "buttonType": {"form-submit"},
    "buttonValue": "submit",
    "username": "johnDoe",
    "password": "password"
  },
  "eventName": "continue"
}
```

## so, i think we can generalize like this

when on a custom html template node and want to advance: POST to this URL -

```
https://auth.pingone.com/***{envID}***/davinci/connections/***{connectionID}***/capabilities/customHTMLTemplate
```

where **_envID_** is the same P1 _envID_ where that DV instance is located

&emsp; &emsp; &emsp; &emsp; &emsp; and

**_connectionID_** is the _id_ of that custom html template connector node

```json
// body of POST
{
  "id": {custom_html_template_connector_node_instance_id},
  "nextEvent": {
    "constructType": "skEvent",
    "eventName": "continue",
    "params": [],
    "eventType": "post",
    "postProcess": {}
  },
  "parameters": {
    "buttonType": {valueOf(data-skbuttontype)},
    "buttonValue": {valueOf(data-skbuttonvalue)},
    // These are values that were sent because it was a sign on form and these
    // were fields on that html page being collected
    "username": "johnDoe",
    "password": "password"
  },
  "eventName": "continue"
}
```

<br>
<br>

### **and here's what the debug logs in analytics show us happens (for this particular example):**

```json
{
  "name": "HTTP",
  "companyId": "d0dd90cf-dbb9-42aa-89c5-56fefdba73c9",
  "flowId": "548b96bf1e016e4e55b4136e77884d04",
  "flowVersionId": 5,
  "id": "howu8n9hsc",
  "connectionId": "481e952e6b11db8360587b8711620786",
  "connectorId": "httpConnector",
  "capabilityName": "add",
  "properties": {
    "customHTML": "******",
    "formFieldsList": {
      "value": [
        {
          "preferredControlType": "textField",
          "preferredDataType": "string",
          "propertyName": "username",
          "displayName": "Username",
          "hashedVisibility": false
        },
        {
          "preferredControlType": "textField",
          "preferredDataType": "string",
          "propertyName": "password",
          "displayName": "Password",
          "hashedVisibility": true
        },
        {
          "preferredControlType": "textField",
          "preferredDataType": "string",
          "propertyName": "buttonValue"
        }
      ]
    },
    "nodeTitle": {
      "value": "Sign On Form"
    },
    "customCSS": "******",
    "validationRules": {
      "value": []
    },
    "nodeDescription": {
      "value": "Prompt for Username & Password"
    }
  },
  "debugMode": true,
  "logLevel": 3,
  "isDisabled": false,
  "inputs": [],
  "respondToUser": true,
  "transitionId": 1,
  "signalId": 0,
  "largePayload": ["customHTML", "customCSS"],
  "interactionId": "00f1361d-39c8-4657-a204-ee04e49cbac5",
  "parameters": {},
  "userAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36",
  "cookies": {
    "XSRF-TOKEN": "****"
  },
  "oeParams": {
    "local.howu8n9hsc.payload.output.username": "",
    "local.icv9ot1nro.payload.output.matchedUser.id": "",
    "local.howu8n9hsc.payload.output.password": "",
    "local.howu8n9hsc.payload.output.buttonValue": "",
    "local.o9qu0nvyje.payload.output.matchedUser.id": "",
    "local.k1vc9enhqp.payload.output.recoveryCode": "",
    "local.k1vc9enhqp.payload.output.newPassword": "",
    "local.lo3onszyab.payload.error.message": "",
    "local.lo3onszyab.payload.error.code": "",
    "local.icv9ot1nro.payload.output.matchedUser.username": "",
    "local.o9qu0nvyje.payload.output.matchedUser.username": "",
    "local.dnu7jt3sjz.payload.output.rawResponse.status": "",
    "local.j9ekv98w5p.payload.output.currentPassword": "",
    "local.j9ekv98w5p.payload.output.newPassword": "",
    "local.ldguma4s6x.payload.error.message": "",
    "local.8m0sspk0ee.payload.output.username": "",
    "local.8m0sspk0ee.payload.output.buttonValue": ""
  },
  "packetTo": "httpConnector",
  "packetProtocol": "action",
  "packetTimestamp": 1667693793655,
  "eventMessage": "Send Response",
  "identity": "httpConnector",
  "originalCapabilityName": "customHTMLTemplate",
  "success": true,
  "executionTime": 52.8492,
  "tsinteractionId": "1667693793655 + 00f1361d-39c8-4657-a204-ee04e49cbac5",
  "tsEms": "2022-11-06T00:16:33.655Z"
}
```

## first let's try without sending any fields that we may have collected on that html page

this came straight from dev tools network capture

```js
fetch(
  "https://auth.pingone.com/d0dd90cf-dbb9-42aa-89c5-56fefdba73c9/davinci/connections/481e952e6b11db8360587b8711620786/capabilities/customHTMLTemplate",
  {
    headers: {
      accept: "*/*",
      "accept-language": "en-US,en;q=0.9",
      "content-type": "application/json",
      interactionid: "undefined",
      interactiontoken: "undefined",
      "origin-cookies":
        "%7B%22XSRF-TOKEN%22%3A%22pef6Fd0p-Mi4MZAmdSk3mITYaV9r1Ns_RNFM%22%7D",
      "sec-ch-ua":
        '"Google Chrome";v="107", "Chromium";v="107", "Not=A?Brand";v="24"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": '"Windows"',
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin",
    },
    referrer:
      "https://auth.pingone.com/d0dd90cf-dbb9-42aa-89c5-56fefdba73c9/davinci/flows/548b96bf1e016e4e55b4136e77884d04/authorize?client_id=tryFlow&response_type=code&scope=openid&redirect_uri=https://auth.pingone.com/d0dd90cf-dbb9-42aa-89c5-56fefdba73c9/davinci/testrp&tryFlowToken=00650ed1-4872-4362-a198-cc8ceb687a1f",
    referrerPolicy: "strict-origin-when-cross-origin",
    body: '{"id":"howu8n9hsc","nextEvent":{"constructType":"skEvent","eventName":"continue","params":[],"eventType":"post","postProcess":{}},"parameters":{"buttonType":"form-submit","buttonValue":"submit","username":"johnDoe","password":"password"},"eventName":"continue"}',
    method: "POST",
    mode: "cors",
    credentials: "include",
  }
);
```

## mdn example of a fetch POST

```js
// Example POST method implementation:
async function postData(url = "", data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}

postData("https://example.com/answer", { answer: 42 }).then((data) => {
  console.log(data); // JSON data parsed by `data.json()` call
});
```

### exploring using a hidden sk button component

```html
<html lang="en" dir="ltr" class=" ">
  <head>
    <title>Security Key Authentication</title>
  </head>
  <body>
    <form id="securityKeyForm" method="post">
      <input type="hidden" name="attestationValue" id="attestationValue" />
      {{componnet.skbutton}}
    </form>
  </body>
</html>
```
