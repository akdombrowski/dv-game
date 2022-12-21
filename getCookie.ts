const XSRF_TOKEN_COOKIE_NAME = "XSRF-TOKEN";

const getCookieValue = (name: string) =>
  document.cookie.match("(^|;)\\s*" + name + "\\s*=\\s*([^;]+)")?.pop() || "";

const createXSRFOriginCookieObject = (xsrfToken: string) => {
  return {
    "XSRF-TOKEN": xsrfToken,
  };
};

const getXSRFTokenOriginCookie = () => {
  const xsrfToken = getCookieValue(XSRF_TOKEN_COOKIE_NAME);
  const xsrfTokenOriginCookieHeaderValue =
    createXSRFOriginCookieObject(xsrfToken);
  return xsrfTokenOriginCookieHeaderValue;
};

const getXSRFTokenOriginCookieURIEncoded = () => {
  const xsrfTokenOriginCookieHeaderValue = getXSRFTokenOriginCookie();
  const urlEncodedXSRFTokenOriginCookieHeaderValue = encodeURIComponent(
    JSON.stringify(xsrfTokenOriginCookieHeaderValue)
  );

  return urlEncodedXSRFTokenOriginCookieHeaderValue;
};
