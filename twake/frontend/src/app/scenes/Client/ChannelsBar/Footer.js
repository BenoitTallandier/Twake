import React, { Component } from 'react';

import Languages from 'services/languages/languages.js';
import Groups from 'services/workspaces/groups.js';
import Collections from 'app/services/Depreciated/Collections/Collections.js';
import InitService from 'services/InitService';

import FooterUI from 'components/Leftbar/Footer/Footer.js';

export default class Footer extends Component {
  constructor() {
    super();

    this.state = {
      i18n: Languages,
    };

    Languages.addListener(this);
    Collections.get('groups').addListener(this);
    Collections.get('groups').listenOnly(this, [Groups.currentGroupId]);
  }
  componentWillUnmount() {
    Languages.removeListener(this);
    Collections.get('groups').removeListener(this);
  }
  shouldComponentUpdate() {
    Collections.get('groups').listenOnly(this, [Groups.currentGroupId]);
    return true;
  }
  render() {
    var group = Collections.get('groups').find(Groups.currentGroupId);

    return (
      <FooterUI
        planName={group?.plan}
        onClickHelp={
          InitService.server_infos.help_link &&
          (() => {
            window.open(InitService.server_infos.help_link);
          })
        }
      />
    );
  }
}