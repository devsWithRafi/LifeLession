export const formateNumber = (num=0) => {
  const formatter = new Intl.NumberFormat('en', {
    notation: 'compact',
    maximumFractionDigits: 1,
  });

  return formatter.format(num);
};
