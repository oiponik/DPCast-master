import FusePageCarded from '@fuse/core/FusePageCarded';
import { Tabs, Tab, Button, Box, IconButton, Typography, TextField, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useCallback, useEffect, useRef, useState } from 'react';
import { DataGrid, gridPageCountSelector, gridPageSelector, useGridApiContext, useGridSelector } from '@mui/x-data-grid';
import Pagination from '@material-ui/lab/Pagination';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
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
            <MenuItem value={'email'}>이메일</MenuItem>
            <MenuItem value={'name'}>이름</MenuItem>
            <MenuItem value={'grade'}>등급</MenuItem>
            <MenuItem value={'belong'}>소속업체</MenuItem>
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


function Clients(props) {
  const classes = useStyles();
  const [selectedTab, setSelectedTab] = useState(0);
  const handleTabChange = (event, value) => {
    setSelectedTab(value);
  };

  function handleOnClick(rowData) {
    console.log("click ID = " + rowData.id);
    props.history.push(`/apps/membermanager/member/${rowData.id}`);
  }
  function handleOnClickWrite() {
    props.history.push(`/apps/membermanager/write`);
  }
  const [hoveredRow, setHoveredRow] = useState(null);
  const onMouseEnterRow = (event) => {
    const id = Number(event.currentTarget.getAttribute("data-id"));
    setHoveredRow(id);
  };

  const onMouseLeaveRow = (event) => {
    setHoveredRow(null);
  };
  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'email', headerName: '이메일', minWidth: 240 },
    { field: 'name', headerName: '이름', minWidth: 200 },
    { field: 'grade', headerName: '등급', width: 150},
    { field: 'belong', headerName: '소속업체', width: 240},
    { field: 'creationdate', headerName: '생성일', width: 160},
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
      { id: 1, email: 'hong@gogogo.com', name: '홍길동', grade: '관리자', belong: '고피자', creationdate: '2022-08-12'},
      { id: 2, email: 'fdsdg@gogogo.com', name: '김태희', grade: '관리자', belong: '고피자', creationdate: '2022-08-12'},
      { id: 3, email: 'honrrytg@gogogo.com', name: '원빈', grade: '관리자', belong: '고피자', creationdate: '2022-08-12'},
      { id: 4, email: 'sadfsad@gogogo.com', name: '신민아', grade: '관리자', belong: '고피자', creationdate: '2022-08-12'},
      { id: 5, email: 'hong@gogogo.com', name: '아이유', grade: '관리자', belong: '고피자', creationdate: '2022-08-12'},
      { id: 6, email: 'hosadfdsng@gogogo.com', name: '한지민', grade: '관리자', belong: '고피자', creationdate: '2022-08-12'},
      { id: 7, email: 'hong@gogogo.com', name: '마동석', grade: '관리자', belong: '고피자', creationdate: '2022-08-12'},
      { id: 8, email: 'xc@gogogo.com', name: '유오성', grade: '관리자', belong: '고피자', creationdate: '2022-08-12'},
      { id: 9, email: 'hong@gogogo.com', name: '김래원', grade: '관리자', belong: '고피자', creationdate: '2022-08-12'},
      { id: 10, email: 'hong@gogogo.com', name: '조승우', grade: '관리자', belong: '고피자', creationdate: '2022-08-12'},
      { id: 11, email: 'zxdcxb@gogogo.com', name: '노홍철', grade: '관리자', belong: '고피자', creationdate: '2022-08-12'},
      { id: 12, email: 'hong@gogogo.com', name: '홍길동', grade: '관리자', belong: '고피자', creationdate: '2022-08-12'},
      { id: 13, email: 'hong@gogogo.com', name: '유재석', grade: '관리자', belong: '고피자', creationdate: '2022-08-12'},
      { id: 14, email: 'zxcvzdf@gogogo.com', name: '홍길동', grade: '관리자', belong: '고피자', creationdate: '2022-08-12'},
    ],
  };
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
            <Typography className="text-20 sm:text-28 truncate font-medium">
              회원 관리
            </Typography>
          </motion.div>
        </div>
      }
      // contentToolbar={
      //   <Tabs
      //     value={selectedTab}
      //     onChange={handleTabChange}
      //     indicatorColor="primary"
      //     textColor="primary"
      //     variant="scrollable"
      //     scrollButtons="off"
      //     className="w-full h-64"
      //   >
      //     <Tab className="h-64" label="전체" />
      //     <Tab className="h-64" label="프랜차이즈" />
      //     <Tab className="h-64" label="단독" />
      //   </Tabs>
      // }
      content={
        <div className="p-24">
          <div style={{width: '100%' }}>
            <DataGrid
              sx={{ fontSize:'1.3rem',
              "& .MuiDataGrid-row": {
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: "whitesmoke"
                }
              },
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
                NoRowsOverlay:()=><div className='flex justify-center items-center'><p className='p-40'>검색된 정보가 없습니다.</p></div>
              }}
              onRowClick={(param) => handleOnClick(param.row)}
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
                },
                row: {
                  onMouseEnter: onMouseEnterRow,
                  onMouseLeave: onMouseLeaveRow
                }
              }}
            />
          </div>
          <div className='mt-20'>
            <Button variant="contained" color="secondary" onClick={handleOnClickWrite} className="font-normal">회원등록</Button>
          </div>
        </div>
      }
    />
  );
}

export default Clients;
