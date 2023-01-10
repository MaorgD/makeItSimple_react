import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { onClickHideAddItem } from '../../redux/featchers/toggleSlice'
import PopUPModel from '../ui/popUpModel'
import { useForm } from 'react-hook-form'
import { API_URL, doApiMethodTokenNotStringify, RESTAURNAT_ID } from '../../services/servise'
import { uploadImageAndAddToGallery } from '../../helpers/imageupload'
import { getAllCategories } from '../../helpers/getMenuCategories'
import InputName from '../ui/inputs/groupSpace/inputName'
import InputPrice from '../ui/inputs/groupSpace/inputPrice'
import InputCalories from '../ui/inputs/groupSpace/inputCalories'
import CheckBox from '../ui/inputs/groupSpace/checkBox'
import InputInfo from '../ui/inputs/groupSpace/inputInfo'
import InputImage from '../ui/inputs/groupSpace/inputImage'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}
const AddItemMenu = (props) => {
    const { restaurant } = useSelector((state) => state.restaurantSlice);
    const [newCategory, setNewCategory] = useState(false);
    const [newSubCategory, setNewSubCategory] = useState(false);
    const [subCategories, setsubCategories] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selecteCategory, setSelecteCategory] = useState();
    const [selecteSubCategory, setSelecteSubCategory] = useState();
    const selecteCategoryRef = useRef();
    const selecteSubCategoryRef = useRef();
    const dispatch = useDispatch()
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [imageSelected, setImageSelected] = useState(null);

    useEffect(() => {
        if (restaurant) {
            let arr = getAllCategories(restaurant)
            setCategories(arr)
            setSelecteCategory(arr[0])
        }
    }, [restaurant])

    useEffect(() => {
        getAllSubCategories(selecteCategory)
    }, [selecteCategory])

    const onClickSave = (_dataBody) => {

        if (!newCategory) {
            _dataBody.category = selecteCategory;
        }
        if (!newSubCategory) {
            _dataBody.subCategory = selecteSubCategory;
        }
        _dataBody.price = Number(_dataBody.price)
        _dataBody.calories = Number(_dataBody.calories)
        doApi(_dataBody)
        dispatch(onClickHideAddItem())
        console.log(_dataBody)
    }

    const doApi = async (_dataBody) => {
        const url = API_URL + '/menus/create/' + localStorage.getItem(RESTAURNAT_ID);
        try {
            _dataBody.img = imageSelected ? await uploadImageAndAddToGallery(imageSelected) : null;
            const data = await doApiMethodTokenNotStringify(url, "POST", _dataBody);
             if (data) {
                window.location.reload(false);
            } else {
                alert(data)
            }
        }
        catch (err) {
            alert(err.msg);
        }
    }

    const getAllSubCategories = async (_category) => {
        if (restaurant) {
            let tempsArr = []
            restaurant.menu.map((item) => {
                if (item.category == _category) {
                    if (!tempsArr.includes(item.subCategory)) {
                        tempsArr.push(item.subCategory)
                    }
                }
            })
            setsubCategories(tempsArr)
            setSelecteSubCategory(tempsArr[0])
        }
    }
    const closeItem = () => {
        dispatch(onClickHideAddItem())

    }
    return (
        <PopUPModel>
            <>
                <div>
                    <button onClick={closeItem}>X</button>
                    <div className="mt-5 md:col-span-2 md:mt-0 ">
                        <form onSubmit={handleSubmit(onClickSave)} action="#" method="POST">
                            <div className="shadow sm:overflow-hidden sm:rounded-md  ">
                                <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                                    <div className='grid grid-cols-4 gap-4'>
                                        <InputName label={"Name"} register={register} errors={errors} />
                                        <div className="col-span-6 sm:col-span-2">
                                       
                                        
                                        <label className="block text-sm font-medium text-gray-700">put</label>
                                            <select
                                                {...register('preparationArea', { required: { value: false } })}
                                                id="preparationArea"
                                                name="preparationArea"
                                                className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                                                {restaurant?.kitchenZone.map((item) => (
                                                    <option key={item} value={item}>{item}</option>
                                                    ))}
                                            </select>
                                            </div>
                                        <InputPrice register={register} errors={errors} />
                                        <InputCalories register={register} errors={errors} />
                                        <CheckBox label={"New Category"} isNew={newCategory} setNew={setNewCategory} register={register} errors={errors} />
                                        <CheckBox label={"New SubCategory"} isNew={newSubCategory} setNew={setNewSubCategory} register={register} errors={errors} />

                                        {!newCategory ?
                                            <div className="col-span-6 sm:col-span-2">
                                                <label className="block text-sm font-medium text-gray-700">Category</label>
                                                <select
                                                    id="category"
                                                    name="category"
                                                    ref={selecteCategoryRef}
                                                    onChange={() => {
                                                        setSelecteCategory(selecteCategoryRef.current.value)
                                                    }}
                                                    className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                                                    {categories.map((category) => (
                                                        <option key={category} value={category}>{category}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            :
                                            <div className="col-span-6 sm:col-span-2">
                                                <label className="block text-sm font-medium text-gray-700">Category</label>
                                                <input
                                                    {...register('category', { required: { value: true, message: 'Category is requried' }, minLength: { value: 2, message: "Category must be at least 2 characters" } })}
                                                    type="text"
                                                    name="category"
                                                    id="category"
                                                    className={classNames(errors.category ? "relative block w-full appearance-none rounded-t-md  border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                                        :
                                                        "relative block w-full appearance-none  rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm")}
                                                />
                                                {errors.category && errors.category.type === 'minLength' && <div className='text-white font-bold text-sm bg-red-800 text-center rounded-b-md  border-gray-300  py-1'>{errors?.category?.message}</div>}
                                                {errors.category && errors.category.type === 'required' && <div className='text-white font-bold text-sm bg-red-800 text-center rounded-b-md  border-gray-300  py-1'>{errors?.category?.message}</div>}

                                            </div>}

                                        {!newSubCategory ? <div className="col-span-6 sm:col-span-2">
                                            <label className="block text-sm font-medium text-gray-700">SubCategory</label>
                                            <select onChange={() => {
                                                setSelecteSubCategory(selecteSubCategoryRef.current.value)
                                            }}
                                                {...register('subCategory', { required: { value: false } })}
                                                id="subCategory"
                                                name="subCategory"
                                                ref={selecteSubCategoryRef}
                                                className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                                                {subCategories.map((subCategory) => (
                                                    <option key={subCategory} value={subCategory}>{subCategory}</option>
                                                ))}
                                            </select>
                                        </div>
                                            :
                                            <div className="col-span-6 sm:col-span-2">
                                                <label className="block text-sm font-medium text-gray-700">SubCategory</label>
                                                <input {...register('subCategory', { required: { value: false, message: 'SubCategory is requried' }, minLength: { value: 2, message: "SubCategory must be at least 2 characters" } })}
                                                    type="text"
                                                    name="subCategory"
                                                    id="subCategory"

                                                    className={classNames(errors.subCategory ? "relative block w-full appearance-none rounded-t-md  border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                                        :
                                                        "relative block w-full appearance-none  rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm")}
                                                />
                                                {errors.subCategory && errors.subCategory.type === 'minLength' && <div className='text-white font-bold text-sm bg-red-800 text-center rounded-b-md  border-gray-300  py-1'>{errors?.subCategory?.message}</div>}
                                                {errors.subCategory && errors.subCategory.type === 'required' && <div className='text-white font-bold text-sm bg-red-800 text-center rounded-b-md  border-gray-300  py-1'>{errors?.subCategory?.message}</div>}

                                            </div>}

                                            
                                            

                                        <InputInfo register={register} errors={errors} />
                                        <InputImage setImageSelected={setImageSelected} />
                                    </div>
                                </div>
                                <div className="px-2 py-3  sm:px-6 flex justify-center">
                                    <button type='submit' className="w-1/6 rounded-full border border-transparent bg-indigo-400 py-2 px-4 text-lg font-medium text-white hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Add</button>
                                </div>

                            </div>
                        </form>
                    </div>
                </div>
            </>
        </PopUPModel>
    )
}

export default AddItemMenu