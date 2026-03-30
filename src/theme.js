// import { cyan, deepOrange, red, teal } from '@mui/material/colors';
import { experimental_extendTheme as extendTheme } from '@mui/material/styles'
// import { orange } from '@mui/material/colors'

// Create a theme instance.

const APP_BAR_HEIGHT = '58px'
const BOARD_BAR_HEIGHT = '60px'
const BOARD_CONTENT_HEIGHT = `calc(100vh - ${APP_BAR_HEIGHT} - ${BOARD_BAR_HEIGHT})`

const theme = extendTheme({
  trello: {
    appBarHeight: APP_BAR_HEIGHT,
    boardBarHeight: BOARD_BAR_HEIGHT,
    boardContentHeight: BOARD_CONTENT_HEIGHT 
  },

  colorSchemes: {
    // light: {},
    // dark :{}
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none'
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          fontSize: '0.875rem',
          '& fieldset':{
            borderWith: '0.5px !important',
          },
           '&:hover fieldset':{
            borderWith: '1px !important',
          },
          '&.Mui-focused fieldset':{
            borderWith: '1px !important'
          }
        }
      }
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
           fontSize: '0.875rem'
        }
      }
    },
    MuiTypography: {
      styleOverrides: {
        root: {
           '&.MuiTypography-body1' :{fontSize: '0.875rem'}
        }
      }
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          '*::-webkit-scrollbar': {
            width: '10px',
            height: '8px'
          },
          '*::-webkit-scrollbar-thumb': {
            backgroundColor: '#dcdde1',
            borderRadius: '8px'
          },
          '*::-webkit-scrollbar-thumb:hover': {
            backgroundColor: 'white'
          }
          
        }
      }
    }
  }
});

export default theme;