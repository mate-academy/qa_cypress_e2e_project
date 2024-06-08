import PageObject from '../PageObject';

class ProfilePageObject extends PageObject {
  url = '/#/';

  get usernameHeader() {
    return cy.get('h4');
  }

  assertHeaderContainUsernameOfOtherUser(username) {
    this.usernameHeader
      .should('contain', username);
  }

  get followButton() {
    return cy.getByDataCy('follow');
  }

  clickFollowButton() {
    this.followButton.click({force: true});
  }

  get unfollowButton() {
    return cy.getByDataCy('unfollow');
  }

  assertThatTheButtonExist() {
    this.unfollowButton.should('exist');
  }

  get profileBio() {
    return cy.get('p');
  }

  assertProfileContainBio(bio) {
    this.profileBio.should('contain', bio);
  }
}

export default ProfilePageObject;
