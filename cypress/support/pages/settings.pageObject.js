import PageObject from '../PageObject';

class SettingsPageObject extends PageObject {
	url = '/#/settings';

  get logoutBtn() {
    return cy.getByDataCy('profile-username');
  }
  
  get unfollowUser() {
    return cy.getByDataCy('profile-unfollow');
  }

  get followUser() {
    return cy.getByDataCy('profile-follow');
  }

}

export default SettingsPageObject;
