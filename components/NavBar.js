import Link from "next/link";
import { auth } from "../firebase";

export default function NavBar({ user }) {
  return (
    <nav>
      <div className="nav-wrapper #263238 blue-grey darken-4">
        <Link href="/">
          <a style={{marginLeft: "10px"}} className="brand-logo">GSOnline</a>
        </Link>

        <ul id="nav-mobile" className="right">
          {user ? (
            <>
              <li>
                <Link href="/addcategories">
                  <a>Add Categories</a>
                </Link>
              </li>
              <li>
                <button style={{marginRight: "10px"}} className="btn red" onClick={() => auth.signOut()}>
                  Logout
                </button>
              </li>
            </>
          ) : (
            <li>
              <Link href="/login">
                <a>Login</a>
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}
