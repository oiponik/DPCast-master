import FusePageCarded from '@fuse/core/FusePageCarded';
import {Button, MenuItem, Modal, Box, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useRef, useState } from 'react';
import ClientHeeader from './ClientHeader'
import DaumPostcode from 'react-daum-postcode';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import DateFnsUtils from '@date-io/date-fns';
import koLocale from "date-fns/locale/ko";

const useStyles = makeStyles({
  layoutRoot: {

  },  
});




function Write() {
  const classes = useStyles();
  
  const brfilerRef=useRef();
  // const { reset, watch, control, onChange, formState } = methods;
  // const form = watch();

  function handleOnClick(rowData) {
    console.log("click ID = " + rowData.id);
    props.history.push(`/apps/e-commerce/products/${item.id}/${item.handle}`);
    
  }
  
  const [addSearchOpen, setaddSearchOpen] = useState(false);
  const addDetailRef = useRef();
  const handleaddSearchOpen = () => {
    setaddSearchOpen(true);
  }
  const handleaddSearchClose = () => setaddSearchOpen(false);
  const [address, setAddress] = useState(''); // 주소
  const [addressDetail, setAddressDetail] = useState(''); // 상세주소
  const onChangeOpenPost = () => setaddSearchOpen(!addSearchOpen);
  const onCompletePost = (data) => {
    let fullAddr = data.address;
    let extraAddr = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddr += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddr += extraAddr !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddr += extraAddr !== '' ? ` (${extraAddr})` : '';
    }

    setAddress(data.zonecode);
    setAddressDetail(fullAddr);
    setaddSearchOpen(false);
    addDetailRef.current.focus();
  };
  const [value, setValue] = useState(new Date());
  const [brfileName, setbrfileName] = useState('');
  const [deleteOpen, setdeleteOpen] = useState(false);

  const handleClickdeleteOpen = () => {
    setdeleteOpen(true);
  };

  const handledeleteClose = () => {
    setdeleteOpen(false);
  };

  const modalBoxstyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
 

  return (
    <FusePageCarded
      classes={{
        root: classes.layoutRoot,
      }}
      header={
        <ClientHeeader title='신규 업체 등록'></ClientHeeader>
      }
      content={
        <div className="p-24">
          <form className='w-1/2'>
            <div className='mb-20'>
              <TextField id="" label="업체명" variant="outlined" className='w-full'/>
            </div>
            <div className='mb-20'>
              <TextField id="" select label="프랜차이즈 여부" variant="outlined" className='w-full'>
                <MenuItem value='개인'>개인</MenuItem>
                <MenuItem value='프랜차이즈'>프랜차이즈</MenuItem>
              </TextField>
            </div>
            <div className='mb-20 flex'>
              <input accept="image/*, .pdf" className='hidden' id="raised-button-file" multiple type="file" 
              onChange={(e)=>setbrfileName(e.target.files[0].name)}
              //onChange={(e)=>console.log(e.target.files)}
              />
              <TextField id="file" label="사업자등록증" variant="outlined" InputProps={{readOnly: true}} value={brfileName}  className='flex-grow' onClick={() => document.getElementById('raised-button-file').click()}/>
            </div>
            <div className='mb-20'>
              <TextField id="" label="업종" variant="outlined" className='w-full'/>
            </div>
            <div className='mb-20'>
              <TextField id="" label="연락처" variant="outlined" className='w-full'/>
            </div>
            <div className='mb-20'>
              <div className='flex items-center mb-10'>
                <TextField id="add_zip" label="우편번호" variant="outlined" InputProps={{readOnly: true}} value={address} onClick={handleaddSearchOpen} className='mr-10'/>
                <TextField id="add_address" label="주소" variant="outlined" InputProps={{readOnly: true}} value={addressDetail} onClick={handleaddSearchOpen} className='w-full'/>
              </div>
              <TextField id="add_detail" label="상세주소" variant="outlined" inputRef={(ref) => (addDetailRef.current = ref)}  className='w-full'/>
              <Modal
                  open={addSearchOpen}
                  onClose={handleaddSearchClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={modalBoxstyle} id='addsearch'>
                    <DaumPostcode autoClose onComplete={onCompletePost }/>
                  </Box>
                </Modal>
            </div>
            <div className='mb-20 flex'>
              <MuiPickersUtilsProvider utils={DateFnsUtils} locale={koLocale} className=''>
                <DatePicker
                  label='서비스 시작일'
                  value={value}
                  inputVariant="outlined"
                  onChange={(newValue) => setValue(newValue)}
                  // renderInpu={(params) => <TextField {...params} variant="outlined"/>}
                  className='mr-10 flex-grow'
                  />
                  <DatePicker
                  label='서비스 종료일'
                  value={value}
                  inputVariant="outlined"
                  onChange={(newValue) => setValue(newValue)}
                  // renderInpu={(params) => <TextField {...params} variant="outlined"/>}
                  className='flex-grow'
                  />
              </MuiPickersUtilsProvider>
            </div>
            <div className=''>
              <Button variant="contained" type='button' color='secondary' className='mr-10'>확인</Button>
              <Button variant="contained" type='button'>취소</Button>
            </div>

          </form>
        </div>
      }
    />
  );
}

export default Write;
