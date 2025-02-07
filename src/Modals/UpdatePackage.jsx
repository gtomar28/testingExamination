import React, { useEffect, useState } from 'react';
import { getPlanByIdApi, updatePlanApi } from '../Utils/Apis';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import DataLoader from '../Layouts/Loader';

const UpdatePackage = ({ planId, closingEditCanvas, closingCancel }) => {
    const [loaderState, setLoaderState] = useState(false);
    const [UpdateWarning, setUpdateWarning] = useState(true);
    const [initialValues, setInitialValues] = useState({});
    const [isUpdated, setIsUpdated] = useState(false);

    const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm({
        mode: 'onChange',
    });

    // Watch all form values
    const watchedValues = watch();

    useEffect(() => {
        getPlanById(planId);
    }, [planId]);

    useEffect(() => {
        if (initialValues) {
            const hasChanges = Object.keys(initialValues).some(
                key => initialValues[key] !== watchedValues[key]
            );
            setIsUpdated(hasChanges);
        }
    }, [watchedValues, initialValues]);

    const getPlanById = async (planId) => {
        setLoaderState(true);
        try {
            const response = await getPlanByIdApi(planId);
            if (response?.status === 200 && response?.data?.status === 'success') {
                setLoaderState(false);
                const planData = response?.data?.plans;
                setInitialValues(planData);
                Object.keys(planData).forEach(key => setValue(key, planData[key]));
                toast.success(response?.data?.message);
            } else {
                setLoaderState(false);
                console.error(response?.data?.message);
            }
        } catch (error) {
            setLoaderState(false);
            console.error(error);
        }
    };

    const UpdatePackageFunc = async (data) => {
        setLoaderState(true);
        try {
            const response = await updatePlanApi(planId, data);
            if (response?.status === 200 && response?.data?.status === 'success') {
                setLoaderState(false);
                toast.success(response?.data?.message);
                closingCancel(true);
                setTimeout(() => closingEditCanvas(true), 2000);
                setTimeout(() => setUpdateWarning(true), 3000);
            } else {
                setLoaderState(false);
                console.error(response?.data?.message);
            }
        } catch (error) {
            setLoaderState(false);
            console.error(error);
        }
    };

    return (
        <div className="container-fluid">
            {loaderState && <DataLoader />}
            <div className="row">
                {UpdateWarning ? (
                    <form className="p-3" onSubmit={handleSubmit(UpdatePackageFunc)}>
                        <div className="row mb-3">
                            <label htmlFor="planName" className="form-label ps-0 font14">Package Name</label>
                            <input
                                id="planName"
                                type="text"
                                className={`form-control font14 ${errors.planName ? 'border-danger' : ''}`}
                                placeholder="Enter Plan Name"
                                {...register('planName', { required: 'Plan Name is required *' })}
                            />
                            {errors.planName && <p className="font12 text-danger">{errors.planName.message}</p>}
                        </div>
                        {/* Add other input fields here with similar structure */}
                        <p className="text-center p-3">
                            <button
                                className="btn addButtons2 text-white"
                                type="submit"
                                disabled={!isUpdated}
                            >
                                Update Package
                            </button>
                            <button
                                className="btn cancelButtons ms-3"
                                type="button"
                                onClick={() => closingCancel(true)}
                            >
                                Cancel
                            </button>
                        </p>
                    </form>
                ) : (
                    <div>
                        <p className="modalLightBorder p-2 mb-0">Package List</p>
                        <div className="mt-3">
                            <div className="correvtSVG p-3 pt-4 rounded-circle">
                                <img src="./images/Correct.svg" alt="" />
                            </div>
                            <div className="updatetext border m-4 border-2 ms-5 greydiv rounded-3 text-center greyText p-5">
                                <p className="warningHeading">Successful Updated</p>
                                <p className="greyText warningText pt-2">Your Changes have been<br />Successfully Saved</p>
                            </div>
                            <button className="btn contbtn continueButtons text-white" type="button">Success</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UpdatePackage;

























// import React, { useEffect, useState } from 'react'

// import { getPlanByIdApi, updatePlanApi } from '../Utils/Apis';
// import { useForm } from 'react-hook-form';
// import toast from 'react-hot-toast';
// import DataLoader from '../Layouts/Loader';

// const UpdatePackage = ({ planId, closingEditCanvas, closingCancel }) => {

//     //loader State
//     const [loaderState, setloaderState] = useState(false);
//     const [UpdateWarning, setUpdateWarning] = useState(true);
//     const { register, handleSubmit, formState: { errors }, setValue, values } = useForm({
//         mode: 'onChange'
//     });

//     useEffect(() => {
//         getPlanById(planId)
//     }, [planId])

//     const getPlanById = async (planId) => {
//         setloaderState(true);
//         try {
//             var response = await getPlanByIdApi(planId);
//             if (response?.status === 200) {
//                 if (response?.data?.status === 'success') {
//                     setloaderState(false);
//                     setValue('planName', response?.data?.plans?.planName);
//                     setValue('price', response?.data?.plans?.price);
//                     setValue('value', response?.data?.plans?.value);
//                     setValue('studentLimit', response?.data?.plans?.studentLimit);
//                     setValue('type', response?.data?.plans?.type);
//                     setValue('status', response?.data?.plans?.status);
//                     toast.success(response?.data?.message)
//                 }
//                 else{
//                     setloaderState(false);
//                 }
//             }
//             else {
//                 setloaderState(false);
//                 console.log(response?.data?.message);
//             }
//         }
//         catch(error) {
//             setloaderState(false);
//             console.log(error)
//         }
//     }

//     const UpdatePackageFunc = async (data) => {
//         setloaderState(true);
//         try {
//             const JSONdata = {
//                 "planName": data?.planName,
//                 "price": data?.price,
//                 "type": data?.type,
//                 "value": data?.value,
//                 "studentLimit": data?.studentLimit,
//                 "status": data?.status
//             }
//             var response = await updatePlanApi(planId, JSONdata);
//             if (response?.status === 200) {
//                 if (response?.data?.status === 'success') {
//                     setloaderState(false);
//                     toast.success(response?.data?.message)
//                     closingCancel(true)
//                     setTimeout(async () => {
//                         await closingEditCanvas(true)
//                     }, 2000);
                    
//                     setTimeout(() => {
//                         setUpdateWarning(true);
//                     }, 3000);
//                 }
//                 else{
//                     setloaderState(false);
//                 }
//             }
//             else {
//                 setloaderState(false);
//                 console.log(response?.data?.message);
//             }
//         }
//         catch(error) {
//             setloaderState(false);
//             console.log(error, 'invalid')
//         }
//     }


//     return (
//         <div className="container-fluid">
//             {loaderState && (<DataLoader />)}
//             <div className="row">
//                 {UpdateWarning
//                     ?
//                     <>
//                         <form className='p-3' onSubmit={handleSubmit(UpdatePackageFunc)}>
//                             <div className="row mb-3">
//                                 <label htmlFor="planName" className="form-label ps-0 font14">Package Name</label>
//                                 <input id="planName" type="text" className={`form-control font14 ${errors.planName ? 'border-danger' : ''}`} placeholder="Enter Plan Name" {...register('planName', { required: 'Plan Name is required *', validate: value => { if (!/^[A-Z]/.test(value)) { return 'Plan Name must start with an uppercase letter'; } if (value.length < 4) { return 'Minimum Length is 4'; } if (!/^[a-zA-Z\s'-]+$/.test(value)) { return 'Invalid Characters in Plan Name'; } return true; } })} />
//                                 {errors.planName && <p className="font12 text-danger">{errors.planName.message}</p>}
//                             </div>
//                             <div className="row mb-3">
//                                 <label htmlFor="price" className="form-label ps-0 font14">Price</label>
//                                 <input id="price" type="text" className={`form-control font14 ${errors.price ? 'border-danger' : ''}`} placeholder="Enter Price Value" {...register('price', { required: 'Price is required *', validate: value => { if (!/^\d+(\.\d{1,2})?$/.test(value)) { return 'Please enter a valid Price Value'; } return true; } })} />
//                                 {errors.price && <p className="font12 text-danger">{errors.price.message}</p>}
//                             </div>
//                             <div className="row mb-3">
//                                 <label htmlFor="type" className="form-label ps-0 font14">Interval</label>
//                                 <select id="type" className={`form-select font14 ${errors.type ? 'border-danger' : ''}`} {...register('type', { required: 'Interval is required *' })}>
//                                     <option value="">Select Interval</option>
//                                     <option value="YEARS">Years</option>
//                                     <option value="MONTHS">Months</option>
//                                     <option value="WEEKS">Weeks</option>
//                                     <option value="DAYS">Days</option>
//                                 </select>
//                                 {errors.type && <p className="font12 text-danger">{errors.type.message}</p>}
//                             </div>
//                             <div className="row mb-3">
//                                 <label htmlFor="value" className="form-label ps-0 font14">Period</label>
//                                 <input id="value" type="text" className={`form-control font14 ${errors.value ? 'border-danger' : ''}`} placeholder="Enter Period Value" {...register('value', { required: 'Period is required *', validate: value => { if (!/^\d+(\.\d{1,2})?$/.test(value)) { return 'Please enter a valid Period Value'; } return true; } })} />
//                                 {errors.value && <p className="font12 text-danger">{errors.value.message}</p>}
//                             </div>
//                             <div className="row mb-3">
//                                 <label htmlFor="studentLimit" className="form-label ps-0 font14">Student Limit</label>
//                                 <input id="studentLimit" type="text" className={`form-control font14 ${errors.studentLimit ? 'border-danger' : ''}`} placeholder="Enter Student Limit" {...register('studentLimit', { required: 'Student Limit is required *', validate: value => { if (!/^\d+$/.test(value)) { return 'Please enter a valid Limit Value'; } return true; } })} />
//                                 {errors.studentLimit && <p className="font12 text-danger">{errors.studentLimit.message}</p>}
//                             </div>
//                             <div className="row mb-3">
//                                 <label htmlFor="status" className="form-label ps-0 font14">Status</label>
//                                 <select id="status" className={`form-select font14 ${errors.status ? 'border-danger' : ''}`} {...register('status', { required: 'Status is required *' })}>
//                                     <option value="">Select Status</option>
//                                     <option value={true}>Active</option>
//                                     <option value={false}>InActive</option>
//                                 </select>
//                                 {errors.status && <p className="font12 text-danger">{errors.status.message}</p>}
//                             </div>
//                             <p className='text-center p-3'>
//                                 <button className='btn addButtons2 text-white' type='submit'>Update Package</button>
//                                 <button className='btn cancelButtons ms-3' type='button' onClick={() => closingCancel(true)}>Cancel</button>
//                             </p>
//                         </form>
//                     </>
//                     :
//                     <>
//                         <div>
//                             <p className='modalLightBorder p-2 mb-0'>Package List</p>
//                             <div className="mt-3  ">
//                                 <div className='correvtSVG p-3 pt-4 rounded-circle'><img src="./images/Correct.svg" alt="" /></div>
//                                 <div className="updatetext border m-4 border-2  ms-5 greydiv rounded-3 text-center greyText p-5">
//                                     <p className='warningHeading'>Successful Updated</p>
//                                     <p className='greyText warningText pt-2'>Your Changes has been<br />Successfully Saved</p>
//                                 </div>
//                                 <button className='btn contbtn continueButtons text-white' type='button' >Success</button>
//                             </div>
//                         </div>
//                     </>

//                 }

//             </div>
//         </div>
//     )
// }

// export default UpdatePackage
