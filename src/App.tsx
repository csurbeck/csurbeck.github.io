import { CallAssurePage } from '@src/pages/CallAssurePage/CallAssurePage';
import { ExpediaTripsPage } from '@src/pages/ExpediaTripsPage/ExpediaTripsPage';
import { HomePage } from '@src/pages/HomePage/HomePage';
import { ReorderableTablePage } from '@src/pages/ReorderableTablePage/ReorderableTablePage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/work/reorderable-table" element={<ReorderableTablePage />} />
                <Route path="/work/expedia-trips" element={<ExpediaTripsPage />} />
                <Route path="/work/callassure" element={<CallAssurePage />} />
            </Routes>
        </BrowserRouter>
    );
}
