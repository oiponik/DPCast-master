import FusePageCarded from '@fuse/core/FusePageCarded';
import {Button, MenuItem, Modal, Box, TextField, Select, Switch } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useEffect, useState } from 'react';
import ClientHeeader from './ClientHeader'
import DaumPostcode from 'react-daum-postcode';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import DateFnsUtils from '@date-io/date-fns';
import koLocale from "date-fns/locale/ko";
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useHistory, useParams } from 'react-router';
import reducer from '../store';
import axios from 'axios';
import { getClient, newClient } from '../store/clientSlice';
import { Controller, useForm, useFormContext } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useDeepCompareEffect } from '@fuse/hooks';
import withReducer from 'app/store/withReducer';
import FuseLoading from '@fuse/core/FuseLoading';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';


const useStyles = makeStyles({
  layoutRoot: {

  },  
});

const schema = yup.object().shape({
  comName: yup.string().required('업체명을 입력해야 합니다.')
  .matches(/^[ㄱ-ㅎ가-힣a-zA-Z0-9\s]+$/,"업체명은 한글/영문/숫자만 입력 가능합니다.")
  .min(2, '이름은 최소 2글자 이상 입력해야 합니다.'),
  franchise: yup.string().required('프랜차이즈 여부를 선택해야 합니다.'),
  sector: yup.string().required('업종을 입력해야 합니다..'),
  tel: yup.string()
  .required('전화번호를 입력해야 합니다.')
  .min(10, '전화번호는 최소 10글자로 입력해야 합니다.')
  .matches(
    /^((\\+[1-9]{1,4})|(\\([0-9]{2,3}\\))|([0-9]{2,4}))*?[0-9]{3,4}?[0-9]{3,4}?$/,"올바른 형식의 번호를 입력해야 합니다.(숫자만 입력)"),
});



