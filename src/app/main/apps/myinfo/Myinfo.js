import {Button, MenuItem, Modal, Box, TextField, Card, Typography,  Icon, Avatar, Tooltip, FilledInput } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { useRef, useState } from 'react';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import FusePageSimple from '@fuse/core/FusePageSimple';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import InputAdornment from '@material-ui/core/InputAdornment';

const useStyles = makeStyles({
  layoutRoot: {

  },  
});

const schema = yup.object().shape({
  username: yup.string().required('이름을 입력해야 합니다.')
  .matches(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|a-z|A-Z]+$/,"이름은 한글/영문만 입력 가능합니다.")
  .min(2, '이름은 최소 2글자 이상 입력해야 합니다.'),
  nickname: yup.string().required('별명을 입력해야 합니다.')
  .matches(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|a-z|A-Z|0-9]+$/,"별명은 한글/영문/숫자만 입력 가능합니다.")
  .min(2, '별명은 최소 2글자 이상 입력해야 합니다.'),
  callNumber: yup.string()
  .required('전화번호를 입력해야 합니다.')
  .matches(
    /^((\\+[1-9]{1,4})|(\\([0-9]{2,3}\\))|([0-9]{2,4}))*?[0-9]{3,4}?[0-9]{3,4}?$/,"올바른 형식의 번호를 입력해야 합니다.(숫자만 입력)")
    // /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,"올바른 형식의 번호를 입력해야 합니다.")
  .min(10, '전화번호는 최소 10글자로 입력해야 합니다.'),
  email: yup.string().email('유효한 이메일을 입력해야 합니다.').required('이메일을 입력해야 합니다.'),
  password: yup
    .string()
    .required('비밀번호를 입력해야 합니다.')
    .min(8, '비밀번호는 최소 8글자로 설정해야 합니다.'),
  passwordConfirm: yup.string().oneOf([yup.ref('password'), null], '비밀번호가 일치하지 않습니다.'),
});
const defaultValues = {
  displayName: '',
  email: '',
  password: '',
  passwordConfirm: '',
};


function Myinfo() {
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
    minWidth: 600,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const [photoUrl, setPhotoUrl] = useState('assets/images/avatars/guest.png')
  const avatarClick = () => {
    var userphoto = document.getElementById('userphoto')
    userphoto.click();
  }
  const phoupload = (inputObj) => {
    if(inputObj.files && inputObj.files[0]) {
      // FileReader 인스턴스 생성
      const reader = new FileReader()
      // 이미지가 로드가 된 경우
      reader.onload = e => {
        setPhotoUrl(e.target.result)
      }
      // reader가 이미지 읽도록 하기
      reader.readAsDataURL(inputObj.files[0])
    }
  }
  
  const { control, formState, handleSubmit, reset, setError } = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(schema),
  });
  const { isValid, dirtyFields, errors } = formState;
 

  return (
    <FusePageSimple
      classes={{
        topBg: classes.topBg,
        root: classes.layoutRoot,
        content: 'w-full max-w-sm mx-auto',
        toolbar: 'w-full max-w-sm mx-auto relative flex flex-col min-h-auto h-auto items-start',
      }}
      header={
        <div className="flex flex-1 mx-14 w-full items-center justify-between">
          <div className="flex flex-col min-w-0 mx-8 sm:mc-16">
            <motion.div initial={{ x: -20 }} animate={{ x: 0, transition: { delay: 0.3 } }}>
              <Typography className="text-16 sm:text-20 truncate font-medium">
                내정보 수정
              </Typography>
            </motion.div>
          </div>
      </div>
      }
      contentToolbar={
        <>
          <div className="w-full px-24 pb-48 flex flex-col flex-1 justify-items-center items-center">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1, transition: { delay: 0.1 } }}>
            <Tooltip title="프로필 이미지 변경">
              <Avatar
                className={clsx(classes.avatar, '-mt-64  w-128 h-128 bg-white cursor-pointer')}
                src={photoUrl}
                onClick = {avatarClick}
                />
              </Tooltip>
            </motion.div>
          </div>
        </>
      }
      content={
        <Card className="p-24">
          <form>
          <input accept="image/*, .pdf" className='hidden' id="userphoto" type="file" onChange={(event) => phoupload(event.target)} />
          
          <Controller
              name="username"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  className="w-full mb-20"
                  type="text"
                  label="이름"
                  error={!!errors.username}
                  helperText={errors?.username?.message}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Icon className="text-20" color="action">
                          person
                        </Icon>
                      </InputAdornment>
                    ),
                  }}
                  variant="outlined"
                  required
                />
              )}
            />
            <Controller
              name="nickname"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  className="w-full mb-20"
                  type="text"
                  label="별명"
                  error={!!errors.nickname}
                  helperText={errors?.nickname?.message}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Icon className="text-20" color="action">
                          person
                        </Icon>
                      </InputAdornment>
                    ),
                  }}
                  variant="outlined"
                  required
                />
              )}
            />
            {/* <div className='mb-20 flex'>
              <input accept="image/*, .pdf" className='hidden' id="raised-button-file" multiple type="file" 
              onChange={(e)=>setbrfileName(e.target.files[0].name)}
              //onChange={(e)=>console.log(e.target.files)}
              />
              <TextField id="file" label="사업자등록증" variant="outlined" InputProps={{readOnly: true}} value={brfileName}  className='flex-grow' onClick={() => document.getElementById('raised-button-file').click()}/>
            </div> */}
            <Controller
              name="callNumber"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  className="w-full mb-20"
                  type="text"
                  error={!!errors.callNumber}
                  helperText={errors?.callNumber?.message}
                  label="전화번호"
                  InputProps={{
                    pattern: '[0-9]*',
                    endAdornment: (
                      <InputAdornment position="end">
                        <Icon className="text-20" color="action">
                          call
                        </Icon>
                      </InputAdornment>
                    ),
                  }}
                  variant="outlined"
                  required
                />
              )}
            />
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  className="w-full mb-20"
                  type="text"
                  error={!!errors.email}
                  helperText={errors?.email?.message}
                  label="이메일"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Icon className="text-20" color="action">
                          email
                        </Icon>
                      </InputAdornment>
                    ),
                  }}
                  variant="outlined"
                  required
                />
              )}
            />
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  className="w-full mb-20"
                  type="password"
                  label="비밀번호"
                  error={!!errors.password}
                  helperText={errors?.password?.message}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Icon className="text-20" color="action">
                          vpn_key
                        </Icon>
                      </InputAdornment>
                    ),
                  }}
                  variant="outlined"
                  required
                />
              )}
            />
            <Controller
              name="passwordConfirm"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  className="w-full mb-20"
                  type="password"
                  label="비밀번호 확인"
                  error={!!errors.passwordConfirm}
                  helperText={errors?.passwordConfirm?.message}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Icon className="text-20" color="action">
                          vpn_key
                        </Icon>
                      </InputAdornment>
                    ),
                  }}
                  variant="outlined"
                  required
                />
              )}
            />
            
            <div className=''>
              <Button variant="contained" type='button' color='secondary' className='mr-10'>확인</Button>
              <Button variant="contained" type='button'>취소</Button>
            </div>

          </form>
        </Card>
      }
    />
  );
}

export default Myinfo;
