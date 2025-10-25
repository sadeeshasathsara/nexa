/**
 * BASE_URL
 *
 * Base URL for all backend API requests.
 * - Used to construct endpoints for axios or fetch calls in React.
 * - Change this value depending on environment:
 *   - Local development: http://localhost:5000/api/v1
 *   - Production: your deployed backend URL
 *
 * @type {string}
 *
 * @example
 * import BASE_URL from './baseUrl';
 * const res = await axios.get(`${BASE_URL}/login`);
 */
const BASE_URL = 'http://localhost:5000/api/v1';

export default BASE_URL;
