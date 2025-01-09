import React, { useEffect, useState } from 'react';
import { getAllPlanApi, getPlanByIdApi } from '../Utils/Apis';
import DataLoader from '../Layouts/Loader';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const PackageDashboard = () => {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    // States
    const [loaderState, setLoaderState] = useState(false);
    const [allPlans, setAllPlans] = useState([]);
    const [planIdName, setPlanIdName] = useState('');
    const [planIdData, setPlanIdData] = useState({
        'Plan Id': '',
        'Plan Name': '',
        'Price': '',
        'Student Limit': '',
        'Status': '',
        'Total Days': '',
        'Type': '',
    });

    // Fetch all plans on component load
    useEffect(() => {
        if (token) {
            getAllPlans();
        }
    }, [token]);

    const getAllPlans = async () => {
        try {
            setLoaderState(true);
            const search = '';
            const page = '';
            const size = '';
            const response = await getAllPlanApi(search, page, size);

            if (response?.status === 200 && response?.data?.status === 'success') {
                setAllPlans(response?.data?.plans);
            } else {
                console.error(response?.data?.message || 'Failed to fetch plans.');
            }
        } catch (error) {
            console.error('Error fetching plans:', error);
            if (error?.response?.data?.statusCode === 401) {
                localStorage.removeItem('token');
                setTimeout(() => navigate('/'), 200);
            }
        } finally {
            setLoaderState(false);
        }
    };

    const getPlanById = async (planId) => {
        try {
            setLoaderState(true);
            const response = await getPlanByIdApi(planId);

            if (response?.status === 200 && response?.data?.status === 'success') {
                setPlanIdName(response.data?.plans?.planName);
                setPlanIdData({
                    'Plan Id': response?.data?.plans?.planId,
                    'Plan Name': response?.data?.plans?.planName,
                    'Price': response?.data?.plans?.price,
                    'Student Limit': response?.data?.plans?.studentLimit,
                    'Status': response?.data?.plans?.status ? 'True' : 'False',
                    'Total Days': response?.data?.plans?.totalDays,
                    'Type': response?.data?.plans?.type,
                });
            } else {
                console.error(response?.data?.message || 'Failed to fetch plan details.');
            }
        } catch (error) {
            console.error('Error fetching plan details:', error);
        } finally {
            setLoaderState(false);
        }
    };

    return (
        <>
            {loaderState && <DataLoader />}

            <div className="container-fluid">
                <div className="row">
                    <table className="table mt-2 mb-0">
                        <tbody>
                            {allPlans.slice(0, 4).map((item) => (
                                <tr key={item.planId}>
                                    <td className="greyText">
                                        <h3>{item.planName}</h3>
                                    </td>
                                    <td className="text-end">
                                        <h3 className={item.status ? 'activeText' : 'deactiveText'}>
                                            {item.status ? 'Active' : 'Inactive'}
                                        </h3>
                                    </td>
                                    <td className="text-end">
                                        <span className="text-center viewDetailsButtons p-1" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onClick={() => getPlanById(item.planId)} >
                                            View Details
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="modal fade" id="staticBackdrop" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true" style={{ borderRadius: '100px'}}>
                <div className="modal-dialog modal-dialog-centered p-5">
                    <div className="modal-content">
                        <div className="modal-header d-flex justify-content-center" style={{ backgroundColor: '#E4E7EB'}}>
                            <h2 className="modal-title p-0 fw-bolder" id="staticBackdropLabel" style={{ textTransform: 'capitalize' }}>
                                {planIdName}
                            </h2>
                            {/* <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button> */}
                        </div>
                        <div className="modal-body">
                            <div className='px-3'>
                                {Object.entries(planIdData).map(([key, value]) => (
                                    <div className="row mt-2" key={key}>
                                        <div className="col-4 text-start">
                                            <small className="text-secondary">{key}</small>
                                        </div>
                                        <div className="col-8 text-end">
                                            <small>{value}</small>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="modal-footer d-flex justify-content-center">
                            <button type="button" className="btn closeModalButtons" data-bs-dismiss="modal">
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PackageDashboard;
