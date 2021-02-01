import { createMuiTheme } from '@material-ui/core/styles';
//import { cognace, cognaceMed, cognaceBlack, cognaceHeavy } from './fonts';

export const theme = createMuiTheme({
  typography: {
    fontFamily: 'Cognace, Arial',
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        // '@font-face': [cognace, cognaceMed, cognaceBlack, cognaceHeavy],
        body: {
          backgroundColor: '#FFFDFB',
        },
      },
    },
  },

  palette: {
    primary: {
      main: '#C7BFB3',
      light: '#f3f3fb',
      contrastText: '#fff',
    },
    secondary: {
      main: '#E0E1F6',
    },
    action: {
      selected: '#C7BFB3',
    },
    error: {
      main: '#B00020',
      contrastText: '#fff',
    },
    success: {
      main: '#00B3A6',
      dark: '#017374',
      contrastText: '#fff',
    },
    background: {
      default: '#FFFDFB',
    },
  },
});
