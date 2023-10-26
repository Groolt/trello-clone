import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import DashboardIcon from '@mui/icons-material/Dashboard'
import VpnLockIcon from '@mui/icons-material/VpnLock'
import AddToDriveIcon from '@mui/icons-material/AddToDrive'
import BoltIcon from '@mui/icons-material/Bolt'
import FilterListIcon from '@mui/icons-material/FilterList'
import Avatar from '@mui/material/Avatar'
import AvatarGroup from '@mui/material/AvatarGroup'
import Tooltip from '@mui/material/Tooltip'
import Button from '@mui/material/Button'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import { capitalizeFirstLetter } from '~/utils/formatters'

const MENU_STYLE = {
  color: 'white',
  backgroundColor: 'transparent',
  border: 'none',
  paddingX: '5px',
  borderRadius: '4px',
  '.MuiChip-icon': {
    color: 'white'
  }
}
function BoardBar({ board }) {
  return (
    <Box
      px={2}
      sx={{
        width: '100%',
        height: (theme) => theme.trello.boardBarHeight,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 2,
        overflowX: 'auto',
        bgcolor: (theme) =>
          theme.palette.mode === 'dark' ? '#34495e' : '#1976d2'
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Tooltip title={board?.description}>
          <Chip
            icon={<DashboardIcon />}
            label={board?.title}
            clickable
            sx={MENU_STYLE}
          />
        </Tooltip>
        <Chip
          icon={<VpnLockIcon />}
          label={capitalizeFirstLetter(board?.type)}
          clickable
          sx={MENU_STYLE}
        />
        <Chip
          icon={<AddToDriveIcon />}
          label="Add to Google Drive"
          clickable
          sx={MENU_STYLE}
        />
        <Chip
          icon={<BoltIcon />}
          label="Automation"
          clickable
          sx={MENU_STYLE}
        />
        <Chip
          icon={<FilterListIcon />}
          label="Filter"
          clickable
          sx={MENU_STYLE}
        />
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Button
          variant="outlined"
          startIcon={<PersonAddIcon />}
          sx={{
            color: 'white',
            borderColor: 'white',
            '&:hover': {
              borderColor: 'white'
            }
          }}
        >
          Invite
        </Button>
        <AvatarGroup
          max={5}
          sx={{
            gap: 1,
            '.MuiAvatarGroup-avatar': {
              width: '34px',
              height: '34px',
              fontSize: '16px',
              borderColor: 'white',
              borderWidth: '1px',
              color: 'white',
              cursor: 'pointer',
              '&:first-of-type': { bgcolor: '#a4b0be' }
            }
          }}
        >
          <Tooltip title="Binh Nguyen">
            <Avatar
              alt="Groolt"
              src="https://yt3.ggpht.com/sSUL7t4BdiSb3o50fdP8BdFWLMptnDbDvFMwjBF3hp8-eGeyCu5n4387IHABkO8ow81TCoxK=s108-c-k-c0x00ffffff-no-rj"
            />
          </Tooltip>
          <Tooltip title="Binh Nguyen">
            <Avatar
              alt="Groolt"
              src="https://scontent.fsgn5-9.fna.fbcdn.net/v/t1.6435-9/84845337_109873550582050_8735628098952757248_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=VkhB6LDjKmoAX86lNo7&_nc_ht=scontent.fsgn5-9.fna&oh=00_AfBf3ZlUzoXk4IbNk1ESfSjmmTtOd8E2npmyzhnAg7wIIg&oe=65237A37"
            />
          </Tooltip>
          <Tooltip title="Binh Nguyen">
            <Avatar
              alt="Groolt"
              src="https://scontent.fsgn5-8.fna.fbcdn.net/v/t1.6435-9/138987747_705188586824689_2552344432136676803_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=ayfgQBlJiIsAX_7cT3i&_nc_ht=scontent.fsgn5-8.fna&oh=00_AfCpLw-JX1RF0saj2jmw8yQ9Z4wA5xX6MmL8qlOjMW78hg&oe=652351B7"
            />
          </Tooltip>
          <Tooltip title="Binh Nguyen">
            <Avatar
              alt="Groolt"
              src="https://yt3.ggpht.com/sSUL7t4BdiSb3o50fdP8BdFWLMptnDbDvFMwjBF3hp8-eGeyCu5n4387IHABkO8ow81TCoxK=s108-c-k-c0x00ffffff-no-rj"
            />
          </Tooltip>
          <Tooltip title="Binh Nguyen">
            <Avatar
              alt="Groolt"
              src="https://yt3.ggpht.com/sSUL7t4BdiSb3o50fdP8BdFWLMptnDbDvFMwjBF3hp8-eGeyCu5n4387IHABkO8ow81TCoxK=s108-c-k-c0x00ffffff-no-rj"
            />
          </Tooltip>
          <Tooltip title="Binh Nguyen">
            <Avatar
              alt="Groolt"
              src="https://yt3.ggpht.com/sSUL7t4BdiSb3o50fdP8BdFWLMptnDbDvFMwjBF3hp8-eGeyCu5n4387IHABkO8ow81TCoxK=s108-c-k-c0x00ffffff-no-rj"
            />
          </Tooltip>
          <Tooltip title="Binh Nguyen">
            <Avatar
              alt="Groolt"
              src="https://scontent.fsgn5-9.fna.fbcdn.net/v/t1.6435-9/84845337_109873550582050_8735628098952757248_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=VkhB6LDjKmoAX86lNo7&_nc_ht=scontent.fsgn5-9.fna&oh=00_AfBf3ZlUzoXk4IbNk1ESfSjmmTtOd8E2npmyzhnAg7wIIg&oe=65237A37"
            />
          </Tooltip>
          <Tooltip title="Binh Nguyen">
            <Avatar
              alt="Groolt"
              src="https://scontent.fsgn5-8.fna.fbcdn.net/v/t1.6435-9/138987747_705188586824689_2552344432136676803_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=ayfgQBlJiIsAX_7cT3i&_nc_ht=scontent.fsgn5-8.fna&oh=00_AfCpLw-JX1RF0saj2jmw8yQ9Z4wA5xX6MmL8qlOjMW78hg&oe=652351B7"
            />
          </Tooltip>
          <Tooltip title="Binh Nguyen">
            <Avatar
              alt="Groolt"
              src="https://yt3.ggpht.com/sSUL7t4BdiSb3o50fdP8BdFWLMptnDbDvFMwjBF3hp8-eGeyCu5n4387IHABkO8ow81TCoxK=s108-c-k-c0x00ffffff-no-rj"
            />
          </Tooltip>
          <Tooltip title="Binh Nguyen">
            <Avatar
              alt="Groolt"
              src="https://yt3.ggpht.com/sSUL7t4BdiSb3o50fdP8BdFWLMptnDbDvFMwjBF3hp8-eGeyCu5n4387IHABkO8ow81TCoxK=s108-c-k-c0x00ffffff-no-rj"
            />
          </Tooltip>
        </AvatarGroup>
      </Box>
    </Box>
  )
}

export default BoardBar
