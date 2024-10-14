import useCustomMove from '../../../hooks/useCustomMove';
import React, { useEffect, useState } from 'react';
import { getCommentList, getList, searchBoard } from '../../api/qnaApi';
import BootstrapPagination from "../util/BootstrapPagination";
import BoardSearchComponent from "../util/BoardSearchComponent";
import Table from "react-bootstrap/Table";
import { Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

const initState = {
    dtoList: [],
    totalPage: 0,
};

function ListComponent(props) {
    const { page, size } = useCustomMove();
    const [serverData, setServerData] = useState(initState);
    const [commentCounts, setCommentCounts] = useState({});
    const [searchParams, setSearchParams] = useState({ type: 'name', keyword: '' });
    const navigate = useNavigate();

    const fetchData = async (page) => {
        try {
            const data = searchParams.keyword
                ? await searchBoard(searchParams.type, searchParams.keyword, { page, size })
                : await getList({ page, size });

            setServerData(data);

            // 댓글 수 가져오기
            const commentCounts = await Promise.all(
                data.dtoList.map(async (qb) => {
                    const commentsData = await getCommentList(qb.qboardID);
                    return { qbID: qb.qboardID, count: commentsData.length || 0 };
                })
            );

            const countsMap = commentCounts.reduce((acc, { qbID, count }) => {
                acc[qbID] = count;
                return acc;
            }, {});

            setCommentCounts(countsMap);

        } catch (error) {
            console.error('API 호출 중 오류 발생:', error);
        }
    };

    useEffect(() => {
        fetchData(page); // 페이지가 변경될 때마다 데이터 로드
    }, [page, size, searchParams]);

    const handlePageChange = (newPage) => {
        // 페이지가 변경될 때 상태 업데이트
        fetchData(newPage);
    };

    const handleSearch = (type, keyword) => {
        setSearchParams({ type, keyword });
        fetchData(1); // 검색 후 첫 페이지로 이동
    };

    const handleAddClick = () => {
        navigate('/admin/qnas/add');
    };

    const handleReadClick = (qbID) => {
        navigate(`/admin/qnas/read/${qbID}`);
    };

    return (
        <div>
            <Table bordered hover responsive className="text-sm">
                <thead>
                <tr>
                    <th>번호</th>
                    <th>제목</th>
                    <th>작성자</th>
                    <th>조회수</th>
                    <th>답변상태</th>
                </tr>
                </thead>
                <tbody>
                {serverData.dtoList.map(qb => (
                    <tr key={qb.qboardID}>
                        {qb.member.memberRole === "ROLE_ADMIN" ? (
                            <td>
                                <p style={{
                                    backgroundColor: 'rgba(255, 0, 0, 0.3)',
                                    color: 'red',
                                    borderRadius: '5px',
                                    display: 'inline-block',
                                    fontWeight: 'bold',
                                    border: 'red 1px solid',
                                }}>공지</p>
                            </td>
                        ) : (
                            <td>{qb.qboardID}</td>
                        )}
                        <td onClick={() => handleReadClick(qb.qboardID)}>
                            {qb.qboardTitle} <span style={{ fontWeight: 'bold', color: 'red' }}>{commentCounts[qb.qboardID] > 0 ? `[${commentCounts[qb.qboardID]}]` : ''}</span>
                        </td>
                        <td>{qb.member.memberName}</td>
                        <td>{qb.qboardViews}</td>
                        <td> {qb.member.memberRole === "ROLE_ADMIN" ? (
                            ''
                        ) : (
                            qb.qboardAsked.trim().toUpperCase() === "Y" ? "답변완료" : "미답변"
                        )}</td>
                    </tr>
                ))}
                </tbody>
            </Table>
            <Button onClick={handleAddClick}>글쓰기</Button>
            <BootstrapPagination
                currentPage={page}
                totalPages={serverData.totalPage}
                onPageChange={handlePageChange}
            />
            <BoardSearchComponent onSearch={handleSearch} />
        </div>
    );
}

export default ListComponent;
