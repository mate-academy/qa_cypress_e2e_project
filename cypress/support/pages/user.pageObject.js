import PageObject from '../PageObject';

class userPageObject extends PageObject {

  get username() {
    return cy.getByDataCy('profile-username');
  }
  
  get unfollowUser() {
    return cy.getByDataCy('profile-unfollow');
  }

  get followUser() {
    return cy.getByDataCy('profile-follow');
  }
}

export default userPageObject;
