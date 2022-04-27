import { extendTheme, textDecoration } from "@chakra-ui/react"

const theme = extendTheme({
    styles: {
        global: () => ({
            body: {
                bg: "#1E1E2E",
                fontFamily: 'Fredoka One, cursive'
            },
            h2: {
                color: "#D9E0EE",
                fontFamily: 'Fredoka One, cursive',
            },
            p: {
                color: "#D9E0EE",
                fontFamily: 'Fredoka One, cursive',
                fontWeight: '200',
            },
            span: {
                color: "#D9E0EE"
            },
            a: {
                color: "#C9CBFF",
                textDecoration: 'underline'
            }
        }),
    },
})

module.exports = theme