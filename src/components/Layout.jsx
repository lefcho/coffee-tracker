import React from "react";

function Layout(props) {
  const { children } = props;

  const header = (
    <header>
      <div>
        <h1 className="text-gradient">CAFFIEND</h1>
        <p>For Coffee Insatiates</p>
      </div>
      <button>
        <p>Sign up free</p>
        <i className="fa-solid fa-mug-hot"></i>
      </button>
    </header>
  );

  const footer = (
    <footer>
      <p>
        <span className="text-gradient">Caffiend</span> was made by{" "}
        <a href="#" target="_blank">
        Lefcho
        </a>{" "}
        using the{" "}
        <a href="https://www.fantacss.smoljames.com" target="_blank">
          FantaCSS
        </a>
      </p>
    </footer>
  );

  return (
    <>
      {header}
      <main>{children}</main>
      {footer}
    </>
  );
}

export default Layout;
