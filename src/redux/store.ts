import { configureStore } from '@reduxjs/toolkit'
import { userApi } from './services/user'
import { setupListeners } from '@reduxjs/toolkit/dist/query'
import { authApi } from './services/auth';
import { roleApi } from './services/role';
import { companyApi } from './services/company';
import { supplierApi } from './services/supplier';
import { vendorApi } from './services/vendor';
import { brandApi } from './services/brand';
import { attributeApi } from './services/attribute';
import { categoryApi } from './services/category';
import { measurementUnitApi } from './services/measurement_unit';
import { subCategoryApi } from './services/sub_category';
import { subSubCategoryApi } from './services/sub_sub_category';

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [roleApi.reducerPath]: roleApi.reducer,
    [companyApi.reducerPath]: companyApi.reducer,
    [supplierApi.reducerPath]: supplierApi.reducer,
    [vendorApi.reducerPath]: vendorApi.reducer,
    [brandApi.reducerPath]: brandApi.reducer,
    [attributeApi.reducerPath]: attributeApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    [subCategoryApi.reducerPath]: subCategoryApi.reducer,
    [subSubCategoryApi.reducerPath]: subSubCategoryApi.reducer,
    [measurementUnitApi.reducerPath]: measurementUnitApi.reducer,
  },
  devTools: true,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(userApi.middleware)
    .concat(authApi.middleware)
    .concat(roleApi.middleware)
    .concat(companyApi.middleware)
    .concat(supplierApi.middleware)
    .concat(vendorApi.middleware)
    .concat(brandApi.middleware)
    .concat(attributeApi.middleware)
    .concat(categoryApi.middleware)
    .concat(subCategoryApi.middleware)
    .concat(subSubCategoryApi.middleware)
    .concat(measurementUnitApi.middleware)
});


setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch