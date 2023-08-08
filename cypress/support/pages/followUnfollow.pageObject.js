// import PageObject from '../PageObject';

// class FollowUnfollowPageObject extends PageObject {
//   followUser() {
//     cy.get('.feed-toggle > .nav > :nth-child(1) > .nav-link').click();
//     // cy.wait(4000);
//     cy.get('.article-preview').click();
//     // eslint-disable-next-line max-len
//     cy.get('.article-actions > .article-meta > :nth-child(3) > .btn-outline-secondary > :nth-child(3)').click();
//   }

//   unfollowUser(username) {
//     cy.visit('#/my-feed');
//     cy.get('.article-preview').contains(username).click();
//     cy.get('.col-xs-12 > div > .btn').contains('Unfollow').click();
//   }
// }

// export default FollowUnfollowPageObject;
