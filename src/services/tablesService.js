import { fabric } from "fabric";

export const grid = 20;
export const lineStroke = '#ebebeb'
export const angle = 45;
export const defaultT = 50;
export const defaultL = 50;
export const width = 200;
export const height = 100;
export const strokeWidth = 2;
export const radius = 30;
export const tableFill = 'rgba(150, 111, 51, 0.7)'
export const tableStroke = '#694d23'
export const tableShadow = 'rgba(0, 0, 0, 0.4) 3px 3px 7px'
export const scaleX = 2
export const scaleY = 2


export const addLineX = (editor) => {
    for (let i = 0; i < (editor.canvas.height / grid); i++) {
      const lineX = new fabric.Line([0, i * grid, editor.canvas.width, i * grid], {
        stroke: lineStroke,
        selectable: false,
        type: 'line'
      })
      editor.canvas.add(lineX)
      sendLinesToBack(editor)
    }
  }
  export const addLineY = (editor) => {
    for (let i = 0; i < (editor.canvas.width / grid); i++) {

      const lineY = new fabric.Line([i * grid, 0, i * grid, editor.canvas.height], {
        stroke: lineStroke,
        selectable: false,
        type: 'line'
      })
      editor.canvas.add(lineY)
      sendLinesToBack(editor)
    }
  }

   const sendLinesToBack = (editor) => {
    editor.canvas.getObjects().map(o => {
      if (o.type === 'line') {
        editor.canvas.sendToBack(o)
      }
    })
  }
  export const delLines = (editor) => {
    editor.canvas.getObjects().map(o => {
      if (o.type === 'line') {
        editor.canvas.remove(o)
      }
    })
  }
  export const snapToGrid = (target) => {
    target.set({
      left: Math.round(target.left / (grid / 2)) * grid / 2,
      top: Math.round(target.top / (grid / 2)) * grid / 2
    })
  }

 
  export const checkBoundingOnScale = (e) => {
    //יש בעיה במצב ספציפי
    const obj = e.target
    if (!obj) {
      return
    }
    if (e.target.scaleX > scaleX) {
      e.target.scaleX = scaleX
    }
    if (e.target.scaleY > scaleY) {
      e.target.scaleY = scaleY
    }
  }


