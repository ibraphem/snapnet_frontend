import React from "react";

const Assignment = () => {
  return <div></div>;
};

export default Assignment;
import React, { forwardRef, useState, useEffect } from "react";
import axios from "axios";
import { CircularProgress } from "@material-ui/core";
import MaterialTable from "material-table";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import AddBox from "@material-ui/icons/AddBox";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import SuccessAlerts from "../layouts/alerts/SuccessAlerts";
import ErrorAlerts from "../layouts/alerts/ErrorAlerts";
import { URD } from "../layouts/Config";
import { useParams } from "react-router-dom";

const Assignment = () => {
  let params = useParams();
  let { type } = params;
  const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),

    DetailPanel: forwardRef((props, ref) => (
      <ChevronRight {...props} ref={ref} />
    )),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => (
      <ChevronLeft {...props} ref={ref} />
    )),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => (
      <ArrowDownward {...props} ref={ref} />
    )),
    ThirdStateCheck: forwardRef((props, ref) => (
      <Remove {...props} ref={ref} />
    )),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
  };

  const [assignment, setAssignment] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [iserror, setIserror] = useState(null);
  const [alertMessage, setAlertMessage] = useState([]);

  const handleRowAdd = (newData, resolve) => {
    let errorList = [];
    if (newData.asset_id === undefined) {
      errorList.push("Asset type field is required ");
      setIserror(true);
    }
    if (newData.asset_id === undefined) {
      errorList.push("Asset type field is required ");
      setIserror(true);
    }
    if (errorList.length < 1) {
      //no error
      axios
        .post(`${URD}/assign/store`, newData)
        .then((response) => {
          setAssignment(response.data);
          resolve();
          setAlertMessage(["Asset Assigned Successfully  "]);
          setIserror(false);
        })
        .catch((error) => {
          setAlertMessage(["Oops, something went wrong!!!   "]);
          setIserror(true);
          resolve();
        });
    } else {
      setAlertMessage(errorList);
      setIserror(true);
      resolve();
    }
  };

  const handleRowUpdate = (newData, oldData, resolve) => {
    //validation
    //  console.log(newData);
    let errorList = [];
    if (newData.asset_id === undefined) {
      errorList.push("Asset type field is required ");
      setIserror(true);
    }
    if (newData.asset_id === undefined) {
      errorList.push("Asset type field is required ");
      setIserror(true);
    }

    if (errorList.length < 1) {
      axios
        .post(`${URD}/owner/update/${oldData.id}/${type}`, newData)
        .then((response) => {
          // console.log(response.data);
          setOwner(response.data);
          setAlertMessage(["Record Updated Successfully  "]);
          setIserror(false);
          resolve();
        })
        .catch((error) => {
          console.log(error);
          setAlertMessage(["Oops, something went wrong!!!   "]);
          setIserror(true);
          resolve();
        });
    } else {
      setAlertMessage(errorList);
      setIserror(true);
      resolve();
    }
  };

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${URD}/owner/${type}`)
      .then((response) => {
        setOwner(response.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const columns = [
    {
      title: "FULL NAME",
      field: "asset_owner",
    },
  ];

  return (
    <div className="content-wrapper">
      {/* Content Header (Page header) */}
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>Asset Owner ({type})</h1>
            </div>
          </div>
        </div>
        {/* /.container-fluid */}
      </section>
      {/* Main content */}
      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="card">{/* /.card-header */}</div>

              {iserror ? <ErrorAlerts message={alertMessage} /> : null}
              {iserror === false ? (
                <SuccessAlerts message={alertMessage} />
              ) : null}

              {!isLoading ? (
                <MaterialTable
                  columns={columns}
                  data={owner}
                  title="Asset type table"
                  icons={tableIcons}
                  options={{
                    search: true,
                    sorting: true,
                    headerStyle: {
                      backgroundColor: "#01579b",
                      color: "#FFF",
                    },
                  }}
                  editable={{
                    onRowUpdate: (newData, oldData) =>
                      new Promise((resolve) => {
                        handleRowUpdate(newData, oldData, resolve);
                      }),
                    onRowAdd: (newData) =>
                      new Promise((resolve) => {
                        handleRowAdd(newData, resolve);
                      }),
                  }}
                />
              ) : (
                <CircularProgress />
              )}

              {/* /.card-body */}

              {/* /.card */}
            </div>
            {/* /.col */}
          </div>
          {/* /.row */}
        </div>
        {/* /.container-fluid */}
      </section>
      {/* /.content */}
    </div>
  );
};

export default Assignment;
