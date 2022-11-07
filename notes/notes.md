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

## Save if the fido ex one doesn't work

```js
  { <form
          id={"form" + props.idNumber}
          className="form-btn-wrapper"
          method="post"
        >
          {/* <div className="btn-wrapper"> */}

  <button
            className="flex-child dv-btn-img skbutton_form-submit"
            id={"ofa-btn-" + props.idNumber}
            onClick={advance}
            data-skbuttonvalue="button"
            // data-skform={"form" + props.idNumber}
            // data-skbuttontype="form-submit"
            data-skcomponent="skbutton"
            data-skskipvalidation
            formMethod="post"
            formTarget={"form" + props.idNumber}
            type="button"
            data-id="button"
            name="ofa-btn"
          ></button>
        {/* </div> */}
  </form>
```

```js
const advance = async (e: SyntheticEvent) => {
  e.preventDefault();
  const data = {
    eventName: "continue",
    id: "k24psuiatw",
    nextEvent: {
      constructType: "skEvent",
      eventName: "continue",
      params: [],
      eventType: "post",
      postProcess: {},
    },
  };

  const envID = "d0dd90cf-dbb9-42aa-89c5-56fefdba73c9";
  const connectionID = "481e952e6b11db8360587b8711620786";
  const url =
    "https://auth.pingone.com/" +
    envID +
    "/davinci/connections/" +
    connectionID +
    "/capabilities/customHTMLTemplate";
  await postData(url, data);
};
```

Ex of skbutton component before applying any config to the button within DV

```html
<button
  data-skcustomloadingindicatorclass=""
  data-skcustomloadingindicator=""
  data-skdefaultloadingcolor=""
  data-skbuttonimageclass=""
  data-skbuttonimageplacement=""
  data-skbuttonimage=""
  data-skotpinput=""
  data-skform=""
  data-skbuttontype=""
  data-skbuttonvalue=""
  data-skbuttonevent=""
  data-skvalue=""
  class=""
  id="skbutton_"
  data-skcomponent="skbutton"
  type="button"
>
  <div>Button</div>
</button>
```

```
 [[[skcomponent###c2tjb21wb25lbnQgInNrYnV0dG9uIiAgaWQ9IiIgY2xhc3M9IiIgbGFiZWw9IkJ1dHRvbiIgdmFsdWU9IiIgYnV0dG9uSW1hZ2U9IiIgYnV0dG9uSW1hZ2VDbGFzcz0iIiBidXR0b25JbWFnZVBsYWNlbWVudD0iIiBidXR0b25UeXBlPSIiIGZvcm09IiIgb3RwSW5wdXQ9IiIgZGVmYXVsdExvYWRpbmdDb2xvcj0iIiBjdXN0b21Mb2FkaW5nSW5kaWNhdG9yPSIiIGN1c3RvbUxvYWRpbmdJbmRpY2F0b3JDbGFzcz0iIg==###eyJuYW1lIjoic2tidXR0b24iLCJvcHRpb25zIjp7ImlkIjoiIiwiY2xhc3MiOiIiLCJsYWJlbCI6IkJ1dHRvbiIsInZhbHVlIjoiIiwiYnV0dG9uSW1hZ2UiOiIiLCJidXR0b25JbWFnZUNsYXNzIjoiIiwiYnV0dG9uSW1hZ2VQbGFjZW1lbnQiOiIiLCJidXR0b25UeXBlIjoiIiwiZm9ybSI6IiIsIm90cElucHV0IjoiIiwiZGVmYXVsdExvYWRpbmdDb2xvciI6IiIsImN1c3RvbUxvYWRpbmdJbmRpY2F0b3IiOiIiLCJjdXN0b21Mb2FkaW5nSW5kaWNhdG9yQ2xhc3MiOiIifSwiY29tcG9uZW50UHJvcHMiOnsiaWQiOnsibmFtZSI6ImlkIiwiZGlzcGxheU5hbWUiOiJCdXR0b24gSUQiLCJpbmZvIjoiVGhlIGlkIHVzZWQgdG8gcmVwcmVzZW50IGJ1dHRvbnMgaW4gdGhlIHRlbXBsYXRlLiBUaGlzIHNob3VsZCBiZSB1bmlxdWUuIn0sImNsYXNzIjp7Im5hbWUiOiJjbGFzcyIsImRpc3BsYXlOYW1lIjoiQ1NTIENsYXNzIiwiaW5mbyI6IlRoZSBjbGFzcyBuYW1lIGFwcGxpZWQgdG8gYnV0dG9ucy4ifSwibGFiZWwiOnsibmFtZSI6ImxhYmVsIiwiZGlzcGxheU5hbWUiOiJMYWJlbCIsInZhbHVlIjoiQnV0dG9uIiwiaW5mbyI6IlRoZSBidXR0b24gbGFiZWwgdGhhdCB3aWxsIGJlIHNlZW4gaW4gdGhlIHRlbXBsYXRlIn0sInZhbHVlIjp7Im5hbWUiOiJ2YWx1ZSIsImRpc3BsYXlOYW1lIjoiQnV0dG9uIFZhbHVlIiwiaW5mbyI6IlRoZSB2YWx1ZSB0aGF0IGlzIGFzc2lnbmVkIHRvIHRoZSBidXR0b24uIFRoaXMgdmFsdWUgd2lsbCBiZSBzZW50IHRvIHRoZSBiYWNrZW5kIHRvIGlkZW50aWZ5IHdoaWNoIGJ1dHRvbiB3YXMgcHJlc3NlZCJ9LCJidXR0b25JbWFnZSI6eyJuYW1lIjoiYnV0dG9uSW1hZ2UiLCJkaXNwbGF5TmFtZSI6IkJ1dHRvbiBJbWFnZSAoVVJMIGZvciBhbiBpbWFnZSkiLCJpbmZvIjoiQW4gaW1hZ2UgdG8gc2hvdyBhbG9uZ3NpZGUgdGhlIGxhYmVsIiwiZ3JvdXAiOiJJbWFnZSJ9LCJidXR0b25JbWFnZUNsYXNzIjp7Im5hbWUiOiJidXR0b25JbWFnZUNsYXNzIiwiZGlzcGxheU5hbWUiOiJCdXR0b24gSW1hZ2UgQ2xhc3MiLCJpbmZvIjoiVGhlIGNsYXNzIG5hbWUgYXNzaWduZWQgdG8gdGhlIGJ1dHRvbiBpbWFnZSIsImdyb3VwIjoiSW1hZ2UifSwiYnV0dG9uSW1hZ2VQbGFjZW1lbnQiOnsibmFtZSI6ImJ1dHRvbkltYWdlUGxhY2VtZW50IiwiZGlzcGxheU5hbWUiOiJCdXR0b24gSW1hZ2UgUGxhY2VtZW50IiwidHlwZSI6InNlbGVjdCIsIm9wdGlvbnMiOlt7Im5hbWUiOiJMZWZ0IiwidmFsdWUiOiJsZWZ0In0seyJuYW1lIjoiUmlnaHQiLCJ2YWx1ZSI6InJpZ2h0In1dLCJpbmZvIjoiVGhlIHBsYWNlbWVudCBvZiB0aGUgaW1hZ2Ugd2l0aCByZXNwZWN0IHRvIHRoZSBidXR0b24gbGFiZWwiLCJncm91cCI6IkltYWdlIn0sImJ1dHRvblR5cGUiOnsibmFtZSI6ImJ1dHRvblR5cGUiLCJkaXNwbGF5TmFtZSI6IkJ1dHRvbiBUeXBlIiwidHlwZSI6ImJ1dHRvblR5cGUiLCJvcHRpb25zIjpbeyJuYW1lIjoiRm9ybSBTdWJtaXQiLCJ2YWx1ZSI6ImZvcm0tc3VibWl0In0seyJuYW1lIjoiQ2xlYXIgTUZBIEF1dGhlbnRpY2F0aW9uIiwidmFsdWUiOiJtZmEtcmVzZXQifSx7Im5hbWUiOiJPVFAiLCJ2YWx1ZSI6Im90cCJ9LHsibmFtZSI6Ik5leHQgRXZlbnQiLCJ2YWx1ZSI6Im5leHQtZXZlbnQifSx7Im5hbWUiOiJOdWFuY2UgQXVkaW8gUmVjb3JkaW5nIEJ1dHRvbiIsInZhbHVlIjoibnVhbmNlLWF1ZGlvIn0seyJuYW1lIjoiQmFjayB0byBQcmV2aW91cyBOb2RlIiwidmFsdWUiOiJiYWNrLXRvLXByZXZpb3VzIn1dLCJpbmZvIjoiVGhlIHR5cGUgb2YgYWN0aW9uIHRoYXQgdHJpZ2dlcnMgd2hlbiB0aGUgYnV0dG9uIGlzIHByZXNzZWQiLCJncm91cCI6IkV2ZW50In0sImZvcm0iOnsibmFtZSI6ImZvcm0iLCJkaXNwbGF5TmFtZSI6IkZvcm0gSUQiLCJpbmZvIjoiV2hlbiBhIGZvcm0tc3VibWl0IHR5cGUgYnV0dG9uIGlzIHByZXNzZWQsIHRoaXMgZm9ybSBpZCB3aWxsIGJlIHVzZWQgdG8gZ2V0IHRoZSBmb3JtIHZhbHVlcy4iLCJncm91cCI6IkV2ZW50In0sIm90cElucHV0Ijp7Im5hbWUiOiJvdHBJbnB1dCIsImRpc3BsYXlOYW1lIjoiT1RQIElucHV0IElEIiwiaW5mbyI6IldoZW4gYSBvdHAgdHlwZSBidXR0b24gaXMgcHJlc3NlZCwgdGhpcyBpbnB1dCBmaWVsZCBpZCB3aWxsIGJlIHVzZWQgdG8gZ2V0IG90cCB2YWx1ZS4iLCJncm91cCI6IkV2ZW50In0sImRlZmF1bHRMb2FkaW5nQ29sb3IiOnsibmFtZSI6ImRlZmF1bHRMb2FkaW5nQ29sb3IiLCJkaXNwbGF5TmFtZSI6IkNvbG9yIG9mIERlZmF1bHQgTG9hZGluZyBJbmRpY2F0b3IiLCJpbmZvIjoiVGhlIGNvbG9yIG9mIHRoZSBkZWZhdWx0IGxvYWRpbmcgYWN0aXZpdHkgaW5kaWNhdG9yIGljb24uIiwiZ3JvdXAiOiJMb2FkaW5nIn0sImN1c3RvbUxvYWRpbmdJbmRpY2F0b3IiOnsibmFtZSI6ImN1c3RvbUxvYWRpbmdJbmRpY2F0b3IiLCJkaXNwbGF5TmFtZSI6IkN1c3RvbSBMb2FkaW5nIEluZGljYXRvciBJbWFnZSBVUkwiLCJpbmZvIjoiVXJsIG9mIGEgbG9hZGluZyBpbmRpY2F0b3IgaW1hZ2UuIFRoaXMgd2lsbCByZXBsYWNlIHRoZSBkZWZhdWx0IGxvYWRpbmcgaW5kaWNhdG9yIGltYWdlLiIsImdyb3VwIjoiTG9hZGluZyJ9LCJjdXN0b21Mb2FkaW5nSW5kaWNhdG9yQ2xhc3MiOnsibmFtZSI6ImN1c3RvbUxvYWRpbmdJbmRpY2F0b3JDbGFzcyIsImRpc3BsYXlOYW1lIjoiQ3VzdG9tIExvYWRpbmcgSW5kaWNhdG9yIEltYWdlIENsYXNzIiwiaW5mbyI6IlRoZSBjbGFzcyBuYW1lIGFzc2lnbmVkIHRvIHRoZSBjdXN0b20gbG9hZGluZyBpbmRpY2F0b3IgaW1hZ2UiLCJncm91cCI6IkxvYWRpbmcifX19]]]
```

