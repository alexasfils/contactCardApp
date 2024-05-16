import { useEffect, useRef, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Heder";
import { updatePhoto, saveContact, getContacts } from "./api/ContactService";
import { Routes, Route, Navigate } from "react-router-dom";
import ContactList from "./components/ContactList";
import ContactDetail from "./components/ContactDetail";
import { ToastContainer } from "react-toastify";
import { toastError } from "./api/ToastService";

function App() {
  const [data, setData] = useState({});
  const [currentPage, setCurrentPage] = useState(0);
  const modalRef = useRef();
  const fileRef = useRef();
  const [formData, setformData] = useState({
    name: "",
    email: "",
    title: "",
    phone: "",
    address: "",
    status: "",
    photo: null,
  });
  const [file, setFile] = useState(undefined);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setformData({ ...formData, [name]: value });
  };

  const addContact = async (e) => {
    e.preventDefault();
    try {
      const { data: newContact } = await saveContact(formData);
      const formDataUpdate = new FormData();
      formDataUpdate.append("file", file, file.name);
      formDataUpdate.append("id", newContact.id);
      const { data: photoUrl } = await updatePhoto(formDataUpdate);
      setFile(undefined);
      fileRef.current.value = null;
      setformData({
        name: "",
        email: "",
        title: "",
        phone: "",
        address: "",
        status: "",
        photo: null,
      });
      toggleModal(false);
      await getAllContacts();
    } catch (error) {
      console.log(error);
    }
  };

  const getAllContacts = async (page = 0, size = 10) => {
    try {
      setCurrentPage(page);
      const { data } = await getContacts(page, size);
      setData(data);
      console.log(data);
    } catch (error) {
      console.log(error);
      toastError(error.message);
    }
  };

  const updateContact = async (contact) => {
    try {
      const { data } = await saveContact(contact);
      console.log(data);
    } catch (error) {
      console.log(error);
      toastError(error.message);
    }
  };

  const updateImage = async (formData) => {
    try {
      const { data: photoUrl } = await updatePhoto(formData);
    } catch (error) {
      console.log(error);
      toastError(error.message);
    }
  };

  const toggleModal = (show) =>
    show ? modalRef.current.showModal() : modalRef.current.close();

  useEffect(() => {
    getAllContacts();
  }, []);

  return (
    <>
      <Header toggleModal={toggleModal} nbOfContacts={data.totalElements} />
      <main className="main">
        <div className="container">
          <Routes>
            <Route path="/" element={<Navigate to={"/contacts"} />} />
            <Route
              path="/contacts"
              element={
                <ContactList
                  data={data}
                  currentPage={currentPage}
                  getAllContacts={getAllContacts}
                />
              }
            />
            <Route
              path="/contacts/:id"
              element={
                <ContactDetail
                  updateContact={updateContact}
                  updateImage={updateImage}
                />
              }
            />
          </Routes>
        </div>
      </main>
      {/*Modal */}
      <dialog ref={modalRef} className="modal" id="modal">
        <div className="modal__header">
          <h3>New Contact</h3>
          <i onClick={() => toggleModal(false)} className="bi bi-x-lg"></i>
        </div>
        <div className="divider"></div>
        <div className="modal__body">
          <form onSubmit={addContact}>
            <div className="user-details">
              <div className="input-box">
                <span className="details">Name</span>
                <input
                  onChange={handleChange}
                  value={formData.name}
                  type="text"
                  name="name"
                  required
                />
              </div>
              <div className="input-box">
                <span className="details">Email</span>
                <input
                  onChange={handleChange}
                  value={formData.email}
                  type="text"
                  name="email"
                  required
                />
              </div>
              <div className="input-box">
                <span className="details">Title</span>
                <input
                  onChange={handleChange}
                  value={formData.title}
                  type="text"
                  name="title"
                  required
                />
              </div>
              <div className="input-box">
                <span className="details">Phone Number</span>
                <input
                  onChange={handleChange}
                  value={formData.phone}
                  type="text"
                  name="phone"
                  required
                />
              </div>
              <div className="input-box">
                <span className="details">Address</span>
                <input
                  onChange={handleChange}
                  value={formData.address}
                  type="text"
                  name="address"
                  required
                />
              </div>
              <div className="input-box">
                <span className="details">Account Status</span>
                <input
                  onChange={handleChange}
                  value={formData.status}
                  type="text"
                  name="status"
                  required
                />
              </div>
              <div className="file-input">
                <span className="details">Profile Photo</span>
                <input
                  onChange={(e) => setFile(e.target.files[0])}
                  ref={fileRef}
                  type="file"
                  name="photo"
                  required
                />
              </div>
            </div>
            <div className="form_footer">
              <button
                onClick={() => toggleModal(false)}
                type="button"
                className="btn btn-danger"
              >
                Cancel
              </button>
              <button type="submit" className="btn">
                Save
              </button>
            </div>
          </form>
        </div>
      </dialog>
      <ToastContainer />
    </>
  );
}

export default App;
