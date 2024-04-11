/// <reference types="cypress" />
/// <reference types="../support" />



import HomePageObject from "../support/pages/home.pageObject";
import SettingsPageObject from "../support/pages/settings.pageObject";
import SignInPageObject from "../support/pages/signIn.pageObject";
import PageObject from "../support/PageObject";

const homePage = new HomePageObject;
const settingsPage = new SettingsPageObject;
const signInPage = new SignInPageObject;
const pageObject = new PageObject;


describe('Settings page', () => {
  let user;
  let user2;

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });

    cy.task('generateUser').then((generateUser) => {
      user2 = generateUser;
    });

  });
  
  beforeEach(() => {
    
    cy.register(user.email, user.username, user.password);
    
    settingsPage.visit();
  })

  it('should provide an ability to update username', () => {
   
    settingsPage.typeInUsernameField(user.updateUsername)
    settingsPage.clickOnUpdateBtn();
    homePage.assertHeaderContainUsername(user.updateUsername);

  });

  it('should provide an ability to update bio', () => {


  
    settingsPage.typeInBioField(user.bio);
    settingsPage.clickOnUpdateBtn();
    
    pageObject.warmMesageTextContain('Update successful!')
    pageObject.warmMesageClickOk();
    settingsPage.userBioTextUpdated(user.bio);

    
  
  });

  it('should provide an ability to update an email', () => {

    settingsPage.typeInEmailField(user.updateEmail);
    settingsPage.clickOnUpdateBtn();
   
    pageObject.warmMesageTextContain('Update successful!')
    pageObject.warmMesageClickOk();    
   

    cy.clearAllCookies().reload();
    signInPage.visit();

    signInPage.typeEmail(user.updateEmail);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();

    homePage.assertHeaderContainUsername(user.username);   

  });

  it('should provide an ability to update password', () => {

    settingsPage.typeInPasswordField(user.updatePassword);
    settingsPage.clickOnUpdateBtn();
    pageObject.warmMesageTextContain('Update successful!')
    pageObject.warmMesageClickOk();  

    cy.clearAllCookies().reload();

    signInPage.visit();
    signInPage.typeEmail(user.email);
    signInPage.typePassword(user.updatePassword);
    signInPage.clickSignInBtn();

    homePage.assertHeaderContainUsername(user.username);   
  });

  it('should provide an ability to log out', () => {

    settingsPage.clickOnLogOutbtn();
    settingsPage.navbarShouldNotContain(user.username);
   
  });
});
