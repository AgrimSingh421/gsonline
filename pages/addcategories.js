import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { storage, db, serverTimestamp } from "../firebase";

export default function AddCategories({ user }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");

  useEffect(() => {
    if (url) {
      try {
        db.collection("categories").add({
          title,
          body,
          imageUrl: url,
          postedBy: user.uid,
          createdAt: serverTimestamp(),
        });
        M.toast({ html: "Category created succesfully!", classes: "green" });
      } catch (error) {
        M.toast({ html: error.message, classes: "red" });
      }
    }
  }, [url]);

  const SubmitDetails = () => {
    if (!title || !body || !image) {
      M.toast({ html: "Please add all the fields!", classes: "red" });
      return;
    }
    var uploadTask = storage.ref().child(`image/${uuidv4()}`).put(image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        if (progress == "100") {
          M.toast({ html: "Image uploaded succesfully!", classes: "green" });
        }
      },
      (error) => {
        M.toast({ html: error.message, classes: "red" });
      },
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          console.log("File available at", downloadURL);
          setUrl(downloadURL);
        });
      }
    );
  };

  return (
    <>
      <div className="input-field rootdiv">
        <h3>Add Categories</h3>
        <input
          type="text"
          value={title}
          placeholder="Enter the Title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          type="text"
          value={body}
          placeholder="Enter the Body"
          onChange={(e) => setBody(e.target.value)}
        />

        <div className="file-field input-field">
          <div className="btn #263238 blue-grey darken-4">
            <span>File</span>
            <input type="file" onChange={(e) => setImage(e.target.files[0])} />
          </div>
          <div className="file-path-wrapper">
            <input className="file-path validate" type="text" />
          </div>
        </div>

        <button
          className="btn #263238 blue-grey darken-4"
          onClick={SubmitDetails}
          disabled={!title || !body || !image}
        >
          Submit
        </button>

        <style jsx>
          {`
            .rootdiv {
              margin: 30px auto;
              max-width: 600px;
              padding: 20px;
              text-align: center;
            }
          `}
        </style>
      </div>
    </>
  );
}
