const PageComponent = ({serverData, movePage}) => {
    return (
        <div>
            {serverData.prev ? <div onClick={()=>movePage({page:serverData.prevPage})}>Prev</div>: <></>}

            {serverData.pageNumList.map(pageNum => <div key={pageNum} onClick={()=>movePage({page:pageNum})}>{pageNum}</div>)}

            {serverData.next ? <div onClick={()=>movePage({page:serverData.nextPage})}>Next</div>: <></>}
        </div>
    )
}

export default PageComponent;