which you can see just has the button config base64 encoded

```html
c2tjb21wb25lbnQgInNrYnV0dG9uIiAgaWQ9IiIgY2xhc3M9IiIgbGFiZWw9IkJ1dHRvbiIgdmFsdWU9IiIgYnV0dG9uSW1hZ2U9IiIgYnV0dG9uSW1hZ2VDbGFzcz0iIiBidXR0b25JbWFnZVBsYWNlbWVudD0iIiBidXR0b25UeXBlPSIiIGZvcm09IiIgb3RwSW5wdXQ9IiIgZGVmYXVsdExvYWRpbmdDb2xvcj0iIiBjdXN0b21Mb2FkaW5nSW5kaWNhdG9yPSIiIGN1c3RvbUxvYWRpbmdJbmRpY2F0b3JDbGFzcz0iIg==###eyJuYW1lIjoic2tidXR0b24iLCJvcHRpb25zIjp7ImlkIjoiIiwiY2xhc3MiOiIiLCJsYWJlbCI6IkJ1dHRvbiIsInZhbHVlIjoiIiwiYnV0dG9uSW1hZ2UiOiIiLCJidXR0b25JbWFnZUNsYXNzIjoiIiwiYnV0dG9uSW1hZ2VQbGFjZW1lbnQiOiIiLCJidXR0b25UeXBlIjoiIiwiZm9ybSI6IiIsIm90cElucHV0IjoiIiwiZGVmYXVsdExvYWRpbmdDb2xvciI6IiIsImN1c3RvbUxvYWRpbmdJbmRpY2F0b3IiOiIiLCJjdXN0b21Mb2FkaW5nSW5kaWNhdG9yQ2xhc3MiOiIifSwiY29tcG9uZW50UHJvcHMiOnsiaWQiOnsibmFtZSI6ImlkIiwiZGlzcGxheU5hbWUiOiJCdXR0b24gSUQiLCJpbmZvIjoiVGhlIGlkIHVzZWQgdG8gcmVwcmVzZW50IGJ1dHRvbnMgaW4gdGhlIHRlbXBsYXRlLiBUaGlzIHNob3VsZCBiZSB1bmlxdWUuIn0sImNsYXNzIjp7Im5hbWUiOiJjbGFzcyIsImRpc3BsYXlOYW1lIjoiQ1NTIENsYXNzIiwiaW5mbyI6IlRoZSBjbGFzcyBuYW1lIGFwcGxpZWQgdG8gYnV0dG9ucy4ifSwibGFiZWwiOnsibmFtZSI6ImxhYmVsIiwiZGlzcGxheU5hbWUiOiJMYWJlbCIsInZhbHVlIjoiQnV0dG9uIiwiaW5mbyI6IlRoZSBidXR0b24gbGFiZWwgdGhhdCB3aWxsIGJlIHNlZW4gaW4gdGhlIHRlbXBsYXRlIn0sInZhbHVlIjp7Im5hbWUiOiJ2YWx1ZSIsImRpc3BsYXlOYW1lIjoiQnV0dG9uIFZhbHVlIiwiaW5mbyI6IlRoZSB2YWx1ZSB0aGF0IGlzIGFzc2lnbmVkIHRvIHRoZSBidXR0b24uIFRoaXMgdmFsdWUgd2lsbCBiZSBzZW50IHRvIHRoZSBiYWNrZW5kIHRvIGlkZW50aWZ5IHdoaWNoIGJ1dHRvbiB3YXMgcHJlc3NlZCJ9LCJidXR0b25JbWFnZSI6eyJuYW1lIjoiYnV0dG9uSW1hZ2UiLCJkaXNwbGF5TmFtZSI6IkJ1dHRvbiBJbWFnZSAoVVJMIGZvciBhbiBpbWFnZSkiLCJpbmZvIjoiQW4gaW1hZ2UgdG8gc2hvdyBhbG9uZ3NpZGUgdGhlIGxhYmVsIiwiZ3JvdXAiOiJJbWFnZSJ9LCJidXR0b25JbWFnZUNsYXNzIjp7Im5hbWUiOiJidXR0b25JbWFnZUNsYXNzIiwiZGlzcGxheU5hbWUiOiJCdXR0b24gSW1hZ2UgQ2xhc3MiLCJpbmZvIjoiVGhlIGNsYXNzIG5hbWUgYXNzaWduZWQgdG8gdGhlIGJ1dHRvbiBpbWFnZSIsImdyb3VwIjoiSW1hZ2UifSwiYnV0dG9uSW1hZ2VQbGFjZW1lbnQiOnsibmFtZSI6ImJ1dHRvbkltYWdlUGxhY2VtZW50IiwiZGlzcGxheU5hbWUiOiJCdXR0b24gSW1hZ2UgUGxhY2VtZW50IiwidHlwZSI6InNlbGVjdCIsIm9wdGlvbnMiOlt7Im5hbWUiOiJMZWZ0IiwidmFsdWUiOiJsZWZ0In0seyJuYW1lIjoiUmlnaHQiLCJ2YWx1ZSI6InJpZ2h0In1dLCJpbmZvIjoiVGhlIHBsYWNlbWVudCBvZiB0aGUgaW1hZ2Ugd2l0aCByZXNwZWN0IHRvIHRoZSBidXR0b24gbGFiZWwiLCJncm91cCI6IkltYWdlIn0sImJ1dHRvblR5cGUiOnsibmFtZSI6ImJ1dHRvblR5cGUiLCJkaXNwbGF5TmFtZSI6IkJ1dHRvbiBUeXBlIiwidHlwZSI6ImJ1dHRvblR5cGUiLCJvcHRpb25zIjpbeyJuYW1lIjoiRm9ybSBTdWJtaXQiLCJ2YWx1ZSI6ImZvcm0tc3VibWl0In0seyJuYW1lIjoiQ2xlYXIgTUZBIEF1dGhlbnRpY2F0aW9uIiwidmFsdWUiOiJtZmEtcmVzZXQifSx7Im5hbWUiOiJPVFAiLCJ2YWx1ZSI6Im90cCJ9LHsibmFtZSI6Ik5leHQgRXZlbnQiLCJ2YWx1ZSI6Im5leHQtZXZlbnQifSx7Im5hbWUiOiJOdWFuY2UgQXVkaW8gUmVjb3JkaW5nIEJ1dHRvbiIsInZhbHVlIjoibnVhbmNlLWF1ZGlvIn0seyJuYW1lIjoiQmFjayB0byBQcmV2aW91cyBOb2RlIiwidmFsdWUiOiJiYWNrLXRvLXByZXZpb3VzIn1dLCJpbmZvIjoiVGhlIHR5cGUgb2YgYWN0aW9uIHRoYXQgdHJpZ2dlcnMgd2hlbiB0aGUgYnV0dG9uIGlzIHByZXNzZWQiLCJncm91cCI6IkV2ZW50In0sImZvcm0iOnsibmFtZSI6ImZvcm0iLCJkaXNwbGF5TmFtZSI6IkZvcm0gSUQiLCJpbmZvIjoiV2hlbiBhIGZvcm0tc3VibWl0IHR5cGUgYnV0dG9uIGlzIHByZXNzZWQsIHRoaXMgZm9ybSBpZCB3aWxsIGJlIHVzZWQgdG8gZ2V0IHRoZSBmb3JtIHZhbHVlcy4iLCJncm91cCI6IkV2ZW50In0sIm90cElucHV0Ijp7Im5hbWUiOiJvdHBJbnB1dCIsImRpc3BsYXlOYW1lIjoiT1RQIElucHV0IElEIiwiaW5mbyI6IldoZW4gYSBvdHAgdHlwZSBidXR0b24gaXMgcHJlc3NlZCwgdGhpcyBpbnB1dCBmaWVsZCBpZCB3aWxsIGJlIHVzZWQgdG8gZ2V0IG90cCB2YWx1ZS4iLCJncm91cCI6IkV2ZW50In0sImRlZmF1bHRMb2FkaW5nQ29sb3IiOnsibmFtZSI6ImRlZmF1bHRMb2FkaW5nQ29sb3IiLCJkaXNwbGF5TmFtZSI6IkNvbG9yIG9mIERlZmF1bHQgTG9hZGluZyBJbmRpY2F0b3IiLCJpbmZvIjoiVGhlIGNvbG9yIG9mIHRoZSBkZWZhdWx0IGxvYWRpbmcgYWN0aXZpdHkgaW5kaWNhdG9yIGljb24uIiwiZ3JvdXAiOiJMb2FkaW5nIn0sImN1c3RvbUxvYWRpbmdJbmRpY2F0b3IiOnsibmFtZSI6ImN1c3RvbUxvYWRpbmdJbmRpY2F0b3IiLCJkaXNwbGF5TmFtZSI6IkN1c3RvbSBMb2FkaW5nIEluZGljYXRvciBJbWFnZSBVUkwiLCJpbmZvIjoiVXJsIG9mIGEgbG9hZGluZyBpbmRpY2F0b3IgaW1hZ2UuIFRoaXMgd2lsbCByZXBsYWNlIHRoZSBkZWZhdWx0IGxvYWRpbmcgaW5kaWNhdG9yIGltYWdlLiIsImdyb3VwIjoiTG9hZGluZyJ9LCJjdXN0b21Mb2FkaW5nSW5kaWNhdG9yQ2xhc3MiOnsibmFtZSI6ImN1c3RvbUxvYWRpbmdJbmRpY2F0b3JDbGFzcyIsImRpc3BsYXlOYW1lIjoiQ3VzdG9tIExvYWRpbmcgSW5kaWNhdG9yIEltYWdlIENsYXNzIiwiaW5mbyI6IlRoZSBjbGFzcyBuYW1lIGFzc2lnbmVkIHRvIHRoZSBjdXN0b20gbG9hZGluZyBpbmRpY2F0b3IgaW1hZ2UiLCJncm91cCI6IkxvYWRpbmcifX19
```

