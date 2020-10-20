import React, { useContext, useState, useEffect, useRef } from 'react';
import { CurrencyConverterContext } from './CurrencyConverterContex';
import NumberInput from './NumberInput';
import Dropdown from './Dropdown';
import axios from 'axios';
import { BiTransfer } from "react-icons/bi";

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
            <NumberInput></NumberInput>
            <Dropdown ref={dropdownCurrencyToBeConvertedValue} callback={callbackCurrencyToBeConverted} options={currencies}></Dropdown>
            <button onClick={() => reverse()}><BiTransfer/></button> 
            <Dropdown ref={dropdownTargetCurrencyValue} callback={callbackCurrencyTarget} options={currencies}></Dropdown>
            <button onClick={() => convertCurrency(currencyConverterState.currencyToBeConvertedId, currencyConverterState.currencyTargetId)}>Converter</button>
            <span>
                {
                    currencyConverterState?.exchangeRatio && currencyConverterState.currencyToBeConvertedId !== currencyConverterState.currencyTargetId ?
                    currencyConverterState.amount * currencyConverterState?.exchangeRatio[`${currencyConverterState.currencyToBeConvertedId}_${currencyConverterState.currencyTargetId}`] : null
                 }
              </span>
        </>
    );
}

export default CurrencyConverter;