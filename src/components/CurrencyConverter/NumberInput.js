import React, { useContext } from 'react';
import styled from 'styled-components';
import {CurrencyConverterContext} from './CurrencyConverterContex';


const StyledInput = styled.input`
    &::-webkit-outer-spin-button, ::-webkit-inner-spin-button {
        -webkit-appearance: none;
    }
    &[type=number] {
        -moz-appearance: textfield;
    }
`
function NumberInput() {
    const [currencyConverterState, setstate] = useContext(CurrencyConverterContext);
    return <StyledInput value={currencyConverterState.amount} onChange={e => setstate({...currencyConverterState, amount: e.target.value})} type="number"></StyledInput>
}

export default NumberInput;
