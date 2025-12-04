import './globals.css'
import NavBar from './components/Navbar'
import Footer from './components/Footer'

export const metadata = {
  title: 'Portfolio',
  description: 'Student portfolio site',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50">
        <NavBar />
        
        <main className="flex-grow">
          {children}
        </main>
        
        <Footer />
      </body>
    </html>
  )
}