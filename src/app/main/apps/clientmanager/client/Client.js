import { Tabs, Tab, Button, Box, IconButton, Chip, Card, CardContent, AppBar, Toolbar, ButtonGroup, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useEffect, useState } from 'react';
import ClientHeader from './ClientHeader'
import {Icon, Typography} from '@material-ui/core';
import FusePageSimple from '@fuse/core/FusePageSimple';
import { useParams } from 'react-router';
import axios from 'axios';
import withReducer from 'app/store/withReducer';
import { useDeepCompareEffect } from '@fuse/hooks';
import { useDispatch, useSelector } from 'react-redux';
import reducer from '../store';
import { getClient } from '../store/clientSlice';
import FuseLoading from '@fuse/core/FuseLoading';


const useStyles = makeStyles({
  layoutRoot: {},
});




function Client(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const client = useSelector(({ clientmanager }) => clientmanager.client);
  console.log(client)
  const clientId = useParams();
  
  useDeepCompareEffect(()=>{
    function updateClientState() {
      dispatch(getClient(clientId.clientId)).then((action) => {
        
      }) 
    }

    updateClientState();
  }, [dispatch, clientId.clientId]);

  const [deleteOpen, setdeleteOpen] = useState(false);
  // useEffect(() => {
  //   if (!client) {
  //     return;
  //   }
  //   /**
  //    * Reset the form on product state changes
  //    */
  //   // reset(product);
  // }, [client]);
  function handleClickedite() {
    console.log("click ID = " + clientId.clientId);
    props.history.push(`/apps/clientmanager/write/${clientId.clientId}`);
  }
  
  const handleClickdeleteOpen = () => {
    setdeleteOpen(true);
  };

  const handledeleteClose = () => {
    setdeleteOpen(false);
  };

  if (!client) return <FuseLoading />;
    // _.isEmpty(form) || (client && clientId.clientId !== client.id && clientId.clientId !== 'new')
 
  return (
    <FusePageSimple
      classes={{
        root: classes.layoutRoot,
      }}
      header={
        <ClientHeader title="?????? ??????"></ClientHeader>
      }
      content={
        <div className="p-24">
          <div>
            <div className='flex py-20'>
              <div className='flex-none'>?????????</div>
              <div className='flex items-center flex-none'>
                <Typography className="h1">
                  {client.comName}
                </Typography>
                <Chip label="?????????" color="primary" size="small" className='ml-10'/>
              </div>
              <div className='flex-grow text-right'>
                <Button variant="contained" color='secondary' className='font-normal'>?????? ????????? ??????</Button>
              </div>
            </div>
            <hr></hr>
            <div className="block sm:flex py-16 items-center">
              <Typography className='text-13 sm:mb-0 mr-5'>????????? ?????????</Typography>
              <Typography className='text-15 mb-20 sm:mb-0 font-medium'>{client.startDate}</Typography>
              <Typography className='text-13 sm:mb-0 sm:ml-20 mr-5'>????????? ?????????</Typography>
              <Typography className='text-15 mb-20 sm:mb-0 font-medium'>{client.endDate}</Typography>
              <Typography className='text-13 sm:mb-0 sm:ml-20 mr-5'>????????? ??????</Typography>
              <Typography className='text-15 mb-20 sm:mb-0 font-medium'>{client.serviceCount}ea</Typography>
            </div>
            {/* <Card>
              <CardContent>
                <div className='flex py-20'>
                  <div className=''>?????????</div>
                  <div className='flex items-center'>
                    <Typography className="h1">?????????</Typography><Chip label="?????????" color="primary" size="small" className='ml-10'/>
                  </div>
                </div>
                <hr></hr>
                <div className="flex py-0">
                  <Typography className='text-13 mr-5'>????????? ?????????</Typography>
                  <Typography className='text-15 font-medium'>2021. 11. 10</Typography>
                  <Typography className='text-13 ml-20 mr-5'>????????? ?????????</Typography>
                  <Typography className='text-15 font-medium'>2022. 03. 20</Typography>
                  <Typography className='text-13 ml-20 mr-5'>????????? ??????</Typography>
                  <Typography className='text-15 font-medium'>154ea</Typography>
                </div>
              </CardContent>
            </Card> */}
          </div>
          <div className='mt-40'>
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
                  <Typography className="font-medium mb-4 text-15">??????</Typography>
                  <Typography>{client.sector}</Typography>
                </div>
                <div className="mb-24">
                  <Typography className="font-medium mb-4 text-15">?????????</Typography>
                  <Typography>{client.tel}</Typography>
                </div>
                <div className="mb-24">
                  <Typography className="font-medium mb-4 text-15">??????</Typography>
                  <Typography>({client.zipcode}) {client.address} {client.address2}</Typography>
                </div>
                <div className="mb-24">
                  <Typography className="font-medium mb-4 text-15">?????????????????????</Typography>
                  <Typography>{client.businessLicense}</Typography>
                </div>
                <div className="mb-24">
                  <Typography className="font-medium mb-4 text-15">??????????????? ??????</Typography>
                  <Typography>{client.franchise}</Typography>
                </div>
                <div className="mb-24">
                  <Typography className="font-medium mb-4 text-15">????????????(??????????????????)</Typography>
                  <a href='#'>???????????? #1</a>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className='mt-28 text-right'>
            <Button variant="contained" color='secondary' onClick={handleClickedite}>?????? ?????? ??????</Button>
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

export default withReducer('clientmanager', reducer)(Client);
