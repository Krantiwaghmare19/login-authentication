// import React, { useEffect, useState } from "react";
// import { auth, provider } from "./Config";
// import { signInWithPopup } from "firebase/auth";
// import { Button, Box, Container, TextField, InputAdornment, IconButton } from "@mui/material";
// import { createTheme, ThemeProvider } from "@mui/material/styles";
// import GoogleIcon from '@mui/icons-material/Google';
// import Visibility from '@mui/icons-material/Visibility';
// import VisibilityOff from '@mui/icons-material/VisibilityOff';
// import { useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { login, selectUser } from "../redux/userSlice";

// const theme = createTheme({
//     palette: {
//         primary: {
//             main: "#4285F4",
//         },
//     },
// });

// const SignIn = () => {
//     const [password, setPassword] = useState("");
//     const [showPassword, setShowPassword] = useState(false);
//     const user = useSelector(selectUser);
//     const dispatch = useDispatch();
//     const navigate = useNavigate();

//     const handleClick = async () => {
//         try {
//             const data = await signInWithPopup(auth, provider);
//             const { email } = data.user;
//             dispatch(login({ email }));
//             localStorage.setItem("email", email);
//             navigate('/home');
//         } catch (error) {
//             console.error(error);
//         }
//     };

//     const handlePasswordChange = (e) => {
//         setPassword(e.target.value);
//     };

//     const handleClickShowPassword = () => {
//         setShowPassword(!showPassword);
//     };

//     const handleLogin = (e) => {
//         e.preventDefault();
//         if (password === "kranti@123") {
//             alert(`Logged in Successfully`);
//             setPassword("");
//             navigate('/home');
//         }
//     };

//     useEffect(() => {
//         const storedEmail = localStorage.getItem("email");
//         if (storedEmail) {
//             dispatch(login({ email: storedEmail }));
//         }
//     }, [dispatch]);

//     return (
//         <ThemeProvider theme={theme}>
//             <Container
//                 maxWidth="sm"
//                 sx={{
//                     display: "flex",
//                     flexDirection: "column",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     textAlign: "center",
//                 }}
//             >
//                 <Box>
//                     {user ? (
//                         <p>{user.email}</p>
//                     ) : (
//                         <Button
//                             variant="contained"
//                             color="primary"
//                             startIcon={<GoogleIcon />}
//                             onClick={handleClick}
//                         >
//                             Sign In With Google
//                         </Button>
//                     )}
//                     {user && (
//                         <form onSubmit={handleLogin}>
//                             <TextField
//                                 variant="outlined"
//                                 margin="normal"
//                                 required
//                                 fullWidth
//                                 name="password"
//                                 label="Password"
//                                 type={showPassword ? 'text' : 'password'}
//                                 id="password"
//                                 autoComplete="current-password"
//                                 value={password}
//                                 onChange={handlePasswordChange}
//                                 InputProps={{
//                                     endAdornment: (
//                                         <InputAdornment position="end">
//                                             <IconButton
//                                                 aria-label="toggle password visibility"
//                                                 onClick={handleClickShowPassword}
//                                                 edge="end"
//                                             >
//                                                 {showPassword ? <VisibilityOff /> : <Visibility />}
//                                             </IconButton>
//                                         </InputAdornment>
//                                     ),
//                                 }}
//                             />
//                             <Button
//                                 type="submit"
//                                 variant="contained"
//                                 color="primary"
//                                 fullWidth
//                                 sx={{ mt: 2 }}
//                             >
//                                 Login
//                             </Button>
//                         </form>
//                     )}
//                 </Box>
//             </Container>
//         </ThemeProvider>
//     );
// };

// export default SignIn;


import React, { useEffect, useState } from "react";
import { auth, provider } from "./Config";
import { signInWithPopup } from "firebase/auth";
import { Button, Box, Container, TextField, InputAdornment, IconButton } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import GoogleIcon from '@mui/icons-material/Google';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login, selectUser } from "../redux/userSlice";

const theme = createTheme({
    palette: {
        primary: {
            main: "#4285F4",
        },
    },
});

const SignIn = () => {
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isGoogleSignedIn, setIsGoogleSignedIn] = useState(false); 
    const user = useSelector(selectUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleClick = async () => {
        try {
            const data = await signInWithPopup(auth, provider);
            const { email } = data.user;
            dispatch(login({ email }));
            localStorage.setItem("email", email);
            setIsGoogleSignedIn(true); 
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
        if (password === "kranti@123" || password === "divya@123") {
            alert(`Logged in Successfully`);
            setPassword("");
            navigate('/home');
        } else {
            alert('Incorrect Password');
        }
    };

    useEffect(() => {
        const storedEmail = localStorage.getItem("email");
        if (storedEmail) {
            dispatch(login({ email: storedEmail }));
            setIsGoogleSignedIn(true); 
        }
    }, [dispatch]);

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
                    {!isGoogleSignedIn ? (
                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={<GoogleIcon />}
                            onClick={handleClick}
                        >
                            Sign In With Google
                        </Button>
                    ) : (
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
                                Login
                            </Button>
                        </form>
                    )}
                </Box>
            </Container>
        </ThemeProvider>
    );
};

export default SignIn;
