# here's a working example to reference when we try to advance to the next node in the flow from a custom html template node manually

### this example uses an html form submit in order to POST to the server

<br>
<br>
<br>

## here's the network call made by clicking on an skcomponent button of type "Next Event"

<br>

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
        "%7B%22XSRF-TOKEN%22%3A%22LbQHwls6-76Chk_px-kMFfpDQyaMI0dK3TdY%22%7D",
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

<br>

the server's response is the data of the next node

_(in this case there's just an html message serving as the next node in the
flow)_

```json
{
  "id": "llhioq8qtg",
  "companyId": "d0dd90cf-dbb9-42aa-89c5-56fefdba73c9",
  "flowId": "e05e6cf4c27e44ddaec45fd3664abf2f",
  "connectionId": "481e952e6b11db8360587b8711620786",
  "capabilityName": "customHtmlMessage",
  "screen": {
    "name": "HTTP",
    "properties": {
      "messageIcon": {
        "type": "string",
        "displayName": "Message Icon URL",
        "createdDate": 1661888956072,
        "customerId": "ecb9bf8a2fab854e65045d02cb6bab50",
        "companyId": "singularkey",
        "preferredControlType": "textField",
        "enableParameters": true
      },
      "messageIconHeight": {
        "type": "number",
        "displayName": "Message Icon Height (in pixels)",
        "createdDate": 1661888956021,
        "customerId": "ecb9bf8a2fab854e65045d02cb6bab50",
        "companyId": "singularkey",
        "preferredControlType": "textField"
      },
      "messageTitle": {
        "type": "string",
        "displayName": "Message Title",
        "createdDate": 1661888956071,
        "customerId": "ecb9bf8a2fab854e65045d02cb6bab50",
        "companyId": "singularkey",
        "preferredControlType": "textField",
        "enableParameters": true,
        "value": "Success!",
        "cssValue": ""
      },
      "message": {
        "type": "string",
        "displayName": "Message",
        "createdDate": 1661888956007,
        "customerId": "ecb9bf8a2fab854e65045d02cb6bab50",
        "companyId": "singularkey",
        "preferredControlType": "textArea",
        "value": "",
        "enableParameters": true,
        "cssValue": ""
      },
      "showFooter": {
        "type": "boolean",
        "displayName": "Show Footer",
        "value": true,
        "createdDate": 1661888956016,
        "customerId": "ecb9bf8a2fab854e65045d02cb6bab50",
        "companyId": "singularkey",
        "preferredControlType": "toggleSwitch"
      },
      "button": {
        "constructType": "button",
        "displayName": "Submit",
        "createdDate": 1661888955897,
        "customerId": "ecb9bf8a2fab854e65045d02cb6bab50",
        "companyId": "singularkey",
        "logo": "",
        "showLogo": true,
        "preferredControlType": "button",
        "css": { "backgroundColor": "#1CAB42", "color": "#ffffff" },
        "onClick": {
          "constructType": "skEvent",
          "eventName": "continue",
          "params": [],
          "eventType": "post",
          "postProcess": {}
        }
      },
      "challenge": {
        "type": "string",
        "displayName": "Challenge",
        "createdDate": 1661888956012,
        "customerId": "ecb9bf8a2fab854e65045d02cb6bab50",
        "companyId": "singularkey",
        "preferredControlType": "textField",
        "enableParameters": true
      },
      "enablePolling": {
        "type": "boolean",
        "displayName": "Enable Polling?",
        "createdDate": 1661888956016,
        "customerId": "ecb9bf8a2fab854e65045d02cb6bab50",
        "companyId": "singularkey",
        "preferredControlType": "toggleSwitch",
        "value": false,
        "constructType": "skEvent",
        "eventName": "polling",
        "params": [],
        "eventType": "post"
      },
      "pollInterval": {
        "type": "number",
        "displayName": "Poll Interval (ms)",
        "value": 2000,
        "visibility": [{ "enablePolling": true }],
        "createdDate": 1661888955879,
        "customerId": "ecb9bf8a2fab854e65045d02cb6bab50",
        "companyId": "singularkey",
        "preferredControlType": "textField"
      },
      "pollRetries": {
        "type": "number",
        "displayName": "Number of Poll Retries",
        "value": 60,
        "visibility": [{ "enablePolling": true }],
        "createdDate": 1661888956065,
        "customerId": "ecb9bf8a2fab854e65045d02cb6bab50",
        "companyId": "singularkey",
        "preferredControlType": "textField"
      },
      "pollChallengeStatus": {
        "type": "boolean",
        "displayName": "Poll Challenge Status",
        "value": true,
        "info": "By default, poll challenge status. If set to false, it'll continue to the next node and poll if continue polling node is encountered.",
        "visibility": [{ "enablePolling": true }],
        "createdDate": 1661888956010,
        "customerId": "ecb9bf8a2fab854e65045d02cb6bab50",
        "companyId": "singularkey",
        "preferredControlType": "toggleSwitch"
      },
      "showContinueButton": {
        "type": "boolean",
        "displayName": "Show Continue Button?",
        "value": false,
        "createdDate": 1661888956015,
        "customerId": "ecb9bf8a2fab854e65045d02cb6bab50",
        "companyId": "singularkey",
        "preferredControlType": "toggleSwitch"
      }
    },
    "userViews": [
      {
        "screenTemplateName": "MessageScreen",
        "items": [
          { "propertyName": "messageIcon" },
          { "propertyName": "messageIconHeight" },
          { "propertyName": "messageTitle" },
          { "propertyName": "message" },
          { "propertyName": "showFooter" },
          { "propertyName": "button" },
          { "propertyName": "challenge" },
          { "propertyName": "enablePolling" },
          { "propertyName": "pollInterval" },
          { "propertyName": "pollRetries" },
          { "propertyName": "pollChallengeStatus" },
          { "propertyName": "showContinueButton" }
        ]
      }
    ],
    "metadata": {
      "colors": {
        "canvas": "#AFD5FF",
        "canvasText": "#253746",
        "dark": "#2E5EA6"
      },
      "logos": { "canvas": { "imageFileName": "http.svg" } }
    }
  },
  "interactionId": "0049ac80-edd2-4bad-b494-7575549b9ee8",
  "interactionToken": "8f95531135279edd776c3a1166ef3fe5d24e824e9ac3e0f945ceeebbbec7ba23c27a921e10e341bf8cece85df9ffd5b871810dde8a39b6052b37455858cc4b824031dc346370750979c57934651350328b51acae17fd3f04dec3a97ec0777c6f6871640c86a6674245e6cd25811fc90ac4fd55988203445c89dbe83505c00f79",
  "skProxyApiEnvironmentId": "us-east-2"
}
```

