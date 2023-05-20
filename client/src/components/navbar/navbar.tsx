import { ChangeEvent, FC, useEffect, useState } from "react";
import classes from "./navbar.module.scss";
import Logo from "../../assets/images/logo.svg";
import { NavLink, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { setLogout } from "../../store/redux/users/actionUsers";
import { Button, Spinner } from "reactstrap";
import menuLogo from "../../assets/images/menu.svg";
import avatarLogo from "../../assets/images/avatar.svg";
import { API_URL } from "../../config";
import Loader from "../loader/loader";

interface INav {
  loading: boolean;
  setOpenSide: (open: boolean) => void;
}

const Navbar: React.FC<INav> = ({ loading, setOpenSide }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isAuth = useAppSelector((state) => state.users.isAuth);
  const isAvatarLoading = useAppSelector(
    (state) => state.uploader.isAvatarLoading
  );
  // const avatar= useAppSelector(state => state.users.data.avatar)
  const data = useAppSelector((state) => state.users.data);
  const [avatar, setAvatar] = useState<string>("");
  useEffect(() => {
    if (data) {
      setAvatar(data.avatar);
      console.log(data.avatar);
    }
  }, [data]);
  console.log(data, "data");

  const userAvatar = avatar ? `${API_URL + avatar} ` : avatarLogo;

  const onLogout = () => {
    dispatch(setLogout());
    navigate("/login");
  };

  return (
    <nav className={classes.navbar}>
      <Button
        color="info"
        outline
        size="sm"
        onClick={() => setOpenSide(true)}
        className={classes.btnMenu}
      >
        <img src={menuLogo} alt="menuLogo" />
      </Button>
      <img src={Logo} alt="logo" className={classes.logo} />
      <div className={classes.header}>MERN CLOUD</div>
      {!isAuth && (
        <div className={classes.login}>
          {<NavLink to={loading ? "" : "login"}>Login</NavLink>}
        </div>
      )}
      {!isAuth && (
        <div className={classes.register}>
          <NavLink to={loading ? "" : "registration"}>Register</NavLink>
        </div>
      )}
      {isAuth && (
        <Button
          color="danger"
          outline
          size="sm"
          className={classes.login}
          onClick={onLogout}
        >
          Logout
        </Button>
      )}
      {isAuth ? (
        <div className={classes.spinner}>
          {!isAvatarLoading ? (
            <NavLink to="/profile">
              <img className={classes.ava} src={userAvatar} alt="avatarLogo" />
            </NavLink>
          ) : (
            <>

              <Spinner color="info" style={{height:"20px", width:"20px"}} children={false} />
            </>
            
          )}
        </div>
      ) : (
        ""
      )}
    </nav>
  );
};

export default Navbar;