function Write(props) {
  const dispatch = useDispatch();
  //const client = useSelector(({ state }) => state.client);
  const client = useSelector(({ clientmanager }) => clientmanager.client);
  
  // function handleSaveProduct() {
  //   dispatch(saveProduct(getValues()));
  // }


  const classes = useStyles();
  const clientId = useParams();
  const [noClient, setNoClient] = useState(false);
  const [addSearchOpen, setaddSearchOpen] = useState(false);
  const {register, control, formState, handleSubmit, reset, setError, watch, setValue } = useForm({
    mode: 'onChange',
    defaultValues: {},
    resolver: yupResolver(schema),
  });
  const { isValid, dirtyFields, errors } = formState;
  
  const form = register();
  
  
  useDeepCompareEffect(()=>{
    function updateClientState() {
      if (clientId.clientId === 'new') {
        /**
         * Create New Product data
         */
        dispatch(newClient());
      } else {

        dispatch(getClient(clientId.clientId)).then((action) => {
          if (!action.payload) {
            setNoProduct(true);
          }
        })
      }
    }
    updateClientState();
  }, [dispatch, clientId.clientId]);
  useEffect(() => {
    if (!client) {
      return;
    }
    /**
     * Reset the form on product state changes
     */
    reset(client);
  }, [client, reset]);

  
  // const form = watch();

  function handleOnClick(rowData) {
    console.log("click ID = " + rowData.id);
    props.history.push(`/apps/e-commerce/products/${item.id}/${item.handle}`);
    
  }


  
  const handleaddSearchOpen = () => {
    setaddSearchOpen(true);
  }
  const handleaddSearchClose = () => setaddSearchOpen(false);

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
    setValue('zipcode', data.zonecode);
    setValue('address', fullAddr);    
    setaddSearchOpen(false);
  };
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
  if (noClient) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.1 } }}
        className="flex flex-col flex-1 items-center justify-center h-full"
      >
        <Typography color="textSecondary" variant="h5">
          There is no such product!
        </Typography>
        <Button
          className="mt-24"
          component={Link}
          variant="outlined"
          to="/apps/e-commerce/products"
          color="inherit"
        >
          Go to Products Page
        </Button>
      </motion.div>
    );
  }
 
  if (!client && clientId.clientId !== 'new') return <FuseLoading />;
    // _.isEmpty(form) || (client && clientId.clientId !== client.id && clientId.clientId !== 'new')
 
  return (
    <FusePageCarded
      classes={{
        root: classes.layoutRoot,
      }}
      header={
        <ClientHeeader title={clientId.clientId !== 'new' ? '업체정보 변경' : '신규업체 등록'}></ClientHeeader>
      }
      content={
        <div className="p-24">
          <form className='w-1/2'>
            <div className='mb-20'>
            <Controller
              name="comName"
              control={control}
              defaultValue={[]}
              render={({ field }) => (
                <TextField 
                  {...field}
                  id="comName"
                  label="업체명"
                  variant="outlined"
                  required
                  className='w-full'
                  error={!!errors.comName}
                  helperText={errors?.comName?.message}
                />
              )}
            />
            </div>
            <div className='mb-20'>
              <Controller
                name="franchise"
                control={control}
                defaultValue={[]}
                render={({ field }) => (
                <TextField 
                  {...field}
                  id="franchise"
                  label="프랜차이즈 여부"
                  variant="outlined"
                  className='w-full'
                  select
                  error={!!errors.franchise}
                  helperText={errors?.franchise?.message}
                  >
                  <MenuItem value='Y'>프랜차이즈</MenuItem>
                  <MenuItem value='N'>개인</MenuItem>
                </TextField>
                )}
              />
            </div>
            <div className='mb-20 flex'>
              <input accept="image/*, .pdf" className='hidden' id="raised-button-file" multiple type="file" 
              onChange={(e)=>setbrfileName(e.target.files[0].name)}
              //onChange={(e)=>console.log(e.target.files)}
              />
              <TextField id="file" label="사업자등록증" variant="outlined" InputProps={{readOnly: true}} value={brfileName}  className='flex-grow' onClick={() => document.getElementById('raised-button-file').click()}/>
            </div>
            <div className='mb-20'>
              <Controller
                name="sector"
                control={control}
                defaultValue={[]}
                render={({ field }) => (
                  <TextField 
                  {...field}
                  id="sector"
                  label="업종"
                  variant="outlined"
                  className='w-full'
                  error={!!errors.sector}
                  helperText={errors?.sector?.message}
                  />
                )}
                />
            </div>
            <div className='mb-20'>
            <Controller
                name="tel"
                control={control}
                defaultValue={[]}
                render={({ field }) => (
                  <TextField 
                  {...field}
                  id="tel"
                  label="전화번호"
                  variant="outlined"
                  className='w-full'
                  error={!!errors.tel}
                  helperText={errors?.tel?.message}
                  />
                )}
                />
            </div>
            <div className='mb-20'>
              <div className='flex items-center mb-10'>
                <Controller
                  name="zipcode"
                  control={control}
                  defaultValue={[]}
                  render={({ field }) => (
                    <TextField 
                    {...field}
                    onClick={handleaddSearchOpen}
                    id="zipcode"
                    label="우편번호"
                    variant="outlined"
                    className='mr-10'
                    InputProps={{readOnly: true}}
                    />
                  )}
                />
                  <Controller
                    name="address"
                    control={control}
                    defaultValue={[]}
                    render={({ field }) => (
                      <TextField 
                      {...field}
                      onClick={handleaddSearchOpen}
                      id="address"
                      label="주소"
                      variant="outlined"
                      className='w-full'
                      InputProps={{readOnly: true}}
                      />
                    )}
                  />
              </div>
              <Controller
                name="address2"
                control={control}
                defaultValue={[]}
                render={({ field }) => (
                  <TextField 
                  {...field}
                  id="address2"
                  label="상세주소"
                  variant="outlined"
                  className='w-full'
                  InputProps={{readOnly: true}}
                  />
                )}
              />
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
            <div className='mb-20'>
              <Controller
                name="serviceCheck"
                control={control}
                defaultValue={[]}
                render={({ field }) => (
                <TextField 
                  {...field}
                  id="serviceCheck"
                  label="서비스 이용유무"
                  variant="outlined"
                  className='w-full'
                  select
                  error={!!errors.serviceCheck}
                  helperText={errors?.serviceCheck?.message}
                  >
                  <MenuItem value='Y'>이용중</MenuItem>
                  <MenuItem value='N'>이용하지 않음</MenuItem>
                </TextField>
                )}
              />
            </div>
            <div className='mb-20 flex'>
              <MuiPickersUtilsProvider utils={DateFnsUtils} locale={koLocale} className=''>
              <Controller
                name="startDate"
                control={control}
                defaultValue={[]}
                render={({ field }) => (
                <DatePicker
                  {...field}
                  id='startDate'
                  label='서비스 시작일'
                  inputVariant="outlined"
                  format="yyyy-MM-dd"
                  // onChange={(value) => setValue('startDate',value)}
                  // renderInpu={(params) => <TextField {...params} variant="outlined"/>}
                  className='mr-10 flex-grow'
                  />
                )}
              />
                <Controller
                  name="endDate"
                  control={control}
                  defaultValue={[]}
                  render={({ field }) => (
                    <DatePicker
                    {...field}
                    id='endDate'
                    label='서비스 종료일'
                    inputVariant="outlined"
                    format="yyyy-MM-dd"
                    // onChange={(value) => setValue('endDate',value)}
                    // renderInpu={(params) => <TextField {...params} variant="outlined"/>}
                    className='flex-grow'
                    />
                  )}
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

// export default Write;
export default withReducer('clientmanager', reducer)(Write);