import classNames from "classnames/bind";
import styles from "./Sidebar.module.scss";
import imglogo from "../../../../img/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouseChimneyUser,
  faUserAlt,
  faUsers,
  faUserSecret,
  faUserTie,
} from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);

function Sidebar({ handleLogout }) {
  return (
    <nav>
      <div className={cx("logo-name")}>
        <div className={cx("logo-image")}>
          <img src={imglogo} alt="" />
        </div>

        <span className={cx("logo_name")}>ViHome</span>
      </div>

      <div className={cx("menu-items")}>
        <ul className={cx("nav-links")}>
          <li>
            <a href="/">
              <FontAwesomeIcon icon={faHouseChimneyUser} />
              <span className={cx("link-name")}>Trang chủ</span>
            </a>
          </li>
          <li>
            <a href="/accountmanagement">
              <FontAwesomeIcon icon={faUserTie} />
              <span className={cx("link-name")}>Quản lý Khách Thuê</span>
            </a>
          </li>
          <li>
            <a href="/accountmanagementhost">
              <FontAwesomeIcon icon={faUserSecret} />
              <span className={cx("link-name")}>Quản lý Chủ Nhà</span>
            </a>
          </li>
        </ul>

        <ul className={cx("logout-mode")}>
          <li>
            <a href="/login">
              <i className={cx("uil uil-signout")}></i>
              <span className={cx("link-name")}>Đăng xuất</span>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Sidebar;
