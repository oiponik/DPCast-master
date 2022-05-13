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
import Autocomplete from '@mui/material/Autocomplete';


const useStyles = makeStyles({
  layoutRoot: {

  },  
});

const schema = yup.object().shape({
  username: yup.string().required('이름을 입력해야 합니다.')
  .matches(/^[ㄱ-ㅎ가-힣a-zA-Z\s]+$/,"이름은 한글/영문만 입력 가능합니다.")
  .min(2, '이름은 최소 2글자 이상 입력해야 합니다.'),
  nickname: yup.string().required('별명을 입력해야 합니다.')
  .matches(/^[ㄱ-ㅎ가-힣a-zA-Z0-9\s]+$/,"별명은 한글/영문/숫자만 입력 가능합니다.")
  .min(2, '별명은 최소 2글자 이상 입력해야 합니다.'),
  callNumber: yup.string()
  .required('전화번호를 입력해야 합니다.')
  .matches(
    /^((\\+[1-9]{1,4})|(\\([0-9]{2,3}\\))|([0-9]{2,4}))*?[0-9]{3,4}?[0-9]{3,4}?$/,"올바른 형식의 번호를 입력해야 합니다.(숫자만 입력)")
    // /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,"올바른 형식의 번호를 입력해야 합니다.")
  .min(10, '전화번호는 최소 10글자로 입력해야 합니다.'),
  email: yup.string().email('유효한 이메일을 입력해야 합니다.').required('이메일을 입력해야 합니다.'),
  password: yup.string()
    .required('비밀번호를 입력해야 합니다.')
    .min(8, '비밀번호는 최소 8글자로 설정해야 합니다.'),
  passwordConfirm: yup.string().oneOf([yup.ref('password'), null], '비밀번호가 일치하지 않습니다.'),
  client: yup.array()
  .of(
    yup.object().shape({
      value: yup.string(),
      label: yup.string()
    })
  )
        
    .min(1, '업체를 선택해야 합니다.')
});
const defaultValues = {
  username: '',
  nickname:'',
  callNumber:'',
  email: '',
  password: '',
  passwordConfirm: '',
  client:'',
};


function Write() {
  const classes = useStyles();
  
  const brfilerRef=useRef();
  // const { reset, watch, control, onChange, formState } = methods;
  // const form = watch();

  function handleOnClick(rowData) {
    console.log("click ID = " + rowData.id);
    props.history.push(`/apps/e-commerce/products/${item.id}/${item.handle}`);
    
  }


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
  
  const {register, control, formState, handleSubmit, reset, setError } = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(schema),
  });
  const { isValid, dirtyFields, errors } = formState;
  const clientArr = [
    { label: '디코디피', id:1},
    { label: '효성ITX', id:2},
    { label: '고피자', id:3},
    { label: '할리스커피', id:4},
    { label: 'KFC', id:5},
  ]
 

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
                <span className="flex mx-4 font-medium">회원관리</span>
              </Typography>
            </motion.div>

            <div className="flex items-center max-w-full">
              <div className="flex flex-col min-w-0 mx-8 sm:mc-16">
                <motion.div initial={{ x: -20 }} animate={{ x: 0, transition: { delay: 0.3 } }}>
                  <Typography className="text-16 sm:text-20 truncate font-medium">
                    {/* {name || 'New Product'} */}
                    회원등록
                  </Typography>
                </motion.div>
              </div>
            </div>
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
        <Card className="p-24 mb-40">
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
            <Controller
              name="client"
              control={control}
              defaultValue={[]}
              render={({ field: { ref, ...field }, fieldState: { error } }) => (
                <Autocomplete
                  {...field}
                  disablePortal
                  filterSelectedOptions
                  options={clientArr}
                  onChange={(event, value) => field.onChange(value)}
                  renderInput={(params) => 
                    <TextField 
                      {...params}
                      label="업체선택" 
                      variant="outlined"
                      // {...register("client")}
                      error={!!errors.client}
                      helperText={errors?.client?.message}
                      inputRef={ref}
                    />
                  }
                  //value={selected}
                />
              )}
            />

            <div className='mt-20'>
              <Button variant="contained" type='submit' color='secondary' className='mr-10' disabled={_.isEmpty(dirtyFields) || !isValid}>확인</Button>
              <Button variant="contained" type='button'>취소</Button>
            </div>

          </form>
        </Card>
      }
    />
  );
}

export default Write;
