const PageComponent = ({serverData, movePage}) => {
    return (

        <div>
            <button className="px-4 py-2 mx-1 bg-blue-500 text-white rounded hover:bg-blue-700" onClick={()=>movePage({page:serverData.prevPage})}>&lt;</button>

            {serverData.pageNumList.map(pageNum => <span key={pageNum} onClick={()=>movePage({page:pageNum})}>{pageNum}</span>)}

            <button className="px-4 py-2 mx-1 bg-blue-500 text-white rounded hover:bg-blue-700" onClick={()=>movePage({page:serverData.nextPage})}>&gt;</button>
        </div>
    )
}

export default PageComponent;