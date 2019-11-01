import deepmerge from 'deepmerge';
import React, { useContext } from 'react';
import defaultTheme from './themes/default';

export const ThemeContext = React.createContext(defaultTheme);
export const ThemeProvider = (props) => {
  const theme = Object.assign(Object.assign({}, defaultTheme), props.value);
  return (
    <ThemeContext.Provider value={theme}>
      {props.children}
    </ThemeContext.Provider>
  );
};
export const useTheme = (props = {}) => {
  const theme = useContext(ThemeContext);
  return Object.assign(Object.assign({}, theme), props.theme);
};
export class WithTheme extends React.Component {
  constructor() {
    super(...arguments);
    this.getStyles = (theme) => {
      const { themeStyles, styles } = this.props;
      const defaultThemeStyles = themeStyles(theme);
      if (styles) {
        // TODO: check these styles has changed
        // merge styles from user defined
        return deepmerge(defaultThemeStyles, styles);
      }
      return defaultThemeStyles;
    };
  }

  render() {
    return (
      <ThemeContext.Consumer>
        {theme => this.props.children(this.getStyles(theme), theme)}
      </ThemeContext.Consumer>
    );
  }
}
WithTheme.defaultProps = {
  themeStyles: () => { },
};
