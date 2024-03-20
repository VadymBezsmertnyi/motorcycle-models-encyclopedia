import { t } from '@lingui/macro';
import { I18n } from '@lingui/core';

export const getErrors = (i18n: I18n): Record<string, string> => ({
  [1001]: t(i18n)`Error: Token expired`,
  [1002]: t(i18n)`Error: User not found`,
  [1003]: t(i18n)`Internal Server Error`,
  [1004]: t(i18n)`Error: Invalid phone number or password`,
  [1005]: t(i18n)`Error: Invalid token`,
  [1006]: t(i18n)`Error: User already exists`,
  [1007]: t(i18n)`Error key token: Secret key is not defined in the environment variables`,
});
