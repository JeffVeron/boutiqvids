import { useLocation, useParams } from 'react-router-dom';
import { MdAccountBox } from 'react-icons/md';
import { Cloudinary } from '@cloudinary/url-gen';
import { auto } from '@cloudinary/url-gen/actions/resize';
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';
import { AdvancedImage } from '@cloudinary/react';
 import { fill } from "@cloudinary/url-gen/actions/resize";
import { quality } from "@cloudinary/url-gen/actions/delivery";
import React, { useState , useEffect } from "react";
import { COLOURS } from '../colours';
import { FaFacebook } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { FaWhatsappSquare } from "react-icons/fa";
import { useNavigate ,Link } from 'react-router-dom';





const CLOUD_NAME = "djahthjuj"; // your Cloud name
const UPLOAD_PRESET = "boutiqvids"; // your upload preset



export default function VideoDetail() {

  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);

    const [showRequestModal, setShowRequestModal] = useState(false);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
const [showMessageModal, setShowMessageModal] = useState(false);
 const [messages, setMessages] = useState([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("")


const handleMessageOpen = () => setShowModal(true);
const handleMessageClose = () => setShowModal(false);

    const handleMessageSubmit = (e) => {
    e.preventDefault();

    if (!name.trim() || !message.trim()) {
      alert("Please enter your name and message");
      return;
    }
     // Add the new message to the list
    const newMessage = { name, text: message };
    setMessages((prev) => [...prev, newMessage]);

    // Reset form + close modal
    setName("");
    setMessage("");
    setShowModal(false);
  };


  const handleRequestOpen = () => setShowRequestModal(true);
  const handleRequestClose = () => setShowRequestModal(false);

   const handleSubmit = (e) => {
    e.preventDefault();
    // You can send this data to your backend or API
    console.log("Email:", email);
    console.log("Phone:", phone);
    alert("Callback request submitted!");
    setShowRequestModal(false);
    setEmail("");
    setPhone("");
  };

  const handleOpen = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

    // Add state for dropdown visibility
const [showAddress, setShowAddress] = useState(false);


 const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load images from localStorage on page load
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("uploadedImages"));
    if (saved) setImages(saved);
  }, []);

  // Save images to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("uploadedImages", JSON.stringify(images));
  }, [images]);

  const handleUpload = async (e) => {
  const files = Array.from(e.target.files);
  if (!files.length) return;

  setLoading(true);

  const uploaded = [];

  for (const file of files) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET); // must match exactly

    const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    console.log("Upload response:", data);

    if (data.error) {
      console.error("Cloudinary error:", data.error);
    }

    if (data.secure_url) {
      uploaded.push({
        id: data.asset_id,
        url: data.secure_url,
      });
    }
  }

  setImages((prev) => [...prev, ...uploaded]);
  setLoading(false);
};

  const handleClear = () => {
    setImages([]);
    localStorage.removeItem("uploadedImages");
  };

 
 

  const { id } = useParams();
  const location = useLocation();
  const video = location.state?.video; // 👈 Get passed video object

  // Fallback in case user reloads the page (state will be lost)
  if (!video) {
    return (
      <div style={{ padding: '20px' }}>
        <h2>Video not found</h2>
        <p>Try going back to the home page.</p>
      </div>
    );
  }

const videoUrl = `https://www.youtube.com/watch/${id}`
 const handleShare = (platform) => {
    let shareUrl = "";

    switch (platform) {
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(videoUrl)}`;
        break;
      case "instagram":
        // Instagram doesn’t allow direct link sharing via URL — open Instagram homepage instead
        shareUrl = "https://www.instagram.com/";
        break;
      case "whatsapp":
        shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(videoUrl)}`;
        break;
      default:
        return;
    }

    window.open(shareUrl, "_blank");
  };

