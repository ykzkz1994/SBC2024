import React from 'react';
import { format } from 'date-fns';

const DateFormatter = ({ dateString }) => {
    const formattedDate = format(new Date(dateString), 'yyyyMMdd'); // "YYYYMMDD" 형식

    return <p>{formattedDate}</p>;
};

export default DateFormatter;