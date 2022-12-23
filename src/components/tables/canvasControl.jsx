import React, { useRef } from 'react'
import { fabric } from "fabric";
import { API_URL, RESTAURNAT_ID, doApiMethodTokenPatch } from "../../services/servise";

import {
    angle, width, height, radius, defaultT, defaultL,
    strokeWidth, tableFill, tableStroke, tableShadow
} from "../../services/tablesService";

const CanvasControl = (props) => {

    const seatsRef = useRef(0)
    const tableNumsRef = useRef(0)
    let editor = props.editor;

    const onAddTabale = (tableID) => {

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
                // type: 'table',
                number: tableNumsRef.current.value,
                scrollX: 0,
                scrollY: 0,
                id: tableID,


            })
            editor.canvas.add(g);
            console.log(g.id)

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
            // type: 'table',
            id: tableID,
            number: tableNumsRef.current.value,

        })
        editor.canvas.add(g);
    };

    const addTable = async () => {
        if (seatsRef.current.value > 0 && tableNumsRef.current.value) {
            let { data } = await doApiAdd({ status: "empty", seats: seatsRef.current.value, tableNumber: tableNumsRef.current.value, location: { x: 1, y: 5 } })
            // console.log(data)
            await onAddCircle(data)


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

    const removeObjectFromCanvas = () => {
        editor.canvas.remove(editor.canvas.getActiveObject());
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
        <div className='flex justify-center items-center '>
            <div className='flex columns-auto' >
                <div>

                    <label >number of seats :</label>
                    <input className='border-2 rounded-md m-1' ref={seatsRef} type={"number"} />
                </div>
                <div>

                    <label >table number :</label>
                    <input className='border-2 rounded-md m-1' ref={tableNumsRef} type={"text"} />
                </div>
            </div>
            <div >
                <div className='flex items-center justify-center'>
                    <button className=' border-4 rounded-xl p-2' onClick={() => { addTable() }}>Add circle table</button>
                    <button className='border-4 rounded-xl p-2' onClick={() => { onAddTabale(11111) }}>Add table</button>
                    <button className='border-4 rounded-xl p-2 bg-red-500' onClick={removeObjectFromCanvas}>Remove</button>
                    <button className=' border-4 rounded-xl p-2' onClick={() => { onSave() }}>Save</button>

                </div>

            </div>
            <div>
                <label>Width (px)</label>
                <select name="cars" id="width" defaultValue={props.canvasWidth} onChange={e => { changeCanvasWidth(e.target.value) }} >
                    <option value="600">600</option>
                    <option value="500">500</option>
                    <option value="400">400</option>
                    <option value="300">300</option>
                    <option value="200">200</option>
                    <option value="100">100</option>

                </select >
            </div>
            <div>
                <label>Height (px)</label>
                <select name="cars" id="height" defaultValue={props.canvasHeight} onChange={e => { changeCanvasheight(e.target.value) }}>
                    <option value="600">600</option>
                    <option value="500">500</option>
                    <option value="400">400</option>
                    <option value="300">300</option>
                    <option value="200">200</option>
                    <option value="100">100</option>

                </select>
            </div>


        </div>
    )
}

export default CanvasControl