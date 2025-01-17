// adapted from https://tools.ietf.org/html/draft-ietf-jose-json-web-signature-08#appendix-C

export function base64urlEncode(arg: string): string {
  const step1 = btoa(arg); // Regular base64 encoder
  const step2 = step1.split("=")[0]; // Remove any trailing '='s
  const step3 = step2.replace(/\+/g, "-"); // 62nd char of encoding
  const step4 = step3.replace(/\//g, "_"); // 63rd char of encoding
  return step4;
}

export function base64urlDecode(s: string): string {
  const step1 = s.replace(/-/g, "+"); // 62nd char of encoding
  const step2 = step1.replace(/_/g, "/"); // 63rd char of encoding
  let step3 = step2;
  switch (step2.length % 4) { // Pad with trailing '='s
    case 0: // No pad chars in this case
      break;
    case 2: // Two pad chars
      step3 += "==";
      break;
    case 3: // One pad char
      step3 += "=";
      break;
    default:
      throw new Error("Illegal base64url string!");
  }
  return atob(step3); // Regular base64 decoder
}
