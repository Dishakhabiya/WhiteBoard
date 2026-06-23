import Board from "./Components/Board";
import ToolBar from "./Components/ToolBar";
import Toolbox from "./Components/ToolBox/index.js";
import BoardProvider from "./store/BoardProvider.js";
import ToolboxProvider from "./store/ToolboxProvider.js";
function App() {

  return (
    <BoardProvider>
      <ToolboxProvider>
       <Board />
       <ToolBar />
        <Toolbox />
       </ToolboxProvider>
    </BoardProvider>

    

  );
}

export default App;
