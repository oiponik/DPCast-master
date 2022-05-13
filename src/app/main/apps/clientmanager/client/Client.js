import DemoContent from '@fuse/core/DemoContent';
import FusePageCarded from '@fuse/core/FusePageCarded';
import { Tabs, Tab, Button, Box, IconButton, Chip, Card, CardContent, AppBar, Toolbar, ButtonGroup, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useState } from 'react';
import { DataGrid, gridPageCountSelector, gridPageSelector, useGridApiContext, useGridSelector } from '@mui/x-data-grid';
import Pagination from '@material-ui/lab/Pagination';
import ClientHeader from './ClientHeader'
import {Icon, Typography} from '@material-ui/core';
import FusePageSimple from '@fuse/core/FusePageSimple';


const useStyles = makeStyles({
  layoutRoot: {},
});




function Client() {
  const classes = useStyles();

  // const { reset, watch, control, onChange, formState } = methods;
  // const form = watch();

  function handleOnClick(rowData) {
    console.log("click ID = " + rowData.id);
    props.history.push(`/apps/e-commerce/products/${item.id}/${item.handle}`);
    
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
        root: classes.layoutRoot,
      }}
      header={
        <ClientHeader title="업체 정보"></ClientHeader>
      }
      content={
        <div className="p-24">
          <div>
            <div className='flex py-20'>
              <div className='flex-none'>이미지</div>
              <div className='flex items-center flex-none'>
                <Typography className="h1">고피자</Typography>
                <Chip label="이용중" color="primary" size="small" className='ml-10'/>
              </div>
              <div className='flex-grow text-right'>
                <Button variant="contained" color='secondary' className='font-normal'>업체 시스템 관리</Button>
              </div>
            </div>
            <hr></hr>
            <div className="block sm:flex py-16 items-center">
              <Typography className='text-13 sm:mb-0 mr-5'>서비스 시작일</Typography>
              <Typography className='text-15 mb-20 sm:mb-0 font-medium'>2021. 11. 10</Typography>
              <Typography className='text-13 sm:mb-0 sm:ml-20 mr-5'>서비스 종료일</Typography>
              <Typography className='text-15 mb-20 sm:mb-0 font-medium'>2022. 03. 20</Typography>
              <Typography className='text-13 sm:mb-0 sm:ml-20 mr-5'>서비스 수량</Typography>
              <Typography className='text-15 mb-20 sm:mb-0 font-medium'>154ea</Typography>
            </div>
            {/* <Card>
              <CardContent>
                <div className='flex py-20'>
                  <div className=''>이미지</div>
                  <div className='flex items-center'>
                    <Typography className="h1">고피자</Typography><Chip label="이용중" color="primary" size="small" className='ml-10'/>
                  </div>
                </div>
                <hr></hr>
                <div className="flex py-0">
                  <Typography className='text-13 mr-5'>서비스 시작일</Typography>
                  <Typography className='text-15 font-medium'>2021. 11. 10</Typography>
                  <Typography className='text-13 ml-20 mr-5'>서비스 종료일</Typography>
                  <Typography className='text-15 font-medium'>2022. 03. 20</Typography>
                  <Typography className='text-13 ml-20 mr-5'>서비스 수량</Typography>
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
                    기본 정보
                  </Typography>
                </Toolbar>
              </AppBar>
              <CardContent>
                <div className="mb-24">
                  <Typography className="font-medium mb-4 text-15">업종</Typography>
                  <Typography>서비스업</Typography>
                </div>
                <div className="mb-24">
                  <Typography className="font-medium mb-4 text-15">연락처</Typography>
                  <Typography>032-710-6100</Typography>
                </div>
                <div className="mb-24">
                  <Typography className="font-medium mb-4 text-15">주소</Typography>
                  <Typography>인천광역시 연수구 송도미래로 30 스마트밸리 D동 2010호</Typography>
                </div>
                <div className="mb-24">
                  <Typography className="font-medium mb-4 text-15">사업자등록번호</Typography>
                  <Typography>00-00000-000</Typography>
                </div>
                <div className="mb-24">
                  <Typography className="font-medium mb-4 text-15">프랜차이즈 구분</Typography>
                  <Typography>프랜차이즈</Typography>
                </div>
                <div className="mb-24">
                  <Typography className="font-medium mb-4 text-15">첨부파일(사업자등록증)</Typography>
                  <a href='#'>첨부파일 #1</a>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className='mt-28 text-right'>
            <Button variant="contained" color='secondary'>업체 정보 수정</Button>
            <Button variant="contained" className='ml-10' onClick={handleClickdeleteOpen}>업체 삭제</Button>
            <Dialog
              open={deleteOpen}
              onClose={handledeleteClose}
            >
              <DialogTitle className='px-20'>
                해당 업체를 삭제 하시겠습니까?
              </DialogTitle>
              <DialogContent className='px-20'>
                <DialogContentText>
                  업체를 삭제하면 다시 복구하실 수 없습니다.
                </DialogContentText>
              </DialogContent>
              <DialogActions className='px-20 pb-20'>
                <Button onClick={handledeleteClose} autoFocus variant="contained" color='secondary'>확인</Button>
                <Button onClick={handledeleteClose} variant="contained" >취소</Button>
              </DialogActions>
            </Dialog>
          </div>
        </div>
      }
    />
  );
}

export default Client;
