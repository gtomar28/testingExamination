import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { Link, useParams } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import HashLoader from './HashLoaderCom';
// import { SubmissionPostApi } from '../Utils/Apis'
// import { StudentGetAllDataApi } from '../Utils/Apis'
// import { SubmissiongetAllApi } from '../Utils/Apis'
// import { SubmissionDeleteApi } from '../Utils/Apis'
// import { SubmissionGEtByIdApi } from '../Utils/Apis'
// import { SubmissionUpdateApi } from '../Utils/Apis'
import ReactPaginate from 'react-paginate';
import { Icon } from '@iconify/react/dist/iconify.js';
// ## style css area start ####  

const Container = styled.div`
.breadcrum-li a{
text-decoration: none;
margin-top: 5px;
color: #008479;
}
.main-body{
  background-color: #F2F3F6; 
}
.main-content-conatainer{
  background-color: #fff;
  margin: 10px;
  /* height: 100vh; */
  border-radius: 15px;

}
.margin-minus22{
  margin-top: -18px;
  font-size: 16px;
}
th, td{
padding: 10px;
}
.my-td-style-yellow span{
background-color: #FFEED3;
  color: #FF914C;
  padding: 1px 18px 1px 18px;
  border-radius: 18px 18px 18px 18px;
}
.my-td-style-green span{
background-color:#E6FFE2;
color: #00A67E;
padding: 1px 18px 1px 18px;
  border-radius: 18px 18px 18px 18px;
}
.my-button-drop{
line-height: 13px !important;
border: 1px solid var(--tableActionButtonBgColor)  !important;

}
.pagination-a{
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
.pagination-a a{
gap: 2px;
}
.my-pagina li a:hover{
background-color: #008479;
color: #fff;
border: none;
}
.input-bg{
background-color: #F2F3F6 !important;
}
.label-color{
color: #bbbec1;
}
.cont-drop-btn button:hover{
background-color: transparent;
color: #000;
cursor: pointer;
border: none;
}


.my-button11{
  display: flex;
  justify-content: center;
  gap: 4px;
  margin-top: 30px;
}

.my-button11 button{
  border-radius: 5px;
border: 1px solid #ababad;
color: #000;
font-size: 12px;
}
.my-button11 button:hover{
  background-color: #008479;
  color: #fff;
}
.my-button22{
  display: flex;
  gap: 4px;
  margin-top: 4px;
}

.my-button22 button{
  border-radius: 5px;
border: 1px solid #ababad;
color: #000;
font-size: 12px;
}
.my-button22 button:hover{
  background-color: #008479;
  color: #fff;
}
.my-grey{
color: #ADADBD;
}

.my-div-class p{
border: 1px solid #ADADBD;
padding: 10px;
border-radius: 4px;
background-color: #F2F3F6;
color: #ADADBD;
border: 1px solid #F2F3F6;
}
.my-div-class span a{
  text-decoration: none;
}
.anchor-color a{
color: #8F8F8F;
}
.my-own-button{
height: 33px;
background-color: var(  --greenTextColor);
line-height: 18px;
}
.my-own-outline-btn{
height: 33px;
line-height: 0px;
color: #000;
border: 1px solid var( --buttonBorder);
background-color: #fff;
}

.img-div img{
width: 100%;
height: 100%;
border-radius: 50%;
border: 1px solid #b9b8b8;

}
/* ############# offcanvas ############## */
.forInput {
  background : #F2F3F6;
  color:  #ADADBD;
  /* font-family: 'Noto Sans'; */
  font-size: 14px;
}
.forInput::placeholder{
  color: #ADADBD;
}

.forInputFont{
  font-size: 14px;
}
  .forLabel {
  color:  #ADADBD;
  font-size: 15px;
}
.button11{
  --bs-btn-color: #959494;
  --bs-btn-border-color: #cdcdcd;
  --bs-btn-hover-color: #fff;
  --bs-btn-hover-bg: #008479;
  border-radius: 0%;
}

.img-container{
  position: absolute;
  height: 60px;
  width: 60px;
  border-radius: 50%;
  background-color: #2BB673;
  top: -16%;
}
.img-container22{
  position: absolute;
  height: 60px;
  width: 60px;
  border-radius: 50%;
  background-color: #2BB673;
  border: 2px solid #cdcdcd;
  top: -16%;
}
.img-container img{
  height: 30px;
  width: 36px;
  margin: 11px;
  margin-top: 14px;
}
.img-container22 img{
  height: 27px;
  width: 32px;
  margin: 11px;
  margin-top: 14px;
}
.img-container{

}
.bg-container{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border: 1px solid #dee2e6;
  width: 65%;
  background-color: #F2F3F6;
}
.delete-section {
  /* height: 30%; */
  position: relative;
display: flex;
justify-content: center;
text-align: center;
}
.button-position{
  position: absolute;
  top: 78%;
}
.main-container{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
}
.image-container{
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 1px solid #F1F5FA;
}
.image-container img{
  width: 100%;
  height: 100%;
}
.delete-content{
  font-size: 20px;
}
.delete-content span{
  background-color: #0AAD24;
  color: #fff;
  font-size: 15px;
  padding: 2px 6px 2px 6px;
  border-radius: 4px;
}
.likeButton{
  background-color: #008479;
  color: #fff;
  font-size: 17px;
  padding: 2px 8px 2px 8px;
  border-radius: 4px;
  display: inline;
}

.view-details-background-color{
  background-color: var(--backgroundColor);
}

.symbol-container img{
  object-fit: cover;
}
.subject{
  font-size: 14px;
}
.sure-main-container{
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.sure-content h5{
  font-weight: 200;
}
.sure-content p{
  font-size: 14px;
  color: #ADADBD;
}
.agree{
  font-size: 14px;
  color: #ADADBD;
}
.buttons-topss{
  margin-top: -35px;
}
.button00{
  --bs-btn-color: #959494;
  --bs-btn-border-color: #cdcdcd;
  --bs-btn-hover-color: #fff;
  --bs-btn-hover-bg: #B50000;
  border-radius: 0%;
}
.bg-color-pink{
  border: 1px dashed #EECEBE;
  background: #FFF9F6;
}
.my-non-clickable button{
  border-radius: 5px;
  border: 1px solid #ECEBF3;
  background: #FFF;
  color: #000;
}
.my-form-check-input123:checked {
  background-color: var( --greenTextColor);
  border-color: var( --greenTextColor);
}
.overflow-y {
max-height: 300px; 
overflow-y: auto; 
}
.my-own-outline-btn{
  border: 1px solid #008479;
  color: #008479;
}

.button00{
  --bs-btn-color: #959494;
  --bs-btn-border-color: #cdcdcd;
  background-color: #B50000;
  color: #fff;
  border-radius: 0%;
}
.cancel-btn{
  color: #959494;
 border-color: #cdcdcd;

  --bs-btn-hover-bg: #fff;
  border-radius: 0%;
}

.my-btn.disabled, .my-btn:disabled, fieldset:disabled .btn {
  color: #fff ;
  pointer-events: none;
  background-color: #B50000;
  border-color: #cdcdcd;
  opacity: var(--bs-btn-disabled-opacity);
}
.my-form-check-input:checked{
background-color: #B50000;
border-color: #B50000;
} 

.unpaid{
  background-color: #B50000;
  color: #fff;
  padding: 2px 10px;
  font-size: 13px;
  border-radius: 15px ;
  display: inline-block;
}
.paid{
  background-color: #00A67E;
  color: #fff;
  font-size: 13px;
  padding: 2px 10px;
  border-radius: 15px ;
  display: inline-block;
}
.my-green{
  background-color: #008479;
  color: #fff !important;
}
.modal-header{
  border-bottom: none !important;
}
.main{
  border-top: none !important;
}
.main-content{
  background-color: #F0F0FF;
  padding: 8px;
}
.img-content img{
  width: 80px;
}
.img-content {
  padding: 4px 0px 0px 4px;
}
.ul-1{
  list-style: none;
  color: #8F8F8F;
}
.ul-2{
  list-style: none;
}
.outer-border{
  border: 1px solid #DDDDEB;
  padding: 0px 12px 0px 12px;
}

.table-input{
  border: 1px solid #E4E7EB;
}
.edit-icon{
  cursor: pointer;
}
.bg-color-pink{
    background-color: #ccf1ee;
    border: none;
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
    /* background-color: #f5f5f5;
    transition: background-color 0.3s; */
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
@media only screen and (max-width: 950px) {
.for-media-query{
  display: flex;
  flex-direction: column;
}
}
@media only screen and (max-width: 735px) {
.for-media-query{
  display: flex;
  flex-direction: column;
}
}
@media only screen and (max-width: 605px) {
.for-media-query-22{
  flex: 0 0 auto !important;
  width: 53% !important;
}
.my-own-button{
  margin-top: 5px;
  margin-bottom: 25px;
}
.search-responsive{
  margin-top: 10px;
}
.export1{
  margin-top: 8px !important;
}
.export2{
  margin-top: 12px !important;
}
}

@media only screen and (max-width: 605px) {
  .for-dislay-direction{
      display: flex;
      flex-direction: column;
      margin-bottom: 5px;
  }

}

@media only screen and (max-width: 425px) {
  .for-media-query-22{
  flex: 0 0 auto !important;
  width: 75% !important;
}

}
`;
// ## style css area end ####  