```
skcomponent "skbutton"  id="" class="" label="Button" value="" buttonImage="" buttonImageClass="" buttonImagePlacement="" buttonType="" form="" otpInput="" defaultLoadingColor="" customLoadingIndicator="" customLoadingIndicatorClass=""
```

ex of after applying config

```
[[[skcomponent###c2tjb21wb25lbnQgInNrYnV0dG9uIiAgaWQ9ImJ0bklEIiBjbGFzcz0iYnRuQ1NTQ2xhc3MiIGxhYmVsPSJidG5MYWJlbCIgdmFsdWU9ImJ0blZhbHVlIiBidXR0b25JbWFnZT0iYnRuSW1nVVJMIiBidXR0b25JbWFnZUNsYXNzPSJidG5JbWdDbGFzcyIgYnV0dG9uSW1hZ2VQbGFjZW1lbnQ9ImxlZnQiIGJ1dHRvblR5cGU9Im5leHQtZXZlbnQiIGZvcm09ImJ0bkZvcm1JRCIgb3RwSW5wdXQ9ImJ0bk9UUElucHV0SUQiIGRlZmF1bHRMb2FkaW5nQ29sb3I9IiIgY3VzdG9tTG9hZGluZ0luZGljYXRvcj0iIiBjdXN0b21Mb2FkaW5nSW5kaWNhdG9yQ2xhc3M9IiI=###eyJuYW1lIjoic2tidXR0b24iLCJvcHRpb25zIjp7ImlkIjoiYnRuSUQiLCJjbGFzcyI6ImJ0bkNTU0NsYXNzIiwibGFiZWwiOiJidG5MYWJlbCIsInZhbHVlIjoiYnRuVmFsdWUiLCJidXR0b25JbWFnZSI6ImJ0bkltZ1VSTCIsImJ1dHRvbkltYWdlQ2xhc3MiOiJidG5JbWdDbGFzcyIsImJ1dHRvbkltYWdlUGxhY2VtZW50IjoibGVmdCIsImJ1dHRvblR5cGUiOiJuZXh0LWV2ZW50IiwiZm9ybSI6ImJ0bkZvcm1JRCIsIm90cElucHV0IjoiYnRuT1RQSW5wdXRJRCIsImRlZmF1bHRMb2FkaW5nQ29sb3IiOiIiLCJjdXN0b21Mb2FkaW5nSW5kaWNhdG9yIjoiIiwiY3VzdG9tTG9hZGluZ0luZGljYXRvckNsYXNzIjoiIn0sImNvbXBvbmVudFByb3BzIjp7ImlkIjp7Im5hbWUiOiJpZCIsImRpc3BsYXlOYW1lIjoiQnV0dG9uIElEIiwiaW5mbyI6IlRoZSBpZCB1c2VkIHRvIHJlcHJlc2VudCBidXR0b25zIGluIHRoZSB0ZW1wbGF0ZS4gVGhpcyBzaG91bGQgYmUgdW5pcXVlLiJ9LCJjbGFzcyI6eyJuYW1lIjoiY2xhc3MiLCJkaXNwbGF5TmFtZSI6IkNTUyBDbGFzcyIsImluZm8iOiJUaGUgY2xhc3MgbmFtZSBhcHBsaWVkIHRvIGJ1dHRvbnMuIn0sImxhYmVsIjp7Im5hbWUiOiJsYWJlbCIsImRpc3BsYXlOYW1lIjoiTGFiZWwiLCJ2YWx1ZSI6IkJ1dHRvbiIsImluZm8iOiJUaGUgYnV0dG9uIGxhYmVsIHRoYXQgd2lsbCBiZSBzZWVuIGluIHRoZSB0ZW1wbGF0ZSJ9LCJ2YWx1ZSI6eyJuYW1lIjoidmFsdWUiLCJkaXNwbGF5TmFtZSI6IkJ1dHRvbiBWYWx1ZSIsImluZm8iOiJUaGUgdmFsdWUgdGhhdCBpcyBhc3NpZ25lZCB0byB0aGUgYnV0dG9uLiBUaGlzIHZhbHVlIHdpbGwgYmUgc2VudCB0byB0aGUgYmFja2VuZCB0byBpZGVudGlmeSB3aGljaCBidXR0b24gd2FzIHByZXNzZWQifSwiYnV0dG9uSW1hZ2UiOnsibmFtZSI6ImJ1dHRvbkltYWdlIiwiZGlzcGxheU5hbWUiOiJCdXR0b24gSW1hZ2UgKFVSTCBmb3IgYW4gaW1hZ2UpIiwiaW5mbyI6IkFuIGltYWdlIHRvIHNob3cgYWxvbmdzaWRlIHRoZSBsYWJlbCIsImdyb3VwIjoiSW1hZ2UifSwiYnV0dG9uSW1hZ2VDbGFzcyI6eyJuYW1lIjoiYnV0dG9uSW1hZ2VDbGFzcyIsImRpc3BsYXlOYW1lIjoiQnV0dG9uIEltYWdlIENsYXNzIiwiaW5mbyI6IlRoZSBjbGFzcyBuYW1lIGFzc2lnbmVkIHRvIHRoZSBidXR0b24gaW1hZ2UiLCJncm91cCI6IkltYWdlIn0sImJ1dHRvbkltYWdlUGxhY2VtZW50Ijp7Im5hbWUiOiJidXR0b25JbWFnZVBsYWNlbWVudCIsImRpc3BsYXlOYW1lIjoiQnV0dG9uIEltYWdlIFBsYWNlbWVudCIsInR5cGUiOiJzZWxlY3QiLCJvcHRpb25zIjpbeyJuYW1lIjoiTGVmdCIsInZhbHVlIjoibGVmdCJ9LHsibmFtZSI6IlJpZ2h0IiwidmFsdWUiOiJyaWdodCJ9XSwiaW5mbyI6IlRoZSBwbGFjZW1lbnQgb2YgdGhlIGltYWdlIHdpdGggcmVzcGVjdCB0byB0aGUgYnV0dG9uIGxhYmVsIiwiZ3JvdXAiOiJJbWFnZSJ9LCJidXR0b25UeXBlIjp7Im5hbWUiOiJidXR0b25UeXBlIiwiZGlzcGxheU5hbWUiOiJCdXR0b24gVHlwZSIsInR5cGUiOiJidXR0b25UeXBlIiwib3B0aW9ucyI6W3sibmFtZSI6IkZvcm0gU3VibWl0IiwidmFsdWUiOiJmb3JtLXN1Ym1pdCJ9LHsibmFtZSI6IkNsZWFyIE1GQSBBdXRoZW50aWNhdGlvbiIsInZhbHVlIjoibWZhLXJlc2V0In0seyJuYW1lIjoiT1RQIiwidmFsdWUiOiJvdHAifSx7Im5hbWUiOiJOZXh0IEV2ZW50IiwidmFsdWUiOiJuZXh0LWV2ZW50In0seyJuYW1lIjoiTnVhbmNlIEF1ZGlvIFJlY29yZGluZyBCdXR0b24iLCJ2YWx1ZSI6Im51YW5jZS1hdWRpbyJ9LHsibmFtZSI6IkJhY2sgdG8gUHJldmlvdXMgTm9kZSIsInZhbHVlIjoiYmFjay10by1wcmV2aW91cyJ9XSwiaW5mbyI6IlRoZSB0eXBlIG9mIGFjdGlvbiB0aGF0IHRyaWdnZXJzIHdoZW4gdGhlIGJ1dHRvbiBpcyBwcmVzc2VkIiwiZ3JvdXAiOiJFdmVudCJ9LCJmb3JtIjp7Im5hbWUiOiJmb3JtIiwiZGlzcGxheU5hbWUiOiJGb3JtIElEIiwiaW5mbyI6IldoZW4gYSBmb3JtLXN1Ym1pdCB0eXBlIGJ1dHRvbiBpcyBwcmVzc2VkLCB0aGlzIGZvcm0gaWQgd2lsbCBiZSB1c2VkIHRvIGdldCB0aGUgZm9ybSB2YWx1ZXMuIiwiZ3JvdXAiOiJFdmVudCJ9LCJvdHBJbnB1dCI6eyJuYW1lIjoib3RwSW5wdXQiLCJkaXNwbGF5TmFtZSI6Ik9UUCBJbnB1dCBJRCIsImluZm8iOiJXaGVuIGEgb3RwIHR5cGUgYnV0dG9uIGlzIHByZXNzZWQsIHRoaXMgaW5wdXQgZmllbGQgaWQgd2lsbCBiZSB1c2VkIHRvIGdldCBvdHAgdmFsdWUuIiwiZ3JvdXAiOiJFdmVudCJ9LCJkZWZhdWx0TG9hZGluZ0NvbG9yIjp7Im5hbWUiOiJkZWZhdWx0TG9hZGluZ0NvbG9yIiwiZGlzcGxheU5hbWUiOiJDb2xvciBvZiBEZWZhdWx0IExvYWRpbmcgSW5kaWNhdG9yIiwiaW5mbyI6IlRoZSBjb2xvciBvZiB0aGUgZGVmYXVsdCBsb2FkaW5nIGFjdGl2aXR5IGluZGljYXRvciBpY29uLiIsImdyb3VwIjoiTG9hZGluZyJ9LCJjdXN0b21Mb2FkaW5nSW5kaWNhdG9yIjp7Im5hbWUiOiJjdXN0b21Mb2FkaW5nSW5kaWNhdG9yIiwiZGlzcGxheU5hbWUiOiJDdXN0b20gTG9hZGluZyBJbmRpY2F0b3IgSW1hZ2UgVVJMIiwiaW5mbyI6IlVybCBvZiBhIGxvYWRpbmcgaW5kaWNhdG9yIGltYWdlLiBUaGlzIHdpbGwgcmVwbGFjZSB0aGUgZGVmYXVsdCBsb2FkaW5nIGluZGljYXRvciBpbWFnZS4iLCJncm91cCI6IkxvYWRpbmcifSwiY3VzdG9tTG9hZGluZ0luZGljYXRvckNsYXNzIjp7Im5hbWUiOiJjdXN0b21Mb2FkaW5nSW5kaWNhdG9yQ2xhc3MiLCJkaXNwbGF5TmFtZSI6IkN1c3RvbSBMb2FkaW5nIEluZGljYXRvciBJbWFnZSBDbGFzcyIsImluZm8iOiJUaGUgY2xhc3MgbmFtZSBhc3NpZ25lZCB0byB0aGUgY3VzdG9tIGxvYWRpbmcgaW5kaWNhdG9yIGltYWdlIiwiZ3JvdXAiOiJMb2FkaW5nIn19fQ==]]]
```

