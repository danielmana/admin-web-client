import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import { fade } from 'material-ui/utils/colorManipulator';

const primary1Color = '#267af1'; // #231f20';
const accent1Color = '#267af1';

const configureTheme = () =>
  getMuiTheme({
    palette: {
      primary1Color,
      accent1Color,
      accent2Color: fade(accent1Color, 0.3),
      textColor: '#0E3551',
      pickerHeaderColor: primary1Color,
      disabledColor: '#666666',
    },
  });

const configureThemeDark = () =>
  getMuiTheme(darkBaseTheme, {
    palette: {
      accent1Color,
      primary1Color: '#ffffff',
      textColor: '#ffffff',
      canvasColor: '#231f20',
    },
  });

export default configureTheme;
export {
  configureThemeDark,
};
