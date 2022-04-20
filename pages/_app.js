// import { ThemeProvider } from 'next-themes'
import { ThemeProvider } from '@material-ui/core/styles'

import 'rsuite/dist/rsuite.min.css'
import SimpleReactLightbox from 'simple-react-lightbox'
import Header from '../components/Header'
import Footer from '../components/Footer'
import '../styles/globals.css'

import { AccountContextProvider } from '../contexts/AccountContext'

const theme = {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
}

// function Theming() {
//     return (
//         <ThemeProvider theme={theme}>
//             <DeepChild />
//         </ThemeProvider>
//     )
// }

export default function MyApp({ Component, pageProps }) {
    return (
        <AccountContextProvider>
            <SimpleReactLightbox>
                <ThemeProvider theme={theme}>
                    <div className="flex flex-col min-h-screen bg-bottom bg-no-repeat bg-bg-color bg-wave">
                        <Header />
                        <Component {...pageProps} />
                        <Footer />
                    </div>
                </ThemeProvider>
            </SimpleReactLightbox>
        </AccountContextProvider>
    )
}
