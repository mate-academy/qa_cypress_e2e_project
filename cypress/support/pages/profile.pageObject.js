import { profile } from 'console';
import PageObject from '../PageObject';

class ProfilePageObject extends PageObject {
  url = '/';

  get userInfoContainer() {
    return cy.getByDataCy('profile-info');
  }

  assertUserInfo(profileInfo) {
    this.userInfoContainer.should('contain', profileInfo);
  }

}

export default ProfilePageObject;