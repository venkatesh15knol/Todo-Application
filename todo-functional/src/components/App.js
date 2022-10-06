import React, {createContext} from "react";
import Title from "./Title";
import Todo from "./TodoBox";
export const TodoContext = createContext();
function App() {
  return (
   
      <div className="App">
        <Title />
        <Todo />
      </div>
  )
}
export default App;
