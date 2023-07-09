import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import { Slide } from "@mui/material";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import { useDispatch, useSelector } from "react-redux";
import { closeFooter, openFooter } from "../redux/footerSlice";
import Link from "next/link";

export default function Footer() {
  const dispatch = useDispatch();

  const view = useSelector((state) => state.footer.value);

  return (
    <div
      style={{ width: "100%", justifyContent: "center" }}
      className="relative footer__div hidden md:flex"
    >
      {!view ? (
        <ArrowCircleRightIcon
          className="absolute cursor-pointer left-10 bottom-0"
          id="footer__arrow"
          onClick={() => dispatch(openFooter())}
        />
      ) : (
        ""
      )}

      <Slide direction="right" in={view} mountOnEnter unmountOnExit>
        <div className="footer p-1 pr-3 pl-3 flex">
           <p className=" "> © 2023 Ruzpro</p>

          <Link href={"/About"}>
            <p className="ml-3 cursor-pointer">About</p>
          </Link>

          <Link href="/legal/Privacy">
            <p className="ml-3 cursor-pointer">Privacy</p>
          </Link>
          <Link href="/legal/Terms">
            <p className="ml-3 cursor-pointer">Terms of use</p>
          </Link>
          <Link href="/Contact">
            <p className="ml-3 cursor-pointer">Contact</p>
          </Link>

          <CloseIcon
            id="footer__close__icon"
            className="cursor-pointer"
            onClick={() => dispatch(closeFooter())}
          />
         </div>
      </Slide>
    </div>
  );
}
