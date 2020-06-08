import React from 'react';
import { IconButton } from '@rmwc/icon-button';
import { MdClose } from "react-icons/md";
import './Header.scss';

export default function Header() {
  return (
    <header className="header">
      <div className="header__left-items">
        <h1>
          OCW YouTube
        </h1>
      </div>
      <div className="header__right-items">
        <IconButton icon={<MdClose />} />
      </div>
    </header>
  );
}
