import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./slices/user";
import { officeReducer } from "./slices/offices";
import { storageReducer } from "./slices/storage";
//import { useDispatch } from "react-redux";
//const dispatch = useDispatch();
//dispatch(loginUser({ login: "123", password: "pas" }));
// useSelector((state: any) => state.user.isAuthorized.status);

const store = configureStore({
  reducer: {
    storage: storageReducer,
    office: officeReducer,
    user: userReducer,
  },
});

export default store;
