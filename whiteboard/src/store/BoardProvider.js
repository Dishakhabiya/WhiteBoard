import React from "react";
import BoardContext from "./board-context";

import {BOARD_ACTIONS, TOOL_ACTION_TYPE, TOOL_ITEMS}  from "../constants";
import { useReducer } from "react";
import { createRoughElement } from "../Components/utils/element";

const boardReducer = (state,action) => {
    switch(action.type){
      case BOARD_ACTIONS.CHANGE_TOOL:
        {
        return {
          ...state, 
          activeToolItem: action.payload.tool,
        };
      }
      case BOARD_ACTIONS.DRAW_DOWN:
        {
        const {clientX,clientY,stroke,fill,size} = action.payload;
        const newElement = createRoughElement
              (state.elements.length,
              clientX,
              clientY,
              clientX,
              clientY,
             { type: state.activeToolItem,
              stroke,fill,size});
      
           const prevElements = state.elements;
        return {
          ...state,
            toolActionType: TOOL_ACTION_TYPE.DRAWING,
          elements: [...prevElements,newElement],
        }
      }
        case BOARD_ACTIONS.DRAW_MOVE:
          {    const {clientX,clientY} = action.payload;
          const newElements = [...state.elements];
          const index = state.elements.length -1;
          const {x1, y1, stroke, fill,size}=newElements[index];
            const newElement = createRoughElement
              (index,
              x1,
              y1,
              clientX,
              clientY,
             { type: state.activeToolItem,fill,stroke,size});
              newElements[index]=newElement;
          return {
            ...state,
            elements:newElements,
          }
        }
        case BOARD_ACTIONS.DRAW_UP:
          { return {
            ...state,
              toolActionType: TOOL_ACTION_TYPE.NONE,
          }
          }
        default:
          return state;
    }
};
const intialBoard ={
  activeToolItem: TOOL_ITEMS.LINE,
  toolActionType: TOOL_ACTION_TYPE.NONE,
  elements: [],

}

const BoardProvider = ({children}) => {
      const [boardState,dispatchBoardAction] = useReducer(boardReducer,intialBoard);
      
      const changeToolHandler = (tool) => {
        dispatchBoardAction({type:"CHANGE_TOOL",payload:{
          tool,
        }})
      };

      const boardMouseDownHandler = (event,toolboxState) => {
        const {clientX,clientY} = event;
      
        dispatchBoardAction({type:"DRAW_DOWN",payload:{
          clientX,clientY,
          stroke:toolboxState[boardState.activeToolItem]?.stroke,
          fill:toolboxState[boardState.activeToolItem]?.fill,
          size:toolboxState[boardState.activeToolItem]?.size,
        }})
      };
        const boardMouseMoveHandler = (event) => {
        const {clientX,clientY} = event;
      
        dispatchBoardAction({type:"DRAW_MOVE",payload:{
          clientX,clientY,
        }})
      };
       const boardMouseUpHandler = () => {
        dispatchBoardAction({type:"DRAW_UP",})
      };
      const boardContextValue ={
        activeToolItem: boardState.activeToolItem,
        elements: boardState.elements,
        toolActionType: boardState.toolActionType,
        changeToolHandler,
        boardMouseDownHandler,
        boardMouseMoveHandler,
        boardMouseUpHandler,
      };
        return(
            <BoardContext.Provider value={boardContextValue}>{children}</BoardContext.Provider>

        );
};

export default BoardProvider;