config portion

```
c2tjb21wb25lbnQgInNrYnV0dG9uIiAgaWQ9ImJ0bklEIiBjbGFzcz0iYnRuQ1NTQ2xhc3MiIGxhYmVsPSJidG5MYWJlbCIgdmFsdWU9ImJ0blZhbHVlIiBidXR0b25JbWFnZT0iYnRuSW1nVVJMIiBidXR0b25JbWFnZUNsYXNzPSJidG5JbWdDbGFzcyIgYnV0dG9uSW1hZ2VQbGFjZW1lbnQ9ImxlZnQiIGJ1dHRvblR5cGU9Im5leHQtZXZlbnQiIGZvcm09ImJ0bkZvcm1JRCIgb3RwSW5wdXQ9ImJ0bk9UUElucHV0SUQiIGRlZmF1bHRMb2FkaW5nQ29sb3I9IiIgY3VzdG9tTG9hZGluZ0luZGljYXRvcj0iIiBjdXN0b21Mb2FkaW5nSW5kaWNhdG9yQ2xhc3M9IiI=###eyJuYW1lIjoic2tidXR0b24iLCJvcHRpb25zIjp7ImlkIjoiYnRuSUQiLCJjbGFzcyI6ImJ0bkNTU0NsYXNzIiwibGFiZWwiOiJidG5MYWJlbCIsInZhbHVlIjoiYnRuVmFsdWUiLCJidXR0b25JbWFnZSI6ImJ0bkltZ1VSTCIsImJ1dHRvbkltYWdlQ2xhc3MiOiJidG5JbWdDbGFzcyIsImJ1dHRvbkltYWdlUGxhY2VtZW50IjoibGVmdCIsImJ1dHRvblR5cGUiOiJuZXh0LWV2ZW50IiwiZm9ybSI6ImJ0bkZvcm1JRCIsIm90cElucHV0IjoiYnRuT1RQSW5wdXRJRCIsImRlZmF1bHRMb2FkaW5nQ29sb3IiOiIiLCJjdXN0b21Mb2FkaW5nSW5kaWNhdG9yIjoiIiwiY3VzdG9tTG9hZGluZ0luZGljYXRvckNsYXNzIjoiIn0sImNvbXBvbmVudFByb3BzIjp7ImlkIjp7Im5hbWUiOiJpZCIsImRpc3BsYXlOYW1lIjoiQnV0dG9uIElEIiwiaW5mbyI6IlRoZSBpZCB1c2VkIHRvIHJlcHJlc2VudCBidXR0b25zIGluIHRoZSB0ZW1wbGF0ZS4gVGhpcyBzaG91bGQgYmUgdW5pcXVlLiJ9LCJjbGFzcyI6eyJuYW1lIjoiY2xhc3MiLCJkaXNwbGF5TmFtZSI6IkNTUyBDbGFzcyIsImluZm8iOiJUaGUgY2xhc3MgbmFtZSBhcHBsaWVkIHRvIGJ1dHRvbnMuIn0sImxhYmVsIjp7Im5hbWUiOiJsYWJlbCIsImRpc3BsYXlOYW1lIjoiTGFiZWwiLCJ2YWx1ZSI6IkJ1dHRvbiIsImluZm8iOiJUaGUgYnV0dG9uIGxhYmVsIHRoYXQgd2lsbCBiZSBzZWVuIGluIHRoZSB0ZW1wbGF0ZSJ9LCJ2YWx1ZSI6eyJuYW1lIjoidmFsdWUiLCJkaXNwbGF5TmFtZSI6IkJ1dHRvbiBWYWx1ZSIsImluZm8iOiJUaGUgdmFsdWUgdGhhdCBpcyBhc3NpZ25lZCB0byB0aGUgYnV0dG9uLiBUaGlzIHZhbHVlIHdpbGwgYmUgc2VudCB0byB0aGUgYmFja2VuZCB0byBpZGVudGlmeSB3aGljaCBidXR0b24gd2FzIHByZXNzZWQifSwiYnV0dG9uSW1hZ2UiOnsibmFtZSI6ImJ1dHRvbkltYWdlIiwiZGlzcGxheU5hbWUiOiJCdXR0b24gSW1hZ2UgKFVSTCBmb3IgYW4gaW1hZ2UpIiwiaW5mbyI6IkFuIGltYWdlIHRvIHNob3cgYWxvbmdzaWRlIHRoZSBsYWJlbCIsImdyb3VwIjoiSW1hZ2UifSwiYnV0dG9uSW1hZ2VDbGFzcyI6eyJuYW1lIjoiYnV0dG9uSW1hZ2VDbGFzcyIsImRpc3BsYXlOYW1lIjoiQnV0dG9uIEltYWdlIENsYXNzIiwiaW5mbyI6IlRoZSBjbGFzcyBuYW1lIGFzc2lnbmVkIHRvIHRoZSBidXR0b24gaW1hZ2UiLCJncm91cCI6IkltYWdlIn0sImJ1dHRvbkltYWdlUGxhY2VtZW50Ijp7Im5hbWUiOiJidXR0b25JbWFnZVBsYWNlbWVudCIsImRpc3BsYXlOYW1lIjoiQnV0dG9uIEltYWdlIFBsYWNlbWVudCIsInR5cGUiOiJzZWxlY3QiLCJvcHRpb25zIjpbeyJuYW1lIjoiTGVmdCIsInZhbHVlIjoibGVmdCJ9LHsibmFtZSI6IlJpZ2h0IiwidmFsdWUiOiJyaWdodCJ9XSwiaW5mbyI6IlRoZSBwbGFjZW1lbnQgb2YgdGhlIGltYWdlIHdpdGggcmVzcGVjdCB0byB0aGUgYnV0dG9uIGxhYmVsIiwiZ3JvdXAiOiJJbWFnZSJ9LCJidXR0b25UeXBlIjp7Im5hbWUiOiJidXR0b25UeXBlIiwiZGlzcGxheU5hbWUiOiJCdXR0b24gVHlwZSIsInR5cGUiOiJidXR0b25UeXBlIiwib3B0aW9ucyI6W3sibmFtZSI6IkZvcm0gU3VibWl0IiwidmFsdWUiOiJmb3JtLXN1Ym1pdCJ9LHsibmFtZSI6IkNsZWFyIE1GQSBBdXRoZW50aWNhdGlvbiIsInZhbHVlIjoibWZhLXJlc2V0In0seyJuYW1lIjoiT1RQIiwidmFsdWUiOiJvdHAifSx7Im5hbWUiOiJOZXh0IEV2ZW50IiwidmFsdWUiOiJuZXh0LWV2ZW50In0seyJuYW1lIjoiTnVhbmNlIEF1ZGlvIFJlY29yZGluZyBCdXR0b24iLCJ2YWx1ZSI6Im51YW5jZS1hdWRpbyJ9LHsibmFtZSI6IkJhY2sgdG8gUHJldmlvdXMgTm9kZSIsInZhbHVlIjoiYmFjay10by1wcmV2aW91cyJ9XSwiaW5mbyI6IlRoZSB0eXBlIG9mIGFjdGlvbiB0aGF0IHRyaWdnZXJzIHdoZW4gdGhlIGJ1dHRvbiBpcyBwcmVzc2VkIiwiZ3JvdXAiOiJFdmVudCJ9LCJmb3JtIjp7Im5hbWUiOiJmb3JtIiwiZGlzcGxheU5hbWUiOiJGb3JtIElEIiwiaW5mbyI6IldoZW4gYSBmb3JtLXN1Ym1pdCB0eXBlIGJ1dHRvbiBpcyBwcmVzc2VkLCB0aGlzIGZvcm0gaWQgd2lsbCBiZSB1c2VkIHRvIGdldCB0aGUgZm9ybSB2YWx1ZXMuIiwiZ3JvdXAiOiJFdmVudCJ9LCJvdHBJbnB1dCI6eyJuYW1lIjoib3RwSW5wdXQiLCJkaXNwbGF5TmFtZSI6Ik9UUCBJbnB1dCBJRCIsImluZm8iOiJXaGVuIGEgb3RwIHR5cGUgYnV0dG9uIGlzIHByZXNzZWQsIHRoaXMgaW5wdXQgZmllbGQgaWQgd2lsbCBiZSB1c2VkIHRvIGdldCBvdHAgdmFsdWUuIiwiZ3JvdXAiOiJFdmVudCJ9LCJkZWZhdWx0TG9hZGluZ0NvbG9yIjp7Im5hbWUiOiJkZWZhdWx0TG9hZGluZ0NvbG9yIiwiZGlzcGxheU5hbWUiOiJDb2xvciBvZiBEZWZhdWx0IExvYWRpbmcgSW5kaWNhdG9yIiwiaW5mbyI6IlRoZSBjb2xvciBvZiB0aGUgZGVmYXVsdCBsb2FkaW5nIGFjdGl2aXR5IGluZGljYXRvciBpY29uLiIsImdyb3VwIjoiTG9hZGluZyJ9LCJjdXN0b21Mb2FkaW5nSW5kaWNhdG9yIjp7Im5hbWUiOiJjdXN0b21Mb2FkaW5nSW5kaWNhdG9yIiwiZGlzcGxheU5hbWUiOiJDdXN0b20gTG9hZGluZyBJbmRpY2F0b3IgSW1hZ2UgVVJMIiwiaW5mbyI6IlVybCBvZiBhIGxvYWRpbmcgaW5kaWNhdG9yIGltYWdlLiBUaGlzIHdpbGwgcmVwbGFjZSB0aGUgZGVmYXVsdCBsb2FkaW5nIGluZGljYXRvciBpbWFnZS4iLCJncm91cCI6IkxvYWRpbmcifSwiY3VzdG9tTG9hZGluZ0luZGljYXRvckNsYXNzIjp7Im5hbWUiOiJjdXN0b21Mb2FkaW5nSW5kaWNhdG9yQ2xhc3MiLCJkaXNwbGF5TmFtZSI6IkN1c3RvbSBMb2FkaW5nIEluZGljYXRvciBJbWFnZSBDbGFzcyIsImluZm8iOiJUaGUgY2xhc3MgbmFtZSBhc3NpZ25lZCB0byB0aGUgY3VzdG9tIGxvYWRpbmcgaW5kaWNhdG9yIGltYWdlIiwiZ3JvdXAiOiJMb2FkaW5nIn19fQ==
```

