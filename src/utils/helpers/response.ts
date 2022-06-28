import { ApiResponseOptions } from "src/types";

/**
 * Provides helper methods for sending API responses
 */

/**
 * Send GraphQL response
 * @param options - data for response
 */
const graphqlResponse = ({ message, data, status }: ApiResponseOptions) => {
  return { success: true, message, data, status };
};

/**
 * Send successful response
 * @param options - data for response
 */
const successResponse = ({ message, data }: ApiResponseOptions) => {
  return { success: true, message, data, status: 200 };
};

/**
 * Send bad response
 * @param options - data for response
 */
const badResponse = ({ message, errors }: ApiResponseOptions) => {
  return { success: false, message, errors, status: 400 };
};

export { graphqlResponse, successResponse, badResponse };
