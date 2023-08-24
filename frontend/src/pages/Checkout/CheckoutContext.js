const { createContext, useState, useContext, useEffect } = require("react");

const CheckoutContext = createContext();

export default function CheckoutProvider ({children}) {
    const [selectedOrderId, setSelectedOrderId] = useState();
    return(
        <CheckoutContext.Provider value={{selectedOrderId,setSelectedOrderId}}>
            {children}
        </CheckoutContext.Provider>
    )
}

export function useCheckoutContext() {
    return useContext(CheckoutContext);
}