<br>

interactionId cookie in response:

```json
{
  "domain": "auth.pingone.com",
  "expirationDate": 1667830241.742772,
  "hostOnly": true,
  "httpOnly": true,
  "name": "interactionId",
  "path": "/",
  "sameSite": null,
  "secure": false,
  "session": false,
  "storeId": null,
  "value": "0049ac80-edd2-4bad-b494-7575549b9ee8"
}
```

<br>

headers in server's response:

```
credentials: true
access-control-allow-origin: *
cache-control: no-cache, no-store, must-revalidate
content-encoding: gzip
content-length: 1291
content-type: application/json; charset=utf-8
correlation-id: b45121c2-b66d-430c-aedc-1133fcb6fef0
date: Mon, 07 Nov 2022 13:55:41 GMT
etag: W/"1134-YcYQn/3aw2ZdOP2nY2bbgogZ4Lc"
expires: -1
pragma: no-cache
set-cookie: interactionId=0049ac80-edd2-4bad-b494-7575549b9ee8; Max-Age=900; Path=/; Expires=Mon, 07 Nov 2022 14:10:41 GMT; HttpOnly
set-cookie: interactionToken=8f95531135279edd776c3a1166ef3fe5d24e824e9ac3e0f945ceeebbbec7ba23c27a921e10e341bf8cece85df9ffd5b871810dde8a39b6052b37455858cc4b824031dc346370750979c57934651350328b51acae17fd3f04dec3a97ec0777c6f6871640c86a6674245e6cd25811fc90ac4fd55988203445c89dbe83505c00f79; Max-Age=900; Path=/; Expires=Mon, 07 Nov 2022 14:10:41 GMT; HttpOnly
strict-transport-security: max-age=15552000; includeSubDomains
via: 1.1 linkerd, 1.1 a858bc3774f10c94d8baa59c0578ea78.cloudfront.net (CloudFront)
x-amz-apigw-id: bO8upHRiiYcFgZA=
x-amz-cf-id: FTZ53szilDMzL_rZJqgQZkag1vBBUXE_QRQoYCLt-eD2UHC6OHJFTg==
x-amz-cf-pop: DFW56-P3
x-amzn-remapped-content-length: 1291
x-amzn-remapped-date: Mon, 07 Nov 2022 13:55:41 GMT
x-amzn-requestid: b45121c2-b66d-430c-aedc-1133fcb6fef0
x-cache: Miss from cloudfront
x-content-type-options: nosniff
x-dns-prefetch-control: off
x-download-options: noopen
x-frame-options: SAMEORIGIN
x-xss-protection: 1; mode=block
```

