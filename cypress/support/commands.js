import { addMatchImageSnapshotCommand } from 'cypress-image-snapshot/command';
let userid;

addMatchImageSnapshotCommand();

Cypress.Commands.add('getByDataCy', (selector) => {
  cy.get(`[data-cy="${selector}"]`);
});

Cypress.Commands.add('register',
  (email = '', username = '', password = '') => {
    cy.request('POST', '/users', {
      email,
      username,
      password
    })
      .then((response) => {
        cy.setCookie('drash_sess', response.body.user.token);
        // cookie = response.body.user.token;
        userid = response.body.user.id;
        // cy.log(response.body.user.username);
        // cy.log(response.body.user.id);
      });
  });

Cypress.Commands.add('createArticle', (article) => {
  cy.request({
    method: 'POST',
    url: '/articles',
    headers: {
      // 'Cookie': 'drash_sess=' + cookie,
      'Content-Type': 'application/json'
    },
    body: {
      article: {
        title: article.title,
        description: article.description,
        body: article.body,
        tags: article.tags,
        author_id: userid
      }
    }
  }).then((response) => {
    return response.body.article.slug;
  });
});

Cypress.Commands.add('followUser', (username) => {
  cy.request({
    method: 'POST',
    url: '/profiles/' + username + '/follow',
    headers: {
      'Content-Type': 'application/json'
    },
    body: {

    }
  }).then(() => {
  });
});

Cypress.Commands.add('login',
  (email = '', username = '', password = '') => {
    cy.request('POST', '/users/login', {
      user: {
        email,
        username,
        password
      }
    }).then((response) => {
      const user = {
        bio: response.body.user.bio,
        effectiveImage:
        'https://static.productionready.io/images/smiley-cyrus.jpg',
        email: response.body.user.email,
        image: response.body.user.image,
        token: response.body.user.token,
        username: response.body.user.username,
        id: response.body.user.id
      };
      window.localStorage.setItem('user', JSON.stringify(user));
      cy.setCookie('drash_sess', response.body.user.token);
    });
  });
