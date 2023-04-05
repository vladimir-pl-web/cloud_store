import { FC } from "react"
import classes from './navbar.module.scss'
import Logo from '../../assets/images/logo.svg'
import { NavLink } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../hooks/hooks"
import { setLogout } from "../../store/redux/users/actionUsers"

const Navbar: FC<{ loading: boolean }> = ({ loading }) => {
  const dispatch = useAppDispatch()
  const isAuth = useAppSelector(state => state.users.isAuth)
 const onLogout = () => {
  dispatch(setLogout())
 }
 return (
  <nav
   className={classes.navbar}
  >
   <div className={classes.container}>

    <img src={Logo} alt="logo" className={classes.logo} />
     <div className={classes.header}>MERN CLOUD</div>
    {!isAuth && <div className={classes.login}>{<NavLink to={loading ? "" : "login"}>Login</NavLink>}</div>}
    {!isAuth && <div className={classes.register}><NavLink to={loading ? "" : "registration"}>Register</NavLink></div>}
    {isAuth && <div className={classes.login} onClick={onLogout}>Logout</div>}
   </div>
   
  </nav>
 )
}

export default Navbar