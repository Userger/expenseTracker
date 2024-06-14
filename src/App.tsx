import { BrowserRouter } from "react-router-dom"
import { TrackerApp } from "./components/tracker/Tracker"

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
