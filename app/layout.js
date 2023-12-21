import {roboto} from "@/stuff/css/fonts";
import "./globals.css";
import "@/stuff/css/utils.css";
import "@/stuff/css/main.css";

import Providers from "@/stuff/providers/Providers";
import Header from "@/stuff/components/Navbar/Header";
import Content from "@/stuff/components/global/Content";
import FlashMessage from "@/stuff/components/global/FlashMessage";
import Footer from "@/stuff/components/global/Footer";


export const metadata = {
    title: "MyLists",
    description: "Created with Next.js",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
        <body className={`${roboto.className} antialiased`}>
        <Providers>
            <Header/>
            <Content>
                <FlashMessage/>
                {children}
            </Content>
            <Footer/>
        </Providers>
        </body>
        </html>
    );
}