import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import toast, { Toaster } from "react-hot-toast";
import { getSchoolDataByIdApi } from "../Utils/Apis";
import { Icon } from "@iconify/react";
import DataLoader from "../Layouts/Loader";

const Container = styled.div`
  .breadcrumb-item::before {
    content: var(--bs-breadcrumb-divider, "");
  }

  .schoolNameDetails {
    border-radius: 0px 250px 250px 0px;
    background-color: var(--greenTextColor);
  }

  .orangeHighlightText {
    color: #f5b048;
  }

  .school-details-container {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 20px;
  }

  .school-details-text {
    flex: 1;
    color: white;
    z-index: 2;
  }

  .school-image-container {
    transform: translate(-30%, -10%);
    display: flex;
    align-items: center;
    background-color: var(--greenTextColor);
    width: 255px;
    height: 255px;
    border-radius: 100%;
    z-index: 1;
  }

  .school-image-inner {
    display: flex;
    align-items: center;
    background-color: white;
    width: 243px;
    height: 243px;
    border-radius: 50%;
  }

  .school-image-inner img {
    width: 237px;
    height: 237px;
    border-radius: 50%;
    object-fit: cover;
  }

  .fixed-width-container {
    max-width: 70%;
    word-wrap: break-word;
  }
`;

const ViewSchoolDetails = () => {
  const { schoolId } = useParams();
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const [getSchoolIdData, setgetSchoolIdData] = useState([]);
  const [loaderState, setloaderState] = useState(false);

  useEffect(() => {
    getSchoolDataById();
  }, [token]);

  const getSchoolDataById = async () => {
    try {
      setloaderState(true);
      const response = await getSchoolDataByIdApi(schoolId);
      if (response?.status === 200 && response?.data?.status === "success") {
        setgetSchoolIdData(response?.data?.school);
        setloaderState(false);
      } else {
        setloaderState(false);
        toast.error(response?.data?.message);
      }
    } catch (error) {
      setloaderState(false);
      console.error("Error fetching student data:", error);
      if (error?.response?.data?.statusCode === 401) {
        localStorage.removeItem("token");
        setTimeout(() => {
          navigate("/");
        }, 200);
      }
    }
  };

  return (
    <>
      <Container className="scrollHide">
        {loaderState && <DataLoader />}
        <div className="container-fluid p-4">
          <div className="row mb-3">
            <nav className="breadcrumnav" aria-label="breadcrumb">
              <ol className="breadcrumb mb-2">
                <li className="breadcrumb-item">
                  <Link to="#" className="greyText text-decoration-none">
                    <h2>Home &gt; </h2>
                  </Link>
                </li>
                <li
                  className="breadcrumb-item active greenText"
                  aria-current="page"
                >
                  <h2> Schools</h2>
                </li>
              </ol>
            </nav>
            <h2 className="">School Detail - {getSchoolIdData?.schoolName}</h2>
          </div>

          <div className="row ps-2 pe-2">
            <div className="cardradius bg-white p-5 d-flex justify-content-center">
              <div className="p-3 border rounded fixed-width-container">
                <div className="row pt-3 pt-5">
                  <div className="school-details-container p-0">
                    <div className="school-details-text">
                      <div className="schoolNameDetails p-3">
                        <h4 className="font26 orangeHighlightText">
                          {getSchoolIdData?.schoolName}
                        </h4>
                        <div className="dottedTopBorder pt-2">
                          <h2>
                            <b>Street:</b> 14, B, Liladhar Mansion, 2nd Lane,
                            Khetwadi
                          </h2>
                          <h2 className="mt-2">
                            <b>City:</b> {getSchoolIdData?.schoolAddress}
                          </h2>
                        </div>
                      </div>
                      <div className="row mt-3">
                        <div className="col-md-6">
                          <h3 className="greyText">
                            <Icon
                              className="me-2"
                              icon="bxs:phone-call"
                              width="1.5em"
                              height="1.5em"
                              style={{ color: "#00A67E" }}
                            />
                            Phone Number:
                          </h3>
                          <h3 className="greyText mt-2">
                            <Icon
                              className="me-2"
                              icon="material-symbols:list-alt-outline"
                              width="1.5em"
                              height="1.5em"
                              style={{ color: "#00A67E" }}
                            />
                            Plan:
                          </h3>
                        </div>
                        <div className="col-md-6">
                          <h3>{getSchoolIdData?.schoolPhone}</h3>
                          <h3 className="mt-2">
                            {getSchoolIdData?.plans?.planName}
                          </h3>
                        </div>
                      </div>
                    </div>

                    {/* Image Section */}
                    <div className="school-image-container">
                      <div className="school-image-inner">
                        <img
                          src="/images/studentProfile.png"
                          alt={`${getSchoolIdData?.schoolName} Profile`}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-center p-3">
                  <Link className="btn cancelButtons ms-3" to="/">
                    Back
                  </Link>
                </p>
              </div>
            </div>
          </div>
          <Toaster />
        </div>
      </Container>
    </>
  );
};

