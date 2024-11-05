/// <reference types='cypress' />
/// <reference types='../support' />

describe('Settings page', () => {
  before(() => {

  });
import SettingsPageObject from '../support/pages/settings.pageObject';

  beforeEach(() => {
const settingsPage = new SettingsPageObject();

describe('Settings page', () => {
    cy.task('db:clear');
  });