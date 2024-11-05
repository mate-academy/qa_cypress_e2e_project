const signInPage = new SignInPageObject();
const homePage = new HomePageObject();

  
let user;

before(() => {
  cy.task('generateUser').then((generatedUser) => {
    user = generatedUser;
  });
});

  it('should provide an ability to log in with existing credentials', () => {
    signInPage.visit();
    cy.register(user.email, user.username, user.password);

    
    signInPage.typeEmail(user.email);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();
@@ -29,6 +29,12 @@ describe('Sign In page', () => {
  });

  it('should not provide an ability to log in with wrong credentials', () => {
    signInPage.visit();

    signInPage.typeEmail('notexisting@example.com');
    signInPage.typePassword('notexisting123!');
    signInPage.clickSignInBtn();

    cy.contains('Invalid credentials').should('be.visible');
  });
  });
});