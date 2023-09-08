import { cyan, deepOrange, orange, teal } from '@mui/material/colors'
import { experimental_extendTheme as extendTheme } from '@mui/material/styles'

// Create a theme instance.
const theme = extendTheme({
  trello: {
    appBarHeight: '58px',
    boardBarHeight: '60px'
  },
  colorSchemes: {
    light: {
      palette: {
        primary: teal,
        secondary: deepOrange
      }
    },
    dark: {
      palette: {
        primary: cyan,
        secondary: orange
      }
    }
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          '&::-webkit-scrollbar, & *::-webkit-scrollbar': {
            weight: '8px',
            height: '8px'
          },
          '&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb': {
            borderRadius: 8,
            backgroundColor: '#bdc3c7'
          },
          '&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus': {
            backgroundColor: '#00b894'
          },
          '&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active': {
            backgroundColor: '#00b894'
          },
          '&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover': {
            backgroundColor: '#00b894'
          },
          '&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner': {
            backgroundColor: '#00b894'
          }
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none'
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: ({ theme }) => {
          return {
            color: theme.palette.primary.main,
            fontSize: '0.875rem',
            '.MuiOutlinedInput-notchedOutline': {
              borderColor: theme.palette.primary.light
            },
            '&:hover': {
              '.MuiOutlinedInput-notchedOutline': {
                borderColor: theme.palette.primary.main
              }
            },
            '& fieldset': {
              borderWidth: '1px !important'
            }
          }
        }
      }
    },
    MuiInputLabel: {
      styleOverrides: {
        root: ({ theme }) => {
          return {
            fontSize: '0.875rem',
            color: theme.palette.primary.main
          }
        }
      }
    },
    MuiSelect: {
      styleOverrides: {
        root: ({ theme }) => {
          return {
            '.MuiSelect-icon': {
              color: theme.palette.primary.main
            }
          }
        }
      }
    }
  }
})

export default theme