and after base64 decoding the config portion

```
skcomponent "skbutton"  id="btnID" class="btnCSSClass" label="btnLabel" value="btnValue" buttonImage="btnImgURL" buttonImageClass="btnImgClass" buttonImagePlacement="left" buttonType="next-event" form="btnFormID" otpInput="btnOTPInputID" defaultLoadingColor="" customLoadingIndicator="" customLoadingIndicatorClass=""
```

<br>

after configuring every available option in DV and setting event type to "Next
Event" it appears in the rendered html as...

```html
<button
  data-skcustomloadingindicatorclass=""
  data-skcustomloadingindicator=""
  data-skdefaultloadingcolor=""
  data-skbuttonimageclass="btnImgClass"
  data-skbuttonimageplacement="left"
  data-skbuttonimage="btnImgURL"
  data-skotpinput="btnOTPInputID"
  data-skform="btnFormID"
  data-skbuttontype="next-event"
  data-skbuttonvalue="btnValue"
  data-skbuttonevent=""
  data-skvalue="btnValue"
  class="btnCSSClass"
  id="btnID"
  data-skcomponent="skbutton"
  type="button"
>
  <div>
    <img src="btnImgURL" class="btnImgClass" alt="image" />
    btnLabel
  </div>
</button>
```

<br>

