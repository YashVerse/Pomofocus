import React from "react";
import styles from "./Header.module.css";
import { FaRegCheckCircle } from "react-icons/fa";
import { VscGraph } from "react-icons/vsc";
import { IoIosSettings } from "react-icons/io";
import { CiLogin } from "react-icons/ci";
import { BsThreeDotsVertical } from "react-icons/bs";

const Header: React.FC = () => {
  return (
    <div className={styles.header}>
      <div className={styles.Heading}>
        <FaRegCheckCircle className={styles.tick} />
        <div>Pomofocus</div>
      </div>
      <div className={styles.mybtn}>
        <button className={styles.btn}>
          <VscGraph />
          Report
        </button>
        <button className={styles.btn}>
          <IoIosSettings />
          Setting
        </button>
        <button className={styles.btn}>
          <CiLogin />
          Sign in
        </button>
        <button className={styles.btn}>
        <BsThreeDotsVertical />
        </button>
        
      </div>
    </div>
  );
};

export default Header;