const Assignmnt_submss = () => {

  const [loader, setLoader] = useState(false)
  const [forDelete, setForDelete] = useState(false)

  const [hide, setHide] = useState(false)
  const [show, setShow] = useState(true)

  const [showdelete, setShowdelete] = useState(true)
  const [hidedelete, setHidedelete] = useState(false)
  const [setClassdata, setSetClassdata] = useState([])
  const [sectionData, setSectionData] = useState([])
  const [studentData, setStudentData] = useState([])
  const [examCategoryData, setExamCategoryData] = useState([])
  const [sessionAllData, setSessionAllData] = useState([])
  const [marksAllData, setMarksAllData] = useState([])
  const [submissionData, setSubmissionData] = useState([])
  const [IdForDelete, setIdForDelete] = useState()
  console.log('id for delete', IdForDelete)
  const [IdForUpdate, setIdForUpdate] = useState()
  const [showadd, setShowadd] = useState(true)
  const [hideedit, setHideedit] = useState(false)

  const [studentName, setStudentName] = useState()
  const [marks, setMarks] = useState()
  const [status, setStatus] = useState()

  const { id, sectionId, totalMarks } = useParams();

  console.log('marksss from assignmntt', totalMarks)
  const [searchKey, setSearchKey] = useState('')
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageNo, setPageNo] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const handlePageClick = (event) => {
    setPageNo(event.selected + 1); // as event start from 0 index
  };
  useEffect(() => {
    MyStudentGetAllApi()
    MySubmissionGetAllApi()
  }, [pageNo])

  // Get student by section
  const MyStudentGetAllApi = async () => {
    setLoader(true)
    try {
      const response = await StudentGetAllDataApi(sectionId);
      console.log('Student all data in submission in assigmnt', response);
      if (response?.status === 200) {
        // toast.success(response?.data?.message)
        setStudentData(response?.data?.student)
        setLoader(false)
      } else {
        toast.error(response?.data?.message);
      }
    } catch (error) {
      console.log(error)
    }
  }
  const offcanvasRef = useRef(null);
  const offcanvasRef22 = useRef(null);
  const offcanvasRef33 = useRef(null);

  // post api 
  const MySubmissionPostApi = async () => {

    const formData = new FormData()
    formData.append('studentId', studentName);
    formData.append('marks', totalMarks);
    formData.append('status', status);

    setLoader(true)
    try {
      const response = await SubmissionPostApi(id, formData);
      console.log('submission post apiiiiii', response)
      if (response?.status === 200) {
        if (response?.data?.status === "success") {
          toast.success(response?.data?.message);
          setHidedelete(true)
          MySubmissionGetAllApi()
          setLoader(false)
          setShow(false)
          setHide(true)
          const offcanvasInstance = bootstrap.Offcanvas.getInstance(offcanvasRef.current);
          offcanvasInstance.hide();
          setTimeout(() => {
            setShow(true)
          }, 0.5)
        } else {
          toast.error(response?.data?.message);
          // setShow(true)
        }
      } else {
        toast.error(response?.data?.message);
      }
    } catch (error) {
      console.log(error)
    }
  }

  // Get All submission 
  const MySubmissionGetAllApi = async () => {
    setLoader(true)
    try {
      const response = await SubmissiongetAllApi(id,searchKey,pageNo,pageSize);
      console.log('Submission get all data', response);
      if (response?.status === 200) {
        // toast.success(response?.data?.message)
        setSubmissionData(response?.data?.submission)
        setCurrentPage(response?.data?.currentPage);
        setTotalPages(response?.data?.totalPages);
        setLoader(false)
      } else {
        toast.error(response?.data?.message);
      }
    } catch (error) {
      console.log(error)
    }
  }

  // Delete api
  const MySubmissionDeleteApi = async () => {
    setLoader(true)
    try {
      const response = await SubmissionDeleteApi(id, IdForDelete);
      // console.log('my-subs-api',response)
      if (response?.status === 200) {
        toast.success(response?.data?.message);
        MySubmissionGetAllApi()
        setShowdelete(false)
        setHidedelete(true)
        setLoader(false)
        const offcanvasInstance = bootstrap.Offcanvas.getInstance(offcanvasRef33.current);
        offcanvasInstance.hide();
        setTimeout(() => {
          setShowdelete(true)
          setForDelete(false)
        }, 0.5)
      } else {
        toast.error(response?.data?.message);
        setShowdelete(true)
      }
    } catch (error) {
      console.log(error)
    }
  }

  // Get by id 
  const MySubmissionGetByIdApi = async (id) => {
    setIdForUpdate(id)
    setLoader(true)
    try {
      const response = await SubmissionGEtByIdApi(id);
      console.log('Submission get by id data', response);
      if (response?.status === 200) {
        // toast.success(response?.data?.message)

        setStudentName(response?.data?.submission?.studentId)
        setStatus(response?.data?.submission?.status)

        setLoader(false)
      } else {
        toast.error(response?.data?.message);
      }
    } catch (error) {
      console.log(error)
    }
  }
  // put api 
  const MySubmissionUpdateApi = async () => {

    const formData = new FormData()
    formData.append('studentId', studentName);
    formData.append('marks', totalMarks);
    formData.append('status', status);
    setLoader(true)
    try {
      const response = await SubmissionUpdateApi(IdForUpdate, formData);
      if (response?.status === 200) {
        if (response?.data?.status === "success") {
          toast.success(response?.data?.message);
          MySubmissionGetAllApi()
          setLoader(false)
          setShowadd(false)
          setHideedit(true)
          const offcanvasInstance = bootstrap.Offcanvas.getInstance(offcanvasRef22.current);
          offcanvasInstance.hide();
          setTimeout(() => {
            setShowadd(true)
          }, 0.5)
        } else {
          toast.error(response?.data?.message);
          setShowadd(true)
        }
      } else {
        toast.error(response?.data?.message);
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <Container>
      {
        loader && (
          <HashLoader />
        )
      }
      <div className="container-fluid main-body p-3">

        <div className='d-flex justify-content-between for-dislay-direction'>
          <div className="breadCrum ms-2">
            <nav style={{ '--bs-breadcrumb-divider': "'>'" }} aria-label="breadcrumb">
              <ol className="breadcrumb ms-2">
                <li className="breadcrumb-item active heading-14 font-color" aria-current="page">Home</li>
                {/* <li className="breadcrumb-item active heading-14 font-color" aria-current="page">Accounting</li> */}
                <li className="breadcrumb-item breadcrum-li heading-14" ><Link href="#">Assignments</Link></li>
              </ol>
            </nav>
          </div>
          <div className='d-flex g-1 for-media-query'>
            {/* <div className='me-2 search-responsive'>
                            <div className="input-group mb-3 ">
                                <input type="text" className="form-control form-focus font-color" style={{ height: '34px' }} placeholder="Search" aria-label="Recipient's username" aria-describedby="basic-addon2" />
                                <span className="input-group-text button-bg-color button-color heading-14 font-color " style={{ cursor: 'pointer', height: "34px" }} id="basic-addon2">Search</span>
                            </div>
                        </div> */}
            <Link type="button" className="btn btn-success heading-16 my-own-button me-3 " data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight" to={''}>+ Add Submission</Link>
          </div>
        </div>
        <h5 className='ms-3 mb-2 margin-minus22 heading-16' style={{ marginTop: '-12px' }}> Submission Details</h5>

        <div className="main-content-conatainer pt-1 ">
          {/* ###### copy content till here for all component ######  */}


          <div className="row mt-4 mb-4 bg-color-pink p-3 m-3">
            <div className="col-12 ">
              <div className="row heading-16 ">
                <div className="col-3 p-0 ps-5">
                  <span className='heading-16 greyText'>  <b>Submission - </b></span>
                  Board test
                </div>
                <div className="col-2 p-0 ps-4">
                  <span className='heading-16 greyText'><b>Class -</b></span>
                  1
                </div>
                <div className="col-2 p-0">
                  <span className='heading-16 greyText'> <b>Section -</b></span>
                  A
                </div>


              </div>
            </div>
            <div className="col-1"></div>
          </div>
          <div className="table-container px-3 table-responsive">
            <table className="table table-sm table-striped">
              <thead className=''>
                <tr className='heading-16 text-color-000' style={{ fontWeight: '500' }}>
                  <th className='' style={{ width: '15%' }}>#</th>
                  <th style={{ width: '25%' }}>Name</th>
                  <th style={{ width: '25%' }}>Email</th>
                  <th >Status</th>
                  <th>Result</th>
                  <th>Action</th>

                </tr>
              </thead>
              <tbody className='heading-14 align-middle greyTextColor'>
                {
                  submissionData?.map((item, index) => (
                    <tr className='heading-14' >
                      <td className=' greyText'>{index + 1}</td>
                      <td className=' greyText' >{item.studentName}</td>
                      <td className=' greyText' >{item.studentEmail}</td>
                      <td className=' greyText' >{item.status === true ? "Active" : "Inactive"}</td>
                      <td className=' greyText' >{item.marks}</td>
                      <td className=' greyText  pe-0' >
                        <div className="dropdown my-button-show">
                          <button className="btn btn-secondary dropdown-togg my-button-drop tableActionButtonBgColor text-color-000 heading-14" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Action &nbsp;
                            <svg width="11" height="7" viewBox="0 0 11 7" fill="none" xmlns="">
                              <path d="M10.3331 0L11 0.754688L5.5 7L0 0.754688L0.663438 0L5.5 5.48698L10.3331 0Z" fill="black" />
                            </svg>
                          </button>
                          <ul className="dropdown-menu anchor-color heading-14">
                            <li><Link className="dropdown-item" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight1234" aria-controls="staticBackdrop" onClick={() => MySubmissionGetByIdApi(item.id)} >Edit</Link></li>
                            <li><Link className="dropdown-item" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight22" aria-controls="staticBackdrop" onClick={() => setIdForDelete(item.id)}>Delete</Link></li>

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

        {/* ##### offcanvas added start ########  */}
        {
          show && (
            <>
              <div className="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel" ref={offcanvasRef}>
                <div className="offcanvas-header">
                <Link data-bs-dismiss="offcanvas" >
                    <svg width="28" height="15" viewBox="0 0 28 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8.06 0.295798C8.15373 0.388761 8.22812 0.499362 8.27889 0.621222C8.32966 0.743081 8.3558 0.873786 8.3558 1.0058C8.3558 1.13781 8.32966 1.26852 8.27889 1.39038C8.22812 1.51223 8.15373 1.62284 8.06 1.7158L3.46 6.3158H27C27.2652 6.3158 27.5196 6.42115 27.7071 6.60869C27.8946 6.79623 28 7.05058 28 7.3158C28 7.58102 27.8946 7.83537 27.7071 8.0229C27.5196 8.21044 27.2652 8.3158 27 8.3158H3.48L8.06 12.8858C8.24625 13.0732 8.35079 13.3266 8.35079 13.5908C8.35079 13.855 8.24625 14.1084 8.06 14.2958C7.87264 14.482 7.61918 14.5866 7.355 14.5866C7.09081 14.5866 6.83736 14.482 6.65 14.2958L0.289999 7.9358C0.204397 7.85367 0.136286 7.75508 0.089756 7.64596C0.0432262 7.53683 0.0192413 7.41943 0.0192413 7.3008C0.0192413 7.18217 0.0432262 7.06476 0.089756 6.95564C0.136286 6.84652 0.204397 6.74793 0.289999 6.6658L6.64 0.295798C6.73296 0.20207 6.84356 0.127676 6.96542 0.0769072C7.08728 0.0261385 7.21799 0 7.35 0C7.48201 0 7.61272 0.0261385 7.73458 0.0769072C7.85643 0.127676 7.96704 0.20207 8.06 0.295798Z" fill="#008479" />
                    </svg>
                  </Link>                <h5 className="offcanvas-title heading-16" id="offcanvasRightLabel">Add Submissions</h5>
                </div>
                <hr className='' style={{ marginTop: '-3px' }} />
                <div className="offcanvas-body pt-0">
                  <div className="mb-1  ">
                    <label for="exampleFormControlInput1" className="form-label  heading-16">Student Name</label>
                    <select class="form-select  form-select-sm form-focus  label-color" onChange={(e) => setStudentName(e.target.value)} aria-label="Default select example">
                      <option selected>--Choose--</option>
                      {
                        studentData?.map(item =>
                          <option value={item.studentId}>{item.studentName}</option>
                        )
                      }
                    </select>
                  </div>
                  <div>
                  </div>
                  <div class="mb-3">
                    <label for="exampleFormControlInput1" class="form-label heading-16">Marks</label>
                    <input type="email" class="form-control form-control-sm" value={totalMarks} onChange={(e) => setMarks(e.target.value)} id="exampleFormControlInput1" placeholder="Select Title" disabled />
                  </div>
                  <div className="mb-1  ">
                    <label for="exampleFormControlInput1" className="form-label heading-16">Status</label>
                    <select class="form-select  form-select-sm form-focus  label-color" onChange={(e) => setStatus(e.target.value)} aria-label="Default select example">
                      <option selected>--Choose--</option>
                      <option value="true">True</option>
                      <option value="false">False</option>

                    </select>
                  </div>
                  <div>
                  </div>

                  <div className='my-button11 '>
                    <button type="button" className="btn btn-outline-success heading-16 btn-bgAndColor" onClick={MySubmissionPostApi}>Add Submissions</button>
                    <button type="button" className="btn btn-outline-success heading-16">Cancel</button>
                  </div>
                </div>
              </div>
            </>
          )
        }

        {/* ##### offcanvas edit start ########  */}
        {
          showadd && (
            <>
              <div className="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight1234" aria-labelledby="offcanvasRightLabel" ref={offcanvasRef22}>
                <div className="offcanvas-header">
                <Link data-bs-dismiss="offcanvas" >
                    <svg width="28" height="15" viewBox="0 0 28 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8.06 0.295798C8.15373 0.388761 8.22812 0.499362 8.27889 0.621222C8.32966 0.743081 8.3558 0.873786 8.3558 1.0058C8.3558 1.13781 8.32966 1.26852 8.27889 1.39038C8.22812 1.51223 8.15373 1.62284 8.06 1.7158L3.46 6.3158H27C27.2652 6.3158 27.5196 6.42115 27.7071 6.60869C27.8946 6.79623 28 7.05058 28 7.3158C28 7.58102 27.8946 7.83537 27.7071 8.0229C27.5196 8.21044 27.2652 8.3158 27 8.3158H3.48L8.06 12.8858C8.24625 13.0732 8.35079 13.3266 8.35079 13.5908C8.35079 13.855 8.24625 14.1084 8.06 14.2958C7.87264 14.482 7.61918 14.5866 7.355 14.5866C7.09081 14.5866 6.83736 14.482 6.65 14.2958L0.289999 7.9358C0.204397 7.85367 0.136286 7.75508 0.089756 7.64596C0.0432262 7.53683 0.0192413 7.41943 0.0192413 7.3008C0.0192413 7.18217 0.0432262 7.06476 0.089756 6.95564C0.136286 6.84652 0.204397 6.74793 0.289999 6.6658L6.64 0.295798C6.73296 0.20207 6.84356 0.127676 6.96542 0.0769072C7.08728 0.0261385 7.21799 0 7.35 0C7.48201 0 7.61272 0.0261385 7.73458 0.0769072C7.85643 0.127676 7.96704 0.20207 8.06 0.295798Z" fill="#008479" />
                    </svg>
                  </Link>                  <h5 className="offcanvas-title heading-16" id="offcanvasRightLabel">Edit Submission</h5>
                </div>
                <hr className='' style={{ marginTop: '-3px' }} />
                <div className="offcanvas-body pt-0">
                  <div className="mb-1  ">
                    <label for="exampleFormControlInput1" className="form-label  heading-16">Student Name</label>
                    <select class="form-select  form-select-sm form-focus  label-color" value={studentName} onChange={(e) => setStudentName(e.target.value)} aria-label="Default select example">
                      <option selected>--Choose--</option>
                      {
                        studentData.map(item =>
                          <option value={item.studentId}>{item.studentName}</option>
                        )
                      }
                    </select>
                  </div>
                  <div>

                  </div>

                  <div class="mb-3">
                    <label for="exampleFormControlInput1" class="form-label heading-16">Marks</label>
                    <input type="email" class="form-control form-control-sm" value={totalMarks} onChange={(e) => setMarks(e.target.value)} id="exampleFormControlInput1" placeholder="Select Title" disabled />
                  </div>
                  <div className="mb-1  ">
                    <label for="exampleFormControlInput1" className="form-label heading-16">Status</label>
                    <select class="form-select  form-select-sm form-focus  label-color" value={status} onChange={(e) => setStatus(e.target.value)} aria-label="Default select example">
                      <option selected>--Choose--</option>
                      <option value="true">True</option>
                      <option value="false">False</option>

                    </select>
                  </div>
                  <div>
                  </div>

                  <div className='my-button11 '>
                    <button type="button" className="btn btn-outline-success heading-16 btn-bgAndColor" onClick={MySubmissionUpdateApi}>Update Submissions</button>
                    <button type="button" className="btn btn-outline-success heading-16">Cancel</button>
                  </div>
                </div>
              </div>
            </>
          )
        }

        {/* ##### offcanvase edit end ########  */}
        {/* ################ offcanvas delete start #############  */}


          {
            showdelete && (
              <div className="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight22" aria-labelledby="offcanvasRightLabel" ref={offcanvasRef33}>
              <div className="container-fluid">
                <div className="offcanvas-header p-0 pt-3">
                  <Link data-bs-dismiss="offcanvas" className='ps-3'><img src="./images/Vector (13).svg" alt="" /></Link>
                  <h5 className="offcanvas-title pe-3 heading-16" id="offcanvasRightLabel" >Delete Section</h5>
                </div>
                <hr className='' />

                <div className="offcanvas-body">

                  <div className="sure-main-container mt-4">
                    <div className="sure-container">
                      <div>
                        <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M29.5312 0.46875C13.2656 0.46875 0 13.7344 0 30C0 46.2656 13.2656 59.5312 29.5312 59.5312C45.7969 59.5312 59.0625 46.2656 59.0625 30C59.0625 13.7344 45.7969 0.46875 29.5312 0.46875ZM29.5312 55.7812C15.3281 55.7812 3.75 44.2031 3.75 30C3.75 15.7969 15.3281 4.21875 29.5312 4.21875C43.7344 4.21875 55.3125 15.7969 55.3125 30C55.3125 44.2031 43.7344 55.7812 29.5312 55.7812Z" fill="#B50000" />
                          <path d="M31.4062 25.5469H27.6562V44.2969H31.4062V25.5469Z" fill="#B50000" />
                          <path d="M31.4062 16.6406H27.6562V20.3906H31.4062V16.6406Z" fill="#B50000" />
                        </svg>
                      </div>

                      <div className="sure-content mt-2">
                        <h5 className='heading-20'>Are you sure?</h5>
                        <p>This Action will be permanently <br /> delete the Profile Data</p>
                      </div>
                      <div className="form-check mt-1">
                        <input className="form-check-input my-form-check-input" onClick={() => setForDelete(!forDelete)} type="checkbox" value="" id="flexCheckDefault" />
                        <label className="form-check-label agree" for="flexCheckDefault">
                          I Agree to delete the Profile Data
                        </label>
                      </div>

                      <div className="mt-4">
                        <button type="button" className="btn my-btn  button00 my-button112233RedDelete" disabled={forDelete ? false : true} onClick={() => MySubmissionDeleteApi(IdForDelete)}>Delete</button>
                        <button type="button" className="btn cancel-btn ms-2" data-bs-dismiss="offcanvas" aria-label="Close">Cancel</button>
                      </div>

                    </div>
                  </div>
                </div>
              </div>

          </div>
            )
          }
    
        </div>
        {/* ################ offcanvas delete end #############  */}

    </Container>
  )
}

export default Assignmnt_submss
