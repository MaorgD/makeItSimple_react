import React, { useRef } from 'react'
import { fabric } from "fabric";
import { API_URL, RESTAURNAT_ID, doApiMethodToken, doApiMethodTokenPatch } from "../../services/servise";

import {
    angle, width, height, radius, defaultT, defaultL,
    strokeWidth, tableFill, tableStroke, tableShadow
} from "../../services/tablesService";

const CanvasControl = (props) => {

    const seatsRef = useRef(0)
    const tableNumsRef = useRef(0)
    let editor = props.editor;

    const onAddRectangle = async (tableID) => {

        // בקשת API להוספת שולחן 
        // לשלוח שי פרמטרים של מספק שולחן ומספר מושבים
        if (seatsRef.current.value > 0 && tableNumsRef.current.value) {

            let rect = new fabric.Rect({
                width: width,
                height: height,
                fill: tableFill,
                originX: 'center',
                originY: 'center',
                snapAngle: angle,
                selectable: true,
                stroke: tableStroke,
                strokeWidth: strokeWidth,
                shadow: tableShadow,
                centeredRotation: true,

            });

            const t = new fabric.IText(tableNumsRef.current.value, {
                fontFamily: 'Calibri',
                fontSize: 14,
                fill: '#fff',
                textAlign: 'center',
                originX: 'center',
                originY: 'center'
            })
            const g = new fabric.Group([rect, t], {
                left: defaultL,
                top: defaultT,
                centeredRotation: true,
                snapAngle: angle,
                selectable: true,
                number: tableNumsRef.current.value,
                scrollX: 0,
                scrollY: 0,
                id: tableID,


            })
            editor.canvas.add(g);
            // console.log(g.id)

        }
        console.log("table number", tableNumsRef.current.value)
        console.log("seats number", seatsRef.current.value)

    };

    const onAddCircle = async (tableID) => {
        console.log(tableID)
        const circle = new fabric.Circle({
            radius: radius,
            fill: tableFill,
            stroke: tableStroke,
            strokeWidth: strokeWidth,
            selectable: true,
            shadow: tableShadow,
            originX: 'center',
            originY: 'center',
            centeredRotation: true,

        })
        const t = new fabric.IText(tableNumsRef.current.value, {
            fontFamily: 'Calibri',
            fontSize: 14,
            fill: '#fff',
            textAlign: 'center',
            originX: 'center',
            originY: 'center'
        })
        const g = new fabric.Group([circle, t], {
            left: defaultL,
            top: defaultT,
            centeredRotation: true,
            snapAngle: angle,
            selectable: true,
            id: tableID,
            number: tableNumsRef.current.value,

        })
        editor.canvas.add(g);
    };

    const addTable = async (tableType) => {
        if (seatsRef.current.value > 0 && tableNumsRef.current.value) {
            let { data } = await doApiAdd({ status: "empty", seats: seatsRef.current.value, tableNumber: tableNumsRef.current.value, location: { x: 1, y: 5 } })
            console.log(data)

            if (data) {
                if (tableType == "circle")
                    await onAddCircle(data)
                if (tableType == "rectangle")
                    await onAddRectangle(data)


                await onSave()
            }

        }

    };

    const doApiAdd = async (_dataBody) => {
        const url = API_URL + '/tables/create/' + localStorage.getItem(RESTAURNAT_ID);
        try {

            const data = await doApiMethodTokenPatch(url, "PATCH", _dataBody);

            if (data) {
                return data
            } else {
                alert(data)
            }
        }
        catch (err) {
            console.log(err);
        }
    };
    const doApiRemove = async (_id) => {
        const url = `${API_URL}/tables/remove/${localStorage.getItem(RESTAURNAT_ID)}/${_id}`;
        try {

            const data = await doApiMethodToken(url, "DELETE");

            if (data) {
                return data
            } else {
                alert(data)
            }
        }
        catch (err) {
            console.log(err);
        }
    };

    const removeObjectFromCanvas = () => {
        console.log(editor.canvas.getActiveObject())
        doApiRemove(editor.canvas.getActiveObject().id)
        editor.canvas.remove(editor.canvas.getActiveObject());
        onSave()
    };


    const changeCanvasWidth = (width) => {
        if (editor) {
            editor.canvas.setWidth(width)
            props.setCanvasWidth(width)
            // fabricCanvas.renderAll.bind(fabricCanvas);
        }
    }
    const changeCanvasheight = (height) => {
        if (editor) {
            editor.canvas.setHeight(height)
            props.setCanvasHeight(height)
            // fabricCanvas.renderAll.bind(fabricCanvas);
        }
    }
    const onSave = () => {

        props.onDownloadJSON()

    }


    return (
        <div className='border-4 p-2 rounded-md  shadow-2xl bg-blue-100 '>
            <div className='  columns-1  space-y-3  ' >
                <div className=' flex justify-evenly  w-full '>
                    <button className='border-4 rounded-xl p-2 bg-red-500' onClick={removeObjectFromCanvas}>Remove</button>
                    <button className=' border-4 rounded-xl p-2' onClick={() => { onSave() }}>Save</button>

                </div>
                <div className='w-full flex justify-center items-center'>

                    <label >number of seats :</label>
                    <input className='border-2 rounded-md m-1 ' ref={seatsRef} type={"number"} />
                </div>
                <div className='w-full flex justify-center items-center'>

                    <label >table number :</label>
                    <input className='border-2 rounded-md m-1' ref={tableNumsRef} type={"text"} />
                </div>
                <div className='flex justify-evenly '>

                    <button className=' border-4 rounded-xl p-2 bg-lime-300' onClick={() => { addTable("circle") }}>Add circle table</button>
                    <button className='border-4 rounded-xl p-2 bg-lime-300' onClick={() => { addTable("rectangle") }}>Add rectangle table</button>
                </div>
            </div>

            <div className=' flex justify-evenly '>
                <div className='flex-col'>
                    <div>

                        <label>Width (px)</label>
                    </div>
                    <div>

                        <select id="width" defaultValue={props.canvasWidth} onChange={e => { changeCanvasWidth(e.target.value) }} >
                            <option value="600">600</option>
                            <option value="500">500</option>
                            <option value="400">400</option>
                            <option value="300">300</option>
                            <option value="200">200</option>
                            <option value="100">100</option>

                        </select >
                    </div>
                </div>

                <div className='flex-col'>
                    <div>

                        <label>Height (px)</label>
                    </div>
                    <div>

                        <select id="height" defaultValue={props.canvasHeight} onChange={e => { changeCanvasheight(e.target.value) }}>
                            <option value="600">600</option>
                            <option value="500">500</option>
                            <option value="400">400</option>
                            <option value="300">300</option>
                            <option value="200">200</option>
                            <option value="100">100</option>

                        </select>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default CanvasControl