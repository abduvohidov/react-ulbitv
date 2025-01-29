import { LoginSchema } from 'features/AuthByUsername/model/types/LoginSchema';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loginByUsernane } from '../../model/services/loginByUsername';

const initialState: LoginSchema = {
    isLoading: false,
    username: '',
    password: '',
};

export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        setUsername: (state, action: PayloadAction<string>) => {
            state.username = action.payload;
        },
        setPassword: (state, action: PayloadAction<string>) => {
            state.password = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginByUsernane.pending, (state, action) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(loginByUsernane.fulfilled, (state, action) => {
                state.isLoading = false;
            })
            .addCase(loginByUsernane.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: loginActions } = loginSlice;
export const { reducer: loginReducer } = loginSlice;
