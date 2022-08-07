import classNames from "classnames/bind";
import React from "react";
import styles from "../Home_Admin/style.css";
import imgprofile from "../../img/profile.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAddressBook,
  faAlignJustify,
  faEdit,
  faPlusCircle,
  faSearch,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import Sidebar from "../../components/Layout/DefaultLayout/Sidebar";
import { db } from "../../firebase/config";
import { ref, onValue, remove } from "firebase/database";

const cx = classNames.bind(styles);
let UniqueNumber = 0;

// Detele
const onDelete = (id) => {
  if (window.confirm("Bạn muốn xóa tài khoản này hay không ? ")) {
    remove(ref(db, `Users/Renter/${id}`))
      .then(() => {
        alert("Xóa thành công");
      })
      .catch((error) => {
        alert("Xóa thất bại" + error);
      });
  }
};

export class AccountManagement extends React.Component {
  constructor() {
    super();
    this.state = {
      tableData: [],
    };
  }

  componentDidMount() {
    const dbRef = ref(db, "Users/Renter");

    onValue(dbRef, (snapshot) => {
      let records = [];
      snapshot.forEach((childSnapshot) => {
        let keyName = childSnapshot.key;
        let data = childSnapshot.val();
        records.push({ key: keyName, data: data });
      });
      this.setState({ tableData: records });
    });
  }

  render() {
    return (
      <body>
        <Sidebar />

        <section className={cx("dashboard")}>
          <div className={cx("top")}>
            <FontAwesomeIcon icon={faAlignJustify} />

            <div className={cx("search-box")}>
              <FontAwesomeIcon icon={faSearch} />
              <input type="text" placeholder="Nhập từ khóa tìm kiếm" />
            </div>

            <img src={imgprofile} alt="" />
          </div>
          <div className={cx("dash-content")}>
            <div className={cx("activity")}>
              <div className={cx("title")}>
                <FontAwesomeIcon
                  icon={faAddressBook}
                  style={{ borderRadius: "0px" }}
                />
                <span className={cx("text")}>
                  Danh sách tài khoản Khách Thuê
                </span>

                <a href="accountmanagement/add" className={cx("btn-add")}>
                  <FontAwesomeIcon icon={faPlusCircle} />
                  <span>Tạo tài khoản</span>
                </a>
              </div>
              <div className={cx("product-display")}>
                <table className={cx("product-display-table")}>
                  <thead>
                    <tr>
                      <th>STT</th>
                      <th>Tên</th>
                      <th>Email</th>
                      <th>Số điện thoại</th>
                      <th>Chức năng</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.tableData.map((row, index) => {
                      return (
                        <tr key={UniqueNumber++}>
                          <td>{index + 1}</td>
                          <td>{row.data.name}</td>
                          <td>{row.data.email}</td>
                          <td>{row.data.phoneNumber}</td>
                          <td>
                            <a
                              href={`/accountmanagement/update/${row.key}`}
                              className={cx("btn")}
                            >
                              <FontAwesomeIcon icon={faEdit} />
                              Sửa
                            </a>

                            <a
                              href="/accountmanagement"
                              className={cx("btn")}
                              onClick={() => onDelete(row.key)}
                            >
                              <FontAwesomeIcon icon={faTrash} />
                              Xóa
                            </a>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      </body>
    );
  }
}
