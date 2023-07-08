import { useEffect, useMemo, useState } from "react";
import classes from "./navbar.module.scss";
import Logo from "../../assets/images/logo.svg";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { setLogout } from "../../store/redux/users/actionUsers";
import { Button, Spinner } from "reactstrap";
import menuLogo from "../../assets/images/menu.svg";
import avatarLogo from "../../assets/images/avatar.svg";
import { API_URL } from "../../config";


interface INav {
  loading: boolean;
  setOpenSide: (open: boolean) => void;
}

const Navbar: React.FC<INav> = ({ loading, setOpenSide }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {pathname} = useLocation();
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
    }
  }, [data]);

  const userAvatar = avatar ? `${API_URL + avatar} ` : avatarLogo;

  const onLogout = () => {
    dispatch(setLogout());
    navigate("/login");
  };



  const linksMapped = useMemo(()=>{
    const authLinks: {name:string, route:string}[]= [
      {name: "Login", route: "login"},
      {name: "Register", route: "registration"},
      {name: "Forgot Password", route: "forgot_password"},
    ]
    return authLinks.map((el)=>{
      return(
        <div 
        className={classes.login}
        style={{display: `${el.route === pathname.split("/")[1] ? "none" : "block"}`}}
        >
        {<NavLink to={loading ? "" : `${el.route}`}>{el.name}</NavLink>}
      </div>
      )
    })
  },[loading, pathname])

  return (
    <nav className={classes.navbar}>
      <div className={classes.logotype}>
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
      <div className={classes.header}>PANDA'S ClOUD</div>
      </div>
      {!isAuth && <div className={classes.links}>
        {linksMapped }
        </div>}
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