after configuring every available option in DV and setting event button type to
"Form Submit" it appears in the rendered html as...

```html
<button
  data-skcustomloadingindicatorclass=""
  data-skcustomloadingindicator=""
  data-skdefaultloadingcolor=""
  data-skbuttonimageclass="btnImgClass"
  data-skbuttonimageplacement="left"
  data-skbuttonimage="btnImgURL"
  data-skotpinput="btnOTPInputID"
  data-skform="btnFormID"
  data-skbuttontype="form-submit"
  data-skbuttonvalue="btnValue"
  data-skbuttonevent=""
  data-skvalue="btnValue"
  class="btnCSSClass"
  id="btnID"
  data-skcomponent="skbutton"
  type="button"
>
  <div>
    <img src="btnImgURL" class="btnImgClass" alt="image" />
    btnLabel
  </div>
</button>
```

if have to revet to using form

```html
<form id="{formID}" method="{formMethod}">
  <input type="hidden" name="{formInputName}" id="{formInputName}" />
  {"{{component.skbutton}}"}
</form>
```

```typescript
const advance = (formID: string) => {
  // Try to get the form by using id
  const formEl: HTMLFormElement | undefined | null =
    document.forms?.namedItem(formID);

  // submit the form by simulating a click if found
  if (formEl) {
    formEl.value = "found-me";
    document.getElementById(formID)?.click();
  }
};
```

## studying the next event button type api call

```
https://auth.pingone.com/d0dd90cf-dbb9-42aa-89c5-56fefdba73c9/davinci/connections/481e952e6b11db8360587b8711620786/capabilities/customHTMLTemplate
```

