import { Link } from "react-router-dom";
// import PropTypes from "prop-types";
function Contact({ contact, onCheked }) {
  // const deleteContact = async (id) => {
  //   try {
  //     const { data } = await deleteContact(id);
  //     setformData([
  //       ...formData.filter((item, index) => {
  //         return index !== id;
  //       }),
  //     ]);
  //   } catch (error) {
  //     console.log(error);
  //     toastError(error.message);
  //   }
  // };

  return (
    <Link to={`/contacts/${contact.id}`} className="contact__item">
      <div className="contact__header">
        <div className="contact__image">
          <img src={contact.photoUrl} alt={contact.name} />
        </div>

        <div className="contact__details">
          <p className="contact_name">{contact.name.substring(0, 15)}</p>
          <p className="contact_title">{contact.title.substring(0, 15)}</p>
        </div>
      </div>

      <div className="contact__body">
        <p>
          <i className="bi bi-envelope"></i>
          {contact.email}
        </p>
        <p>
          <i className="bi bi-geo"></i>
          {contact.address}
        </p>
        <p>
          <i className="bi bi-telephone"></i>
          {contact.phone}
        </p>
        <p>
          {contact.status === "Active" ? (
            <i className="bi bi-check-circle"></i>
          ) : (
            <i className="bi bi-x-circle"></i>
          )}
          {contact.status}
        </p>
        <button onClick={() => onCheked(contact.id)} className="btn btn-danger">
          Delete
        </button>
      </div>
    </Link>
  );
}

// Contact.propTypes = {
//   id: PropTypes.string.isRequired,
//   photoUrl: PropTypes.string.isRequired,
//   title: PropTypes.string.isRequired,
//   address: PropTypes.string.isRequired,
//   phone: PropTypes.string.isRequired,
//   status: PropTypes.string.isRequired,
//   name: PropTypes.string.isRequired,
//   email: PropTypes.string.isRequired,
// };

export default Contact;
