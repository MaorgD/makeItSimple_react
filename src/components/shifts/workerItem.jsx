import React from 'react'
import { API_URL, doApiMethodTokenNotStringify, doApiMethodTokenPatch } from '../../services/servise';

export default function UserItem(props) {
    let item = props.item;
    let doApi = props.doApi;
    console.log(item);
    // משנה תפקיד של משתמש
    // const onRoleClick = async () => {
    //   let bodyData;
    //   if (item.role == "user") {
    //     bodyData = { role: "admin" }
    //   }
    //   else if (item.role == "admin") {
    //     bodyData = { role: "user" }
    //   }
    //   let url = API_URL + "/users/changeRole/" + item._id;
    //   try {

    //       let resp = await doApiMethodTokenPatch(url, "PATCH", bodyData)
    //       console.log(resp.data)
    //       if (resp.data) {

    //         props.doApi()
    //       }
    //   }
    //   catch (err) {
    //     console.log(err.response);
    //     alert("There problem, or you try to change superAdmin to user");
    //   }
    // }
    const onActiveClick = async () => {
        let body;
        if (item.active) {
            body = { active: false };
        } else if (!item.active) {
            body = { active: true };
        }
        let url =  API_URL+"/users/changeActive/" + item._id;
        try {

            let data = await doApiMethodTokenNotStringify(url, "PATCH", body)
            console.log(data)

            doApi()

        }
        catch (err) {
            console.log(err);
            // alert("There problem, or you try to change superAdmin to user");
        }
    }

    return (
        <tr className="bg-white">
            <td className="border px-4 py-2">{props.index + 1}</td>
            <td className="border px-4 py-2">{item.fullName.firstName + " " + item.fullName.lastName}</td>
            <td className="border px-4 py-2">{item.email}</td>
            <td className="border px-4 py-2">{item.worker.jobs}</td>
            <td className="border px-4 py-2">{item.phone}</td>

            <td className="border px-4 py-2">
                <button className='border-2 rounded-lg p-1 hover:bg-amber-500' onClick={onActiveClick}>
                    {item.active.toString()}
                </button>
            </td>
        </tr>
    )
}
