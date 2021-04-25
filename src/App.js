import { BrowserRouter, Route, Switch } from "react-router-dom";
import HomePage from "./components/pages/home";
import DetailPage from "./components/pages/detail";
import styles from './app.module.css';
import Footer from './components/elements/footer';

function App() {
  return (
    <div className={styles.appWrapper}>
      
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/detail/:id" component={DetailPage} />
        </Switch>
        <Footer/>

      </BrowserRouter>
    </div>
  );
}

export default App;
