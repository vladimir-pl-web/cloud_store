import { FC, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import classes from './app.module.scss';
import Auth from './components/auth/auth/auth';
import Navbar from './components/navbar/navbar';
import Loader from './components/loader/loader';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { displayNotification } from './utils/utils';
import { useActions, useAppSelector } from './hooks/hooks';
import Disk from './components/disk/disk';
import { Messages } from './utils/enums';
import { Container } from 'reactstrap';

const App: FC = () => {
  const loading = useAppSelector(state => state.users.isLoading)
  const userError = useAppSelector(state => state.users.errorMessage)
  const isAuth = useAppSelector(state => state.users.isAuth)
  const { setUserError, fetchInitAuth } = useActions()
  const[openSide,setOpenSide]=useState<boolean>(false)

  useEffect(() => {
    if (userError) {
      displayNotification(userError, Messages.A)
      setUserError("")
    }
  }, [userError])

  useEffect(() => {
    fetchInitAuth()
  }, [])

  return (
    <BrowserRouter>
      <Container
        fluid="md"
        className={classes.app}>
        <Navbar loading={loading} setOpenSide={setOpenSide} />
        {!isAuth ?
          <>
            {
              !loading ? (
                <Routes>
                  <Route path="/" element={<Auth title={"Enter Into Storage"} btnName={"Login"} />} />
                  <Route path="/login" element={<Auth title={"Enter Into Storage"} btnName={"Login"} />} />
                  <Route path="/registration" element={<Auth title={"New User"} btnName={"Register"} />} />
                </Routes>
              ) : (
                <Loader />
              )
            }
          </> :
          <Routes>
            <Route path="/disk/:id/:id/:id" element={<Disk openSide={openSide} setOpenSide={setOpenSide} />} />
              {/* <Route index element={<Disk />} />
              <Route path="id/" element={<Disk />} /> */}
            <Route path="*" element={<Disk openSide={openSide} setOpenSide={setOpenSide}/>} />
          </Routes>}
        <ToastContainer
          position="top-right"
          autoClose={2500}
          hideProgressBar
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnHover
        />

      </Container>
    </BrowserRouter>

  );
}

export default App;
