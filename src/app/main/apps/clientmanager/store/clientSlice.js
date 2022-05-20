import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { useEffect } from 'react';

export const getClient = createAsyncThunk('clientmanager/client/getClient', async (params) => {
    const response = await axios.post('/api/master/com/search',  {id:params} );
    const data = await response.data[0];
    return data === undefined ? null : data;
});

const clientSlice = createSlice({
    name: 'clientmanager/client',
    initialState: null,
    reducers: {
      resetClient: () => null,
      newClient: {
        reducer: (state, action) => action.payload,
        prepare: (event) => ({
          payload: {
            comName: "",
            franchise: "",
            serviceCount: 0,
            sector: "",
            tel: "",
            zipcode: "",
            address: "",
            address2: "",
            businessLicense: "",
            serviceCheck: "",
            startDate: "",
            endDate: ""
          },
        }),
      },
    },
    extraReducers: {
      //[getClient.fulfilled]: (state, action) => {null},
      [getClient.fulfilled]: (state, action) => action.payload,
      //[saveClient.fulfilled]: (state, action) => action.payload,
      //[removeClient.fulfilled]: (state, action) => null,
    },
  });
  
  export const { newClient, resetClient } = clientSlice.actions;
  
  export default clientSlice.reducer;