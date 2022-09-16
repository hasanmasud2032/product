import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import classes from "../styles/Nav.module.css";
import Account from "./Account";

export default function Nav() {
  const { currentUser } = useAuth();

  return (
    <nav className={classes.nav}>
      <ul>
        {
           currentUser ? 
             <li>
              <Link to="/products" className={`${classes.brand} ${classes.pl}`}>
                <h3>Product List</h3>
              </Link>
             </li>

             : null
          }
      </ul>
      <Account />
    </nav>
  );
}
