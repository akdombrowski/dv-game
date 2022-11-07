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
<head><!-- Flow loading props--><title>DaVinci Authentication Widget</title><!-- singularkey-styles--><meta name="viewport" content="width=device-width, initial-scale=1"><link href="https://auth.pingone.com/d0dd90cf-dbb9-42aa-89c5-56fefdba73c9/davinci/flows/e05e6cf4c27e44ddaec45fd3664abf2f/css" rel="stylesheet" type="text/css"><link rel="shortcut icon" href="https://assets.singularkey.com/assets/favicon-davinci.png"><!-- Load custom css files from flow settings--><script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha512-894YE6QWD5I59HgZOGReFYm4dnWc1Qt5NtvYSaNcOP+u1T9qYdvdihz0PPSiiqn/+/3e7Jo4EaG7TubfWGUrMQ==" crossorigin="anonymous"></script>
</head>
