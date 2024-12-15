import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import InquiryAddPage from './pages/InquiryAddPage';
import InquiryDetailPage from './pages/InquiryDetailPage';
import NotFoundPage from './pages/NotFoundPage';
import InquiryShortdetailPage from './pages/InquiryShortdetailPage';
import InquiryDetail from "./components/InquiryDetail";
import HomePage from "./components/Home";
import OrderListPage from "./pages/OrderListPage";
import OrderDetailPage from "./pages/OrderDetailPage";
import OrderFormPage from './pages/OrderFormPage';

const App = () => (
    <Router>
        <Navbar />
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/home" element={<InquiryAddPage />} />
            {/* <Route path="/inquiries" element={<InquiryListPage />} /> */}
            <Route path="/inquiries/:id" element={<InquiryDetailPage />} />
            <Route path="/inquiries/i" element={<InquiryShortdetailPage />} />
            <Route path="*" element={<NotFoundPage />} />
            {/* <Route path="/inquiries/:id" element={<InquiryDetail />} /> */}
            <Route path="/order" element={<OrderListPage />} />
            <Route path="/orders/new" element={<OrderFormPage />} />
            <Route path="/orders/:id" element={<OrderDetailPage />} />
            {/* <Route path="/orders/:id/edit" element={<OrderFormPage />} /> */}
        </Routes>
    </Router>
);

export default App;
