/// <reference types='cypress' />
/// <reference types='../support' />

import ProfilePageObject from '../support/pages/profile.pageObject';
import { faker } from '@faker-js/faker';

const profilePage = new ProfilePageObject();

const testData = {
  username: faker.internet.userName(),
  bio: faker.lorem.sentence(),
  email: faker.internet.email(),
  password: faker.internet.password({ length: 12, memorable: true })
};

describe('Settings Page', () => {
  before(() => {
    cy.task('db:clear'); // Clear database before tests
    cy.login('testuser', 'TestPassword123'); // Ensure user is logged in
    profilePage.visit();
  });

  beforeEach(() => {
    cy.reload(); // Refresh page before each test for stability
  });

  it('should provide an ability to update username', () => {
    profilePage.updateUsername(testData.username);
    profilePage.assertUpdateSuccess();
  });

  it('should provide an ability to update bio', () => {
    profilePage.updateBio(testData.bio);
    profilePage.assertUpdateSuccess();
  });

  it('should provide an ability to update an email', () => {
    profilePage.updateEmail(testData.email);
    profilePage.assertUpdateSuccess();
  });

  it('should provide an ability to update password', () => {
    profilePage.updatePassword('TestPassword123', testData.password);
    profilePage.assertUpdateSuccess();
  });

  it('should provide an ability to log out', () => {
    profilePage.logout();
    cy.url().should('include', '/login'); // Validate redirect to login page
  });
});
