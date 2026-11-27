export class HttpError extends Error {
  /**
   * @param {number} status
   * @param {string} message  Human-readable, safe to show to the customer.
   * @param {Record<string, string[]>} [details]  Per-field validation messages.
   * @param {string} [code]  Stable machine-readable code clients can branch on.
   */
  constructor(status, message, details, code) {
    super(message);
    this.status = status;
    this.details = details;
    this.code = code;
  }
}

export const badRequest = (message, details, code) => new HttpError(400, message, details, code);
export const unauthorized = (message = "Authentication required", code) =>
  new HttpError(401, message, undefined, code);
export const forbidden = (message = "You do not have access to this resource", code) =>
  new HttpError(403, message, undefined, code);
export const notFound = (message = "Not found") => new HttpError(404, message);
export const conflict = (message) => new HttpError(409, message);
export const tooManyRequests = (message, code) => new HttpError(429, message, undefined, code);
export const serviceUnavailable = (message) => new HttpError(503, message);
