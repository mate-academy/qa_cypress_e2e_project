import PageObject from '../PageObject';
class UserPageObject extends PageObject {
  url = '#/';

  addArticleWithDefinedUser(
    title,
    description,
    body,
    tags,
    email,
    username,
    password
  ) {
    cy.addArticleWithDefinedUser(
      title,
      description,
      body,
      tags,
      email,
      username,
      password
    );
  }

  loginAnotherUser(email, username, password) {
    cy.login(email, username, password);
  }

  visitDefinedUserPage(username) {
    cy.visit(`#/@${username}`);
  }

  get getFollowBtn() {
    return cy.getByDataCy('followBtn');
  }

  clickFollowBtn() {
    cy.wait(2000);
    this.getFollowBtn.click();
  }

  assertFollowBtn(text) {
    this.getFollowBtn.should('contain.text', text);
  }
}

export default UserPageObject;
