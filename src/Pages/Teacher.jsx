import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import ReactPaginate from 'react-paginate';
import { CSVLink } from 'react-csv';
import { OtherStaffCSV } from '../Utils/Apis'

import { Link, useLocation } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { StaffGetById } from "../Utils/Apis";

import { TeacherGetAllApi } from "../Utils/Apis";
import { RolePermissionGetApi } from "../Utils/Apis";

import { StaffDeleteApi } from "../Utils/Apis";
import { StaffPutApi } from "../Utils/Apis";
import HashLoaderCom from "./HashLoaderCom";
import { Icon } from "@iconify/react/dist/iconify.js";

// ## style css area start ####

const Container = styled.div`
  .breadcrum-li a {
    text-decoration: none;
    margin-top: 5px;
    color: #008479;
  }
  .main-body {
    background-color: #f2f3f6;
  }
  .main-content-conatainer {
    background-color: #fff;
    margin: 10px;
    /* height: 100vh; */
    border-radius: 15px;
  }
  .margin-minus22 {
    margin-top: -18px;
    font-size: 16px;
  }
  th,
  td {
    padding: 10px;
  }
  .my-td-style-yellow span {
    background-color: #ffeed3;
    color: #ff914c;
    padding: 1px 18px 1px 18px;
    border-radius: 18px 18px 18px 18px;
  }
  .my-td-style-green span {
    background-color: #e6ffe2;
    color: #00a67e;
    padding: 1px 18px 1px 18px;
    border-radius: 18px 18px 18px 18px;
  }
  .my-button-drop {
    line-height: 13px !important;
    border: 1px solid var(--tableActionButtonBgColor) !important;
  }
  .pagination-a {
    background-color: #f2f0f0;
    color: #000;
    padding: 0.00175rem 0.25rem;
    margin-left: 0px !important;
  }
  .form-focus:focus {
    color: #212529 !important;
    background-color: #fff !important;
    border-color: var(--greyInputborderColor) !important;
    outline: none !important;
    box-shadow: none !important;
  }
  .page-link-1122 {
    /* padding: 0.00175rem 0.05rem; */
    padding: 0rem 0rem;
  }
  .pagination-a a {
    gap: 2px;
  }
  .my-pagina li a:hover {
    background-color: #008479;
    color: #fff;
    border: none;
  }
  .input-bg {
    background-color: #f2f3f6;
  }
  .label-color {
    color: #bbbec1;
  }
  .cont-drop-btn button:hover {
    background-color: transparent;
    color: #000;
    cursor: pointer;
    border: none;
  }

  .my-button11 {
    display: flex;
    justify-content: center;
    gap: 4px;
    margin-top: 30px;
  }

  .my-button11 button {
    border-radius: 5px;
    border: 1px solid #ababad;
    color: #000;
    font-size: 12px;
  }
  .my-button11 button:hover {
    background-color: #008479;
    color: #fff;
  }
  .my-button22 {
    display: flex;
    gap: 4px;
    margin-top: 4px;
  }

  .my-button22 button {
    border-radius: 5px;
    border: 1px solid #ababad;
    color: #000;
    font-size: 12px;
  }
  .my-button22 button:hover {
    background-color: #008479;
    color: #fff;
  }
  .my-grey {
    color: #adadbd;
  }

  .my-div-class p {
    border: 1px solid #adadbd;
    padding: 10px;
    border-radius: 4px;
    background-color: #f2f3f6;
    color: #adadbd;
    border: 1px solid #f2f3f6;
  }
  .my-div-class span a {
    text-decoration: none;
  }
  .anchor-color a {
    color: #8f8f8f;
  }
  .my-own-button {
    height: 33px;
    width: 25%;
    background-color: var(--greenTextColor);
    line-height: 18px;
  }
  .my-own-outline-btn{
  height: 33px;
  width: 25%;
  color: #000;
  line-height: 1;
  border: 1px solid var( --buttonBorder);
  background-color: #fff;
}


  .img-div img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    border: 1px solid #b9b8b8;
  }
  /* ############# offcanvas ############## */
  .forInput {
    background: #f2f3f6;
    color: #adadbd;
    /* font-family: 'Noto Sans'; */
    font-size: 14px;
  }
  .forInput::placeholder {
    color: #adadbd;
  }

  .forInputFont {
    font-size: 14px;
  }
  .forLabel {
    color: #adadbd;
    font-size: 15px;
  }
  .button11 {
    --bs-btn-color: #959494;
    --bs-btn-border-color: #cdcdcd;
    --bs-btn-hover-color: #fff;
    --bs-btn-hover-bg: #008479;
    border-radius: 0%;
  }

  .img-container {
    position: absolute;
    height: 60px;
    width: 60px;
    border-radius: 50%;
    background-color: #2bb673;
    top: -16%;
  }
  .img-container22 {
    position: absolute;
    height: 60px;
    width: 60px;
    border-radius: 50%;
    background-color: #2bb673;
    border: 2px solid #cdcdcd;
    top: -16%;
  }
  .img-container img {
    height: 30px;
    width: 36px;
    margin: 11px;
    margin-top: 14px;
  }
  .img-container22 img {
    height: 27px;
    width: 32px;
    margin: 11px;
    margin-top: 14px;
  }
  .img-container {
  }
  .bg-container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    border: 1px solid #dee2e6;
    width: 65%;
    background-color: #f2f3f6;
  }
  .delete-section {
    /* height: 30%; */
    position: relative;
    display: flex;
    justify-content: center;
    text-align: center;
  }
  .button-position {
    position: absolute;
    top: 78%;
  }
  .main-container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    text-align: center;
  }
  .image-container {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    border: 1px solid #f1f5fa;
  }
  .image-container img {
    width: 100%;
    height: 100%;
  }
  .delete-content {
    font-size: 20px;
  }
  .delete-content span {
    background-color: #0aad24;
    color: #fff;
    font-size: 15px;
    padding: 2px 6px 2px 6px;
    border-radius: 4px;
  }
  .likeButton {
    background-color: #008479;
    color: #fff;
    font-size: 17px;
    padding: 2px 8px 2px 8px;
    border-radius: 4px;
    display: inline;
  }

  .view-details-background-color {
    background-color: var(--backgroundColor);
    border-radius: 8px;
  }

  .symbol-container img {
    object-fit: cover;
  }
  .subject {
    font-size: 14px;
  }
  .sure-main-container {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
  .sure-content h5 {
    font-weight: 200;
  }
  .sure-content p {
    font-size: 14px;
    color: #adadbd;
  }
  .agree {
    font-size: 14px;
    color: #adadbd;
  }

  .button00 {
    --bs-btn-color: #959494;
    --bs-btn-border-color: #cdcdcd;
    background-color: #b50000;
    color: #fff;
    border-radius: 0%;
  }
  .cancel-btn {
    color: #959494;
    border-color: #cdcdcd;

    --bs-btn-hover-bg: #fff;
    border-radius: 0%;
  }

  .my-btn.disabled,
  .my-btn:disabled,
  fieldset:disabled .btn {
    color: #fff;
    pointer-events: none;
    background-color: #b50000;
    border-color: #cdcdcd;
    opacity: var(--bs-btn-disabled-opacity);
  }
  .my-form-check-input:checked {
    background-color: #b50000;
    border-color: #b50000;
  }
  .pagination {
    display: flex;
    list-style: none;
    padding: 0;
}

.pagination li {
    margin: 0 5px;
}

.pagination li a {
    box-shadow: none !important;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    font-size: var(--font-size-14);
    border-radius: 8px;
    border: 1px solid #ddd;
    text-decoration: none;
    color: #000;
 
}

.pagination li a:hover {
    background-color: #317a77 !important;
    color: #fff !important;
}

.pagination li.active a {
    background-color: #317a77 !important;
    color: #fff;
    font-weight: bold;
}
.my-i-button{
  border: none;
  background: none;
}
  /* ############# offcanvas ############## */

  /* ########## media query ###########  */
  @media only screen and (max-width: 735px) {
    .for-media-query {
      display: flex;
      flex-direction: column;
    }
  }
  @media only screen and (max-width: 912px) {
    .for-media-query-22 {
      flex: 0 0 auto !important;
      width: 53% !important;
    }
    .my-own-button {
      margin-top: 10px;
      margin-bottom: 25px;
    }
    .search-responsive {
      margin-top: 10px;
    }
    .export1 {
      margin-top: 10px !important;
    }
    .export2 {
      margin-top: 12px !important;
    }
    .for-dislay-direction {
      display: flex;
      flex-direction: column;
    }
  }

  @media only screen and (max-width: 425px) {
    .for-media-query-22 {
      flex: 0 0 auto !important;
      width: 75% !important;
    }
  }
  @media only screen and (max-width: 972px) {
    .for-dislay-direction {
      display: flex;
      flex-direction: column;
      margin-bottom: 5px;
    }
  }
`;
// ## style css area end ####

