export function generatePassword(length) {
  const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let password = 'T1@';
  for (let i = 0; i < length; i++) {
    // eslint-disable-next-line max-len
    password += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return password;
};

export function generateUsername(length) {
  const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let username = '';
  for (let i = 0; i < length; i++) {
    // eslint-disable-next-line max-len
    username += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return username;
};
