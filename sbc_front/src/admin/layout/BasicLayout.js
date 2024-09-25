import BasicMenu from "../components/menus/BasicMenu";


//{children}속성을 활용하여 컴포넌트 내부에 다른 컴포넌트를 적용시킬 수 있음
const BasicLayout = ({children}) =>{

    return(
        // 가장 외곽을 묶는 기본 빈태그
        <>
            {/*베이직 메뉴 컴포넌트*/}
            베이직 메뉴
            <BasicMenu></BasicMenu>
            베이직 메뉴
            <br/>
            <br/>
            <div>
                <main className="bg-sky-300 md:w-2/3 lg:w-3/4 px-5 py-40">베이직 레이아웃 {children}베이직 레이아웃</main>

            </div>


        </>

    )
}

export default BasicLayout;