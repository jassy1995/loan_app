import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Table } from "react-bootstrap";

const Profile = () => {
  let [user, setUser] = useState({});
  const history = useHistory();

  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("user"));
    setUser(user);
    if (!user) {
      history.push("/");
    }
  }, []);

  return (
    <>
      <div className="container">
        <div className="row">
          <Table bordered className="col-md-7 text-center mx-auto shadow">
            <thead>
              <tr className="bg-warning">
                <th colSpan="3" className="text-center text-capitalize">
                  User information
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>First Name</td>
                <td colSpan="2" className="text-capitalize">
                  {user.first_name}
                </td>
              </tr>
              <tr>
                <td>Last Name</td>
                <td colSpan="2" className="text-capitalize">
                  {user.last_name}
                </td>
              </tr>
              <tr>
                <td>Phone Number</td>
                <td colSpan="2"> {user.phone}</td>
              </tr>
              <tr>
                <td>Address</td>
                <td colSpan="2" className="text-capitalize">
                  {user.address}
                </td>
              </tr>
              <tr>
                <td>Email</td>
                <td colSpan="2"> {user.email}</td>
              </tr>
              <tr>
                <td>Wallet</td>
                <td colSpan="2">${user.wallet}</td>
              </tr>
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
};
export default Profile;
