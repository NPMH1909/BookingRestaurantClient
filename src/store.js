import { configureStore } from "@reduxjs/toolkit";

import searchReducer from "./features/slices/searchSlice"
import selectedIdReducer from "./features/slices/selectIdSlice";
import employeeTabReducer from "./features/slices/employeeTabSlice";

import { videoApi } from "./apis/videoApi";
import { restaurantApi } from "./apis/restaurantApi";
import { menuApi } from "./apis/menuApi";
import { userApi } from "./apis/userApi";
import { dishReviewApi } from "./apis/dishReviewApi";
import { reviewApi } from "./apis/reviewApi";
import { orderApi } from "./apis/orderApi";
import { promotionApi } from "./apis/promotionApi";
import { employeeApi } from "./apis/employeeApi";
import { restaurantTypeApi } from "./apis/restaurantTypeApi";
import { viewLogApi } from "./apis/viewLogApi";
import { commentApi } from "./apis/commentApi";
import { recommendationApi } from "./apis/recommendationApi";
import { statisticApi } from "./apis/statisticApi";


export const store = configureStore({
  reducer: {
    search: searchReducer,
    selectedId: selectedIdReducer,
    employeeSelectedTab: employeeTabReducer,

    [videoApi.reducerPath]: videoApi.reducer,
    [restaurantApi.reducerPath]: restaurantApi.reducer,
    [menuApi.reducerPath]: menuApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [dishReviewApi.reducerPath]: dishReviewApi.reducer,
    [reviewApi.reducerPath]: reviewApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    [promotionApi.reducerPath]: promotionApi.reducer,
    [employeeApi.reducerPath]: employeeApi.reducer,
    [restaurantTypeApi.reducerPath]: restaurantTypeApi.reducer,
    [viewLogApi.reducerPath]: viewLogApi.reducer,
    [commentApi.reducerPath]: commentApi.reducer,
    [recommendationApi.reducerPath]: recommendationApi.reducer,
    [statisticApi.reducerPath]: statisticApi.reducer,


  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(videoApi.middleware)
      .concat(restaurantApi.middleware)
      .concat(menuApi.middleware)
      .concat(userApi.middleware)
      .concat(dishReviewApi.middleware)
      .concat(reviewApi.middleware)
      .concat(orderApi.middleware)
      .concat(promotionApi.middleware)
      .concat(employeeApi.middleware)
      .concat(restaurantTypeApi.middleware)
      .concat(viewLogApi.middleware)
      .concat(commentApi.middleware)
      .concat(recommendationApi.middleware)
      .concat(statisticApi.middleware)

});
