import { Outlet, Route, Routes } from "react-router-dom"
import { Home } from "./pages/home/page"
import { History } from "./pages/history/page"
import { Header } from "./components/header/Header"
import { Stats } from "./pages/stats/page"
import { Sidebar } from "./components/sidebar/Sidebar"

function App() {
    return (
        <>
            <Header />
            <div className="container">
                {/*TODO: сделать сайдбар*/}
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route
                        path="app"
                        element={
                            <>
                                <div className="sidebar">
                                    <Sidebar />
                                </div>
                                <Outlet />
                            </>
                        }
                    >
                        <Route path="history" element={<History />} />
                        <Route path="stats" element={<Stats />} />
                    </Route>
                </Routes>
            </div>
        </>
    )
}

export default App
