// /v1/flows/d341957adf80747506e26bfff132fb02

const responseOPTIONS = async () => {
  return fetch("https://orchestrate-api.pingone.com/v1/flows?details", {
    headers: {
      accept: "*/*",
      "accept-language": "en-US,en;q=0.9,ja-JP;q=0.8,ja;q=0.7",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-site",
      Referer: "https://console.pingone.com/",
      "Referrer-Policy": "strict-origin-when-cross-origin",
    },
    body: null,
    method: "OPTIONS",
  });
};
const cookies = [
  {
    domain: "console.pingone.com",
    expirationDate: 1681344924,
    hostOnly: true,
    httpOnly: false,
    name: "adminui-context",
    path: "/",
    sameSite: null,
    secure: false,
    session: false,
    storeId: null,
    value: "6f04905c-9d86-4012-95c1-16486d20e26e",
  },
  {
    domain: "console.pingone.com",
    expirationDate: 1680480924,
    hostOnly: true,
    httpOnly: false,
    name: "license-expiring-age",
    path: "/",
    sameSite: null,
    secure: false,
    session: false,
    storeId: null,
    value: "undefined",
  },
];
// const response = async () => {
//   return fetch("https://orchestrate-api.pingone.com/v1/flows?details", {
//     headers: {
//       accept: "*/*",
//       "accept-language": "en-US,en;q=0.9,ja-JP;q=0.8,ja;q=0.7",
//       authorization: "Bearer 0000602f-2ce3-4493-8b9b-1577de0cde38",
//       "content-type": "application/json",
//       "sec-ch-ua":
//         '"Not?A_Brand";v="8", "Chromium";v="108", "Google Chrome";v="108"',
//       "sec-ch-ua-mobile": "?0",
//       "sec-ch-ua-platform": '"Windows"',
//       "sec-fetch-dest": "empty",
//       "sec-fetch-mode": "cors",
//       "sec-fetch-site": "same-site",
//       "x-client-version": "1.0.91",
//       Referer: "https://console.pingone.com/",
//       // "Referrer-Policy": "strict-origin-when-cross-origin",
//       "Access-Control-Allow-Headers": "*",
//     },
//     body: null,
//     method: "GET",
//   });
// };
const response = async () => {
  return fetch("https://orchestrate-api.pingone.com/v1/flows?details", {
    headers: {
      accept: "*/*",
      "accept-language": "en-US,en;q=0.9,ja-JP;q=0.8,ja;q=0.7",
      authorization: "Bearer 0000602f-2ce3-4493-8b9b-1577de0cde38",
      "content-type": "application/json",
      "sec-ch-ua":
        '"Not?A_Brand";v="8", "Chromium";v="108", "Google Chrome";v="108"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": '"Windows"',
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "navigate",
      "sec-fetch-site": "same-site",
      "x-client-version": "1.0.91",
      Referer: "https://console.pingone.com/",
      "Referrer-Policy": "strict-origin-when-cross-origin",
      "Access-Control-Allow-Headers": "*",
    },
    body: null,
    method: "GET",
  });
};

const awaitedResponseOPTIONS = await responseOPTIONS();
const awaitedResponse = await response();
console.log(awaitedResponseOPTIONS);
console.log(awaitedResponse);
console.log(awaitedResponse);

fetch("https://orchestrate-api.pingone.com/v1/flows?details", {
  headers: {
    accept: "*/*",
    "accept-language": "en-US,en;q=0.9,ja-JP;q=0.8,ja;q=0.7",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-site",
    Referer: "https://console.pingone.com/",
    "Referrer-Policy": "strict-origin-when-cross-origin",
  },
  body: null,
  method: "OPTIONS",
});

fetch("https://orchestrate-api.pingone.com/v1/flows?details", {
  headers: {
    accept: "*/*",
    "accept-language": "en-US,en;q=0.9,ja-JP;q=0.8,ja;q=0.7",
    authorization: "Bearer 0000602f-2ce3-4493-8b9b-1577de0cde38",
    "content-type": "application/json",
    "sec-ch-ua":
      '"Not?A_Brand";v="8", "Chromium";v="108", "Google Chrome";v="108"',
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": '"Windows"',
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-site",
    "x-client-version": "1.0.91",
    Referer: "https://console.pingone.com/",
    "Referrer-Policy": "strict-origin-when-cross-origin",
  },
  body: null,
  method: "GET",
});
