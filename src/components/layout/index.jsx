import PropTypes from 'prop-types'
import React from 'react'
import Box from '@mui/material/Box'
import { useSettingsContext } from '../settings/context'
import { useResponsive } from '../../hooks/use-responsive'
import { useBoolean } from '../hooks/use-boolean'
import NavMini from './nav-mini'
import NavHorizontal from './nav-horizontal'
import NavVertical from './nav-vertical'
import Header from './header'
import Main from './main'

export default function Layout({ children }) {
  const settings = useSettingsContext()

  const lgUp = useResponsive('up', 'lg')

  const nav = useBoolean()

  const isHorizontal = settings.themeLayout === 'horizontal'

  const isMini = settings.themeLayout === 'mini'

  const renderNavMini = <NavMini />

  const renderHorizontal = <NavHorizontal />

  const renderNavVertical = (
    <NavVertical openNav={nav.value} onCloseNav={nav.onFalse} />
  )

  if (isHorizontal) {
    return (
      <>
        <Header onOpenNav={nav.onTrue} />

        {lgUp ? renderHorizontal : renderNavVertical}

        <Main>{children}</Main>
      </>
    )
  }

  if (isMini) {
    return (
      <>
        {/* <Header onOpenNav={nav.onTrue} /> */}

        <Box
          sx={{
            minHeight: 1,
            display: 'flex',
            flexDirection: { xs: 'column', lg: 'row' },
          }}
        >
          {lgUp ? renderNavMini : renderNavVertical}

          {/* <Main>{children}</Main> */}
        </Box>
      </>
    )
  }

  return (
    <>
      <Header onOpenNav={nav.onTrue} />

      <Box
        sx={{
          minHeight: 1,
          display: 'flex',
          flexDirection: { xs: 'column', lg: 'row' },
        }}
      >
        {renderNavVertical}

        <Main>{children}</Main>
      </Box>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node,
}