const Teacher = () => {


  const [forDelete, setForDelete] = useState(false);

  const [loader, setLoader] = useState(false);

  const [hide, setHide] = useState(false);
  const [show, setShow] = useState(true);
  const [hidedelete, setHidedelete] = useState(false);
  const [showdelete, setShowdelete] = useState(true);
  const [rolePermisAllDatashowde, setRolePermisAllData] = useState([]);
  const [TeacherAllData, setTeacherAllData] = useState([]);
  const [staffAllData, setStaffAllData] = useState([]);
  const [IdForDelete, setIdForDelete] = useState();
  const [IdForUpdate, setIdForUpdate] = useState();

  const [TeacherName, setTeacherName] = useState();
  const [TeacherEmail, setTeacherEmail] = useState();
  const [originalMail, setOriginalMail] = useState();
  const [TeacherAddress, setTeacherAddress] = useState();
  const [TeacherContact, setTeacherContact] = useState();
  const [basicSalary, setBasicSalary] = useState();
  const [TeacherGender, setTeacherGender] = useState();
  const [TeacherRoleId, setRoleID] = useState('');
  const [searchKey, setSearchKey] = useState("");

  const [isValidNameRequired, setIsValidNameRequired] = useState(false);
  const [isValidEmailRequired, setIsValidEmailRequired] = useState(false);
  const [isValidAddressRequired, setIsValidAddressRequired] = useState(false);
  const [isValidContactRequired, setIsValidContactRequired] = useState(false);
  const [isValidBasicSalaryRequired, setIsValidBasicSalaryRequired] = useState(false);

  const offcanvasRef = useRef(null);
  const offcanvasRef22 = useRef(null);



  // ############### CSV 

  const [csvData, setCsvData] = useState([]);

  const Download_Slip = async () => {
    try {
      const response = await OtherStaffCSV(68);
      if (response?.status === 200) {
        const rows = response?.data?.split('\n').map(row => row.split(','));
        setCsvData(rows);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageNo, setPageNo] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const handlePageClick = (event) => {
    setPageNo(event.selected + 1);
  };
  
  useEffect(() => {
    MyTeacherGetAllApi();
    MyStaffGetById();
    MyRolPermisGetAllApi();
    Download_Slip()
  }, [pageNo]);

  // Teacher  Get All Api
  const MyTeacherGetAllApi = async () => {
    setLoader(true);
    try {
      const response = await TeacherGetAllApi(68, searchKey, pageNo, pageSize);
      // console.log("My teacher get all DATA", response);
      if (response?.status === 200) {
        // toast.success(response?.data?.message);
        setTeacherAllData(response?.data?.AllRoles);
        setCurrentPage(response?.data?.currentPage)
        setTotalPages(response?.data?.totalPages)
        setLoader(false);
      } else {
        toast.error(response?.data?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Staff Get by id
  const MyStaffGetById = async (id) => {
    setIdForUpdate(id);
    setLoader(true);
    try {
      const response = await StaffGetById(id);
      // console.log("My Teacher get DATA by get by id", response);
      if (response?.status === 200) {
        // toast.success(response?.data?.msg);
        setTeacherName(response?.data?.user?.staffName);
        setTeacherEmail(response?.data?.user?.staffEmail);
        setOriginalMail(response?.data?.user?.staffEmail);
        setTeacherAddress(response?.data?.user?.staffAddress);
        setTeacherContact(response?.data?.user?.staffPhone);
        setTeacherGender(response?.data?.user?.staffGender);
        setBasicSalary(response?.data?.user?.basicSalary);
        setLoader(false);
      } else {
        toast.error(response?.data?.msg);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Delete api
  const MyStaffDeleteApi = async (id) => {
    setLoader(true);
    try {
      const response = await StaffDeleteApi(id);
      // console.log('my-subs-api',response)
      if (response?.status === 200) {
        toast.success(response?.data?.message);
        MyTeacherGetAllApi();
        setShowdelete(false);
        setHidedelete(true);
        setLoader(false);

        const offcanvasInstance = bootstrap.Offcanvas.getInstance(offcanvasRef22.current);
        offcanvasInstance.hide();
        setTimeout(() => {
          setShowdelete(true)
          setForDelete(false)
        }, 0.5)

      } else {
        toast.error(response?.data?.msg);
        setShowdelete(true);
     
      }
    } catch (error) {
      console.log(error);
    }
  };

  // validation 

  const [errors, setErrors] = useState({});
  // name 
  const handleName = (e2) => {
    setTeacherName(e2);
    const nameRegex = /^[A-Za-z\s]+$/;
    setIsValidNameRequired(nameRegex.test(e2));
    if (e2 === "" || !nameRegex.test(e2)) {
      setIsValidNameRequired(true)
    } else {
      setIsValidNameRequired(false)
    }
  }
  // email 
  const handleEmail = (e2) => {
    setTeacherEmail(e2);
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    setIsValidEmailRequired(emailRegex.test(e2));
    if (e2 === "" || !emailRegex.test(e2)) {
      setIsValidEmailRequired(true)
    } else {
      setIsValidEmailRequired(false)
    }
  }
  // address 
  const handleAddress = (e2) => {
    setTeacherAddress(e2);
    const emailAddress = /^[a-zA-Z0-9\s,.'-]+$/;
    setIsValidAddressRequired(emailAddress.test(e2));
    if (e2 === "" || !emailAddress.test(e2)) {
      setIsValidAddressRequired(true)
    } else {
      setIsValidAddressRequired(false)
    }
  }
  // contact 
  const handleContact = (e2) => {
    setTeacherContact(e2);

    const conatctRegex = /^[6-9]{4}[0-9]{6}$/;
    setIsValidContactRequired(conatctRegex.test(e2));
    if (e2 === "" || !conatctRegex.test(e2)) {
      setIsValidContactRequired(true)
    } else {
      setIsValidContactRequired(false)
    }
    if (e2.length > 10) {
      setIsValidContactRequired(true)
    } else {
      setIsValidContactRequired(false)
    }
  }
  // Basic salary 
  const handleBasicSalary = (e2) =>{
    setBasicSalary(e2);
    const conatctRegex = /^(0|[1-9]\d{0,9})$/;
    setIsValidBasicSalaryRequired(conatctRegex.test(e2));
    if (e2 === "" || !conatctRegex.test(e2)) {
      setIsValidBasicSalaryRequired(true)
    } else {
      setIsValidBasicSalaryRequired(false)
    }
    
  }

  const FuncValidation = () => {
    let isValid = true;
    setIsValidNameRequired(false)
    setIsValidEmailRequired(false)
    setIsValidAddressRequired(false)
    setIsValidContactRequired(false)
    setIsValidContactRequired(false)
    //  name  
    if (!TeacherName || TeacherName === "" || !/^[A-Za-z\s]+$/.test(TeacherName)) {
      setIsValidNameRequired(true)
      isValid = false;
      setLoader(false)
    }
    else {
      setIsValidNameRequired(false)
    }
    // email 
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!TeacherEmail || TeacherEmail === "" || !emailRegex.test(TeacherEmail)) {
      setIsValidEmailRequired(true);
      isValid = false
      setLoader(false);

    } else {
      setIsValidEmailRequired(false);
    }
    // address 
    const emailAddress = /^[a-zA-Z0-9\s,.'-]+$/;
    if (!TeacherAddress || TeacherAddress === "" || !emailAddress.test(TeacherAddress)) {
      errors.address = "Invalid address";
      setIsValidAddressRequired(true);
      isValid = false
      setLoader(false);
    } else {
      setIsValidAddressRequired(false);
    }
    // conatct 
    if (!TeacherContact || TeacherContact === "" || !/^[6-9]{4}[0-9]{6}$/.test(TeacherContact)) {
      setIsValidContactRequired(true)
      isValid = false;
      setLoader(false)
    } else {
      setIsValidContactRequired(false)
    }
    // basic salary 
    if (!basicSalary || basicSalary === "" || !/^(0|[1-9]\d{0,9})$/.test(basicSalary)) {
      setIsValidBasicSalaryRequired(true)
      isValid = false;
      setLoader(false)
    }
    else {
      setIsValidBasicSalaryRequired(false)
    }
    return isValid;
  };

  // validation 


  // Teacher Put api
  const MyNoticePutApi = async (id) => {
    if (FuncValidation()) {
      setLoader(true);
      try {
        const formData = new FormData();

        if (originalMail !== TeacherEmail) {
          formData.append("staffEmail", TeacherEmail);
        }
        formData.append("staffName", TeacherName);
        formData.append("staffAddress", TeacherAddress);
        formData.append("staffPhone", TeacherContact);
        formData.append("staffGender", TeacherGender);
        formData.append("roleId", TeacherRoleId);
        formData.append("basicSalary", basicSalary);

        const response = await StaffPutApi(id, formData);
        console.log("MY_TEACHER____put-Api", response);
        if (response?.status === 200) {
          toast.success(response?.data?.message);
          setShow(false);
          MyTeacherGetAllApi();
          setLoader(false);
          const offcanvasInstance = bootstrap.Offcanvas.getInstance(offcanvasRef.current);
          offcanvasInstance.hide();
          setTimeout(() => {
            setShow(true)
          }, 0.5)
        } else {
          toast.error(response?.data?.message);
          setShow(true);
        }
      } catch (error) {
        console.log(error);
      }
    }

  };

  // Role permission Get All Api  from role permission page
  const MyRolPermisGetAllApi = async () => {
    setLoader(true);
    try {
      const response = await RolePermissionGetApi();
      // console.log("My role permission get all data12", response);

      if (response?.status === 200) {
        // toast.success(response?.data?.msg)
        setRolePermisAllData(response?.data?.roles);
        setLoader(false);
      } else {
        // toast.error(response?.data?.msg);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleForDelete = () => {
    MyStaffDeleteApi(IdForDelete)
  };

  const localoStorage =(value)=>{
    localStorage.setItem('MyUserID', value)
  }

  return (
    <Container>
      {loader && <HashLoaderCom />}

      <div className="container-fluid main-body p-3">
        <div className="d-flex justify-content-between for-dislay-direction">
          <div className="breadCrum ms-2">
            <nav
              style={{ "--bs-breadcrumb-divider": "'>'" }}
              aria-label="breadcrumb"
            >
              <ol className="breadcrumb ms-2">
                <li
                  className="breadcrumb-item active heading-14 font-color"
                  aria-current="page"
                >
                  Home
                </li>
                <li
                  className="breadcrumb-item active heading-14 font-color"
                  aria-current="page"
                >
                  Users
                </li>
                <li className="breadcrumb-item breadcrum-li heading-14">
                  <Link href="#">Teacher</Link>
                </li>
              </ol>
            </nav>
          </div>

          <div className="d-flex g-1 for-media-query">
            <CSVLink className='col-lg-2 col-md-3 col-sm-4 col-6 btn AddBtnn font16 heading-14 export1 my-own-outline-btn me-2' data={csvData} filename={"orders.csv"}>
              <span>
                <svg width="15" height="18" viewBox="0 0 15 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 0V5H15L10 0ZM8.75 5V0H1.875C0.839453 0 0 0.839453 0 1.875V18.125C0 19.1602 0.839453 20 1.875 20H13.125C14.1605 20 15 19.1605 15 18.125V6.25H10.0352C9.30859 6.25 8.75 5.69141 8.75 5ZM5 10.9375C5 11.1094 4.85938 11.25 4.6875 11.25H4.375C4.02734 11.25 3.75 11.5273 3.75 11.875V13.125C3.75 13.4727 4.02734 13.75 4.375 13.75H4.6875C4.85938 13.75 5 13.8906 5 14.0625V14.6875C5 14.8594 4.85938 15 4.6875 15H4.375C3.33984 15 2.5 14.1602 2.5 13.125V11.875C2.5 10.8398 3.33984 10 4.375 10H4.6875C4.85938 10 5 10.1406 5 10.3125V10.9375ZM6.73047 15H6.25C6.0791 15 5.9375 14.8584 5.9375 14.6875V14.0625C5.9375 13.8906 6.07812 13.75 6.25 13.75H6.72852C6.96289 13.75 7.13398 13.6133 7.13398 13.4912C7.13398 13.4424 7.10469 13.3887 7.05098 13.3398L6.19629 12.6074C5.87109 12.3242 5.67969 11.9258 5.67969 11.5078C5.67969 10.6797 6.42188 10 7.33594 10H7.8125C7.9834 10 8.125 10.1416 8.125 10.3125V10.9375C8.125 11.1094 7.98438 11.25 7.8125 11.25H7.33594C7.10156 11.25 6.93047 11.3867 6.93047 11.5088C6.93047 11.5576 6.95977 11.6113 7.01348 11.6602L7.86816 12.3926C8.19531 12.6758 8.38574 13.0762 8.38574 13.491C8.38281 14.3203 7.64062 15 6.73047 15ZM11.25 11.125V10.3125C11.25 10.1406 11.3906 10 11.5625 10H12.1875C12.3594 10 12.5 10.1406 12.5 10.3125V11.123C12.5 12.5098 11.9969 13.8184 11.084 14.8C10.9688 14.9258 10.8008 15 10.625 15C10.4492 15 10.2832 14.9268 10.166 14.7998C9.25391 13.8203 8.75 12.5117 8.75 11.125V10.3125C8.75 10.1406 8.89062 10 9.0625 10H9.6875C9.85938 10 10 10.1406 10 10.3125V11.123C10 11.9191 10.2246 12.6953 10.625 13.3449C11.0273 12.6953 11.25 11.918 11.25 11.125Z" fill="#008479" />
                </svg>
              </span> &nbsp;
              <span >Export CSV File</span>
            </CSVLink>
            <div className="me-2">
              <div className="input-group mb-3 search-responsive">
                <input
                  type="text"
                  className="form-control form-focus font-color"
                  onChange={(e) => setSearchKey(e.target.value)}
                  style={{ height: "34px" }}
                  placeholder="Search"
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"
                />
                <span
                  className="input-group-text button-bg-color button-color heading-14 font-color "
                  style={{ cursor: "pointer", height: "34px" }}
                  id="basic-addon2"
                  onClick={MyTeacherGetAllApi}
                >
                  Search
                </span>
              </div>
            </div>
            <Link
              type="button"
              className="btn btn-success heading-16 my-own-button me-3"
              onClick={(e)=>localoStorage("0")}
              to={`/mainuserform/${'0'}`}
             >
              + ADD Teacher
            </Link>
          </div>
        </div>
        <h5
          className="ms-3 mb-2 margin-minus22 heading-16"
          style={{ marginTop: "-22px" }}
        >
          Teacher List
        </h5>

        <div className="main-content-conatainer pt-1 ">
          {/* ###### copy content till here for all component ######  */}

          <div className="table-container px-3 table-responsive">
            <table className="table table-sm table-striped">
              <thead className="">
                <tr
                  className="heading-16 text-color-000"
                  style={{ fontWeight: "500" }}
                >
                  <th className="">#</th>
                  <th>Name</th>
                  <th>Address</th>
                  <th>Phone</th>
                  <th>Email</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody className="heading-14 align-middle greyTextColor">
                {
                  TeacherAllData?.map((item, index) => (
                    <tr className="heading-14">
                      <td className=" greyText pe-0">{index + 1}</td>
                      <td className=" greyText pe-0">{item.staffName}</td>
                      <td className=" greyText pe-0">{item.staffAddress}</td>
                      <td className=" greyText pe-0">{item.staffPhone}</td>
                      <td className=" greyText pe-0">{item.staffEmail}</td>
                      <td className=" greyText  pe-0">
                        <div className="dropdown my-button-show">
                          <button
                            className="btn btn-secondary dropdown-togg my-button-drop tableActionButtonBgColor text-color-000 heading-14"
                            type="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            Action &nbsp;
                            <svg
                              width="11"
                              height="7"
                              viewBox="0 0 11 7"
                              fill="none"
                              xmlns=""
                            >
                              <path
                                d="M10.3331 0L11 0.754688L5.5 7L0 0.754688L0.663438 0L5.5 5.48698L10.3331 0Z"
                                fill="black"
                              />
                            </svg>
                          </button>
                          <ul className="dropdown-menu anchor-color heading-14">
                            <li> <Link className="dropdown-item"   onClick={(e) => localoStorage(item.id)} to={`/mainuserform/${item.id}`}>  Edit  </Link>  </li> <li>
                              <Link
                                className="dropdown-item"
                                data-bs-toggle="offcanvas"
                                data-bs-target="#offcanvasRight22"
                                aria-controls="staticBackdrop"
                                onClick={(e) => setIdForDelete(item.id)}
                              >
                                Delete
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
              <Toaster />
            </table>
            <div className="d-flex" style={{ marginBottom: '10px' }}>
              <p className='font14'>Showing {currentPage} of {totalPages} Pages</p>
              <div className="ms-auto">
                <ReactPaginate
                  previousLabel={<Icon icon="tabler:chevrons-left" width="1.4em" height="1.4em" />}
                  nextLabel={<Icon icon="tabler:chevrons-right" width="1.4em" height="1.4em" />}
                  breakLabel={'...'} breakClassName={'break-me'} pageCount={totalPages} marginPagesDisplayed={2} pageRangeDisplayed={10}
                  onPageChange={handlePageClick} containerClassName={'pagination'} subContainerClassName={'pages pagination'} activeClassName={'active'}
                />
              </div>
            </div>
          </div>
        </div>
        {/* ################## Off Canvas Area ####################  */}

        {/* ##### offcanvas edit start ########  */}
        {/* ########## content area #################  */}
        {show && (
          <>
            <div
              className="offcanvas offcanvas-end"
              tabindex="-1"
              id="staticBackdrop"
              aria-labelledby="offcanvasRightLabel"
              ref={offcanvasRef}
            >
              <div className="offcanvas-header">
                <Link data-bs-dismiss="offcanvas">
                  <img src="./images/Vector (13).svg" alt="" />
                </Link>
                <h5
                  className="offcanvas-title heading-16"
                  id="offcanvasRightLabel"
                >
                  Edit Teacher
                </h5>
              </div>
              <hr className="" style={{ marginTop: "-3px" }} />
              <div class="offcanvas-body">
                <div className="inputs">
                  <div className="mb-3">
                    <label
                      for="exampleFormControlInput1"
                      className="form-label label-color "
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      className="form-control form-focus input-bg label-color"
                      value={TeacherName}
                      onChange={(e) => handleName(e.target.value)}
                      style={{ marginTop: "-4px" }}
                      id="exampleFormControlInput1"
                      placeholder="John Doe"
                    />
                  </div>
                  {isValidNameRequired && (
                    <p className='ms-1' style={{ color: 'red', fontSize: '14px', marginTop: '-18px' }}>
                      name string is required
                    </p>
                  )}
                </div>

                <div className="mb-3">
                  <label
                    for="exampleFormControlInput1"
                    className="form-label label-color "
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control form-focus "
                    onChange={(e) => handleEmail(e.target.value)}
                    value={TeacherEmail}
                    style={{ marginTop: "-4px" }}
                    id="exampleFormControlInput1"
                    placeholder="4290 Gregory Lane Louisville, KY 40202"
                  />
                </div>
                {isValidEmailRequired && (
                  <p className='ms-1' style={{ color: 'red', fontSize: '14px', marginTop: '-18px' }}>
                    valid email is required
                  </p>
                )}

                <div className="mb-3">
                  <label
                    for="exampleFormControlInput1"
                    className="form-label label-color "
                  >
                    Address
                  </label>
                  <input
                    type="text"
                    className="form-control form-focus input-bg label-color"
                    onChange={(e) => handleAddress(e.target.value)}
                    value={TeacherAddress}
                    style={{ marginTop: "-4px" }}
                    id="exampleFormControlInput1"
                    placeholder="xyz12@gmail.com"
                  />
                </div>
                {isValidAddressRequired && (
                  <p className='ms-1' style={{ color: 'red', fontSize: '14px', marginTop: '-18px' }}>
                    valid address is required
                  </p>
                )}
                <div>
                  <label
                    for="exampleFormControlTextarea1"
                    className="form-label label-color"
                  >
                    Contact No
                  </label>
                  <div className="input-group mb-3 cont-drop-btn">
                    <input
                      style={{ borderRadius: '5px' }}
                      type="text"
                      className="form-control form-focus"
                      onChange={(e) => handleContact(e.target.value)}
                      value={TeacherContact}
                      aria-label="Text input with dropdown button"
                    />
                  </div>
                </div>
                {isValidContactRequired && (
                  <p className='ms-1' style={{ color: 'red', fontSize: '14px', marginTop: '-18px' }}>
                    valid contact is required
                  </p>
                )}
                <div>
                  <label
                    for="exampleFormControlTextarea1"
                    className="form-label label-color"
                  >
                    Basic Salary
                  </label>
                  <div className="input-group mb-3 cont-drop-btn">
                    <input
                      style={{ borderRadius: '5px' }}
                      type="text"
                      className="form-control form-focus"
                      value={basicSalary}
                      onChange={(e) =>  handleBasicSalary(e.target.value)}
                      placeholder="Enter basic salary"
                      aria-label="Text input with dropdown button"
                    />
                  </div>
                </div>
                <div>
                {isValidBasicSalaryRequired && (
                  <p className='ms-1' style={{ color: 'red', fontSize: '14px', marginTop: '-18px' }}>
                    Integer is required
                  </p>
                )}
                </div>

                <div className="">
                  <div class="mb-3">
                    <label
                      for="exampleFormControlInput1"
                      class="form-label mb-1 label-text-color heading-14"
                    >
                      Gender
                    </label>
                    <select
                      class="form-select  form-select-md"
                      onChange={(e) => setTeacherGender(e.target.value)}
                      value={TeacherGender}
                      aria-label="Default select example"
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
                <div className="">
                  <div className="mb-3   pt-2  for-media-margin">
                    <label
                      for="exampleFormControlInput1 "
                      className="form-label heading-14 text-color-000 gender-adjust-media"
                    >
                      Role Name*
                    </label>
                    <select
                      className="form-select form-control-md form-focus-input heading-14 grey-input-text-color input-border-color"
                      onChange={(e) => setRoleID(e.target.value)}
                      aria-label="Default select example"
                      style={{ borderRadius: "5px" }}
                    >
                      <option value="" >--Choose--</option>

                      {rolePermisAllDatashowde.map((item) => (
                        <option value={item.roleId}>{item.roleName}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="my-button11 ">
                  <button
                    type="button"
                    className="btn btn-outline-success"
                    onClick={(e) => {
                      MyNoticePutApi(IdForUpdate);
                    }}
                  >
                    Update
                  </button>
                  <button type="button" className="btn btn-outline-success" data-bs-dismiss="offcanvas" aria-label="Close">
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
        {/* ################# After click ###############  */}


        {/* ##### offcanvase edit  end ########  */}

        {/* ############## Offcanvas view profile ######### */}
        <div
          className="offcanvas offcanvas-end"
          tabindex="-1"
          id="offcanvasRight33"
          aria-labelledby="offcanvasRightLabel"
        >
          <div className="container-fluid">
            <div className="offcanvas-header p-0 pt-3">
              <Link data-bs-dismiss="offcanvas" className="ps-3">
                <img src="./images/Vector (13).svg" alt="" />
              </Link>

              <h5
                className="offcanvas-title heading-16 pe-3"
                id="offcanvasRightLabel"
              >
                View Profile
              </h5>
            </div>
            <hr />
            <div className="offcanvas-body">
              <div className="main-container">
                <div className="image-container">
                  <img src="./images/Ellipse 26 (3).png" alt="" />
                </div>
                <div className="delete-content mt-2">
                  <p>John Doe</p>
                  <p className="heading-14">admin@example.com</p>
                </div>
              </div>
              <div className="view-details-background-color p-3 mt-4">
                <div className="between-content mt- ">
                  <div className="d-flex justify-content-between  ">
                    <div>
                      <p className="heading-14 label-color">Address:</p>
                    </div>
                    <div>
                      <p className="heading-14 ">
                        4290 Gregory Lane <br />
                        Louisville, KY 40202
                      </p>
                    </div>
                  </div>
                </div>

                <hr className="mt-4" />
                <div className="d-flex   justify-content-between mt-2">
                  <div>
                    <p className="heading-14 label-color">Phone No:</p>
                  </div>
                  <div>
                    <p className="heading-14 pe-4">+91 0123456789</p>
                  </div>
                </div>
                <hr className="mt-4" />

                <div className="d-flex  justify-content-between ">
                  <div>
                    <p className="heading-14 label-color">Gender</p>
                  </div>
                  <div>
                    <p className="heading-14 " style={{ paddingRight: "90px" }}>
                      Male
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* ############## Offcanvas view profile ######### */}

        {/* ################ offcanvas delete start #############  */}

        {showdelete && (
          <div className="container-fluid">
            <div
              class="offcanvas offcanvas-end"
              tabindex="-1"
              id="offcanvasRight22"
              aria-labelledby="offcanvasRightLabel"
              ref={offcanvasRef22}
            >
              <div class="offcanvas-header p-0 pt-3">
                <Link data-bs-dismiss="offcanvas" className="ps-3">
                  <img src="./images/Vector (13).svg" alt="" />
                </Link>
                <h5
                  className="offcanvas-title pe-3 heading-16"
                  id="offcanvasRightLabel"
                >
                  Delete Section
                </h5>
              </div>
              <hr className="" />

              <div class="offcanvas-body">
                <div className="sure-main-container mt-4">
                  <div className="sure-container">
                    <div>
                      <svg
                        width="60"
                        height="60"
                        viewBox="0 0 60 60"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M29.5312 0.46875C13.2656 0.46875 0 13.7344 0 30C0 46.2656 13.2656 59.5312 29.5312 59.5312C45.7969 59.5312 59.0625 46.2656 59.0625 30C59.0625 13.7344 45.7969 0.46875 29.5312 0.46875ZM29.5312 55.7812C15.3281 55.7812 3.75 44.2031 3.75 30C3.75 15.7969 15.3281 4.21875 29.5312 4.21875C43.7344 4.21875 55.3125 15.7969 55.3125 30C55.3125 44.2031 43.7344 55.7812 29.5312 55.7812Z"
                          fill="#B50000"
                        />
                        <path
                          d="M31.4062 25.5469H27.6562V44.2969H31.4062V25.5469Z"
                          fill="#B50000"
                        />
                        <path
                          d="M31.4062 16.6406H27.6562V20.3906H31.4062V16.6406Z"
                          fill="#B50000"
                        />
                      </svg>
                    </div>
             
                    <div className="sure-content mt-2">
                      <h5 className="heading-20">Are you sure?</h5>
                      <p>
                        This Action will be permanently <br /> delete the
                        Profile Data
                      </p>
                    </div>
                    <div class="form-check mt-1">
                      <input
                        class="form-check-input my-form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckDefault"
                        onClick={(e) => setForDelete(!forDelete)}
                      />
                      <label
                        class="form-check-label agree"
                        for="flexCheckDefault"
                      >
                        I Agree to delete the Profile Data
                      </label>
                    </div>

                    <div className="mt-4">
                      <button
                        type="button"
                        class="btn my-btn button00"
                        disabled={forDelete ? false : true} onClick={handleForDelete}
                      >
                        Delete
                      </button>
                      <button
                        type="button"
                        class="btn cancel-btn ms-2"
                        data-bs-dismiss="offcanvas" aria-label="Close"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* ############## After click ##############  */}


        {/* ################ offcanvas delete end #############  */}
      </div>
    </Container>
  );
};

export default Teacher;
