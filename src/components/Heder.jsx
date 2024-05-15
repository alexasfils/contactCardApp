function Header({ toggleModal, nbOfContacts }) {
  return (
    <>
      <header className="header">
        <div className="conatainer">
          <h3>Contact list ({nbOfContacts})</h3>
          <button onClick={toggleModal} className="btn">
            <i className="bi bi-plus-square"></i>Add New Contact
          </button>
        </div>
      </header>
    </>
  );
}

export default Header;
