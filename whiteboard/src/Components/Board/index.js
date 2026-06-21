import { useEffect, useRef } from "react";
import rough from "roughjs";
function Board() {
  const canvasRef = useRef();
  useEffect(() => {
    const canvas = canvasRef.current;
  //  const context= canvas.getContext("2d");
    const roughCanvas= rough.canvas(canvas);
    const generator = roughCanvas.generator;

    canvas.width= window.innerWidth;
    canvas.height=window.innerHeight;
    let rect1 = generator.rectangle(10, 10, 100, 100);
    let rect2 = generator.rectangle(10, 120, 100, 100, {fill: 'red'});
    roughCanvas.draw(rect1);
    roughCanvas.draw(rect2);
  },[]);
  return (
    <div className="Board">
      <canvas ref={canvasRef}/> 
   
    </div>
    

  );
}

export default Board;
