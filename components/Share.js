import React from "react";
import Paper from "@mui/material/Paper";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import {
  FacebookIcon,
  TelegramIcon,
  TwitterIcon,
  WhatsappIcon,
} from "react-share";
import {
  FacebookShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";
export default function Share({ id, page }) {
  return (
    <Paper>
      <MenuList>
        <MenuItem>
          <WhatsappShareButton
            url={`${process.env.NEXT_PUBLIC_PORT}/view/${page}/${id}`}
          >
            <WhatsappIcon size={25} round={true} />
          </WhatsappShareButton>
          <FacebookShareButton
            className="ml-1"
            url={`${process.env.NEXT_PUBLIC_PORT}/view/${page}/${id}`}
          >
            <FacebookIcon size={25} round={true} />
          </FacebookShareButton>
          <TelegramShareButton
            className="ml-1"
            url={`${process.env.NEXT_PUBLIC_PORT}/view/${page}/${id}`}
          >
            <TelegramIcon size={25} round={true} />
          </TelegramShareButton>
          <TwitterShareButton
            className="ml-1"
            url={`${process.env.NEXT_PUBLIC_PORT}/view/${page}/${id}`}
          >
            <TwitterIcon size={25} round={true} />
          </TwitterShareButton>
        </MenuItem>
      </MenuList>
    </Paper>
  );
}
