import { CartProvider } from "./cartContext";
import { UserProvider } from "./UserContext";

const AppProvider = ({ children }) => { 
    return (
        <UserProvider>
            <CartProvider>{children}</CartProvider >
        </UserProvider>
    );
};

export default AppProvider;