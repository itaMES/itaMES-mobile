export const API_TYPE = {
  CORE: 'CORE',
  PRODUCT: 'PRODUCT',
  WAREHOUSE: 'WAREHOUSE',
  EXPORT: 'EXPORT',
};

export const HTTP_CODE = {
  // 2xx
  Success: 200,
  Created: 201,
  NoContent: 204,
  // 4xx
  BadRequest: 400,
  Unauthorized: 401,
  Forbidden: 403,
  NotFound: 404,
  TimeOut: 408,
  Conflict: 409,
  // 5xx
  InternalServerError: 500,
  ServiceUnavailable: 503,
};
