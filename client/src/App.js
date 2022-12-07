import { Route, Routes, useLocation } from "react-router-dom";
import Folder from "./pages/Folder";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Tools from "./pages/Tools";
import styled from "styled-components";
import SideBar from "./components/SideBar";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAppContext } from "./context";
import { Container } from "./components/styles/Container.styled";
import Header from "./components/Header";
import { ThemeProvider } from "styled-components";
import GlobalStyles from "./components/styles/Global";
import PublicFolder from "./pages/PublicFolder";

const App = () => {
    // to make public folder not global
    const location = useLocation();
    console.log(location.pathname);

    const theme = {
        colors: {
            header: "#552448",
            font: "#552448",
            body: "#F9F7F7",
            footer: "#003333",
            sidebar: "EAE3D4",
            white: "#fff",
        },
    };
    const contextData = useAppContext();

    const [loading, setLoading] = useState(true);
    const getProfile = async () => {
        try {
            // getting response from be using axios
            const res = await axios.get("/users/profile", {
                headers: {
                    Authorization: localStorage.getItem("token"),
                },
            });
            console.log(res.data);
            contextData.setUser(res.data);
        } catch (err) {
            // axios
            console.log(err.response.data);
        }

        setLoading(false);
    };
    useEffect(() => {
        getProfile();
    }, []);

    if (loading) {
        return <p>loading...</p>;
    }

    return (
        <ThemeProvider theme={theme}>
            <>
                <GlobalStyles />
                <Container>
                    {/*if it doesn't include public then show header and sidebar, if not dont*/}
                    {!location.pathname.includes("public") && (
                        <>
                            <Header />
                            <SideBar />
                        </>
                    )}

                    {/* <input type="search" id="site-search" name="q" /> */}
                    <Routes>
                        <Route path="/signup" element={<SignUp />} />
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/folder/:folderId" element={<Folder />} />
                        <Route
                            path="/public/folder/:folderId"
                            element={<PublicFolder />}
                        />
                        <Route path="tools" element={<Tools />} />
                    </Routes>
                </Container>
            </>
        </ThemeProvider>
    );
};

export default App;
