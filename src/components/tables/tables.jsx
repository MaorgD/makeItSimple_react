import React, { useState, useEffect } from "react";
import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react";
import CanvasControl from "./canvasControl";
import { addLineX, addLineY, checkBoudningBox, checkBoundingOnScale, delLines, snapToGrid } from "../../services/tablesService";
import { API_URL, RESTAURNAT_ID, doApiTukenGet, doApiMethodTokenNotStringify, doApiMethodTokenPatch } from "../../services/servise";
import { useSelector, useDispatch } from 'react-redux';
import { onClickShowTableInfo } from '../../redux/featchers/toggleSlice'

export default function Tables() {
  const { user } = useSelector((state) => state.userSlice);
  const dispatch = useDispatch();

  const [editMode, setEditMode] = useState(false)
  const [firstIn, setFirstIn] = useState(true)
  const [canvasWidth, setCanvasWidth] = useState(600)
  const [canvasHeight, setCanvasHeight] = useState(600)
  const { editor, onReady, selectedObjects } = useFabricJSEditor();
  const { restaurant } = useSelector((state) => state.restaurantSlice);


  useEffect(() => {
    if (editor) {
      initcanvas()
    }

  }, [editor, restaurant?.tablesCanvas])
  useEffect(() => {
    if (editor && restaurant && firstIn) {
      if (restaurant.tablesCanvas.canvas) {
        onUploadJson(restaurant.tablesCanvas)
        setFirstIn(false)
      }

    }

  }, [onReady])

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
      o.borderColor = '#38A62E'
      o.borderScaleFactor = 2.5
    });
    editor.canvas.selection = false;
    editor.canvas.hoverCursor = 'pointer';
    editor.canvas.discardActiveObject();
    setEditMode(false);
  };

  const managerMode = () => {
    editor.canvas.getObjects().map(o => {
      o.hasControls = true
      o.lockMovementX = false
      o.lockMovementY = false
      o.borderColor = 'rgba(102, 153, 255, 0.75)'
      o.borderScaleFactor = 1
    })
    editor.canvas.selection = true
    editor.canvas.hoverCursor = 'move'
    editor.canvas.discardActiveObject()
    setEditMode(true)
  };



  const doApiUploadJson = async () => {
    // צריך לעשות GET
    // לקבל אורך ורוחב JSON

    try {
      const url = API_URL + "/restaurants/getCanvas/" + localStorage.getItem(RESTAURNAT_ID)
      const { data } = await doApiTukenGet(url)
      if (data.canvas) {
        onUploadJson(data)
      }

    } catch (err) {

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
    const json = JSON.stringify(mycanvas.toObject(['id'], true));
    try {
      const url = API_URL + "/restaurants/setCanvas/" + localStorage.getItem(RESTAURNAT_ID)

      const data = await doApiMethodTokenPatch(url, "PATCH", {
        canvas: json,
        height: canvasHeight.toString(),
        width: canvasWidth.toString()

      })


    } catch (err) {

    }
    initcanvas();

  }
  const onClickNewOrder = async () => {
    if (selectedObjects[0]) {
      let table = restaurant.tables.filter((table) => (table._id == selectedObjects[0].id))
      if (table[0]?.isCatched == false) {

        let orderId = await doApiNewOrder()
        await doApiAddOrderToTable(selectedObjects[0].id, orderId._id)

        if (orderId) {
          console.log(orderId)
        }

      }
    }

  };

  const doApiNewOrder = async () => {
    try {
      const url = API_URL + '/orders/addByWorker/' + localStorage.getItem(RESTAURNAT_ID);
      const { data } = await doApiMethodTokenNotStringify(url, "POST", { status: "ready to order" });
      if (data);
      return data
    }
    catch (err) {

    }
  };
  const doApiAddOrderToTable = async (tableId, orderId) => {
    try {
      const url = `${API_URL}/tables/editOrderID/${tableId}/${orderId}`;
      const { data } = await doApiMethodTokenNotStringify(url, "PATCH", { isCatched: true, status: "full" });

    }
    catch (err) {
      // setIsSubmitted(false);
      console.log(err);
    }
  };

  const onClickOpenOrder = async () => {
    if (selectedObjects[0]) {
      // let table = restaurant.tables.filter((table) => (table._id == selectedObjects[0].id))
      try {
        let url = API_URL + "/tables/" + selectedObjects[0].id
        const { data } = await doApiTukenGet(url);
        // console.log(data);
        if (data)
          dispatch(onClickShowTableInfo({ TableItem: data }))
      }
      catch (err) {
      }
    }
  };

  return (


    <div className="container mx-auto">
      <div className=" flex justify-center">
        <h1>FabricJS React Sample</h1>

      </div>



      <div className="flex flex-col  items-center ">
        <div>
          {user?.data?.worker?.jobs.includes("manager") &&
            <div className="  flex-col justify-center  items-center p-2 ">
              <div className=" mx-2">
                {editMode ?
                  <button onClick={() => {
                    onDownloadJSON();
                    customerMode()
                    window.location.reload(false);

                  }} className='  border-4 rounded-xl p-2' >Set</button>
                  :
                  <button onClick={() => { managerMode() }} className=' border-4 rounded-xl p-2' >Edit</button>}
              </div>

              {editMode && <CanvasControl onDownloadJSON={onDownloadJSON} editor={editor} setCanvasHeight={setCanvasHeight} setCanvasWidth={setCanvasWidth} canvasHeight={canvasHeight} canvasWidth={canvasWidth} />
              }

            </div>}
          {!editMode &&
            <div className="border-4 my-2 p-2 ">
              <button className="border-2 re" onClick={() => { onClickNewOrder() }}>
                Open new order
              </button>
              <button className="border-2 re" onClick={() => { onClickOpenOrder() }}>
                Open order
              </button>
            </div>}
        </div>
        <div> <FabricJSCanvas onReady={onReady} /></div>
      </div>


    </div>
  );
}
