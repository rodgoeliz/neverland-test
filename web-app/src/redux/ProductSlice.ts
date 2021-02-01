import { createAsyncThunk, createSlice, PayloadAction, SerializedError } from '@reduxjs/toolkit';
import { Product } from 'types/product';
import { LoadingStates } from 'types/global';

interface RawResponse {
  products: Product[];

  paginationInfo?: {
    currentPage: number;
    cursor: number;
    isLastPage: boolean;
    pageSize: number;
    pages: number;
  };
}

interface ProductsState {
  currentPage: number;
  pageSize: number;

  isLastPage: boolean;
  products: Product[];
  loading: LoadingStates;
  currentRequestId: string | null;
  error: SerializedError | null;
}

const initialState: ProductsState = {
  currentPage: 1,
  pageSize: 12,
  isLastPage: false,
  products: [],

  loading: LoadingStates.IDLE,
  currentRequestId: null,
  error: null,
};

interface FetchProductsArgs {
  pageNo: number;
  pageSize: number;
  isNextPage: boolean;
}

export const fetchProducts = createAsyncThunk('products/fetchProducts', async (args: FetchProductsArgs, thunkAPI) => {
  const urlQuery = `?pageNo=${args.pageNo}&pageSize=${args.pageSize * 2}`;
  const url = `products${urlQuery}`;
  const response = await fetch(url, {
    signal: thunkAPI.signal,
  });

  const { products, paginationInfo }: RawResponse = await response.json();
  const pagination = paginationInfo
    ? {
        currentPage: paginationInfo.currentPage,
        pageSize: paginationInfo.pageSize,
        isLastPage: paginationInfo.isLastPage,
      }
    : undefined;

  return { products, ...(pagination && pagination) };
});

export const userSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    nextPage: (state) => {
      state.currentPage = !state.isLastPage ? state.currentPage + 1 : state.currentPage;
    },
    previousPage: (state) => {
      state.currentPage = state.currentPage > 1 ? state.currentPage - 1 : state.currentPage;
    },
    setPageSize: (state, action: PayloadAction<number>) => {
      state.pageSize = action.payload > 0 ? action.payload : state.pageSize;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state, action) => {
      if (state.loading === LoadingStates.IDLE) {
        state.loading = LoadingStates.PENDING;
        state.currentRequestId = action.meta.requestId;
      }
    });

    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      const { requestId, arg } = action.meta;

      if (state.loading === 'pending' && state.currentRequestId === requestId) {
        state.loading = LoadingStates.IDLE;

        if (arg && arg.isNextPage) {
          const newProductsFull = [...state.products, ...action.payload.products];
          const shouldTrim = newProductsFull.length > arg.pageSize;
          const newProducts = shouldTrim ? newProductsFull.slice(arg.pageSize) : newProductsFull;
          state.products = newProducts;
        }
        if (arg && !arg.isNextPage) {
          state.products = action.payload.products;
        }

        state.isLastPage = action.payload.isLastPage;
        state.currentRequestId = null;
      }
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      const { requestId } = action.meta;
      if (state.loading === 'pending' && state.currentRequestId === requestId) {
        state.loading = LoadingStates.IDLE;
        state.error = action.error;
        state.currentRequestId = null;
      }
    });
  },
});

export const { nextPage, previousPage, setPageSize } = userSlice.actions;
export default userSlice.reducer;
