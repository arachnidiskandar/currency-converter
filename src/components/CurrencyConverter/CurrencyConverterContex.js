import React, { useState, createContext } from 'react';

export const CurrencyConverterContext = createContext();

export function CurrencyConverterProvider(props) {
    const [currencyConverterState, setstate] = useState({
        amount: 1,
        currencyToBeConvertedId: '',
        currencyToBeConvertedName: '',
        currencyTargetId: '',
        currencyTargetName: '',
        exchangeRatio: null
        
    });
    return (
        <CurrencyConverterContext.Provider value={[currencyConverterState, setstate]}>
            {props.children}
        </CurrencyConverterContext.Provider>
    );
}