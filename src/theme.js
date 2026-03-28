// import { cyan, deepOrange, red, teal } from '@mui/material/colors';
import { experimental_extendTheme as extendTheme } from '@mui/material/styles'
// import { orange } from '@mui/material/colors'

// Create a theme instance.
const theme = extendTheme({
  trello: {
    appBarHeight: '58px',
    boardBarHeight: '60px'
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
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          '*::-webkit-scrollbar': {
            width: '8px',
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