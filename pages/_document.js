import Document, {Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document{

    static async getInitialProps(ctx){
        const initialProps = await Document.getInitialProps(ctx)
        return { ...initialProps }
    }

    render(){
        return(
            <Html lang='en'>
                <Head/>
                <body>
                    <script dangerouslySetInnerHTML={{
                        __html: themeInitializer,
                    }}></script>
                    <Main/>
                    <NextScript/>
                </body>
            </Html>
        )
    }
}

const themeInitializer = `(function(){
    ${setInitialTheme.toString()}
    setInitialTheme();
})()
`;

function setInitialTheme() {
    function getInitialTheme() {
        const persistedPreferenceMode = window.localStorage.getItem("theme");
        const hasPersistedPreference = typeof persistedPreferenceMode === "string";

        if(hasPersistedPreference){
            return persistedPreferenceMode;
        }

        const preference = window.matchMedia("(prefers-color-scheme: dark)");
        const hasMediaQueryPreference = typeof preference.matches === "boolean";

        if(hasMediaQueryPreference){
            return preference.matches ? "dark" : "light";
        }

        return "light";
    }

    const currentTheme = getInitialTheme();
    const element = document.documentElement;

    //Dark theme is applied?

    if(currentTheme === "dark")
        element.setAttribute("class", "dark");
}

export default MyDocument;