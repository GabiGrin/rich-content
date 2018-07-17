/**
 * @param {function[]} pluginTextButtonMappers array of mapper functions
 * @param {function} filterMap [optional] filter function mappedValue => boolean
 * @returns {object} { buttonName1: button1, ... }
 */
export const reducePluginTextButtons = (pluginTextButtonMappers, filterMap = () => true) => {
  // iterate plugin button mappers
  return pluginTextButtonMappers.reduce((buttons, mapper) => {
    const map = mapper();
    if (map) {
      // iterate each map
      const mapButtons = Object.keys(map).reduce((mapButtons, key) => {
        if (filterMap(map[key])) {
          return Object.assign(mapButtons, { key: map[key].component });
        }
        return mapButtons;
      }, {});
      return Object.assign(buttons, mapButtons);
    }
    return buttons;
  }, {});
};

/**
 * @param {function[]} pluginTextButtonMappers array of mapper functions
 * @param {function} filterMap [optional] filter function mappedValue => boolean
 * @returns {object[]} [{ name1, position1 }, ...]
 */
export const reducePluginTextButtonNames = (pluginTextButtonMappers, filterMap = () => true) => {
  // iterate plugin button mappers
  return pluginTextButtonMappers.reduce((buttonNames, mapper) => {
    const map = mapper();
    if (map) {
      // iterate each map
      const mapButtonNames = Object.keys(map).reduce((mapButtonNames, key) => {
        if (filterMap(map[key])) {
          return [...mapButtonNames, { name: key, position: map[key].position }];
        }
        return mapButtonNames;
      }, []);
      return [...buttonNames, ...mapButtonNames];
    }
    return buttonNames;
  }, []);
};
