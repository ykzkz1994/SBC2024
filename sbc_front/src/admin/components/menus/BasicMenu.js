import Dropdown from "react-bootstrap/Dropdown";
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import DropdownButton from "react-bootstrap/DropdownButton";

const BasicMenu = () => {
    return(
        <div style={{ display: 'flex', gap: '10px' }}>
        {["구역 관리", "캠핑장 예약 관리", "회원 관리", "커뮤니티 관리", "통계 관리" ].map(
        (variant) => (
          <DropdownButton
            as={ButtonGroup}
            key={variant}
            id={`dropdown-variants-${variant}`}
            variant={variant.toLowerCase()}
            title={variant}
          >
            <Dropdown.Item eventKey="1">Action</Dropdown.Item>
            <Dropdown.Item eventKey="2">Another action</Dropdown.Item>
            <Dropdown.Item eventKey="3" active>
              Active Item
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item eventKey="4">Separated link</Dropdown.Item>
          </DropdownButton>
        ),
      )}
       </div>
    );
}

export default BasicMenu;