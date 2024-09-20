import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import BasicMenu from "../components/menus/BasicMenu";
import Col from "react-bootstrap/Col";

const BasicLayout = ({children}) => {
    return (
        <Container>
        
        <header>
            <Row>
            <Col><div>로고 이미지</div></Col>
            
                <Col><div>로그아웃</div></Col></Row>
                <Row> <BasicMenu/> </Row>
            
            </header>
        
        
        <main>
            {children}
        </main>
        
    
        </Container>
    );
}

export default BasicLayout;