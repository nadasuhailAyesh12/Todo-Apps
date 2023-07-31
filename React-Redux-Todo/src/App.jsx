import "./App.css";
import AddTodo from "./components/AddTodo";
import TodoList from "./components/todoList";
import store, { persistor } from "./store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { ToastContainer } from "react-toastify";
import Loader from "./components/loader";

function App() {
  return (
    <div className="App">
      <div className="container">
        <h1>Todo List App</h1>

        <Provider store={store}>
          <PersistGate loading={<Loader />} persistor={persistor}>
            <AddTodo />
            <TodoList />
            <ToastContainer />
          </PersistGate>
        </Provider>
      </div>
    </div>
  );
}

export default App;
