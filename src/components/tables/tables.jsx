import React, { useState, useEffect } from "react";
import { fabric } from "fabric";
import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react";
import CanvasControl from "./canvasControl";
// import myjson from './canvas(2).json'
import { addLineX, addLineY, checkBoudningBox, checkBoundingOnScale, delLines, snapToGrid } from "../../services/tablesService";
import { API_URL, RESTAURNAT_ID, doApiTukenGet, doApiMethodTokenNotStringify, doApiMethodToken, doApiMethodTokenPatch } from "../../services/servise";
import { useSelector, useDispatch } from 'react-redux';

export default function Tables() {

  const [editMode, setEditMode] = useState(false)
  const [firstIn, setFirstIn] = useState(true)
  const [canvasWidth, setCanvasWidth] = useState(600)
  const [canvasHeight, setCanvasHeight] = useState(600)
  const { editor, onReady, selectedObjects } = useFabricJSEditor();
  const { restaurant } = useSelector((state) => state.restaurantSlice);


  useEffect(() => {
    if (editor) {
      // onUploadJson(restaurant.tablesCanvas)
      
      initcanvas()
    }

  }, [editor,restaurant?.tablesCanvas])
  useEffect(() => {
    console.log(onReady)
    if (editor&&restaurant&&firstIn) {
      if(restaurant.tablesCanvas){

        onUploadJson(restaurant.tablesCanvas)
        setFirstIn(false)
      }

    }

  }, [onReady])

  console.log(selectedObjects)
  const initcanvas = () => {
    editor.canvas.setBackgroundColor("lightgrey")

    editor.canvas.setHeight(canvasHeight)
    editor.canvas.setWidth(canvasWidth)
    delLines(editor)
    addLineX(editor);
    addLineY(editor);
    editor.canvas.on('object:moving', function (e) {
      checkBoudningBox(editor, e)
      snapToGrid(e.target)
    })

    editor.canvas.on('object:rotating', function (e) {
      checkBoudningBox(editor, e)
      snapToGrid(e.target)
    })

    editor.canvas.on('object:scaling', function (e) {
      checkBoundingOnScale(e)
      checkBoudningBox(editor, e)
      snapToGrid(e.target)
    })
  }


  const customerMode = () => {
    editor.canvas.getObjects().map(o => {
      o.hasControls = false
      o.lockMovementX = true
      o.lockMovementY = true
      // if (o.type === 'chair' || o.type === 'bar' || o.type === 'wall') {
      //   o.selectable = false
      // }
      o.borderColor = '#38A62E'
      o.borderScaleFactor = 2.5
    })
    editor.canvas.selection = false
    editor.canvas.hoverCursor = 'pointer'
    editor.canvas.discardActiveObject()
    setEditMode(false)
  }
  const managerMode = () => {
    editor.canvas.getObjects().map(o => {
      o.hasControls = true
      o.lockMovementX = false
      o.lockMovementY = false
      // if (o.type === 'chair' || o.type === 'bar' || o.type === 'wall') {
      //   o.selectable = true
      // }
      o.borderColor = 'rgba(102, 153, 255, 0.75)'
      o.borderScaleFactor = 1
    })
    editor.canvas.selection = true
    editor.canvas.hoverCursor = 'move'
    editor.canvas.discardActiveObject()
    setEditMode(true)
  }
  const onSave = () => {

    onDownloadJSON()

  }
  const onUpload = () => {

    doApiUploadJson()

  }

  const doApiUploadJson = async () => {
    // צריך לעשות GET
    // לקבל אורך ורוחב JSON
    console.log("onUploadJson")

    try {
      const url = API_URL + "/restaurants/getCanvas/" + localStorage.getItem(RESTAURNAT_ID)
      const { data } = await doApiTukenGet(url)
      console.log(data)

      if (data.canvas) {
        onUploadJson(data)
      }

    } catch (err) {
      console.log(err)
    }


  }
  const onUploadJson = (_data) => {
    const v = JSON.parse(_data.canvas)
    editor?.canvas.loadFromJSON(v, () => {
    });
    editor?.canvas._objects.map(o => { o.snapAngle = 45 })
    setCanvasWidth(_data.width)
    setCanvasHeight(_data.height)

    initcanvas();
    if (editMode) managerMode()
    else customerMode()
  }
  const onDownloadJSON = async () => {
    // צריך לעשות SET
    // לשלוח אורך ורוחב JSON

    delLines(editor);
    const mycanvas = editor.canvas;
    // Generate a JSON string representing the canvas contents
    const json = JSON.stringify(mycanvas);
    try {
      const url = API_URL + "/restaurants/setCanvas/" + localStorage.getItem(RESTAURNAT_ID)

      // console.log(b)
      const data = await doApiMethodTokenPatch(url, "PATCH", {
        canvas: json,
        height: canvasHeight.toString(),
        width: canvasWidth.toString()

      })
      console.log(data)


    } catch (err) {
      console.log(err)

    }
    initcanvas();

  }

  return (
    <div className="">
      <h1>FabricJS React Sample</h1>
      <div className="  flex justify-center ">
        <div>

          <button className=' border-4 rounded-xl p-2' onClick={() => { onSave() }}>Save</button>
          {/* <button className='controlBtn' onClick={() => { onDownloadJSON() }}>DownloadJSON</button> */}
          {/* <button className=' border-4 rounded-xl p-2' onClick={() => { onUpload() }}>UploadJson</button> */}


          {editMode ? <button onClick={() => { customerMode() }} className=' border-4 rounded-xl p-2' >set</button>
            :
            <button onClick={() => { managerMode() }} className=' border-4 rounded-xl p-2' >edit</button>}
        </div>
        {editMode && <CanvasControl editor={editor} setCanvasHeight={setCanvasHeight} setCanvasWidth={setCanvasWidth} onReady={onReady} />}
      </div>



      <div className="flex justify-center">

        <FabricJSCanvas onReady={onReady} />
      </div>
    </div>
  );
}
