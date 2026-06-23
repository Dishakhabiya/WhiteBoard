import { useEffect, useRef,useContext, useLayoutEffect } from "react";
import rough from "roughjs";
import BoardContext from "../../store/board-context";
import { TOOL_ACTION_TYPE } from "../../constants";
import toolboxContext from "../../store/toolbox-context";
function Board() {
  const canvasRef = useRef();
  const {elements, boardMouseDownHandler, 
    boardMouseMoveHandler, toolActionType, 
    boardMouseUpHandler} = useContext(BoardContext);
  const {toolboxState} = useContext(toolboxContext);
  useEffect(() => {
    const canvas = canvasRef.current;
  
    canvas.width= window.innerWidth;
    canvas.height=window.innerHeight;
  
  },[]);
    useLayoutEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.save();
    const roughCanvas= rough.canvas(canvas);
    elements.forEach((element)=> {roughCanvas.draw(element.roughEle)});

    return () => {context.clearRect(0,0,canvas.width,canvas.height);}
  },[elements]);


  const handleMouseDown = (event) => {
    boardMouseDownHandler(event,toolboxState);
  };

  const handleMouseMove = (event) => {
    if(toolActionType===TOOL_ACTION_TYPE.DRAWING){
    boardMouseMoveHandler(event);
    }
  };
    const handleMouseUp = () => {
   
    boardMouseUpHandler();
    
  };
  return (
    <div className="Board">
      <canvas ref={canvasRef} onMouseDown={handleMouseDown} 
      onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      
      /> 
   
    </div>
    

  );
}

export default Board;
