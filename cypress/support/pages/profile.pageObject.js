import PageObject from '../PageObject';
import generateData from '../generate/index';

class ProfilePageObject extends PageObject {
  genData = generateData();

  get profileBio() {
    return cy.getByDataCy('profile-bio');
  }

  get followBtn() {
    return cy.getByDataCy('follow-profile');
  }

  followBtnClick() {
    this.followBtn.click();
  }

  goToSomeoneProfile() {
    cy.register(
      this.genData.someone.email.default,
      this.genData.someone.username,
      this.genData.someone.password.passwordDefault
    );
    cy.window().then((win) => {
      const userFromLocal = JSON.parse(win.localStorage.getItem('user'));
      cy.visit(`/#/@${userFromLocal.username}/`);
    });
    cy.register(
      this.genData.user.email.default,
      this.genData.user.username,
      this.genData.user.password.passwordDefault
    );
    cy.reload();
  }
}

export default ProfilePageObject;
