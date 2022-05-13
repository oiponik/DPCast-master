import FusePageCarded from '@fuse/core/FusePageCarded';
import { Tabs, Tab, Button, Box, IconButton, Typography, Modal, DialogTitle, DialogContent, DialogActions, Dialog, TextField, MenuItem, FormControl, Select } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useCallback, useEffect, useRef, useState } from 'react';
import { DataGrid, gridPageCountSelector, gridPageSelector, useGridApiContext, useGridSelector } from '@mui/x-data-grid';
import Pagination from '@material-ui/lab/Pagination';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';


const useStyles = makeStyles({
  layoutRoot: {},
});

function CustomPagination() {
  const apiRef = useGridApiContext();
  const page = useGridSelector(apiRef, gridPageSelector);
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);
  return (
    <Pagination
      count={pageCount}
      page={page + 1}
      onChange={(event, value) => apiRef.current.setPage(value - 1)}
    />
  );
}
function escapeRegExp(value) {
  return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}

function QuickSearchToolbar(props) {
  
  return (
    <div className='p-10 border-b flex justify-between'>
      <div className='flex items-center'>
      <Typography>Total : {props.rowcount}</Typography>
      </div>
      <div>
        <FormControl className='mr-8'>
          <Select
            labelId=""
            id=""
            variant='outlined'
            value={props.searchGroup ? props.searchGroup : "all"}
            onChange={props.SearchGroupChange}
          >
            <MenuItem value={'all'}>전체</MenuItem>
            <MenuItem value={'version'}>버전</MenuItem>
            <MenuItem value={'file'}>파일</MenuItem>
          </Select>
        </FormControl>
        <TextField
          variant="outlined"
          value={props.value}
          onChange={props.onChange}
          placeholder="검색"
          InputProps={{
            startAdornment: <SearchIcon fontSize="large" />,
            endAdornment: (
              <IconButton
                title="Clear"
                aria-label="Clear"
                size="medium"
                style={{ visibility: props.value ? 'visible' : 'hidden' }}
                onClick={props.clearSearch}
              >
                {<ClearIcon fontSize="medium" />}
              </IconButton>
            ),
          }}
          sx={{
            width: {
              xs: 1,
              sm: 'auto',
            },
            m: (theme) => theme.spacing(1, 0.5, 1.5),
            '& .MuiSvgIcon-root': {
              mr: 0.5,
            },
            '& .MuiInput-underline:before': {
              borderBottom: 1,
              borderColor: 'divider',
            },
          }}
        />
      </div>
    </div>
  );
}

