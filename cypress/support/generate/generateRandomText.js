function generateRandomText(length) {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const spaceFrequency = 0.15;
  let randomText = '';
  let isFirstNonSpaceCharacter = true;

  for (let i = 0; i < length; i++) {
    if (isFirstNonSpaceCharacter && randomText.length > 0) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomText += characters[randomIndex];
      isFirstNonSpaceCharacter = false;
    } else {
      if (Math.random() < spaceFrequency) {
        randomText += ' ';
      } else {
        const randomIndex = Math.floor(Math.random() * characters.length);
        randomText += characters[randomIndex];
      }
    }
  }

  return randomText.trim();
}

export default generateRandomText;
