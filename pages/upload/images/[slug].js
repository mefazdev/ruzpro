import { AddAPhotoOutlined } from "@mui/icons-material";
import { Button } from "@mui/material";
import React from "react";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import Navbar from "../../../components/Navbar";
import { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { auth, storage } from "../../../firebase";
import { onAuthStateChanged } from "firebase/auth";
const shortid = require("shortid");
import Fab from "@mui/material/Fab";
import MobComplitionStatus from "../../../components/complitionStatus/MobComplition";
import ComplitionStatus from "../../../components/complitionStatus/ComplitionStatus";
export default function Images() {
  const router = useRouter();
  const id = router.query.slug;

  const [img1, setImg1] = useState("");
  const [img2, setImg2] = useState("");
  const [img3, setImg3] = useState("");
  const [data, setData] = useState({});
  const [newImg1, setNewImg1] = useState(false);
  const [newImg2, setNewImg2] = useState(false);
  const [newImg3, setNewImg3] = useState(false);
  const [img1Url, setImg1Url] = useState("");
  const [img2Url, setImg2Url] = useState("");
  const [img3Url, setImg3Url] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uid, setUid] = useState("");
  const [skipping, setSkipping] = useState(false);

  const getProperty = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_PORT}/api/property/${id}`,
        {}
      );
      const { data } = await res.json();
      setData(data);
      setImg1(data?.images[0]);
      setImg2(data?.images[1]);
      setImg3(data?.images[2]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProperty();
  }, [id]);
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUid(currentUser?.uid);
    });
  }, []);

  const skip = async () => {
    setSkipping(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_PORT}/api/property/${id}`,
        {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            // 'Content-type': 'text/plain',
          },
          body: JSON.stringify({
            status: "active",
            date: new Date(),
          }),
        }
      );

      await router.push(`/account/dashboard/${uid}`);
      setSkipping(false);
    } catch (error) {
      setSkipping(false);
      alert("Ann error occurred!. Try again");
      console.log(error.message);
    }
  };
  const handleImg1 = (e) => {
    setNewImg1(true);
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      setImg1(readerEvent.target.result);
    };
  };
  const handleImg2 = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = async (readerEvent) => {
      await setImg2(readerEvent.target.result);
      setNewImg2(true);
    };
  };
  const handleImg3 = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = async (readerEvent) => {
      await setImg3(readerEvent.target.result);
      setNewImg3(true);
    };
  };

  const uploadImages = async () => {
    //  if(img1)

    uploadImg1();
  };
  const uploadImg1 = async (e) => {
    setUploading(true);

    const id = shortid();
    const photoRef = ref(storage, `upload/photo/${id}`);

    if (newImg1) {
      await uploadString(photoRef, img1, "data_url").then(async (snapshot) => {
        const downloadURL1 = await getDownloadURL(photoRef);
        await setImg1Url(downloadURL1);
        if (!img2 && !img3) {
          addImages(downloadURL1);
        } else {
          uploadImg2(downloadURL1);
        }
      });
    } else {
      uploadImg2(img1);
    }
  };
  const uploadImg2 = async (downloadURL1) => {
    console.log(downloadURL1);
    const id = shortid();
    const photoRef = ref(storage, `upload/photo/${id}`);
    if (newImg2) {
      await uploadString(photoRef, img2, "data_url").then(async (snapshot) => {
        const downloadURL2 = await getDownloadURL(photoRef);
        await setImg2Url(downloadURL2);
        if (!img3) {
          addImages(downloadURL1, downloadURL2);
        } else {
          uploadImg3(downloadURL1, downloadURL2);
        }
      });
    } else if (!newImg1) {
      uploadImg3(img1, img2);
    } else {
      uploadImg3(downloadURL1, img2);
    }
  };
  const uploadImg3 = async (downloadURL1, downloadURL2) => {
    const id = shortid();
    const photoRef = ref(storage, `upload/photo/${id}`);
    if (newImg3) {
      await uploadString(photoRef, img3, "data_url").then(async (snapshot) => {
        const downloadURL3 = await getDownloadURL(photoRef);

        addImages(downloadURL1, downloadURL2, downloadURL3);
      });
    } else if (newImg1 && newImg2) {
      addImages(downloadURL1, downloadURL2, img3);
    } else if (newImg1 && !newImg2) {
      addImages(downloadURL1, img2, img3);
    } else if (newImg2 && !newImg1) {
      addImages(img1, downloadURL2, img3);
    } else {
      skip();
    }
  };

  const addImages = async (downloadURL1, downloadURL2, downloadURL3) => {
    if (downloadURL1 && downloadURL2 && downloadURL3) {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_PORT}/api/property/${id}`,
          {
            method: "PUT",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },

            body: JSON.stringify({
              images: [downloadURL1, downloadURL2, downloadURL3],
              status: "active",
            }),
          }
        );

        await router.push(`/account/dashboard/${uid}`);
        setUploading(false);
      } catch (error) {
        setUploading(false);
        alert("Ann error occurred!. Try again");
        console.log(error.message);
      }
    }
  };
  return (
    <div className="pb-20">
      <Navbar />

      <div className="upload pt-5 grid gap-4 lg:gap-10 lg:grid-cols-5">
        <MobComplitionStatus id={id} data={data} />
        <ComplitionStatus id={id} data={data} />
        <div className="lg:col-span-4">
          <div className="up__head p-2 bg-gray-100">
            <h4 style={{ fontSize: "20px" }}>Images</h4>
          </div>
          <div className="grid md:grid-cols-3 gap-10 mt-7">
            <div className="add__img__div__outer h-fit">
              <div className="add__img__div relative">
                <Fab
                  className="bg-gray-200"
                  style={{
                    position: "absolute",
                    right: 0,
                    top: 0,
                    marginTop: "-10px",
                    marginRight: "-10px",
                    color: "black",
                  }}
                  size="small"
                  color="secondary"
                  aria-label="add"
                >
                  1
                </Fab>
                <div>
                  {img1 ? (
                    <div>
                      <img src={img1} />
                    </div>
                  ) : (
                    <div className="file-input grid">
                      <input type="file" id="img1" onChange={handleImg1} />
                      <label htmlFor="img1">
                        <AddAPhotoOutlined id="add__cam__icon" />
                      </label>
                    </div>
                  )}
                </div>
              </div>

              <div>
                {img1 ? (
                  <div className="file-input">
                    <input type="file" id="img1" onChange={handleImg1} />
                    <label htmlFor="img1">
                      <div className="w-full bg-green-400 text-white">
                        <p className="text-center">Change</p>
                      </div>
                    </label>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>

            <div className="add__img__div__outer  h-fit">
              <div className="add__img__div relative">
                <Fab
                  className="bg-gray-200"
                  style={{
                    position: "absolute",
                    right: 0,
                    top: 0,
                    marginTop: "-10px",
                    marginRight: "-10px",
                    color: "black",
                  }}
                  size="small"
                  color="secondary"
                  aria-label="add"
                >
                  2
                </Fab>{" "}
                <div>
                  {img2 ? (
                    <div>
                      <img src={img2} />
                    </div>
                  ) : (
                    <div className="file-input grid">
                      <input type="file" id="img2" onChange={handleImg2} />
                      <label htmlFor="img2">
                        <AddAPhotoOutlined id="add__cam__icon" />
                      </label>
                    </div>
                  )}
                </div>
              </div>
              <div>
                {img2 ? (
                  <div className="file-input">
                    <input type="file" id="img2" onChange={handleImg2} />
                    <label htmlFor="img2">
                      <div className="w-full bg-green-400 text-white">
                        <p className="text-center">Change</p>
                      </div>
                    </label>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>

            <div className="add__img__div__outer h-fit">
              <div className="add__img__div relative">
                <Fab
                  className="bg-gray-200"
                  style={{
                    position: "absolute",
                    right: 0,
                    top: 0,
                    marginTop: "-10px",
                    marginRight: "-10px",
                    color: "black",
                  }}
                  size="small"
                  color="secondary"
                  aria-label="add"
                >
                  3
                </Fab>{" "}
                <div>
                  {img3 ? (
                    <div>
                      <img src={img3} />
                    </div>
                  ) : (
                    <div className="file-input grid">
                      <input type="file" id="img3" onChange={handleImg3} />
                      <label htmlFor="img3">
                        <AddAPhotoOutlined id="add__cam__icon" />
                      </label>
                    </div>
                  )}
                </div>
              </div>

              <div>
                {img3 ? (
                  <div className="file-input">
                    <input type="file" id="img3" onChange={handleImg3} />
                    <label htmlFor="img3">
                      <div className="w-full bg-green-400 text-white">
                        <p className="text-center">Change</p>
                      </div>
                    </label>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
          <div className="mt-4">
            <Button
              onClick={uploadImages}
              style={{ float: "right", border: "1px solid blue" }}
              disabled={uploading ? true : false}
              className="ml-3"
            >
              {uploading ? "Uploading..." : "Upload"}
            </Button>
            <Button
              disabled={skipping ? true : false}
              onClick={skip}
              className="mr-3"
              style={{ float: "right", border: "1px solid orange" }}
            >
              SKIP
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
