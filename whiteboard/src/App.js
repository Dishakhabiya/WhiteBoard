import Board from "./Components/Board";
import ToolBar from "./Components/ToolBar";
import BoardProvider from "./store/BoardProvider.js";
function App() {

  return (
    <BoardProvider>
   
       <Board />
       <ToolBar />
    </BoardProvider>

    

  );
}

export default App;