function Updates(props) {
  const classes = useStyles();
  const [selectedTab, setSelectedTab] = useState(0);
  const [uploadOpen, setUploadOpen] = useState(false);
  const handleTabChange = (event, value) => {
    setSelectedTab(value);
  };

  // function handleOnClick(rowData) {
  //   console.log("click ID = " + rowData.id);
  //   props.history.push(`/apps/clientmanager/client/${rowData.id}`);
  // }
  function handleUploadOpen() {
    setUploadOpen(true)
  }
  function handleUploadClose(){
    setUploadOpen(false)
  }

  // const [hoveredRow, setHoveredRow] = useState(null);
  // const onMouseEnterRow = (event) => {
  //   const id = Number(event.currentTarget.getAttribute("data-id"));
  //   setHoveredRow(id);
  // };

  // const onMouseLeaveRow = (event) => {
  //   setHoveredRow(null);
  // };
  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: '구분', headerName: '구분', minWidth: 160 },
    { field: 'version', headerName: '버전', minWidth: 100 },
    { field: 'file', headerName: '파일', width: 220,
      renderCell: (params) => {
        return <Link href={`#${params.row.url}`}>{params.row.file}</Link>;
      }
    },
    { field: 'sDate', headerName: '등록일', width: 160},
    {
      field: "actions",
      headerName: "",
      width: 120,
      renderCell: (params) => {
          return (
            <Box
              sx={{
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "start",
                alignItems: "start"
              }}
            >
              <IconButton onClick={() => console.log(params.id)}>
                <span className="material-icons">edit</span>
              </IconButton>
              <IconButton onClick={() => console.log(params.id)}>
                <span className="material-icons">delete</span>
              </IconButton>
            </Box>
          );
        }
      }
  ];
  const data = {
    rows : [
    { id: 1, 구분: '플레이어', version: '3.0.5', file: 'Player_v3.0.5', sDate: '2022-06-12'},
    { id: 2, 구분: '컨피그', version: '3.0.5', file: 'Config_v3.0.5', sDate: '2022-06-12'},
    { id: 3, 구분: '애드온컨피그', version: '3.0.5', file: 'addOnConfig_v3.0.5', sDate: '2022-06-12'},
    { id: 4, 구분: '컨피그', version: '3.0.5', file: 'Config_v3.0.5', sDate: '2022-06-12'},
    { id: 5, 구분: '플레이어', version: '3.0.5', file: 'Player_v3.0.5', sDate: '2022-06-12'},
    { id: 6, 구분: '애드온컨피그', version: '3.0.5', file: 'addOnConfig_v3.0.5', sDate: '2022-06-12'},
    { id: 7, 구분: '컨피그', version: '3.0.5', file: 'Config_v3.0.5', sDate: '2022-06-12'},
    { id: 8, 구분: '플레이어', version: '3.0.5', file: 'Player_v3.0.5', sDate: '2022-06-12'},
    { id: 9, 구분: '컨피그', version: '3.0.5', file: 'Config_v3.0.5', sDate: '2022-06-12'},
    { id: 10, 구분: '애드온컨피그', version: '3.0.5', file: 'addOnConfig_v3.0.5', sDate: '2022-06-12'},
    { id: 11, 구분: '플레이어', version: '3.0.5', file: 'Player_v3.0.5', sDate: '2022-06-12'},
    { id: 12, 구분: '애드온컨피그', version: '3.0.5', file: 'addOnConfig_v3.0.5', sDate: '2022-06-12'},
    { id: 13, 구분: '플레이어', version: '3.0.5', file: 'Player_v3.0.5', sDate: '2022-06-12'},
    { id: 14, 구분: '플레이어', version: '3.0.5', file: 'Player_v3.0.5', sDate: '2022-06-12'},
    { id: 15, 구분: '애드온컨피그', version: '3.0.5', file: 'addOnConfig_v3.0.5', sDate: '2022-06-12'},
    ],
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
  const [updatefileName, setupdatefileName] = useState('');
  const [fileversion ,setFileversion] = useState('');
  const [rows, setRows] = useState(data.rows)
  const [searchGroup, setSearchGroup] = useState('all');
  const [searchText, setSearchText] = useState('');
  const [rowcount, setRowcount] = useState(0)
  const requestSearch = (searchValue) => {
    setSearchText(searchValue);
    const searchRegex = new RegExp(escapeRegExp(searchValue), 'i');
    const filteredRows = data.rows.filter((row) => {
      return Object.keys(row).some((field) => {
        if(field===searchGroup||searchGroup==='all') return searchRegex.test(row[field].toString());
      });
    });
    setRows(filteredRows);
  };
  const handleSearchGroupChange = (event) => {
    setSearchGroup(event.target.value);
  };
  useEffect(()=>{
    setRowcount(rows.length);
  },[rows])
  useEffect(()=>{
    requestSearch(searchText);
  },[searchGroup])
  return (
    <FusePageCarded
      classes={{
        root: classes.layoutRoot,
      }}
      header={
        <div className="flex min-w-0 mx-8 sm:mc-16 items-center">
          <motion.div initial={{ x: -20 }} animate={{ x: 0, transition: { delay: 0.3 } }}>
            <Typography className="text-20 sm:text-28 truncate font-medium">시스템 업데이트 관리</Typography>
          </motion.div>
        </div>
      }
      contentToolbar={
        <Tabs
          value={selectedTab}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="off"
          className="w-full h-64"
        >
          <Tab className="h-64" label="전체" />
          <Tab className="h-64" label="플레이어" />
          <Tab className="h-64" label="컨피그" />
          <Tab className="h-64" label="애드온컨피그" />
        </Tabs>
      }
      content={
        <div className="p-24">
          <div style={{width: '100%' }}>
            <DataGrid
              sx={{ fontSize:'1.3rem',
              
              // HeaderTitle
              "& .MuiDataGrid-columnHeader": {
                px: "2rem"
              },
              "& .MuiDataGrid-columnHeader:focus": {
                outline: "none"
              },
              "& .MuiDataGrid-columnHeader:focus-within": {
                outline: "none"
              },
              "& .MuiDataGrid-cell": {
                px: "2rem"
              },
              "& .MuiDataGrid-cell:focus": {
                outline: "none"
              },
              "& .MuiDataGrid-cell:focus-within": {
                outline: "none"
              }}}
              rows={rows}
              columns={columns}
              pageSize={10}
              rowsPerPageOptions={[10]}
              // checkboxSelection
              autoHeight
              disableColumnFilter
              disableColumnMenu
              disableSelectionOnClick
              components={{
                Toolbar: QuickSearchToolbar,
                Pagination: CustomPagination,
              }}
              initialState={{ pinnedColumns: { right: ["actions"] } }}
              componentsProps={{
                toolbar: {
                  value: searchText,
                  searchGroup: searchGroup,
                  rowcount: rowcount,
                  setSearchGroup : setSearchGroup,
                  onChange: (event) => {
                    requestSearch(event.target.value);
                  },
                  clearSearch: () => requestSearch(''),
                  SearchGroupChange: (event) => {
                    handleSearchGroupChange(event)
                  }
                }
              }}
            />
          </div>
          <div className='mt-20'>
            <Button variant="contained" color="secondary" onClick={handleUploadOpen} className="font-normal">업데이트 파일 등록</Button>
            <Dialog
              open={uploadOpen}
              onClose={handleUploadClose}
            >
              <DialogTitle className='px-20'>
                업데이트 파일 등록
              </DialogTitle>
              <DialogContent className='px-20'>
              <div className='mb-20'>
                <TextField id="" select label="구분" variant="outlined" className='w-full'>
                  <MenuItem value='player'>Player</MenuItem>
                  <MenuItem value='config'>Config</MenuItem>
                  <MenuItem value='addOnConfig'>addOnConfig</MenuItem>
                </TextField>
              </div>
              <div className='mb-20 flex'>
                <input accept=".zip" className='hidden' id="raised-button-file" multiple type="file" 
                onChange={
                  (e)=>{
                    console.log(e.target.files)
                    if(e.target.files.length!=0){
                      setupdatefileName(e.target.files[0].name);
                      setFileversion(e.target.files[0].name.split('_').pop().trim().replace(/(.png|.jpg|.jpeg|.gif|.zip)$/,''))
                    }
                  }
                }
                
                />
                <TextField id="file" label="업데이트 파일" variant="outlined" InputProps={{readOnly: true}} value={updatefileName}  className='flex-grow' onClick={() => document.getElementById('raised-button-file').click()}/>
              </div>
              <div className='mb-20'>
                <TextField id="version" label='버전' value={fileversion} InputProps={{readOnly: true, disabled: true}} variant="outlined" className='w-full' />
                <Typography variant='caption'>버전(정의된 파일명에서 자동으로 입력됩니다.) </Typography>
              </div>
              </DialogContent>
              <DialogActions className='px-20 pb-20'>
                <Button autoFocus variant="contained" color='secondary'>확인</Button>
                <Button variant="contained" onClick={handleUploadClose}>취소</Button>
              </DialogActions>
            </Dialog>
          </div>
        </div>
      }
    />
  );
}

export default Updates;
