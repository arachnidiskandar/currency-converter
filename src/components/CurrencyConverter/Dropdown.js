import React, { useState, useRef, useEffect, forwardRef, useImperativeHandle }  from 'react';
import styled from 'styled-components';
import { MdKeyboardArrowDown } from "react-icons/md";

const StyledArrowDown = styled(MdKeyboardArrowDown)`
    height: 2rem;
    width: 2rem;

`
const StyledDropdown = styled.div`
    width: 300px;
    ${StyledArrowDown} {
            color: darkgray;
    }
    
    div {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 5px;
        border-radius: 5px;
        border-bottom-left-radius: ${props => props.isOpen ? "0" : "5px"};
        border-bottom-right-radius: ${props => props.isOpen ? "0" : "5px"};
        border: solid 1px #ccc;
        border-bottom: ${props => props.isOpen ? "0" : "solid 1px #ccc"};
        &:hover {
            cursor: pointer;
        }
        
    }
    ul {
        margin: 0;
        list-style-type: none;
        padding: 0;
        border-radius: 5px;
        border: solid 1px #ccc;
        border-top: 0;
        border-top-left-radius: 0px;
        border-top-right-radius: 0px;
        max-height: 200px;
        z-index: 1;
        overflow-y: auto;
        background-color: white;
        li {
            padding: 5px 10px;
        }
        li:hover {
            background-color: #f2f2f2;
            cursor: pointer;
        }
    }
`


const Dropdown = forwardRef(({options, callback}, ref) => {
    const node = useRef();
    const [toggled, toggleDropdown] = useState(false);
    const [optionSelected, selectOption] = useState('');
    
    useImperativeHandle(ref, () => {
        return {
            selectOption: selectOption
        }
    });
    
    function Options() {
        return options.map((option) => <li key={option.id} onClick={() => selectCurrency(option.currencyName, option.id)}>{option.id} - {option.currencyName} </li>)  
    }
    
    const handleClick = e => {
        if (node.current.contains(e.target)) {
            return;
        }
        toggleDropdown(false);
    };
    const selectCurrency = (currencyName, currencyId) => {
        callback(currencyId, currencyName);
        toggleDropdown(false);
    }
    useEffect(() => {
        document.addEventListener("mousedown", handleClick);
        return () => {
          document.removeEventListener("mousedown", handleClick);
        };
      }, [toggled]);
    
    
    return (
        <StyledDropdown ref={node} isOpen={toggled} >
            <div onClick={() => toggleDropdown(!toggled)}>
                <span>{!optionSelected ? 'Selecione uma opção' : optionSelected}</span>
                <StyledArrowDown/>
            </div>
            { toggled && 
                <ul style={{positon: "absolute"}}>
                    <Options></Options>
                </ul>
            } 
        </StyledDropdown>
    )
})

export default Dropdown;