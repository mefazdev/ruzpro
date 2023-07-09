import React, { useState } from "react";
import { openLogin } from "../redux/loginSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { CiHeart } from "react-icons/ci";
import { Alert, Snackbar } from "@mui/material";

export default function AddWishList({
  id,
  propType,
  viewPage,
  town,
  district,
  locality,
}) {
  const [user, setUser] = useState({});
  const [transition, setTransition] = useState(undefined);
  const [data, setData] = useState([]);
  const [addSnack, setAddsnack] = useState(false);
  const [removeSnack, setRemoveSnack] = useState(false);
  const dispatch = useDispatch();

  const getWishList = async () => {
    if (user?.uid && id) {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_PORT}/api/wishlist/${user.uid}`
        );
        const { data } = await res.json();

        setData(data);
      } catch (error) {
        console.log(error);
        alert(error.message)
      }
    }
  };
  const wishlist = data?.filter(
    (item) => item.propId === id && item.userId === user?.uid
  );
  useEffect(() => {
    getWishList();
  }, [user]);

  useEffect(() => {
    getUser();
  }, []);
  const getUser = () => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  };
  const addToWishList = async () => {
    if (user) {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_PORT}/api/wishlist`,
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              // 'Content-type': 'text/plain',
            },
            body: JSON.stringify({
              userId: user.uid,
              propId: id,
              propType: propType,
              town: town,
              district: district,
              locality: locality,
              date: new Date(),
            }),
          }
        );

        setAddsnack(true);
        getWishList();
        // setAddedToFav(true)
      } catch (error) {
        console.log("error.message....", error.message);
      }
    } else {
      dispatch(openLogin());
    }
  };

  const removeFromWishlist = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_PORT}/api/wishlist/${wishlist[0]?._id}`,
        {
          method: "DELETE",
        }
      );
      getWishList();
      setRemoveSnack(true);
    } catch (error) {
      console.log("error.message....", error.message);
    }
  };
  const onCloseAddSnack = () => {
    setAddsnack(false);
  };

  const onCloseRemoveSnack = () => {
    setRemoveSnack(false);
  };
  return (
    <div>
      {wishlist?.length ? (
        <FavoriteIcon
          className="cursor-pointer "
          onClick={removeFromWishlist}
          id="ftd__r__icons__active"
        />
      ) : viewPage ? (
        <CiHeart
          className="h-5 w-5 mt-1 cursor-pointer"
          onClick={addToWishList}
        
        />
      ) : (
        <FavoriteBorderOutlinedIcon
          style={{ marginTop: "-8px" }}
          className="cursor-pointer"
          id="ftd__r__icons"
          onClick={addToWishList}
        />
      )}

      <Snackbar
        open={addSnack}
        autoHideDuration={3000}
        onClose={onCloseAddSnack}
        TransitionComponent={transition}
      >
        <Alert onClose={onCloseAddSnack} severity="info" sx={{ width: "100%" }}>
          Added to whishlist!
        </Alert>
      </Snackbar>

      <Snackbar
        open={removeSnack}
        autoHideDuration={3000}
        onClose={onCloseRemoveSnack}
        TransitionComponent={transition}
      >
        <Alert
          onClose={onCloseRemoveSnack}
          severity="warning"
          sx={{ width: "100%" }}
        >
          Removed from wishlist!
        </Alert>
      </Snackbar>
    </div>
  );
}
