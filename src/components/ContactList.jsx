import Contact from "./Contact";

function ContactList({ data, currentPage, getAllContacts, onCheked }) {
  return (
    <>
      <main className="main">
        {data?.content?.length === 0 && <div>No Contacts</div>}
        <ul className="contact__list">
          {data?.content?.length > 0 &&
            data.content.map((contact) => (
              <Contact contact={contact} key={contact.id} onCheked={onCheked} />
            ))}
        </ul>

        {data?.content?.length > 0 &&
          data?.totalPages > 1 && ( //Pagination
            <div className="pagination">
              <a
                onClick={() => getAllContacts(currentPage - 1)}
                className={0 === currentPage ? "disabled" : ""}
              >
                &laquo;
              </a>
              {data &&
                Array.from(Array(data.totalPages).keys()).map((page) => (
                  <a
                    onClick={() => getAllContacts(page)}
                    className={currentPage === page ? "active" : ""}
                    key={page}
                  >
                    {page + 1}
                  </a>
                ))}
              <a
                onClick={() => getAllContacts(currentPage + 1)}
                className={
                  data.totalPages === currentPage + 1 ? "disabled" : ""
                }
              >
                &raquo;
              </a>
            </div>
          )}
      </main>
    </>
  );
}

export default ContactList;
