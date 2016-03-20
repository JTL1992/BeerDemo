setTitle = (title) => {
  let base = 'TeachxMundus';

  if (title) {
    return document.title = `${title} - ${base}`;
  }
  return document.title = base;
};
