import { faker } from '@faker-js/faker';

Cypress.Commands.add('registerAndLogin', (email, password, username) => {
  const userEmail = email || faker.internet.email();
  const userPassword = password || 'Password123!';
  const userUsername = username || faker.internet.userName();

  cy.request({
    method: 'POST',
    url: '/users',
    body: {
      username: userUsername,
      email: userEmail,
      password: userPassword
    }
  }).then((response) => {
    expect(response.status).to.eq(200);
    expect(response.body.user).to.have.property('token');
    const user = {
      ...response.body.user,
      password: userPassword
    };
    cy.setCookie('drash_sess', user.token);
    cy.wrap(user);
  });
});

Cypress.Commands.add('login', (email, password) => {
  cy.request({
    method: 'POST',
    url: '/users/login',
    body: {
      user: {
        email,
        password
      }
    }
  }).then((response) => {
    expect(response.status).to.eq(200);
    expect(response.body.user).to.have.property('token');
    cy.setCookie('drash_sess', response.body.user.token);
    cy.wrap(response.body.user);
  });
});

Cypress.Commands.add('createArticle', (articleData) => {
  cy.getCookie('drash_sess').then((cookie) => {
    const token = cookie ? cookie.value : null;
    if (!token) {
      throw new Error(
        'No session token found. Log in before creating an article.'
      );
    }

    cy.request({
      method: 'POST',
      url: '/articles',
      body: {
        article: {
          author_id: articleData.author_id || 0,
          title: articleData.title,
          description: articleData.description,
          body: articleData.body,
          tags: articleData.tags ? articleData.tags.join(',') : ''
        }
      },
      headers: {
        Cookie: `drash_sess=${token}`
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.article).to.have.property('slug');
      cy.wrap(response.body.article);
    });
  });
});
