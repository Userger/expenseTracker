import { BrowserRouter } from "react-router-dom"
import { TrackerApp } from "./components/Tracker/TrackerApp"
import { Header } from "./components/header"

function App() {
    return (
        <>
            <BrowserRouter>
                <TrackerApp />
            </BrowserRouter>
        </>
    )
}

export default App
