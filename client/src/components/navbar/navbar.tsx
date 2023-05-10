import { FC } from "react"
import classes from './navbar.module.scss'
import Logo from '../../assets/images/logo.svg'
import { NavLink, useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../hooks/hooks"
import { setLogout } from "../../store/redux/users/actionUsers"
import { Button } from "reactstrap"
import menuLogo from '../../assets/images/menu.svg'

interface INav{ loading: boolean; setOpenSide:(open:boolean)=>void}

const Navbar: React.FC<INav> = ({ loading, setOpenSide }) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const isAuth = useAppSelector(state => state.users.isAuth)
 const onLogout = () => {
   dispatch(setLogout())
   navigate("/login")
 }
  return (
  <nav
   className={classes.navbar}
    >
      <Button
        color="info"
        outline
        size="sm"
        onClick={() => setOpenSide(true)}
        className={classes.btnMenu}>
      <img src={menuLogo} alt="menuLogo" />
    </Button>
    <img src={Logo} alt="logo" className={classes.logo} />
     <div className={classes.header}>MERN CLOUD</div>
    {!isAuth && <div className={classes.login}>{<NavLink to={loading ? "" : "login"}>Login</NavLink>}</div>}
    {!isAuth && <div className={classes.register}><NavLink to={loading ? "" : "registration"}>Register</NavLink></div>}
      {isAuth && <Button
        color="danger"
        outline
        size="sm"
        className={classes.login} onClick={onLogout}>Logout</Button>}
      </nav>
 )
}

export default Navbar