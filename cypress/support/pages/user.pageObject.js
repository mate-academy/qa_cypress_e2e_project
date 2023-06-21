import PageObject from '../PageObject';

class userPageObject extends PageObject {
  visitUserPage(username) {
    cy.visit(`#/@${username}/`);
  }

  get profileUsername() {
    return cy.getByDataCy('profile-username');
  }

  get followBtn() {
    return cy.getByDataCy('follow-button-user');
  }

  get unfollowBtn() {
    return cy.getByDataCy('unfollow-button-user');
  }

}

export default userPageObject;