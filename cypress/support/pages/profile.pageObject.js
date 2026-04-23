import PageObject from '../PageObject';

class ProfilePageObject extends PageObject {
  get followBtn() { return cy.getByDataCy('follow-btn'); }
  get unfollowBtn() { return cy.getByDataCy('unfollow-btn'); }
}

export default ProfilePageObject;
