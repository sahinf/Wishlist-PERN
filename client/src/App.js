import Footer from './components/Footer';
import Header from './components/Header';
import Auth from './components/Login';

import './css/App.css';

const App = () => (
  <>
    {/* <Header></Header> */}
    <main style={{ minHeight: "93vh" }}>
      <Auth> </Auth>
    </main>
    {/* <Footer></Footer> */}
  </>
);

export default App