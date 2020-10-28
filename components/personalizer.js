export function getPersonalizedThemeByUserAgent(userAgent) {
  const browserThemes = {
    Chrome: '#0F9D58',
    Firefox: '#FF8619'
  };

  const supportedBrowserTypes = Object.keys(browserThemes);

  let browserType;
  let themeColor;

  for (let i = 0; i < supportedBrowserTypes.length; ++i) {
    if (userAgent.includes(supportedBrowserTypes[i])) {
      browserType = supportedBrowserTypes[i];
      break;
    }
  }

  if (browserType === undefined) {
    browserType = 'Others';
    themeColor = 'darkgrey';
  } else {
    themeColor = browserThemes[browserType];
  }

  return { browserType, themeColor };
}