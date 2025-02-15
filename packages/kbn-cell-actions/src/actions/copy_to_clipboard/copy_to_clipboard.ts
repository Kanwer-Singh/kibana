/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import copy from 'copy-to-clipboard';
import { i18n } from '@kbn/i18n';
import type { NotificationsStart } from '@kbn/core/public';
import { isString } from 'lodash/fp';
import { COPY_CELL_ACTION_TYPE } from '../../constants';
import { createCellActionFactory } from '../factory';

const ICON = 'copyClipboard';
const COPY_TO_CLIPBOARD = i18n.translate('cellActions.actions.copyToClipboard.displayName', {
  defaultMessage: 'Copy to Clipboard',
});
const COPY_TO_CLIPBOARD_SUCCESS = i18n.translate(
  'cellActions.actions.copyToClipboard.successMessage',
  {
    defaultMessage: 'Copied to the clipboard',
  }
);

const escapeValue = (value: string) => value.replace(/"/g, '\\"');

export const createCopyToClipboardActionFactory = createCellActionFactory(
  ({ notifications }: { notifications: NotificationsStart }) => ({
    type: COPY_CELL_ACTION_TYPE,
    getIconType: () => ICON,
    getDisplayName: () => COPY_TO_CLIPBOARD,
    getDisplayNameTooltip: () => COPY_TO_CLIPBOARD,
    isCompatible: async ({ data }) => {
      const field = data[0]?.field;

      return (
        data.length === 1 && // TODO Add support for multiple values
        field.name != null
      );
    },
    execute: async ({ data }) => {
      const field = data[0]?.field;
      const value = data[0]?.value;

      let textValue: undefined | string;
      if (value != null) {
        const valuesArray = Array.isArray(value) ? value : [value];
        textValue = valuesArray.map((v) => (isString(v) ? `"${escapeValue(v)}"` : v)).join(' AND ');
      }
      const text = textValue ? `${field.name}: ${textValue}` : field.name;
      const isSuccess = copy(text, { debug: true });

      if (isSuccess) {
        notifications.toasts.addSuccess(
          {
            title: COPY_TO_CLIPBOARD_SUCCESS,
          },
          {
            toastLifeTimeMs: 800,
          }
        );
      }
    },
  })
);
