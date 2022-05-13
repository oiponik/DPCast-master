import AppBar from '@material-ui/core/AppBar';
import { ThemeProvider } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import { memo } from 'react';
import Typography from '@material-ui/core/Typography';
import { useSelector } from 'react-redux';
import { selectFooterTheme } from 'app/store/fuse/settingsSlice';
import clsx from 'clsx';
import { Box } from '@material-ui/core';

function FooterLayout1(props) {
  const footerTheme = useSelector(selectFooterTheme);

  return (
    <ThemeProvider theme={footerTheme}>
      <AppBar
        id="fuse-footer"
        className={clsx('relative z-20 shadow-md', props.className)}
        color="default"
        style={{ backgroundColor: footerTheme.palette.background.paper }}
      >
        <Toolbar className="flex min-h-48 md:min-h-64 px-8 sm:px-12 py-0 flex items-center justify-center overflow-x-auto">
            <Typography className='text-13 mr-5'>접속자 IP</Typography>
            <Typography className='text-15 font-medium'>192.168.100.1</Typography>
            <Typography className='text-13 ml-20 mr-5'>최근 로그인</Typography>
            <Typography className='text-15 font-medium'>2022. 03. 20. 17:23:40</Typography>
            <Typography className='text-13 ml-20 mr-5'>서버시간</Typography>
            <Typography className='text-15 font-medium'>2022. 03. 20. 17:23:40</Typography>
            <Typography className='text-13 ml-20 mr-5'>동시접속</Typography>
            <Typography className='text-15 font-medium'>5명</Typography>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
}

export default memo(FooterLayout1);
