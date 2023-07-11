export class HttpException extends Error {
    constructor(public message: string, public statusCode: number) {
      super(message);
    }
  }

  
export class UrlNotFoundException extends HttpException {
  constructor(public message: string, public statusCode: number = 404) {
    super(message, statusCode);
  }
}