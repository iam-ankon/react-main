import React from 'react';

import InquiryForm from '../components/InquiryForm';

const InquiryListPage = () => {
    const handleInquiryAdded = () => {
        window.location.reload(); // Refresh to update list
    };

    return (
        <div className="p-4">
            <InquiryForm onInquiryAdded={handleInquiryAdded} />
            
        </div>
    );
};

export default InquiryListPage;
