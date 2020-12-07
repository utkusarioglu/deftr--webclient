import type { ServerRequest } from '../../../../../deftr--public-api/src';

/**
 * Picks the information that is required by the user from the login messagelet
 * of {@link ServerRequest}
 */
export type LoginMessageletUserInput = Pick<
  NonNullable<ServerRequest['login']>,
  'username' | 'password'
>;
