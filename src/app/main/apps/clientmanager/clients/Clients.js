import FusePageCarded from '@fuse/core/FusePageCarded';
import { Tabs, Tab, Button, Box, IconButton, Typography, FormControl, Select, MenuItem, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useEffect, useState } from 'react';
import { DataGrid, gridPageCountSelector, gridPageSelector, useGridApiContext, useGridSelector } from '@mui/x-data-grid';
import Pagination from '@material-ui/lab/Pagination';
import { motion } from 'framer-motion';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import { escapeRegExp } from 'lodash';
import axios from 'axios';

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
            <MenuItem value={'comName'}>업체명</MenuItem>
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
    setSearchGroup('all')
    requestSearch('')
  };

  function handleOnClick(rowData) {
    // console.log("click ID = " + rowData.id);
    props.history.push(`/apps/clientmanager/client/${rowData.id}`);
  }
  function handleOnClickWrite() {
    props.history.push(`/apps/clientmanager/write/new`);
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
    { field: 'franchise', headerName: '프랜차이즈', minWidth: 160 },
    { field: 'comName', headerName: '업체명', minWidth: 240 },
    { field: 'serviceCount', headerName: '서비스 수량', width: 120},
    { field: 'startDate', headerName: '서비스 생성일', width: 160},
    { field: 'endDate', headerName: '서비스 종료일', width: 160},
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
              <IconButton onClick={(event) => {
                event.stopPropagation();
                props.history.push(`/apps/clientmanager/write/${params.id}`);
              }}>
                <span className="material-icons">edit</span>
              </IconButton>
              <IconButton onClick={(event) => {
                event.stopPropagation();
                console.log(params.id)
              }}>
                <span className="material-icons">delete</span>
              </IconButton>
            </Box>
          );
        }
      }
  ];
  const [origindata, setOrigindata] = useState({rows : []})
  const [data, setData] = useState({rows : []});
  const [rows, setRows] = useState(data.rows)
  const [searchGroup, setSearchGroup] = useState('all');
  const [searchText, setSearchText] = useState('');
  const [rowcount, setRowcount] = useState(0)
  
  useEffect(() => {
    // axios.post('/api/master/com/list')
    // .then((response) => {
    //   const copyarr = [];
    //     copyarr.rows = [...response.data];
    //     setData(copyarr)
    // })
  }, [])
  useEffect(()=>{
    axios.post('/api/master/com/list')
    .then((response) => {
      const copyarr = [];
        copyarr.rows = [...response.data];
        const filteredTab = copyarr.rows.filter((value) => {
          if(selectedTab===0)  {
            return true;
          } else if(selectedTab===1 && value.franchise === 'Y')  {
            return true;
          } else if(selectedTab===2 && value.franchise === 'N')  {
            return true;
          }
          });
          copyarr.rows = filteredTab
          
        setData(copyarr)
    })
  }, [selectedTab])

  useEffect(() => {
    const copyarr = data.rows;
    //copyarr = copyarr.filter(isFranchise(selectedTab))
    setRows(data.rows)
  }, [data])
  
  // function isFranchise(selectedTab)  {
  //   if(selectedTab===0)  {
  //     return true;
  //   } else if(selectedTab===1 && rows.franchise === 'Y')  {
  //     return true;
  //   } else if(selectedTab===2 && rows.franchise === 'N')  {
  //     return true;
  //   }

  // }
  //텍스트 검색
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
  //검색 필드
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
              업체 관리
            </Typography>
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
          <Tab className="h-64" label="프랜차이즈" />
          <Tab className="h-64" label="단독" />
        </Tabs>
      }
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
              }}
              onRowClick={(param) => handleOnClick(param.row)}
              initialState={{ pinnedColumns: { right: ["actions"] } }}
              componentsProps={{
                toolbar: {
                  value: searchText,
                  searchGroup: searchGroup,
                  rowcount : rowcount,
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
            <Button variant="contained" color="secondary" onClick={handleOnClickWrite} className="font-normal">업체등록</Button>
          </div>
        </div>
      }
    />
  );
}

export default Clients;
