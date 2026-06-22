export const fallBackNameFormat = (name) => {
  if (name)
    return name
      .split(' ')
      .map((w) => w[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
};
