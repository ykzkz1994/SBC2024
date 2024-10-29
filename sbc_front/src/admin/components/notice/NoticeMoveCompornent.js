import React from 'react';
import {useNavigate} from 'react-router-dom';
import {Button} from 'react-bootstrap';

const NoticePrevNextNavigation = ({previousNotice, nextNotice}) => {
    const navigate = useNavigate();

    const handleNavigate = (nid) => {
        navigate(`/admin/notices/read/${nid}`);
    };

    return (
        <div className="d-flex justify-content-between my-4">
            {previousNotice && (
                <Button variant="link" onClick={() => handleNavigate(previousNotice.nid)}>
                    이전 공지: {previousNotice.title}
                </Button>
            )}
            {nextNotice && (
                <Button variant="link" onClick={() => handleNavigate(nextNotice.nid)}>
                    다음 공지: {nextNotice.title}
                </Button>
            )}
        </div>
    );
};

export default NoticePrevNextNavigation;
