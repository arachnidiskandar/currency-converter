import React, { useState, useRef, useEffect }  from 'react';
import styled, {keyframes} from 'styled-components';
import { MdKeyboardArrowDown } from "react-icons/md";


const growDown = keyframes`
  from {
    transform: scaleY(0);
  }
  to {
    transform: scaleY(1);
  }
`

const StyledDropdown = styled.div`
    width: 200px;
    &:hover {
        cursor: pointer;
    }
    
    div {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 10px;
        border-radius: 5px;
        border-bottom-left-radius: ${props => props.isOpen ? "0" : "5px"};
        border-bottom-right-radius: ${props => props.isOpen ? "0" : "5px"};
        border: solid 1px #d3d3d3;
        border-bottom: ${props => props.isOpen ? "0" : "solid 1px #d3d3d3"};
    }
    ul {
        margin: 0;
        list-style-type: none;
        padding: 0;
        border-radius: 5px;
        border: solid 1px #d3d3d3;
        border-top: 0;
        border-top-left-radius: 0px;
        border-top-right-radius: 0px;
        animation: ${growDown} 200ms ease-in-out;
        li {
            padding: 5px 10px;
        }
        li:hover {
            background-color: #f2f2f2;
        }
    }
`


function Dropdown() {
    const node = useRef();
    const [toggled, toggleDropdown] = useState(false);
    
    const handleClick = e => {
        if (node.current.contains(e.target)) {
            return;
        }
        toggleDropdown(false);
    };
    
    useEffect(() => {
        // add when mounted
        document.addEventListener("mousedown", handleClick);
        // return function to be called when unmounted
        return () => {
          document.removeEventListener("mousedown", handleClick);
        };
      });
    
    
    
    return (
        <StyledDropdown ref={node} isOpen={toggled} onClick={() => toggleDropdown(!toggled)}>
            <div>
                <span>teste</span>
                <MdKeyboardArrowDown/>
            </div>
            {toggled && <ul>
                <li>1</li>
                <li>2</li>
                <li>3</li>
                <li>4</li>
            </ul>}
        </StyledDropdown>
    )
}

export default Dropdown;