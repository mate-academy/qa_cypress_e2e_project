function generateUsername(length) {
  if (length === undefined) {
    length = Math.floor(Math.random() * (20 - 8 + 1)) + 8;
  }
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let username = '';
  for (let i = 0; i < length; i++) {
    username += characters.charAt(
      Math.floor(Math.random() * characters.length)
    );
  }

  return username;
}

export default generateUsername;
