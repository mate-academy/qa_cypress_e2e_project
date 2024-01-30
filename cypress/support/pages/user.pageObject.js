import PageObject from '../PageObject';

class UserFollowUnfollow extends PageObject {
  clickOnFollowUnfollowBtn(follow) {
    cy.get('follow-btn').click();
  }

  btnAfterClickIsChange(containUnfollowOrFollow) {
    cy.getByDataCy('follow-btn').should('contain', containUnfollowOrFollow);
  }
}

export default UserFollowUnfollow;
