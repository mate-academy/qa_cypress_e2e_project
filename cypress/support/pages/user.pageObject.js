import PageObject from '../PageObject';

class UserPageObject extends PageObject {
  visitUserPage(username) {
    cy.visit(`#/@${username}/`);
  }

  get followUserBtn() {
    return cy.getByDataQa('follow-user-btn');
  }

  get unfollowUserBtn() {
    return cy.getByDataQa('unfollow-user-btn');
  }
}

export default UserPageObject;