export const checkBoudningBox = (editor,e) => {
    const obj = e.target

    if (!obj) {
      return
    }
    obj.setCoords()

    const objBoundingBox = obj.getBoundingRect()
    if (obj.angle == 0) {
      if (objBoundingBox.top < 0) {
        console.log("up")
        obj.set('top', 0)
        obj.setCoords()
      }
      if (objBoundingBox.left > editor.canvas.width - objBoundingBox.width) {
        console.log("left")
        obj.set('left', editor.canvas.width - objBoundingBox.width)
        obj.setCoords()
      }
      if (objBoundingBox.top > editor.canvas.height - objBoundingBox.height) {
        console.log("down")
        obj.set('top', editor.canvas.height - objBoundingBox.height)
        obj.setCoords()
      }
      if (objBoundingBox.left < 0) {
        console.log("right")
        obj.set('left', 0)
        obj.setCoords()
      }
    } else if (obj.angle == 45) {
      if (objBoundingBox.top < 0) {
        console.log("up")
        obj.set('top', 0)
        obj.setCoords()
      }
      if (obj.aCoords.bl.x < 0) {
        console.log("left")
        obj.set('left', obj.aCoords.tl.x - obj.aCoords.bl.x)
        obj.setCoords()
      }
      if (obj.aCoords.tr.x > editor.canvas.width) {
        console.log("right")
        obj.set('left', editor.canvas.width - (obj.aCoords.tr.x - obj.aCoords.tl.x))
        obj.setCoords()
      }
      if (obj.aCoords.br.y > editor.canvas.height) {
        console.log("down")
        obj.set('top', editor.canvas.height - (obj.aCoords.br.y - obj.aCoords.tl.y))
        obj.setCoords()
      }
    }
    else if (obj.angle == 90) {
      if (objBoundingBox.top < 0) {
        console.log("up")
        obj.set('top', 0)
        obj.setCoords()
      }
      if (obj.aCoords.bl.x < 0) {
        console.log("left")
        obj.set('left', objBoundingBox.width)
        obj.setCoords()
      }
      if (obj.aCoords.tr.x > editor.canvas.width) {
        console.log("right")
        obj.set('left', editor.canvas.width - 5)
        obj.setCoords()
      }
      if (obj.aCoords.tr.y > editor.canvas.height) {
        console.log("down")
        obj.set('top', editor.canvas.height - objBoundingBox.height)
        obj.setCoords()
      }
    }
    else if (obj.angle == 135) {
      if (obj.aCoords.bl.y < 0) {
        console.log("up")
        obj.set('top', obj.aCoords.tl.y - obj.aCoords.bl.y)
        obj.setCoords()
      }
      if (obj.aCoords.br.x < 0) {
        console.log("left")
        obj.set('left', obj.aCoords.tl.x - obj.aCoords.br.x)
        obj.setCoords()
      }
      if (obj.aCoords.tl.x > editor.canvas.width) {
        console.log("right")
        obj.set('left', editor.canvas.width - 10)
        obj.setCoords()
      }
      if (obj.aCoords.tr.y > editor.canvas.height) {
        console.log("down")
        obj.set('top', editor.canvas.height - (obj.aCoords.tr.y - obj.aCoords.tl.y))
        obj.setCoords()
      }
    }
    else if (obj.angle == 180) {
      if (obj.aCoords.bl.y < 0) {
        console.log("up")
        obj.set('top', objBoundingBox.height)
        obj.setCoords()
      }
      if (obj.aCoords.br.x < 0) {
        console.log("left")
        obj.set('left', objBoundingBox.width)
        obj.setCoords()
      }
      if (obj.aCoords.bl.x > editor.canvas.width) {
        console.log("right")
        obj.set('left', editor.canvas.width)
        obj.setCoords()
      }
      if (obj.aCoords.tl.y > editor.canvas.height) {
        console.log("down")
        obj.set('top', editor.canvas.height)
        obj.setCoords()
      }
    }
    else if (obj.angle == 225) {
      if (obj.aCoords.br.y < 0) {
        console.log("up")
        obj.set('top', obj.aCoords.tl.y - obj.aCoords.br.y)
        obj.setCoords()
      }
      if (obj.aCoords.tr.x < 0) {
        console.log("left")
        obj.set('left', obj.aCoords.tl.x - obj.aCoords.tr.x)
        obj.setCoords()
      }
      if (obj.aCoords.bl.x > editor.canvas.width) {
        console.log("right")
        obj.set('left', editor.canvas.width - (obj.aCoords.tl.x - obj.aCoords.br.x))
        obj.setCoords()
      }
      if (obj.aCoords.tl.y > editor.canvas.height) {
        console.log("down")
        obj.set('top', editor.canvas.height)
        obj.setCoords()
      }
    }
    else if (obj.angle == 270) {
      if (obj.aCoords.tr.y < 0) {
        console.log("up")
        obj.set('top', obj.aCoords.tl.y - obj.aCoords.tr.y)
        obj.setCoords()
      }
      if (objBoundingBox.left < 0) {
        console.log("left")
        obj.set('left', 0)
        obj.setCoords()
      }
      if (obj.aCoords.bl.x > editor.canvas.width) {
        console.log("right")
        obj.set('left', editor.canvas.width - objBoundingBox.width)
        obj.setCoords()
      }
      if (obj.aCoords.tl.y > editor.canvas.height) {
        console.log("down")
        obj.set('top', editor.canvas.height)
        obj.setCoords()
      }
    }
    else if (obj.angle == 315) {
      if (obj.aCoords.tr.y < 0) {
        console.log("up")
        obj.set('top', obj.aCoords.tl.y - obj.aCoords.tr.y)
        obj.setCoords()
      }
      if (obj.aCoords.tl.x < 0) {
        console.log("left")
        obj.set('left', 0)
        obj.setCoords()
      }
      if (obj.aCoords.br.x > editor.canvas.width) {
        console.log("right")
        obj.set('left', editor.canvas.width - (obj.aCoords.br.x - obj.aCoords.tl.x))
        obj.setCoords()
      }
      if (obj.aCoords.bl.y > editor.canvas.height) {
        console.log("down")
        obj.set('top', editor.canvas.height - (obj.aCoords.bl.y - obj.aCoords.tl.y))
        obj.setCoords()
      }
    }
  }