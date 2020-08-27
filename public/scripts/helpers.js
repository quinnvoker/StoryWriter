$(() => {
  const previewString = (string) => {
    return string.length > 255 ? string.slice(0, 250).concat('... (cont\'d)') : string;
  };
  window.previewString = previewString;
});
