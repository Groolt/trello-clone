import Button from '@mui/material/Button'
import { AccessAlarm, ThreeDRotation, Home } from '@mui/icons-material'
import { pink } from '@mui/material/colors'
import Typography from '@mui/material/Typography'
import { useColorScheme } from '@mui/material/styles'
function ModeToggle() {
  const { mode, setMode } = useColorScheme()
  return (
    <Button
      onClick={() => {
        setMode(mode === 'light' ? 'dark' : 'light')
      }}
    >
      {mode === 'light' ? 'Turn dark' : 'Turn light'}
    </Button>
  )
}

function App() {
  return (
    <>
      <ModeToggle/>
      <hr/>
      <div>
        Groolt
      </div>
      <Typography variant="body2" color="text.secondary">Hello</Typography>
      <Button variant="text">Text</Button>
      <Button variant="contained">Contained</Button>
      <Button variant="outlined">Outlined</Button>
      <br/>
      <AccessAlarm/>
      <ThreeDRotation/>
      <Home color="primary" />
      <Home color="secondary" />
      <Home color="success" />
      <Home color="action" />
      <Home color="disabled" />
      <Home sx={{ color: pink[500] }} />
    </>
  )
}

export default App