this is from a working example of the next even button type

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
        "%7B%22XSRF-TOKEN%22%3A%22In9MYnK4-brG1DdpBkqQv0qH-RsohBAYYA50%22%7D",
      "sec-ch-ua":
        '"Google Chrome";v="107", "Chromium";v="107", "Not=A?Brand";v="24"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": '"Windows"',
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin",
    },
    referrer:
      "https://auth.pingone.com/d0dd90cf-dbb9-42aa-89c5-56fefdba73c9/davinci/flows/e05e6cf4c27e44ddaec45fd3664abf2f/authorize?client_id=tryFlow&response_type=code&scope=openid&redirect_uri=https://auth.pingone.com/d0dd90cf-dbb9-42aa-89c5-56fefdba73c9/davinci/testrp&tryFlowToken=00e5e2f0-47ad-4a7d-9d3c-3067274535f1",
    referrerPolicy: "strict-origin-when-cross-origin",
    body: '{"id":"seyn2vfuza","nextEvent":{"constructType":"skEvent","eventName":"continue","params":[],"eventType":"post","postProcess":{}},"parameters":{"buttonType":"next-event","buttonValue":"btnValue"},"eventName":"continue"}',
    method: "POST",
    mode: "cors",
    credentials: "include",
  }
);
```

here's what I currently have running

```js
fetch(
  "https://auth.pingone.com/d0dd90cf-dbb9-42aa-89c5-56fefdba73c9/davinci/connections/481e952e6b11db8360587b8711620786/capabilities/customHTMLTemplate",
  {
    headers: {
      accept: "*/*",
      "accept-language": "en-US,en;q=0.9",
      "content-type": "application/json",
      "sec-ch-ua":
        '"Google Chrome";v="107", "Chromium";v="107", "Not=A?Brand";v="24"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": '"Windows"',
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin",
    },
    referrer:
      "https://auth.pingone.com/d0dd90cf-dbb9-42aa-89c5-56fefdba73c9/davinci/flows/de1ec79ffa4426b3cd90e4b0f423d67c/authorize?client_id=tryFlow&response_type=code&scope=openid&redirect_uri=https://auth.pingone.com/d0dd90cf-dbb9-42aa-89c5-56fefdba73c9/davinci/testrp&tryFlowToken=00e5e2f0-47ad-4a7d-9d3c-3067274535f1",
    referrerPolicy: "strict-origin-when-cross-origin",
    body: '{"eventName":"continue","id":"k24psuiatw","nextEvent":{"constructType":"skEvent","eventName":"continue","params":[],"eventType":"post","postProcess":{}}}',
    method: "POST",
    mode: "cors",
    credentials: "include",
  }
);
```

here are the two bodies

working example

```json
{
  "id": "seyn2vfuza",
  "nextEvent": {
    "constructType": "skEvent",
    "eventName": "continue",
    "params": [],
    "eventType": "post",
    "postProcess": {}
  },
  "parameters": { "buttonType": "next-event", "buttonValue": "btnValue" },
  "eventName": "continue"
}
```

mine

```json
{
  "id": "k24psuiatw",
  "nextEvent": {
    "constructType": "skEvent",
    "eventName": "continue",
    "params": [],
    "eventType": "post",
    "postProcess": {}
  },
  "eventName": "continue"
}
```

test 2 of my app

```js
fetch(
  "https://auth.pingone.com/d0dd90cf-dbb9-42aa-89c5-56fefdba73c9/davinci/connections/481e952e6b11db8360587b8711620786/capabilities/customHTMLTemplate",
  {
    headers: {
      accept: "*/*",
      "accept-language": "en-US,en;q=0.9",
      "content-type": "application/json",
      "sec-ch-ua":
        '"Google Chrome";v="107", "Chromium";v="107", "Not=A?Brand";v="24"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": '"Windows"',
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin",
    },
    referrer:
      "https://auth.pingone.com/d0dd90cf-dbb9-42aa-89c5-56fefdba73c9/davinci/flows/de1ec79ffa4426b3cd90e4b0f423d67c/authorize?client_id=tryFlow&response_type=code&scope=openid&redirect_uri=https://auth.pingone.com/d0dd90cf-dbb9-42aa-89c5-56fefdba73c9/davinci/testrp&tryFlowToken=00e5e2f0-47ad-4a7d-9d3c-3067274535f1",
    referrerPolicy: "strict-origin-when-cross-origin",
    body: '{"eventName":"continue","id":"k24psuiatw","nextEvent":{"constructType":"skEvent","eventName":"continue","params":[],"eventType":"post","postProcess":{}},"parameters":{"buttonType":"next-event","buttonValue":"found-me"}}',
    method: "POST",
    mode: "cors",
    credentials: "include",
  }
);
```

from working example

```json
{
  "id": "seyn2vfuza",
  "nextEvent": {
    "constructType": "skEvent",
    "eventName": "continue",
    "params": [],
    "eventType": "post",
    "postProcess": {}
  },
  "parameters": { "buttonType": "next-event", "buttonValue": "btnValue" },
  "eventName": "continue"
}
```

mine

```json
{
  "id": "k24psuiatw",
  "nextEvent": {
    "constructType": "skEvent",
    "eventName": "continue",
    "params": [],
    "eventType": "post",
    "postProcess": {}
  },
  "parameters": { "buttonType": "next-event", "buttonValue": "found-me" },
  "eventName": "continue"
}
```

## ok, now bodies are essentially the same problem might bein the headers or something of the reqeust

here's the header object of the example:

```json
headers: {
      accept: "*/*",
      "accept-language": "en-US,en;q=0.9",
      "content-type": "application/json",
      interactionid: "undefined",
      interactiontoken: "undefined",
      "origin-cookies":
        "%7B%22XSRF-TOKEN%22%3A%22In9MYnK4-brG1DdpBkqQv0qH-RsohBAYYA50%22%7D",
      "sec-ch-ua":
        '"Google Chrome";v="107", "Chromium";v="107", "Not=A?Brand";v="24"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": '"Windows"',
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin",
    },
```

and my latest test

```json
headers: {
      accept: "*/*",
      "accept-language": "en-US,en;q=0.9",
      "content-type": "application/json",
      "sec-ch-ua":
        '"Google Chrome";v="107", "Chromium";v="107", "Not=A?Brand";v="24"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": '"Windows"',
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin",
    }
```

these were missing from my api call's headers

```json
{
  "interactionid": "undefined",
  "interactiontoken": "undefined",
  "origin-cookies": "%7B%22XSRF-TOKEN%22%3A%22In9MYnK4-brG1DdpBkqQv0qH-RsohBAYYA50%22%7D"
}
```

### I can copy the "interaction-" ones over easier, but is the origin-cookie dependent on the current running flow instance?

here's a closer look at that example's origin-cookie

```
%7B%22XSRF-TOKEN%22%3A%22In9MYnK4-brG1DdpBkqQv0qH-RsohBAYYA50%22%7D
```

which I can url decode **Be careful** when I ran the prettier formatter on this
notes page, it wrapped the value in quotes which don't actually appear in the
above encoded value

```
{"XSRF-TOKEN":"In9MYnK4-brG1DdpBkqQv0qH-RsohBAYYA50"}
```

### It's an **XSRF-token**!

Which is probably needed and the source of the problem because I was getting a
400 HTTP error code which means the server rejects the api call due to some
client side error

<br>

## Now, how do I get an XSRF-Token?

It looks like when you start a flow, an XSRF-TOKEN is automatically generated.
_Along with these other ones (I might need the ineteractionId or
interactionToken)_

```json
[
  {
    "domain": "auth.pingone.com",
    "hostOnly": true,
    "httpOnly": false,
    "name": "XSRF-TOKEN",
    "path": "/",
    "sameSite": null,
    "secure": true,
    "session": true,
    "storeId": null,
    "value": "kYBSfqHg-dampsEiAsiVyA3i8zhcKro_fibw"
  },
  {
    "domain": "auth.pingone.com",
    "expirationDate": 1667825703.626101,
    "hostOnly": true,
    "httpOnly": true,
    "name": "interactionId",
    "path": "/",
    "sameSite": null,
    "secure": false,
    "session": false,
    "storeId": null,
    "value": "00d285bf-14c6-4e15-a843-4b5c362b63c8"
  },
  {
    "domain": "auth.pingone.com",
    "expirationDate": 1667825703.626115,
    "hostOnly": true,
    "httpOnly": true,
    "name": "interactionToken",
    "path": "/",
    "sameSite": null,
    "secure": false,
    "session": false,
    "storeId": null,
    "value": "72f2dc71bed1eaef2a8bb4140a9c37230268fbdc46f2a4cbf860052425c879f4c4876d2cd19701437af3c99f628e943eb95e69a1ea7c323a5766160afeaaf1d15835b38390d1cd55253dafced7a67b83097e256825673ce539f49500373d06f13e3fcf66f1debd9e06c1f1a89a9b634b5a9f16864e2fa5fbee572fc2e4465b22"
  },
  {
    "domain": "auth.pingone.com",
    "expirationDate": 1667825703.626126,
    "hostOnly": true,
    "httpOnly": true,
    "name": "skProxyApiEnvironmentId",
    "path": "/",
    "sameSite": null,
    "secure": false,
    "session": false,
    "storeId": null,
    "value": "us-east-2"
  }
]
```

### how to get a cookie with js

_added code to MotionContainer.tsx_

### test run with headers

test run

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
        "%7B%22XSRF-TOKEN%22%3A%22ROkJCnGs-u04xg5JPaq9p_IMojhJ_c5j8Kpw%22%7D",
      "sec-ch-ua":
        '"Google Chrome";v="107", "Chromium";v="107", "Not=A?Brand";v="24"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": '"Windows"',
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin",
    },
    referrer:
      "https://auth.pingone.com/d0dd90cf-dbb9-42aa-89c5-56fefdba73c9/davinci/flows/de1ec79ffa4426b3cd90e4b0f423d67c/authorize?client_id=tryFlow&response_type=code&scope=openid&redirect_uri=https://auth.pingone.com/d0dd90cf-dbb9-42aa-89c5-56fefdba73c9/davinci/testrp&tryFlowToken=00e5e2f0-47ad-4a7d-9d3c-3067274535f1",
    referrerPolicy: "strict-origin-when-cross-origin",
    body: '{"eventName":"continue","id":"k24psuiatw","nextEvent":{"constructType":"skEvent","eventName":"continue","params":[],"eventType":"post","postProcess":{}},"parameters":{"buttonType":"next-event","buttonValue":"found-me"}}',
    method: "POST",
    mode: "cors",
    credentials: "include",
  }
);
```

