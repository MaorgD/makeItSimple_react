import React, { useState,useEffect } from 'react'
import { Link } from 'react-router-dom'
import { API_URL, doApiTukenGet ,RESTAURNAT_ID } from '../../services/servise';
import UserItem from './workerItem';
// import { useSelector, useDispatch } from 'react-redux';

const Workers = () => {
  // const { restaurant } = useSelector((state) => state.restaurantSlice);

  const [workers, setWorkrs] = useState([]);

useEffect(() => {
  doApi();
},[])




  const doApi = async () => {
    let url = API_URL + "/restaurants/workersArr/"+localStorage.getItem(RESTAURNAT_ID);
    try {
      let {data} = await doApiTukenGet(url);
      // console.log(data);
      setWorkrs(data);
    }
    catch (err) {
      console.log(err);
      alert("there problem ,try again later")
    }

  };
  
  return (
    <div className='columns justify-center min-h-full py-12 px-4 sm:px-6 lg:px-8'>
      <div className='flex justify-center'>

        <h1 className='bg-indigo-400 rounded-full p-2 mb-3'>List of users in systems</h1>
      </div>
      <div className='flex justify-center'>
      <Link className='bg-indigo-400 rounded-full p-2 cursor-pointer mb-3 my-3' to={"/manager/AddWorker"} >add worker </Link>
      </div>
      <div>
        <table className="table-auto items-center mx-auto">
          <thead>
            <tr className="bg-gray-400">
              <th className="px-4 py-2">#</th>
              <th className="px-4 py-2">FullName</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">jobs</th>
              <th className="px-4 py-2">phone</th>
              
              <th className="px-4 py-2">active</th>
            </tr>
          </thead>
          <tbody>
            {workers.map((worker, i) => {
              return (
                <UserItem key={worker._id} doApi={doApi} index={i} item={worker} />
              )
            })}
          </tbody>
        </table>
      </div>
      
    </div>
  )
}

export default Workers