import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { onClickHideAddItem } from '../../redux/featchers/toggleSlice'
import PopUPModel from '../ui/popUpModel'
import { useForm } from 'react-hook-form'
import { API_URL, doApiMethodTokenNotStringify, RESTAURNAT_ID } from '../../services/servise'
import { useNavigate, useParams } from 'react-router-dom'
import { uploadImage } from '../../helpers/imageupload'
import { getAllCategories } from '../../helpers/getMenuCategories'
import InputName from '../../helpers/inputName'

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
    }

    const doApi = async (_dataBody) => {
        const url = API_URL + '/menus/create/' + localStorage.getItem(RESTAURNAT_ID);
        try {
            _dataBody.img = imageSelected? await uploadImage(imageSelected) : null;
            const data = await doApiMethodTokenNotStringify(url, "POST", _dataBody);
            console.log(data.err);
            if (data) {
                window.location.reload(false);
            } else {
                alert(data)
            }
        }
        catch (err) {
            alert(err.response.data.msg);
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
                                        <div className="col-span-6 sm:col-span-3">
                                            <label className="block text-sm font-medium text-gray-700"> Name</label>
                                            <input  {...register('name', { required: { value: true, message: 'Name is requried' }, minLength: { value: 2, message: "Name must be at least 2 characters" } })}
                                                type="text"
                                                name="name"
                                                id="name"
                                                className={classNames(errors.name ? "relative block w-full appearance-none rounded-t-md  border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                                    :
                                                    "relative block w-full appearance-none  rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm")}
                                            />
                                            {errors.name && errors.name.type === 'minLength' && <div className='text-white font-bold text-sm bg-red-800 text-center rounded-b-md  border-gray-300  py-1'>{errors?.name?.message}</div>}
                                            {errors.name && errors.name.type === 'required' && <div className='text-white font-bold text-sm bg-red-800 text-center rounded-b-md  border-gray-300  py-1'>{errors?.name?.message}</div>}
                                        </div>
                                        {/* <InputName /> */}

                                        <div className="col-span-6 sm:col-span-2">
                                            <label className="block text-sm font-medium text-gray-700">Price</label>
                                            <input  {...register('price', { required: { value: true, message: 'Price is requried' } })}
                                                type="number"
                                                name="price"
                                                id="price"

                                                className={classNames(errors.name ? "relative block w-full appearance-none rounded-t-md  border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                                    :
                                                    "relative block w-full appearance-none  rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm")}
                                            />

                                            {errors.price && errors.price.type === 'required' && <div className='text-white font-bold text-sm bg-red-800 text-center rounded-b-md  border-gray-300  py-1'>{errors?.price?.message}</div>}
                                        </div>

                                        <div className="col-span-6 sm:col-span-2">
                                            <label className="block text-sm font-medium text-gray-700">Calories</label>
                                            <input {...register('calories', { required: { value: false } })}
                                                type="number"
                                                name="calories"
                                                id="calories"
                                                className="relative block w-full appearance-none  rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" />

                                        </div>

                                        <div className="flex items-center col-span-6 sm:col-span-2">
                                            <input onClick={() => {
                                                if (newCategory) { setNewCategory(false) }
                                                else { setNewCategory(true) }
                                            }
                                            } id="checked-checkbox" type="checkbox" value=""
                                                className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500
                                              dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                            <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"> New Category</label>
                                        </div>

                                        <div className="flex items-center col-span-6 sm:col-span-2">
                                            <input onClick={() => {
                                                if (newSubCategory) { setNewSubCategory(false) }
                                                else { setNewSubCategory(true) }
                                            }
                                            }
                                                id="checked-checkbox" type="checkbox" value=""
                                                className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500
                                              dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                            <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"> New SubCategory</label>
                                        </div>

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
                                                <input {...register('subCategory', { required: { value: true, message: 'SubCategory is requried' }, minLength: { value: 2, message: "SubCategory must be at least 2 characters" } })}
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

                                        <div className="col-span-6 sm:col-span-4">
                                            <label className="block text-sm font-medium text-gray-700">Info</label>
                                            <div className="mt-1">
                                                <textarea    {...register('info', { required: { value: false } })}
                                                    id="info"
                                                    name="info"
                                                    height="30"
                                                    placeholder='Write details about the dish here.'

                                                    rows="3"
                                                    className=" resizeBlock mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"></textarea>
                                            </div>

                                        </div>

                                        <div className="col-span-6 sm:col-span-4" >
                                            <label className="block text-sm font-medium text-gray-700">Image</label>
                                            <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
                                                <div className="space-y-1 text-center">
                                                    <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                                                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" />
                                                    </svg>
                                                    <div className="flex text-sm text-gray-600">
                                                        <label className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500">
                                                            <input
                                                                type="file"
                                                                onChange={(e) => {
                                                                    setImageSelected(e.target.files[0]);
                                                                }}
                                                            />
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="px-4 py-3  sm:px-6 flex justify-center">
                                    <button type='submit' className="w-1/3 rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-lg font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Add</button>
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