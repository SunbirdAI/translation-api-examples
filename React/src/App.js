import "./App.css";
import {Wrapper} from "./GlobalStyles";
import Header from "./components/Header";
import Translate from "./components/Translate";


function App() {
    return (
        <div className="h-screen">
            <Header/>
            <Wrapper>
                <Translate/>
            </Wrapper>
        </div>
    );
}

export default App;
