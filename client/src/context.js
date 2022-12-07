import { useContext, useState, createContext } from "react";

const AppContext = createContext();

// fx to access context data (stored in the context api)
export const useAppContext = () => {
    return useContext(AppContext);
};

const Provider = (props) => {
    //  global user
    const [user, setUser] = useState(false);

    return (
        // context data
        <AppContext.Provider
            value={{
                user,
                setUser,
            }}
            // -------------------
        >
            {/* Provider wraps App in index.js so Provider is global*/}
            {props.children}
        </AppContext.Provider>
    );
};

export default Provider;
