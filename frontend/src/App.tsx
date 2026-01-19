import { BrowserRouter } from "react-router-dom";

import { GlobalStyle } from "./styles/GlobalStyle";
import PageRoutes from "./routes";

function App() {
  return (
    <>
      <BrowserRouter>
        <GlobalStyle />
        <PageRoutes />
      </BrowserRouter>
    </>
  );
}
export default App;
