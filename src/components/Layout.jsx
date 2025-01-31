import Modal from "./Modal";
import Authentication from "./Authentication";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

function Layout(props) {
  const { children } = props;

  const [showModal, setShowModal] = useState(false);

  const { globalUser, logout } = useAuth();

  function handleLogout() {
    
  }

  const header = (
    <header>
      <div>
        <h1 className="text-gradient">CAFFIEND</h1>
        <p>For Coffee Insatiates</p>
      </div>
      {globalUser ? 
      (<button onClick={() => {setShowModal(true)}}>
        <p>Sign up free</p>
        <i className="fa-solid fa-mug-hot"></i>
      </button>) 
      : 
      (<button onClick={handleLogout}>
        <p>Log out</p>
        <i class="fa-solid fa-right-from-bracket"></i>
      </button>) }
    </header>
  );

  const footer = (
    <footer>
      <p>
        <span className="text-gradient">Caffiend</span> was made by{" "}
        <a href="#" target="_blank">
        Lefcho
        </a>{" "}<br/>
        using the{" "}
        <a href="https://www.fantacss.smoljames.com" target="_blank">
          FantaCSS
        </a>
      </p>
    </footer>
  );

  return (
    <>
      {showModal && (<Modal handleCloseModal={() => setShowModal(false)}>
        <Authentication handleCloseModal={() => setShowModal(false)}/>
      </Modal>)}
      {header}
      <main>{children}</main>
      {footer}
    </>
  );
}

export default Layout;
