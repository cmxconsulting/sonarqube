/*
 * SonarQube
 * Copyright (C) 2009-2023 SonarSource SA
 * mailto:info AT sonarsource DOT com
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 3 of the License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with this program; if not, write to the Free Software Foundation,
 * Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
 */
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import Modal from '../../../components/controls/Modal';
import { ResetButtonLink } from '../../../components/controls/buttons';
import { translate } from '../../../helpers/l10n';
import { useInvalidateUsersList } from '../../../queries/users';
import { RestUserDetailed } from '../../../types/users';
import TokensForm from './TokensForm';

interface Props {
  user: RestUserDetailed;
  onClose: () => void;
}

export default function TokensFormModal(props: Props) {
  const [hasTokenCountChanged, setHasTokenCountChanged] = React.useState(false);
  const invalidateUserList = useInvalidateUsersList();

  const handleClose = () => {
    if (hasTokenCountChanged) {
      invalidateUserList();
    }
    props.onClose();
  };

  return (
    <Modal size="large" contentLabel={translate('users.tokens')} onRequestClose={handleClose}>
      <header className="modal-head">
        <h2>
          <FormattedMessage
            defaultMessage={translate('users.user_X_tokens')}
            id="users.user_X_tokens"
            values={{ user: <em>{props.user.name}</em> }}
          />
        </h2>
      </header>
      <div className="modal-body modal-container">
        <TokensForm
          deleteConfirmation="inline"
          login={props.user.login}
          updateTokensCount={() => setHasTokenCountChanged(true)}
          displayTokenTypeInput={false}
        />
      </div>
      <footer className="modal-foot">
        <ResetButtonLink onClick={handleClose}>{translate('done')}</ResetButtonLink>
      </footer>
    </Modal>
  );
}
