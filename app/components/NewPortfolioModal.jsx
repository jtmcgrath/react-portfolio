import React from "react";

import "./NewPortfolioModal.scss";

const NewPortfolioModal = () => {
  const [isOpen, setIsOpen] = React.useState(true);

  return isOpen ? (
    <div id="new-portfolio-modal">
      <div>
        <h4>Hello there!</h4>
        <p>
          This is an old version of my portfolio which I've left here for
          posterity. Please take a look at my new blog instead!
        </p>
        <p className="buttons">
          <a className="button" href="https://raptori.dev">
            Visit new site
          </a>{" "}
          <button className="button" onClick={() => setIsOpen(false)} n>
            Continue
          </button>
        </p>
      </div>
      <button onClick={() => setIsOpen(false)}>Close modal</button>
    </div>
  ) : null;
};

export default NewPortfolioModal;
