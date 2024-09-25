import BasicMenu from "../components/menus/BasicMenu";


const BasicLayout = ({children}) => {
    return (
        <>
        <header style={{backgroundColor: 'lightblue'}}>
        <div>로그아웃</div>
            <div>로고 이미지</div>
            
              
                <div><BasicMenu/></div>
            
            </header>
        
    
        <main>
            {children}
        </main>
        
        </>
        
    );
}

export default BasicLayout;