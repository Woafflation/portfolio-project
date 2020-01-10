/**
 * @typedef {{
 *   id: number,
 *   name: string,
 *   email: string,
 * }} User
 */

/**
 * @typedef {{
 *   token: string|null,
 *   user: User|null,
 *   status: AuthStatus,
 *   error: string|null,
 *   refreshTokenPromise: Promise|null
 * }} AuthState
 */

/**
 * @typedef {{
 *   name: string,
 *   password: string,
 * }} LoginFormData
 */

/**
 * @typedef {{
 *   data: {
 *     user: User,
 *     token: string,
 *   }
 * }} LoginResponse
 */

/**
 * @typedef {{
 *   data: {
 *     user: User,
 *   }
 * }} AuthCheckResponse
 */

/**
 * @typedef {{
 *   old_password: string,
 *   new_password: string
 * }} ChangePasswordFormData
 */
