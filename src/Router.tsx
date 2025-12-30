import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/home"
import Monthly from "./pages/monthly"
import Create from "./pages/monthly/create"
import Result from "./pages/monthly/result"
import Comment from "./pages/monthly/comment"
import YearlyCreate from "./pages/yearly/create"

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/monthly/select" element={<Monthly />} />
        <Route path="/monthly/create" element={<Create />} />
        <Route path="/comment" element={<Comment />} />
        <Route path="/yearly/create" element={<YearlyCreate />} />
        <Route path="/result" element={<Result />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter
