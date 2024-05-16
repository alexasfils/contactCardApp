import { useEffect, useState, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { getContact } from "../api/ContactService";
import { toastError, toastSucces } from "../api/ToastService";

function ContactDetail({ updateContact, updateImage }) {
  const inputRef = useRef();

  //lo stato iniziale del contatto
  const [contact, setContact] = useState({
    id: "",
    name: "",
    email: "",
    title: "",
    phone: "",
    address: "",
    status: "",
    photoUrl: "",
  });

  const { id } = useParams();
  console.log(id);

  //trovo il contatto per id
  const fetchContact = async (id) => {
    try {
      const { data } = await getContact(id);
      setContact(data);
      console.log(data);
      //toastSucces("contact retrieved");
    } catch (error) {
      console.log(error);
      toastError(error.message);
    }
  };

  //seleziono l'immagine cliccando
  const selectImage = () => {
    inputRef.current.click();
  };

  //aggiorno la foto
  const updatePhoto = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file, file.name);
      formData.append("id", id);
      await updateImage(formData);
      setContact((prev) => ({
        ...prev,
        photoUrl: `${prev.photoUrl}?&updated_at=${new Date().getTime()}`,
      }));
      toastSucces("Poto updated");
      console.log("data");
    } catch (error) {
      console.log(error);
      toastError(error.message);
    }
  };

  // cambio i dati da input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setContact({ ...contact, [name]: value });
  };

  //Aggiorno il contatto
  const onUpdateContact = async (e) => {
    e.preventDefault();
    await updateContact(contact);
    fetchContact(id);
    toastSucces("Contact updated");
  };

  useEffect(() => {
    fetchContact(id);
  }, []);

  return (
    <>
      <Link to={"/contacts"} className="link">
        <i className="bi bi-arrow-left"></i>Back to list
      </Link>
      <div className="profile">
        <div className="profile__details">
          <img
            src={contact.photoUrl}
            alt={`Profile photo of ${contact.name}`}
          />
          <div className="profile__metadata">
            <p className="profile__name">{contact.name}</p>
            <p className="profile__muted">JPG, GIF, or PNG. Max size of 10MG</p>
            <button onClick={selectImage} className="btn">
              <i className="bi bi-cloud-upload"></i>Change Photo
            </button>
          </div>
        </div>
        <div className="profile__settings">
          <div>
            <form onSubmit={onUpdateContact} className="form">
              <div className="user-details">
                <input
                  type="hidden"
                  defaultValue={contact.id}
                  name="id"
                  required
                />
                <div className="input-box">
                  <span className="details">Name</span>
                  <input
                    onChange={handleChange}
                    value={contact.name}
                    type="text"
                    name="name"
                    required
                  />
                </div>
                <div className="input-box">
                  <span className="details">Email</span>
                  <input
                    onChange={handleChange}
                    value={contact.email}
                    type="text"
                    name="email"
                    required
                  />
                </div>

                <div className="input-box">
                  <span className="details">Phone</span>
                  <input
                    onChange={handleChange}
                    value={contact.phone}
                    type="text"
                    name="phone"
                    required
                  />
                </div>
                <div className="input-box">
                  <span className="details">Address</span>
                  <input
                    onChange={handleChange}
                    value={contact.address}
                    type="text"
                    name="address"
                    required
                  />
                </div>
                <div className="input-box">
                  <span className="details">Title</span>
                  <input
                    onChange={handleChange}
                    value={contact.title}
                    type="text"
                    name="title"
                    required
                  />
                </div>
                <div className="input-box">
                  <span className="details">Status</span>
                  <input
                    onChange={handleChange}
                    value={contact.status}
                    type="text"
                    name="status"
                    required
                  />
                </div>
              </div>
              <div className="form_footer">
                <button type="submit" className="btn">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <form style={{ display: "none" }}>
        <input
          type="file"
          ref={inputRef}
          onChange={(e) => updatePhoto(e.target.files[0])}
          name="file"
          accept="image/*"
        />
      </form>
    </>
  );
}

export default ContactDetail;
