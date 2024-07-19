import React, { useEffect, useState } from "react";
import { auth, provider } from "./Config";
import { signInWithPopup } from "firebase/auth";
import { Button, Box, Container, TextField, InputAdornment, IconButton } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import GoogleIcon from '@mui/icons-material/Google';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Link } from 'react-router-dom';



const theme = createTheme({
    palette: {
        primary: {
            main: "#4285F4",
        },
    },
});

const linkStyle = {
    textDecoration: 'none',
    color: 'inherit',
};

const SignIn = () => {
    const [password, setPassword] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);



    const handleClick = async () => {
        try {
            const data = await signInWithPopup(auth, provider);
            const { email } = data.user;
            setUserEmail(email);
            localStorage.setItem("email", email);
            setLoggedIn(true);
        } catch (error) {
            console.error(error);
        }
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleLogin = (e) => {
        e.preventDefault();

        if (password === "kranti@123") {
            alert(`Logged is Successfully`)
            setPassword("");
        } else {
            alert("Incorrect password");
        }
    };

    useEffect(() => {
        setUserEmail(localStorage.getItem("email") || "");
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <Container
                maxWidth="sm"
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                }}
            >
                 <Box>
                     {loggedIn ? (
                        <p>{userEmail}</p>
                    ) : (
                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={<GoogleIcon />}
                            onClick={handleClick}
                        >
                            Sign In With Google
                        </Button>
                    )}
                    {loggedIn && (
                        <form onSubmit={handleLogin}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                autoComplete="current-password"
                                value={password}
                                onChange={handlePasswordChange}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                fullWidth
                                sx={{ mt: 2 }}
                            >

                                <Button color="inherit">
                                    <Link to="/" style={linkStyle}>
                                        Login
                                    </Link>
                                </Button>
                            </Button>

                        </form>
                    )}
                </Box>
            </Container>
        </ThemeProvider>
    );
};

export default SignIn;

