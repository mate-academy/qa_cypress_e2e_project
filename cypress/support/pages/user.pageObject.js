import PageObject from '../PageObject';

class UserPageObject extends PageObject {
  get findPopUpMessage() {
    return cy.get('body').should('contain.text', 'Your' +
      ' registration was successful!');
  }

  assertSuccessfulRegistration() {
    this.findPopUpMessage.type('{enter}');
  }

  get findFollowBtn() {
    return cy.getByDataCy('follow-btn');
  }

  clickFollowBtn() {
    this.findFollowBtn.first().click();
  }
}

export default UserPageObject;
