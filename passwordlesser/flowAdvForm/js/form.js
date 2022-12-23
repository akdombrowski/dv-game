const crytpo = Crypto.subtle;
const random = Crypto.getRandomValues(new Uint8Array());
let keyPair = await window.crypto.subtle.generateKey(
  {
    name: "RSA-OAEP",
    modulusLength: 4096,
    publicExponent: new Uint8Array([1, 0, 1]),
    hash: "SHA-512",
  },
  true,
  ["encrypt", "decrypt"]
);