export default ViewSchoolDetails;
































// import React, { useEffect, useState } from 'react'
// import { Link, useNavigate, useParams } from 'react-router-dom';
// import styled from 'styled-components'
// import toast, { Toaster } from 'react-hot-toast';
// import { getSchoolDataByIdApi } from '../Utils/Apis';
// import { Icon } from '@iconify/react';
// import DataLoader from '../Layouts/Loader';


// const Container = styled.div`
 
// .table-striped>tbody>tr:nth-of-type(odd)>* {
//     --bs-table-bg-type: var(--tableGreyBackgroundColor);
// }
  
//   .schoolNameDetails{
//     border-radius: 0px 250px 250px 0px;
//     background-color: var(--greenTextColor);
//   }

//   .orangeHighlightText{
//     color:  #F5B048;
//   }
  
//   .breadcrumb-item::before {
//     content: var(--bs-breadcrumb-divider, "");
//   }

// `;

// const ViewSchoolDetails = () => {

//   const { schoolId } = useParams();
//   console.log(schoolId)

//   const navigate = useNavigate();

//   const token = localStorage.getItem('token');
//   const [getSchoolIdData, setgetSchoolIdData] = useState([])
//   const [loaderState, setloaderState] = useState(false)

//   useEffect(() => {
//     getSchoolDataById();
//   }, [token])


//   const getSchoolDataById = async () => {
//     try {
//       setloaderState(true);
//       var response = await getSchoolDataByIdApi(schoolId);
//       console.log(response, schoolId)
//       if (response?.status === 200) {
//         if (response?.data?.status === 'success') {
//           setgetSchoolIdData(response?.data?.school);
//           // toast.success(response?.data?.message);
//           setloaderState(false)
//         }
//       }
//       else {
//         setloaderState(false)
//         toast.error(response?.data?.message);
//       }
//     }
//     catch (error) {
//       setloaderState(false);
//       console.error('Error fetching student data:', error);
//       if (error?.response?.data?.statusCode === 401) {
//         localStorage.removeItem('token')
//         setTimeout(() => {
//           navigate('/')
//         }, 200);
//       }
//     }
//   }

//   return (
//     <>
//       <Container className='scrollHide'>
//         {
//           loaderState && (
//             <DataLoader />
//           )
//         }
//         <div className="container-fluid p-4 ">
//           <div className="row mb-3">
//             <nav className='breadcrumnav' aria-label="breadcrumb">
//               <ol className="breadcrumb mb-2">
//                 <li className="breadcrumb-item"><Link to="#" className='greyText text-decoration-none'><h2>Home &gt; </h2></Link></li>
//                 <li className="breadcrumb-item active greenText" aria-current="page"><h2> Schools</h2></li>
//               </ol>
//             </nav>
//             <h2 className=''>School Detail - {getSchoolIdData?.schoolName}</h2>
//           </div>


//           <div className="row ps-2 pe-2">
//             <div className="cardradius bg-white p-5 d-flex justify-content-center">
//               <div className='p-3 border rounded'>
//                 {/*  */}
//                 <div className="row pt-3 ">
//                   <div className="col-md-8">
//                     <div className="row schoolNameDetails p-4">
//                       <h4 className='p-0 font26 orangeHighlightText '>{getSchoolIdData?.schoolName}</h4>
//                       <div className='p-0 pt-2 dottedTopBorder'>
//                         <h2 className='text-white'><b>Street :</b> 14, B, Liladhar Mansion, 2nd Lane, Khetwadi</h2>
//                         <h2 className='text-white mt-2'>City : {getSchoolIdData?.schoolAddress}</h2>
//                         {/* <h2 className='text-white mt-2'>City : {getSchoolIdData?.schoolAddress}</h2> */}
//                       </div>
//                     </div>
//                     <div className="row mt-3">
//                       <div className='col-md-5'>
//                         <h3 className='greyText'><Icon className='me-2' icon="bxs:phone-call" width="1.5em" height="1.5em" style={{ color: '#00A67E' }} />Phone Number :</h3>
//                         <h3 className='greyText mt-2'><Icon className='me-2' icon="material-symbols:list-alt-outline" width="1.5em" height="1.5em" style={{ color: '#00A67E' }} />Plan : </h3>
//                       </div>
//                       <div className='col-md-5'>
//                         <h3 className=''>{getSchoolIdData?.schoolPhone}</h3>
//                         <h3 className='mt-2'>{getSchoolIdData?.plans?.planName}</h3>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="col-md-4">
//                     <div className="row"><img src={''} alt="" /></div>
//                   </div>
//                 </div>
//                 <p className='text-center p-3'>
//                   <button className='btn printButton text-white' type='button'>Print</button>
//                   <Link className='btn cancelButtons ms-3' to='/'>Cancel</Link>
//                 </p>
//               </div>
//             </div>
//           </div>


//           <Toaster />
//         </div>
//       </Container>
//     </>
//   )
// }

// export default ViewSchoolDetails
