import React from 'react'
import { API_URL, doApiMethodTokenNotStringify, doApiMethodTokenPatch } from '../../services/servise';

export default function UserItem({item,doApi,index}) {
    
 

    const onActiveClick = async () => {
        let body;
        if (item.active) {
            body = { active: false };
        } else if (!item.active) {
            body = { active: true };
        }
        let url = API_URL + "/users/changeActive/" + item._id;
        try {

            let data = await doApiMethodTokenNotStringify(url, "PATCH", body)

            doApi()
        }
        catch (err) {
            alert("There problem, or you try to change superAdmin to user");
        }
    }

    return (
        <tr className="bg-white">
            <td className="border px-4 py-2">{index + 1}</td>
            <td className="border px-4 py-2">{item.fullName.firstName + " " + item.fullName.lastName}</td>
            <td className="border px-4 py-2">{item.email}</td>
            <td className="border px-4 py-2">{item.worker.jobs?item.worker.jobs.join(" "):"none"}</td>
            <td className="border px-4 py-2">{item.phone}</td>

            <td className="border px-4 py-2">
                <button className='border-2 rounded-lg p-1 hover:bg-amber-500' onClick={onActiveClick}>
                    {item.active.toString()}
                </button>
            </td>
        </tr>
    )
}
