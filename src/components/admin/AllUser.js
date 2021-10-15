import React, { useEffect, useContext } from "react";
import { Formatter } from "../../utils/currency-formatter";
import { UserContext } from "../../App";
import { customAxios } from "../../axiosAuth";

function AllUser() {
  const { state, dispatch } = useContext(UserContext);

  useEffect(() => {
    customAxios
      .get("user/allUser")
      .then((res) => {
        dispatch({ type: "FETCH_ALL_USER_SUCCESS", payload: res.data.users });
      })
      .catch((err) => {
        dispatch({ type: "FETCH_ALL_USER_ERROR", payload: err.message });
      });
  }, []);
  const loadingMessage = () => {
    return (
      <div className="d-flex justify-content-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  };

  return (
    <>
      <main>
        <div className="container-fluid mt-4">
          {state.error ? <h3 className="text-danger">{state.error}</h3> : null}
          {state.loading ? (
            loadingMessage()
          ) : (
            <div className="card mb-4">
              <div className="card-header">
                <i className="fas fa-table mr-1"></i>
                ALL USER
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table
                    className="table table-bordered"
                    id="dataTable"
                    width="100%"
                    cellSpacing="0"
                  >
                    <thead>
                      <tr>
                        <th>fullName</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Wallet</th>
                      </tr>
                    </thead>
                    <tfoot>
                      <tr>
                        <th>fullName name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Wallet</th>
                      </tr>
                    </tfoot>
                    <tbody>
                      {state.users.length > 0 &&
                        Array.isArray(state.users) &&
                        state.users.map((user, index) => (
                          <tr key={index}>
                            <td>{user.first_name + "  " + user.last_name}</td>
                            <td>{user.email}</td>
                            <td>{user.phone}</td>
                            <td>{Formatter(user.wallet)}</td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
}

export default AllUser;