<br>

here's the entire html page being rendered in the browser

```html
<head>
  <!-- Flow loading props-->
  <title>DaVinci Authentication Widget</title>
  <!-- singularkey-styles-->
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link
    href="https://auth.pingone.com/d0dd90cf-dbb9-42aa-89c5-56fefdba73c9/davinci/flows/e05e6cf4c27e44ddaec45fd3664abf2f/css"
    rel="stylesheet"
    type="text/css"
  />
  <link
    rel="shortcut icon"
    href="https://assets.singularkey.com/assets/favicon-davinci.png"
  />
  <!-- Load custom css files from flow settings-->
  <script
    src="https://code.jquery.com/jquery-3.6.0.min.js"
    integrity="sha512-894YE6QWD5I59HgZOGReFYm4dnWc1Qt5NtvYSaNcOP+u1T9qYdvdihz0PPSiiqn/+/3e7Jo4EaG7TubfWGUrMQ=="
    crossorigin="anonymous"
  ></script>
</head>
<body>
  <!-- Flow loading props-->
  <div>
    <div id="widgetContainer">
      <div>
        <div
          style="--primary-color: #4462ED;"
          class="reactSingularKey_bodyContainer styles_bodyContainer__3Gt3B"
        >
          <div></div>
          <div
            style="--primary-color: #4462ED;"
            class="reactSingularKey_CC_main_generic styles_CC_main_generic__38Quz "
          >
            <div>
              <div id="test">
                <button
                  data-skcustomloadingindicatorclass=""
                  data-skcustomloadingindicator=""
                  data-skdefaultloadingcolor=""
                  data-skbuttonimageclass=""
                  data-skbuttonimageplacement=""
                  data-skbuttonimage=""
                  data-skotpinput=""
                  data-skform=""
                  data-skbuttontype="next-event"
                  data-skbuttonvalue="btnValue"
                  data-skbuttonevent=""
                  data-skvalue="btnValue"
                  class="btnCSSClass"
                  id="btnID"
                  data-skcomponent="skbutton"
                  type="button"
                >
                  <div>btnLabel</div>
                </button>
              </div>
            </div>
          </div>
          <div
            style="--primary-color: #4462ED;"
            class="reactSingularKey_skOnfidoContainer styles_skOnfidoContainer__rZvwB"
            id="onfido-mount"
          ></div>
        </div>
      </div>
    </div>
  </div>
  <!-- Load react-sk widget-->
  <script src="https://assets.pingone.com/davinci/latest/davinci.js"></script>
  <script type="text/javascript">
    var skProps = {
      id: "seyn2vfuza",
      companyId: "d0dd90cf-dbb9-42aa-89c5-56fefdba73c9",
      flowId: "e05e6cf4c27e44ddaec45fd3664abf2f",
      connectionId: "481e952e6b11db8360587b8711620786",
      capabilityName: "customHTMLTemplate",
      screen: {
        name: "HTTP",
        properties: {
          sktemplate: {
            type: "string",
            displayName: "Template",
            createdDate: 1661888956023,
            customerId: "ecb9bf8a2fab854e65045d02cb6bab50",
            companyId: "singularkey",
          },
          customHTML: {
            type: "string",
            displayName: "HTML Template",
            createdDate: 1661888956006,
            customerId: "ecb9bf8a2fab854e65045d02cb6bab50",
            companyId: "singularkey",
            preferredControlType: "textArea",
            enableParameters: true,
            maximizeToggle: true,
            viewToggle: true,
            largePayload: true,
            value:
              '<div id="test">\n  [[[skcomponent###c2tjb21wb25lbnQgInNrYnV0dG9uIiAgaWQ9ImJ0bklEIiBjbGFzcz0iYnRuQ1NTQ2xhc3MiIGxhYmVsPSJidG5MYWJlbCIgdmFsdWU9ImJ0blZhbHVlIiBidXR0b25JbWFnZT0iIiBidXR0b25JbWFnZUNsYXNzPSIiIGJ1dHRvbkltYWdlUGxhY2VtZW50PSIiIGJ1dHRvblR5cGU9Im5leHQtZXZlbnQiIGZvcm09IiIgb3RwSW5wdXQ9IiIgZGVmYXVsdExvYWRpbmdDb2xvcj0iIiBjdXN0b21Mb2FkaW5nSW5kaWNhdG9yPSIiIGN1c3RvbUxvYWRpbmdJbmRpY2F0b3JDbGFzcz0iIg==###eyJuYW1lIjoic2tidXR0b24iLCJvcHRpb25zIjp7ImlkIjoiYnRuSUQiLCJjbGFzcyI6ImJ0bkNTU0NsYXNzIiwibGFiZWwiOiJidG5MYWJlbCIsInZhbHVlIjoiYnRuVmFsdWUiLCJidXR0b25JbWFnZSI6IiIsImJ1dHRvbkltYWdlQ2xhc3MiOiIiLCJidXR0b25JbWFnZVBsYWNlbWVudCI6IiIsImJ1dHRvblR5cGUiOiJuZXh0LWV2ZW50IiwiZm9ybSI6IiIsIm90cElucHV0IjoiIiwiZGVmYXVsdExvYWRpbmdDb2xvciI6IiIsImN1c3RvbUxvYWRpbmdJbmRpY2F0b3IiOiIiLCJjdXN0b21Mb2FkaW5nSW5kaWNhdG9yQ2xhc3MiOiIifSwiY29tcG9uZW50UHJvcHMiOnsiaWQiOnsibmFtZSI6ImlkIiwiZGlzcGxheU5hbWUiOiJCdXR0b24gSUQiLCJpbmZvIjoiVGhlIGlkIHVzZWQgdG8gcmVwcmVzZW50IGJ1dHRvbnMgaW4gdGhlIHRlbXBsYXRlLiBUaGlzIHNob3VsZCBiZSB1bmlxdWUuIn0sImNsYXNzIjp7Im5hbWUiOiJjbGFzcyIsImRpc3BsYXlOYW1lIjoiQ1NTIENsYXNzIiwiaW5mbyI6IlRoZSBjbGFzcyBuYW1lIGFwcGxpZWQgdG8gYnV0dG9ucy4ifSwibGFiZWwiOnsibmFtZSI6ImxhYmVsIiwiZGlzcGxheU5hbWUiOiJMYWJlbCIsInZhbHVlIjoiQnV0dG9uIiwiaW5mbyI6IlRoZSBidXR0b24gbGFiZWwgdGhhdCB3aWxsIGJlIHNlZW4gaW4gdGhlIHRlbXBsYXRlIn0sInZhbHVlIjp7Im5hbWUiOiJ2YWx1ZSIsImRpc3BsYXlOYW1lIjoiQnV0dG9uIFZhbHVlIiwiaW5mbyI6IlRoZSB2YWx1ZSB0aGF0IGlzIGFzc2lnbmVkIHRvIHRoZSBidXR0b24uIFRoaXMgdmFsdWUgd2lsbCBiZSBzZW50IHRvIHRoZSBiYWNrZW5kIHRvIGlkZW50aWZ5IHdoaWNoIGJ1dHRvbiB3YXMgcHJlc3NlZCJ9LCJidXR0b25JbWFnZSI6eyJuYW1lIjoiYnV0dG9uSW1hZ2UiLCJkaXNwbGF5TmFtZSI6IkJ1dHRvbiBJbWFnZSAoVVJMIGZvciBhbiBpbWFnZSkiLCJpbmZvIjoiQW4gaW1hZ2UgdG8gc2hvdyBhbG9uZ3NpZGUgdGhlIGxhYmVsIiwiZ3JvdXAiOiJJbWFnZSJ9LCJidXR0b25JbWFnZUNsYXNzIjp7Im5hbWUiOiJidXR0b25JbWFnZUNsYXNzIiwiZGlzcGxheU5hbWUiOiJCdXR0b24gSW1hZ2UgQ2xhc3MiLCJpbmZvIjoiVGhlIGNsYXNzIG5hbWUgYXNzaWduZWQgdG8gdGhlIGJ1dHRvbiBpbWFnZSIsImdyb3VwIjoiSW1hZ2UifSwiYnV0dG9uSW1hZ2VQbGFjZW1lbnQiOnsibmFtZSI6ImJ1dHRvbkltYWdlUGxhY2VtZW50IiwiZGlzcGxheU5hbWUiOiJCdXR0b24gSW1hZ2UgUGxhY2VtZW50IiwidHlwZSI6InNlbGVjdCIsIm9wdGlvbnMiOlt7Im5hbWUiOiJMZWZ0IiwidmFsdWUiOiJsZWZ0In0seyJuYW1lIjoiUmlnaHQiLCJ2YWx1ZSI6InJpZ2h0In1dLCJpbmZvIjoiVGhlIHBsYWNlbWVudCBvZiB0aGUgaW1hZ2Ugd2l0aCByZXNwZWN0IHRvIHRoZSBidXR0b24gbGFiZWwiLCJncm91cCI6IkltYWdlIn0sImJ1dHRvblR5cGUiOnsibmFtZSI6ImJ1dHRvblR5cGUiLCJkaXNwbGF5TmFtZSI6IkJ1dHRvbiBUeXBlIiwidHlwZSI6ImJ1dHRvblR5cGUiLCJvcHRpb25zIjpbeyJuYW1lIjoiRm9ybSBTdWJtaXQiLCJ2YWx1ZSI6ImZvcm0tc3VibWl0In0seyJuYW1lIjoiQ2xlYXIgTUZBIEF1dGhlbnRpY2F0aW9uIiwidmFsdWUiOiJtZmEtcmVzZXQifSx7Im5hbWUiOiJPVFAiLCJ2YWx1ZSI6Im90cCJ9LHsibmFtZSI6Ik5leHQgRXZlbnQiLCJ2YWx1ZSI6Im5leHQtZXZlbnQifSx7Im5hbWUiOiJOdWFuY2UgQXVkaW8gUmVjb3JkaW5nIEJ1dHRvbiIsInZhbHVlIjoibnVhbmNlLWF1ZGlvIn0seyJuYW1lIjoiQmFjayB0byBQcmV2aW91cyBOb2RlIiwidmFsdWUiOiJiYWNrLXRvLXByZXZpb3VzIn1dLCJpbmZvIjoiVGhlIHR5cGUgb2YgYWN0aW9uIHRoYXQgdHJpZ2dlcnMgd2hlbiB0aGUgYnV0dG9uIGlzIHByZXNzZWQiLCJncm91cCI6IkV2ZW50In0sImZvcm0iOnsibmFtZSI6ImZvcm0iLCJkaXNwbGF5TmFtZSI6IkZvcm0gSUQiLCJpbmZvIjoiV2hlbiBhIGZvcm0tc3VibWl0IHR5cGUgYnV0dG9uIGlzIHByZXNzZWQsIHRoaXMgZm9ybSBpZCB3aWxsIGJlIHVzZWQgdG8gZ2V0IHRoZSBmb3JtIHZhbHVlcy4iLCJncm91cCI6IkV2ZW50In0sIm90cElucHV0Ijp7Im5hbWUiOiJvdHBJbnB1dCIsImRpc3BsYXlOYW1lIjoiT1RQIElucHV0IElEIiwiaW5mbyI6IldoZW4gYSBvdHAgdHlwZSBidXR0b24gaXMgcHJlc3NlZCwgdGhpcyBpbnB1dCBmaWVsZCBpZCB3aWxsIGJlIHVzZWQgdG8gZ2V0IG90cCB2YWx1ZS4iLCJncm91cCI6IkV2ZW50In0sImRlZmF1bHRMb2FkaW5nQ29sb3IiOnsibmFtZSI6ImRlZmF1bHRMb2FkaW5nQ29sb3IiLCJkaXNwbGF5TmFtZSI6IkNvbG9yIG9mIERlZmF1bHQgTG9hZGluZyBJbmRpY2F0b3IiLCJpbmZvIjoiVGhlIGNvbG9yIG9mIHRoZSBkZWZhdWx0IGxvYWRpbmcgYWN0aXZpdHkgaW5kaWNhdG9yIGljb24uIiwiZ3JvdXAiOiJMb2FkaW5nIn0sImN1c3RvbUxvYWRpbmdJbmRpY2F0b3IiOnsibmFtZSI6ImN1c3RvbUxvYWRpbmdJbmRpY2F0b3IiLCJkaXNwbGF5TmFtZSI6IkN1c3RvbSBMb2FkaW5nIEluZGljYXRvciBJbWFnZSBVUkwiLCJpbmZvIjoiVXJsIG9mIGEgbG9hZGluZyBpbmRpY2F0b3IgaW1hZ2UuIFRoaXMgd2lsbCByZXBsYWNlIHRoZSBkZWZhdWx0IGxvYWRpbmcgaW5kaWNhdG9yIGltYWdlLiIsImdyb3VwIjoiTG9hZGluZyJ9LCJjdXN0b21Mb2FkaW5nSW5kaWNhdG9yQ2xhc3MiOnsibmFtZSI6ImN1c3RvbUxvYWRpbmdJbmRpY2F0b3JDbGFzcyIsImRpc3BsYXlOYW1lIjoiQ3VzdG9tIExvYWRpbmcgSW5kaWNhdG9yIEltYWdlIENsYXNzIiwiaW5mbyI6IlRoZSBjbGFzcyBuYW1lIGFzc2lnbmVkIHRvIHRoZSBjdXN0b20gbG9hZGluZyBpbmRpY2F0b3IgaW1hZ2UiLCJncm91cCI6IkxvYWRpbmcifX19]]]\n</div>',
          },
          validationRules: {
            type: "object",
            displayName: "Form validation rules",
            value: [],
            info: "Rules to check to validate form inputs",
            createdDate: 1661888956003,
            customerId: "ecb9bf8a2fab854e65045d02cb6bab50",
            companyId: "singularkey",
            preferredControlType: "validationRules",
          },
          customCSS: {
            type: "string",
            displayName: "CSS",
            createdDate: 1661888956064,
            customerId: "ecb9bf8a2fab854e65045d02cb6bab50",
            companyId: "singularkey",
            preferredControlType: "codeEditor",
            language: "css",
            maximizeToggle: true,
            largePayload: true,
          },
          customScript: {
            type: "string",
            displayName: "Script",
            createdDate: 1661888956072,
            customerId: "ecb9bf8a2fab854e65045d02cb6bab50",
            companyId: "singularkey",
            preferredControlType: "codeEditor",
            value: "",
            language: "javascript",
            maximizeToggle: true,
          },
          inputSchema: {
            type: "string",
            displayName: "Input Schema",
            createdDate: 1661888956068,
            customerId: "ecb9bf8a2fab854e65045d02cb6bab50",
            companyId: "singularkey",
            preferredControlType: "codeEditor",
            language: "json",
            info: "Follow example for JSON schema.",
            maximizeToggle: true,
          },
          outputSchema: {
            type: "string",
            displayName: "Output Schema",
            createdDate: 1661888956110,
            customerId: "ecb9bf8a2fab854e65045d02cb6bab50",
            companyId: "singularkey",
            preferredControlType: "codeEditor",
            language: "json",
            info: "Follow example for JSON schema.",
            maximizeToggle: true,
          },
          formFieldsList: {
            type: "array",
            constructType: "formFieldsList",
            displayName: "Output Fields List",
            createdDate: 1661888956023,
            customerId: "ecb9bf8a2fab854e65045d02cb6bab50",
            companyId: "singularkey",
            preferredControlType: "formFieldsList",
            hideLabel: false,
            value: [
              {
                preferredControlType: "textField",
                preferredDataType: "string",
                propertyName: "buttonValue",
              },
            ],
          },
          challenge: {
            type: "string",
            displayName: "Challenge",
            createdDate: 1661888956012,
            customerId: "ecb9bf8a2fab854e65045d02cb6bab50",
            companyId: "singularkey",
            preferredControlType: "textField",
            enableParameters: true,
          },
          button: {
            constructType: "button",
            displayName: "Submit",
            createdDate: 1661888955897,
            customerId: "ecb9bf8a2fab854e65045d02cb6bab50",
            companyId: "singularkey",
            logo: "",
            showLogo: true,
            preferredControlType: "button",
            css: { backgroundColor: "#1CAB42", color: "#ffffff" },
            onClick: {
              constructType: "skEvent",
              eventName: "continue",
              params: [],
              eventType: "post",
              postProcess: {},
            },
          },
        },
        userViews: [
          {
            screenTemplateName: "CustomHTMLTemplate",
            items: [
              { propertyName: "sktemplate" },
              { propertyName: "customHTML" },
              { propertyName: "validationRules" },
              { propertyName: "customCSS" },
              { propertyName: "customScript" },
              { propertyName: "inputSchema" },
              { propertyName: "outputSchema" },
              { propertyName: "formFieldsList" },
              { propertyName: "challenge" },
              { propertyName: "button" },
            ],
          },
        ],
        metadata: {
          colors: { canvas: "#AFD5FF", canvasText: "#253746", dark: "#2E5EA6" },
          logos: { canvas: { imageFileName: "http.svg" } },
        },
      },
      interactionId: "000cec15-1b5e-4756-9de7-f7e7779e41fd",
      interactionToken:
        "fb0e59b3ce79750dd9e4d8070e30947f033b97357a3c90382fcf87521790b8e1f6b9dff3a453323d2c880cc19a4a1e8a0badbdd18037a8612c6d3725fe65d198c4ec3e30056f0b7603678f4874c5818e6df31cfa7ab143ab0d213e0425f9c660b7ed650fd96bbc6f9d9894c50fdf8b108379f967df5e63613a4c60ddabfd222f",
      skProxyApiEnvironmentId: "us-east-2",
      csrfToken: "7HYzwH37-LSiXq1lDFdzcivVyORuVJV-MDH4",
    };
    var skLoadingProps = {
      intermediateLoadingScreenHTML: null,
      intermediateLoadingScreenCSS: null,
      customTitle: null,
      customFaviconLink: null,
    };

    function processCallback(payload) {}
    function loadIt() {
      var param = { config: skProps, skLoadingProps };

      davinci.renderScreen(
        $("#widgetContainer").get(0),
        param,
        processCallback
      );
    }
    loadIt();
  </script>
  <!-- Load custom javascript files from flow settings-->
  <div style="position: static !important;"></div>
</body>
```
