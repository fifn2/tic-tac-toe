module.exports = (api) => {
  api.cache.forever();
  return {
    presets: ['airbnb'],
  };
};
