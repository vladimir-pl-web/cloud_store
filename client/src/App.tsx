import { FC, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import classes from './app.module.scss';
import Auth from './components/auth/auth/auth';
import Navbar from './components/navbar/navbar';
import { useSelector } from "react-redux";
import { RootStateType } from './store/store';
import Loader from './components/loader/loader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { displayErrorNotification } from './utils/utils';
import { useAppDispatch, useAppSelector } from './hooks/hooks';
import { fetchInitAuth, setUserError } from './store/redux/users/actionUsers';

const App: FC = () => {
  const loading = useAppSelector(state => state.users.isLoading)
  const userError = useAppSelector(state => state.users.errorMessage) 
  const isAuth = useAppSelector(state => state.users.isAuth)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (userError) {
      displayErrorNotification(userError)
      dispatch(setUserError(""))
    }
  }, [userError])
  
  useEffect(() => {
   dispatch(fetchInitAuth()) 
  }, [])
  
  return (
    <BrowserRouter>
      <div className={classes.app}>
        <Navbar loading={loading} />
        { !isAuth && 
          <>
            {
              !loading ? (
                <Routes>
                  <Route path="/registration" element={<Auth title={"New User"} btnName={"Register"} />} />
                  <Route path="/login" element={<Auth title={"Enter Into Storage"} btnName={"Login"} />} />
                </Routes>
              ) : (
                <Loader />
              )
            }
          </>} 
        <ToastContainer
          position="top-right"
          autoClose={2500}
          hideProgressBar
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnHover
        />

      </div>
    </BrowserRouter>

  );
}

export default App;
