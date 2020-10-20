import React, { useContext, useState, useEffect, useRef } from 'react';
import { CurrencyConverterContext } from './CurrencyConverterContex';
import NumberInput from './NumberInput';
import Dropdown from './Dropdown';
import axios from 'axios';
import { BiTransfer } from "react-icons/bi";
import styled from 'styled-components';

const StyledContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100vh;
    button {
        height: 40px;
        display: flex;
        align-items: center;
        background-color: black;
        color: white;
        padding: 15px;
        cursor: pointer;
        border: 0;
        &:focus {
            outline: 0;
        }
    }
`

const StyledDropdownsContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: center;
    margin: 10vh 0;
    height: 40px;
    
`
const StyledIcon = styled.button`
    font-size: 1.5rem;
    border-radius: 30px;
    margin: 0 4vw;
`
const StyledConvertButton = styled.button`
    font-size: 1rem;
    border-radius: 15px;
`

const StyledQuantityContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    input[type="number"] {
        margin-right: 20px;
        margin-left: 10px;
        height: 35px
    }
`


function CurrencyConverter() {
    const [currencyConverterState, setstate] = useContext(CurrencyConverterContext);
    const [currencies, setCurrencies] = useState(null);
    const dropdownCurrencyToBeConvertedValue = useRef('');
    const dropdownTargetCurrencyValue = useRef('');

    useEffect(() => {
        axios.get('https://free.currconv.com/api/v7/currencies?apiKey=601bfb90cf2d423df9a6').then(res => {
          setCurrencies(Object.values(res.data.results));
        });
      }, []);

    const reverse = () => {
        const copy = {...currencyConverterState};
        setstate({
            ...currencyConverterState,
            currencyToBeConvertedId: copy.currencyTargetId,
            currencyToBeConvertedName: copy.currencyTargetName,
            currencyTargetId: copy.currencyToBeConvertedId,
            currencyTargetName: copy.currencyToBeConvertedName
            })
        dropdownCurrencyToBeConvertedValue.current.selectOption(copy.currencyTargetName);
        dropdownTargetCurrencyValue.current.selectOption(copy.currencyToBeConvertedName);
        
    }
    const callbackCurrencyToBeConverted = (currencyId, currencyName) => {
        setstate({...currencyConverterState, currencyToBeConvertedId: currencyId, currencyToBeConvertedName: currencyName});
        dropdownCurrencyToBeConvertedValue.current.selectOption(currencyName);
    } 
    const callbackCurrencyTarget = (currencyId, currencyName) => {
        setstate({...currencyConverterState, currencyTargetId: currencyId, currencyTargetName: currencyName})
        dropdownTargetCurrencyValue.current.selectOption(currencyName);
    } 
    const convertCurrency = (currencyToBeConvertedId, currencyTargetId) => {
        if (currencyToBeConvertedId === currencyTargetId) {
            return;
        }
        const convertedCurrencies = currencyConverterState.exchangeRatio ? Object.keys(currencyConverterState.exchangeRatio) : null;
        if (!currencyToBeConvertedId || !currencyTargetId) {
            return;
        } else if (convertedCurrencies && (convertedCurrencies.includes(`${currencyToBeConvertedId}_${currencyTargetId}`) && convertedCurrencies.includes(`${currencyTargetId}_${currencyToBeConvertedId}`))) {
            return;
        }
        axios.get(`https://free.currconv.com/api/v7/convert?q=${currencyToBeConvertedId}_${currencyTargetId},${currencyTargetId}_${currencyToBeConvertedId}&compact=ultra&apiKey=601bfb90cf2d423df9a6`)
            .then(res => setstate({...currencyConverterState, exchangeRatio: res.data}))
    }
    return (
        <>
            <StyledContainer>
                <div>
                    <StyledDropdownsContainer>
                        <Dropdown ref={dropdownCurrencyToBeConvertedValue} callback={callbackCurrencyToBeConverted} options={currencies}></Dropdown>
                        <StyledIcon onClick={() => reverse()}><BiTransfer/></StyledIcon> 
                        <Dropdown ref={dropdownTargetCurrencyValue} callback={callbackCurrencyTarget} options={currencies}></Dropdown>
                    </StyledDropdownsContainer>
                    <StyledQuantityContainer>
                        <span>Quantia: </span>
                        <NumberInput></NumberInput>
                        <StyledConvertButton onClick={() => convertCurrency(currencyConverterState.currencyToBeConvertedId, currencyConverterState.currencyTargetId)}>Converter</StyledConvertButton>
                    </StyledQuantityContainer>
                </div>
                <h2>
                    {
                        currencyConverterState?.exchangeRatio && currencyConverterState.currencyToBeConvertedId !== currencyConverterState.currencyTargetId ?
                        currencyConverterState.amount * currencyConverterState?.exchangeRatio[`${currencyConverterState.currencyToBeConvertedId}_${currencyConverterState.currencyTargetId}`] : null
                    }
              </h2>
            </StyledContainer>
            
        </>
    );
}

export default CurrencyConverter;