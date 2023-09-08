import Box from '@mui/material/Box'

function BoardContent() {
  return (
    <Box sx={{
      backgroundColor: 'primary.main',
      width: '100%',
      height: (theme) => `calc(100vh - ${theme.trello.boardBarHeight} - ${theme.trello.appBarHeight})`
    }}>
      Board Content
    </Box>
  )
}

export default BoardContent
