import { Provider } from "react-redux";
import HomePage from "./core/navigation/home-page/home-page";
import { store } from "./core/redux/store";

function App() {
  return (
    <Provider store={store}>
      <HomePage />
    </Provider>
  );
}

export default App;
