import {AppBar, Container, Toolbar, Typography} from '@mui/material'
import CarList from "./components/CarList.jsx";

function App() {
    return <>
        <Container maxWidth="xl">
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6">
                        Car Shop
                    </Typography>
                </Toolbar>
            </AppBar>
            <CarList/>
        </Container>
    </>
}

export default App;