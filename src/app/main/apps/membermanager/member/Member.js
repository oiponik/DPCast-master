import { Tabs, Tab, Button, Box, IconButton, Chip, Card, CardContent, AppBar, Toolbar, ButtonGroup, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Avatar } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { useState } from 'react';
import MemberHeeader from './MemberHeader'
import { motion } from 'framer-motion';
import {Icon, Typography} from '@material-ui/core';
import FusePageSimple from '@fuse/core/FusePageSimple';
import clsx from 'clsx';
import { useTheme } from '@emotion/react';


const useStyles = makeStyles({
  layoutRoot: {},
});




function Member() {
  const classes = useStyles();
  const theme = useTheme();
  // const { reset, watch, control, onChange, formState } = methods;
  // const form = watch();

  function handleOnClick(rowData) {
    console.log("click ID = " + rowData.id);
    // props.history.push(`/apps/e-commerce/products/${item.id}/${item.handle}`);
    
  }
  
  const [deleteOpen, setdeleteOpen] = useState(false);

  const handleClickdeleteOpen = () => {
    setdeleteOpen(true);
  };

  const handledeleteClose = () => {
    setdeleteOpen(false);
  };

  return (
    <FusePageSimple
      classes={{
        topBg: classes.topBg,
        root: classes.layoutRoot,
        content: 'w-full max-w-lg mx-auto',
        toolbar: 'w-full max-w-lg mx-auto relative flex flex-col min-h-auto h-auto items-start',
      }}
      header={
        <div className="flex flex-1 mx-14 w-full items-center justify-between">
          <div className="flex flex-col items-start max-w-full min-w-0">
            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1, transition: { delay: 0.3 } }}
            >
              <Typography
                className="flex items-center sm:mb-12 text-white"
                component={Link}
                role="button"
                to="/apps/membermanager/members"
                color="inherit"
              >
                <Icon className="text-20">arrow_back</Icon>
                <span className="flex mx-4 font-medium">????????????</span>
              </Typography>
            </motion.div>

            <div className="flex items-center max-w-full">
              <div className="flex flex-col min-w-0 mx-8 sm:mc-16">
                <motion.div initial={{ x: -20 }} animate={{ x: 0, transition: { delay: 0.3 } }}>
                  <Typography className="text-16 sm:text-20 truncate font-medium">
                    {/* {name || 'New Product'} */}
                    ????????????
                  </Typography>
                  {/* <Typography variant="caption" className="font-medium">
                    Product Detail
                  </Typography> */}
                </motion.div>
              </div>
            </div>
          </div>
      </div>
      }
      contentToolbar={
        <>
          <div className="w-full px-24 pb-48 flex flex-col md:flex-row flex-1 items-center">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1, transition: { delay: 0.1 } }}>
              <Avatar
                className={clsx(classes.avatar, '-mt-64  w-128 h-128 bg-white')}
                src="assets/images/avatars/guest.png"
              />
            </motion.div>
            <div className="flex flex-col md:flex-row flex-1 items-center justify-between p-8">
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0, transition: { delay: 0.2 } }}
              >
                <Typography
                  className="md:px-16 text-24 md:text-32 font-semibold tracking-tight"
                  variant="h4"
                  color="inherit"
                >
                  ?????????
                </Typography>
              </motion.div>

              <div className="flex items-center justify-end -mx-4 mt-24 md:mt-0">
                <Button className="mx-8" variant="contained" color="secondary" aria-label="Follow">
                  ?????? ?????? ??????
                </Button>
                <Button variant="contained" aria-label="Send Message" onClick={handleClickdeleteOpen}>
                  ?????? ??????
                </Button>
              </div>
            </div>
          </div>
        </>
      }
      content={
        <div className="p-24">
          <Card>
            <AppBar position="static" elevation={0}>
              <Toolbar className="px-8">
                <Typography
                  variant="subtitle1"
                  color="inherit"
                  className="flex-1 px-12 font-medium"
                >
                  ?????? ??????
                </Typography>
              </Toolbar>
            </AppBar>
            <CardContent>
            <div className="mb-24">
                <Typography className="font-medium mb-4 text-15">?????? ??????</Typography>
                <Typography>?????????</Typography>
              </div>
              <div className="mb-24">
                <Typography className="font-medium mb-4 text-15">??????</Typography>
                <Typography>?????? ?????????</Typography>
              </div>
              <div className="mb-24">
                <Typography className="font-medium mb-4 text-15">????????????</Typography>
                <Typography>010-0000-0000</Typography>
              </div>
              <div className="mb-24">
                <Typography className="font-medium mb-4 text-15">?????????(?????????)</Typography>
                <Typography>hong.gil@gogo.go</Typography>
              </div>
            </CardContent>
          </Card>
          <div className='mt-28 text-right'>
            <Button variant="contained" color='secondary'>?????? ?????? ??????</Button>
            <Button variant="contained" className='ml-10' onClick={handleClickdeleteOpen}>?????? ??????</Button>
            <Dialog
              open={deleteOpen}
              onClose={handledeleteClose}
            >
              <DialogTitle className='px-20'>
                ?????? ????????? ?????? ???????????????????
              </DialogTitle>
              <DialogContent className='px-20'>
                <DialogContentText>
                  ????????? ???????????? ?????? ???????????? ??? ????????????.
                </DialogContentText>
              </DialogContent>
              <DialogActions className='px-20 pb-20'>
                <Button onClick={handledeleteClose} autoFocus variant="contained" color='secondary'>??????</Button>
                <Button onClick={handledeleteClose} variant="contained" >??????</Button>
              </DialogActions>
            </Dialog>
          </div>
        </div>
      }
    />
  );
}

export default Member;