here's the cookies using an extension on the browser

```json
[
  {
    "domain": "auth.pingone.com",
    "hostOnly": true,
    "httpOnly": false,
    "name": "XSRF-TOKEN",
    "path": "/",
    "sameSite": null,
    "secure": true,
    "session": true,
    "storeId": null,
    "value": "ROkJCnGs-u04xg5JPaq9p_IMojhJ_c5j8Kpw"
  },
  {
    "domain": "auth.pingone.com",
    "expirationDate": 1667827108.206052,
    "hostOnly": true,
    "httpOnly": true,
    "name": "interactionId",
    "path": "/",
    "sameSite": null,
    "secure": false,
    "session": false,
    "storeId": null,
    "value": "0057c84a-847f-489c-a4b6-b511465d86cc"
  },
  {
    "domain": "auth.pingone.com",
    "expirationDate": 1667827108.206084,
    "hostOnly": true,
    "httpOnly": true,
    "name": "interactionToken",
    "path": "/",
    "sameSite": null,
    "secure": false,
    "session": false,
    "storeId": null,
    "value": "eef015aaa18298c28f739bc78777ef6db959c81f0146dec7f5193fd5e407afdebebf7e3451e406cee30373434222f9ea2a3302afc1242d26f17a2ea4d3d96b7a5fa767205d25754270dc2f3f08e2292ec3d0d6a1047844f574130fe6acb14aa386522aa17cfab0a5e9bceced9a86dee84fbde45b7e27534f144d74056925d5ad"
  },
  {
    "domain": "auth.pingone.com",
    "expirationDate": 1667827101.442697,
    "hostOnly": true,
    "httpOnly": true,
    "name": "skProxyApiEnvironmentId",
    "path": "/",
    "sameSite": null,
    "secure": false,
    "session": false,
    "storeId": null,
    "value": "us-east-2"
  }
]
```

here's what the origin-cookies looks like in the working example

```json
{
  "origin-cookies": "%7B%22XSRF-TOKEN%22%3A%22In9MYnK4-brG1DdpBkqQv0qH-RsohBAYYA50%22%7D"
}
```

this is what my test run is showing was sent

```json
{
  "origin-cookies": "%7B%22XSRF-TOKEN%22%3A%22ROkJCnGs-u04xg5JPaq9p_IMojhJ_c5j8Kpw%22%7D"
}
```

### not sure what happened

here's what the origin-cookies looks like in the working example

```json
{
  "origin-cookies": "%7B%22XSRF-TOKEN%22%3A%22In9MYnK4-brG1DdpBkqQv0qH-RsohBAYYA50%22%7D"
}
```

this is what my test run is showing was sent

```json
{
  "origin-cookies": "%7B%22XSRF-TOKEN%22%3A%22ROkJCnGs-u04xg5JPaq9p_IMojhJ_c5j8Kpw%22%7D"
}
```

it's because I ran JSON stringify. It wrapped the XSRF-TOKEN value with quotes
and those were encoded in the final string output need to strip those out

```
%7B => {
%3A => :
%22 => "
%7D => }
```

working example token oring-cookie value:

```
%7B%22XSRF-TOKEN%22%3A%22In9MYnK4-brG1DdpBkqQv0qH-RsohBAYYA50%22%7D
```

```
%7B
  %22
    XSRF-TOKEN
  %22
  %3A
    %22
      In9MYnK4-brG1DdpBkqQv0qH-RsohBAYYA50
    %22
%7D
```

which can be translated into (by decoding the uri encoded characters)

```
{
  "
    XSRF-TOKEN
  "
  :
  "
    In9MYnK4-brG1DdpBkqQv0qH-RsohBAYYA50
  "
}
```

here's my test run:

```
%7B%22XSRF-TOKEN%22%3A%22ROkJCnGs-u04xg5JPaq9p_IMojhJ_c5j8Kpw%22%7D
```

```
%7B
  %22
    XSRF-TOKEN
  %22
  %3A
  %22
    ROkJCnGs-u04xg5JPaq9p_IMojhJ_c5j8Kpw
  %22
%7D
```

```
{
  "
    XSRF-TOKEN
  "
  :
  "
    ROkJCnGs-u04xg5JPaq9p_IMojhJ_c5j8Kpw
  "
}
```

## latest test run returned 200! but it didn't advance the page to the next node in the flow

is it because I need to manually redirect to the redirectURI? at least, when
making the api call manually instead of via an html form submit.

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
        "%7B%22XSRF-TOKEN%22%3A%220hgPDpvM-qA2e-jNc9J9uW1XmQ439Xx94AC4%22%7D",
      "sec-ch-ua":
        '"Google Chrome";v="107", "Chromium";v="107", "Not=A?Brand";v="24"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": '"Windows"',
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin",
    },
    referrer:
      "https://auth.pingone.com/d0dd90cf-dbb9-42aa-89c5-56fefdba73c9/davinci/flows/de1ec79ffa4426b3cd90e4b0f423d67c/authorize?client_id=tryFlow&response_type=code&scope=openid&redirect_uri=https://auth.pingone.com/d0dd90cf-dbb9-42aa-89c5-56fefdba73c9/davinci/testrp&tryFlowToken=00e5e2f0-47ad-4a7d-9d3c-3067274535f1",
    referrerPolicy: "strict-origin-when-cross-origin",
    body: '{"eventName":"continue","id":"k24psuiatw","nextEvent":{"constructType":"skEvent","eventName":"continue","params":[],"eventType":"post","postProcess":{}},"parameters":{"buttonType":"next-event","buttonValue":"found-me"}}',
    method: "POST",
    mode: "cors",
    credentials: "include",
  }
);
```

and, again, here's our reference example:

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
        "%7B%22XSRF-TOKEN%22%3A%22In9MYnK4-brG1DdpBkqQv0qH-RsohBAYYA50%22%7D",
      "sec-ch-ua":
        '"Google Chrome";v="107", "Chromium";v="107", "Not=A?Brand";v="24"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": '"Windows"',
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin",
    },
    referrer:
      "https://auth.pingone.com/d0dd90cf-dbb9-42aa-89c5-56fefdba73c9/davinci/flows/e05e6cf4c27e44ddaec45fd3664abf2f/authorize?client_id=tryFlow&response_type=code&scope=openid&redirect_uri=https://auth.pingone.com/d0dd90cf-dbb9-42aa-89c5-56fefdba73c9/davinci/testrp&tryFlowToken=00e5e2f0-47ad-4a7d-9d3c-3067274535f1",
    referrerPolicy: "strict-origin-when-cross-origin",
    body: '{"id":"seyn2vfuza","nextEvent":{"constructType":"skEvent","eventName":"continue","params":[],"eventType":"post","postProcess":{}},"parameters":{"buttonType":"next-event","buttonValue":"btnValue"},"eventName":"continue"}',
    method: "POST",
    mode: "cors",
    credentials: "include",
  }
);
```
