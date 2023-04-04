import { FC } from "react"
import classes from './navbar.module.scss'
import Logo from '../../assets/images/logo.svg'
import { NavLink } from "react-router-dom"

const Navbar: FC<{loading:boolean}> = ({loading}) => {
 return (
  <nav
  className={classes.navbar}
  >
   <div className={classes.container}>
   <img src={Logo} alt="logo" className={classes.logo} />
   <div className={classes.header}>MERN CLOUD</div>
    <div className={classes.login}>
     {<NavLink to={loading ? "" : "login"}>Login</NavLink>}</div>
    <div className={classes.register}><NavLink to={loading ? "" : "registration"}>Register</NavLink></div>
   </div>

  </nav>
 )
}

export default Navbar