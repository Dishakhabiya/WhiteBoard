import { useEffect, useRef,useContext } from "react";
import rough from "roughjs";
import BoardContext from "../../store/board-context";
import { TOOL_ACTION_TYPE } from "../../constants";
function Board() {
  const canvasRef = useRef();
  const {elements, boardMouseDownHandler, 
    boardMouseMoveHandler, toolActionType, 
    boardMouseUpHandler} = useContext(BoardContext);
  useEffect(() => {
    const canvas = canvasRef.current;
  
    canvas.width= window.innerWidth;
    canvas.height=window.innerHeight;
  
  },[]);
    useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.save();
  //  const context= canvas.getContext("2d");
    const roughCanvas= rough.canvas(canvas);
    elements.forEach((element)=> {roughCanvas.draw(element.roughEle)});

    return () => {context.clearRect(0,0,canvas.width,canvas.height);}
  },[elements]);


  const handleMouseDown = (event) => {
    boardMouseDownHandler(event);
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
