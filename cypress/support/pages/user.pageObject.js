import PageObject from '../PageObject';

class userPageObject extends PageObject {
  visitUserPage(username) {
    cy.visit(`#/@${username}/`);
  }

  get profileUsername() {
    return cy.getByDataCy('profile-username');
  }
  
  get profileBio() {
    return cy.getByDataCy('profile-bio');
  }
  
  get unfollowBtn() {
    return cy.getByDataCy('profile-unfollow');
  }

  get followBtn() {
    return cy.getByDataCy('profile-follow');
  }
}

export default userPageObject;
