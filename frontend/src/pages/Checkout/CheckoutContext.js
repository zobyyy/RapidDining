const { createContext, useState, useContext } = require("react");

const CheckoutContext = createContext();

export default function CheckoutProvider ({children}) {
    const [selectedOrderId, setSelectedOrderId] = useState(41);
    return(
        <CheckoutContext.Provider value={{selectedOrderId,setSelectedOrderId}}>
            {children}
        </CheckoutContext.Provider>
    )
}

export function useCheckoutContext() {
    return useContext(CheckoutContext);
}