return (
    <div style={{ padding: '20px', backgroundColor: COLOURS.primary.color2 }}>
        <div
            style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '20px',
            }}
        >
            <h1
                style={{
                    color: COLOURS.primary.color3,
                    backgroundColor: COLOURS.primary.color4,
                    padding: '10px 20px',
                    borderRadius: '8px',
                }}
            >
                Product Name
            </h1>

            <Link  to = "/user" style={{ textDecoration: 'none' }} >
            <MdAccountBox 
            /* onClick={()=>{navigate("/user")}} */
            color={COLOURS.primary.color3} 
            size={100}
             />
          </Link>

        </div>

        <iframe
            src={`https://www.youtube.com/embed/${id}`}
            title={video.snippet.title}
            allowFullScreen
            style={{
                width: '100%',
                height: '400px',
                borderRadius: '10px',
            }}
        ></iframe>

        <h2 style={{ marginTop: '16px', color: COLOURS.primary.color3 }}>
            {video.snippet.title}
        </h2>
        <p style={{ color: '#666', marginTop: '8px' }}>
            Channel: {video.snippet.channelTitle}
        </p>
        <p style={{ marginTop: '12px', lineHeight: 1.6, color: COLOURS.primary.color3 }}>
            {video.snippet.description}
        </p>

        <p
            style={{
                color: COLOURS.primary.color3,
                backgroundColor: COLOURS.primary.color4,
                padding: '10px 20px',
                borderRadius: '8px',
                fontWeight: 'bold',
                cursor: 'pointer',
            }}
            onClick={() => setShowAddress((prev) => !prev)}
        >
            Store Address
        </p>
        {showAddress && (
            <div
                style={{
                    background: COLOURS.primary.color4,
                    color: COLOURS.primary.color3,
                    padding: '10px 20px',
                    borderRadius: '8px',
                    marginBottom: '10px',
                    marginTop: '5px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.10)',
                }}
            >
                123 Demo Street, Cityville, Country<br />
                Phone: (555) 123-4567
            </div>
        )}

  {/*       <p
            style={{
                color: '#fff',
                border: '2px solid #fff',
                padding: '10px 20px',
                borderRadius: '8px',
                fontWeight: 'bold',
            }}
        >
            Show Contact
        </p> */}

         <div style={{ textAlign: "center", marginTop: "50px" }}>
      {/* Clickable text */}
      <p
        onClick={handleOpen}
         style={{
                color: '#fff',
                border: '2px solid #fff',
                padding: '10px 20px',
                borderRadius: '8px',
                fontWeight: 'bold',
                pointer :'cursor'
            }}
      >
        Show Contact
      </p>

      {/* Modal */}
      {showModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
          onClick={handleClose} // close modal on outside click
        >
          <div
            style={{
              background: "#fff",
              color: "#333",
              padding: "30px",
              borderRadius: "10px",
              minWidth: "300px",
              textAlign: "center",
              position: "relative",
            }}
            onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
          >
            <h2>Seller Contact Info</h2>
            <p>Email: seller@example.com</p>
            <p>Phone: +233 55 123 4567</p>

            <button
              onClick={handleClose}
              style={{
                marginTop: "20px",
                padding: "10px 20px",
                borderRadius: "6px",
                border: "none",
                backgroundColor: "#333",
                color: "#fff",
                cursor: "pointer",
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>


<div style={{ textAlign: "center", marginTop: "50px" }}>
      {/* Trigger */}
      <p
        onClick={handleRequestOpen}
        style={{
                color: '#fff',
                border: '2px solid #fff',
                padding: '10px 20px',
                borderRadius: '8px',
                fontWeight: 'bold',
            }}
      >
        Request a Callback
      </p>

      {/* Modal */}
      {showRequestModal && (
        <div
          onClick={handleRequestClose}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
            style={{
              backgroundColor: "#fff",
              color: "#333",
              padding: "30px",
              borderRadius: "10px",
              width: "320px",
              textAlign: "center",
            }}
          >
            <h2>Request a Callback</h2>
            <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
              <input
                type="email"
                placeholder="Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "10px",
                  marginBottom: "10px",
                  borderRadius: "6px",
                  border: "1px solid #ccc",
                }}
              />

              <input
                type="tel"
                placeholder="Your Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "10px",
                  marginBottom: "15px",
                  borderRadius: "6px",
                  border: "1px solid #ccc",
                }}
              />

              <button
                type="submit"
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "6px",
                  border: "none",
                  backgroundColor: "#333",
                  color: "#fff",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                Submit
              </button>
            </form>

            <button
              onClick={handleRequestClose}
              style={{
                marginTop: "15px",
                background: "none",
                border: "none",
                color: "#555",
                cursor: "pointer",
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>



   {/*     <p
            style={{
                color: '#fff',
                border: '2px solid #fff',
                padding: '10px 20px',
                borderRadius: '8px',
                fontWeight: 'bold',
            }}
        >
            Request a Callback
        </p> */}



          <div style={{ color: "#fff", textAlign: "center", marginTop: "40px" }}>
      {/* Trigger */}
      <p
        onClick={handleMessageOpen}
        style={{
          color: "#fff",
          border: "2px solid #fff",
          padding: "10px 20px",
          borderRadius: "8px",
          fontWeight: "bold",
          width: "fit-content",
          margin: "auto",
          cursor: "pointer",
          backgroundColor: "#333",
        }}
      >
        Start a Conversation
      </p>

      {/* Modal */}
      {showModal && (
        <div
          onClick={handleMessageClose}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: "#fff",
              color: "#333",
              padding: "30px",
              borderRadius: "10px",
              width: "350px",
              textAlign: "center",
            }}
          >
            <h2>Start a Conversation</h2>
            <form onSubmit={handleMessageSubmit} style={{ marginTop: "20px" }}>
              <input
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "10px",
                  marginBottom: "10px",
                  borderRadius: "6px",
                  border: "1px solid #ccc",
                }}
              />
              <textarea
                placeholder="Type your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "10px",
                  marginBottom: "15px",
                  borderRadius: "6px",
                  border: "1px solid #ccc",
                  minHeight: "100px",
                }}
              />
              <button
                type="submit"
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "6px",
                  border: "none",
                  backgroundColor: "#333",
                  color: "#fff",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                Send Message
              </button>
            </form>
            <button
              onClick={handleMessageClose}
              style={{
                marginTop: "15px",
                background: "none",
                border: "none",
                color: "#555",
                cursor: "pointer",
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* MESSAGES Section */}
      <div
        style={{
          marginTop: "50px",
          padding: "20px",
          border: "2px solid #fff",
          borderRadius: "8px",
          maxWidth: "600px",
          margin: "40px auto",
          textAlign: "left",
          backgroundColor: "#222",
        }}
      >
        <h3 style={{ textAlign: "center", marginBottom: "20px" }}>MESSAGES</h3>

        {messages.length === 0 ? (
          <p style={{ textAlign: "center", color: "#aaa" }}>
            No messages yet. Start a conversation!
          </p>
        ) : (
          messages.map((msg, index) => (
            <div
              key={index}
              style={{
                marginBottom: "15px",
                backgroundColor: "#333",
                padding: "10px",
                borderRadius: "8px",
              }}
            >
              <strong style={{ color: "#00bcd4" }}>{msg.name}</strong>
              <p style={{ margin: "5px 0 0 0" }}>{msg.text}</p>
            </div>
          ))
        )}
      </div>
    </div>

          {/* <p
            style={{
                color: '#fff',
                border: '2px solid #fff',
                padding: '10px 20px',
                borderRadius: '8px',
                fontWeight: 'bold',
            }}
        >
         Start a Conversation  
        </p>  */}

        <div
            style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'center',
                marginTop: '20px',
                marginBottom: '20px',
            }}
        >
           {/*  <FaFacebook color={COLOURS.primary.color3} size={70} />
            <FaInstagramSquare color={COLOURS.primary.color3} size={70} />
            <FaWhatsappSquare color={COLOURS.primary.color3} size={70} /> */}


            <div style={{ display: "flex", gap: 20 }}>
      <FaFacebook
        color={COLOURS.primary.color3}
        size={70}
        style={{ cursor: "pointer" }}
        onClick={() => handleShare("facebook")}
      />
      <FaInstagramSquare
        color={COLOURS.primary.color3}
        size={70}
        style={{ cursor: "pointer" }}
        onClick={() => handleShare("instagram")}
      />
      <FaWhatsappSquare
        color={COLOURS.primary.color3}
        size={70}
        style={{ cursor: "pointer" }}
        onClick={() => handleShare("whatsapp")}
      />
    </div>



    
        </div>

        <div style={{ textAlign: 'center', padding: '20px' }}>
            <h2>Upload Multiple Images (Persistent)</h2>
            <input type="file" multiple onChange={handleUpload} accept="image/*" />
            {loading && <p>Uploading...</p>}

            {images.length > 0 && (
                <>
                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                            gap: '15px',
                            marginTop: '20px',
                        }}
                    >
                        {images.map((img) => (
                            <div key={img.id}>
                                <img
                                    src={img.url}
                                    alt="Uploaded"
                                    style={{
                                        width: '100%',
                                        borderRadius: '12px',
                                        boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                                    }}
                                />
                            </div>
                        ))}
                    </div>

                    <button
                        onClick={handleClear}
                        style={{
                            marginTop: '20px',
                            padding: '10px 20px',
                            borderRadius: '8px',
                            background: 'crimson',
                            color: '#fff',
                            border: 'none',
                            cursor: 'pointer',
                        }}
                    >
                        Clear All
                    </button>
                </>
            )}
        </div>
    </div>
);
}
