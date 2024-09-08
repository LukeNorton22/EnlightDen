/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import "./App.css";
import "./styles/global.css";
import { Routes } from "./routes/config";
import { GlobalStyles } from "./styles/index";
import { AuthProvider } from "./authentication/use-auth";
/*import { Button, Header, Input } from "semantic-ui-react";
import { Link, Route, Switch } from "react-router-dom";
import { BulletJournalCreatePage } from "./pages/BulletJournalContents/create-page/bullet-journal-contents-create"; */
// import { ListingExample } from "./components/ListingExample";

//This is almost the base level of your app.  You can also put global things here.

//This is almost the base level of your app.  You can also put global things here.
function App() {
  return (
    <div className="App">
      <GlobalStyles />
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </div>
  );
}

export default App;

/*export default function App() {
  return (
    //eventually let user name bullet journal

    <div className="App">
      <h1>Listy</h1>

      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/BulletJournal/create">Bullet Journal</Link>
        </li>
        <li>
          <Link to="/BulletJournal/listing">Bullet Journal</Link>
        </li>
      </ul>


      <Switch>

      <Route exact path= '/'>
          <h2>Home</h2>
      </Route>
        <Route exact path= '/BulletJournal/create'>
          <h1>Bullet Journal</h1>
          <BulletJournalCreatePage />
        </Route>
        <Route exact path= '/BulletJournal/listing'>
          <h1>Bullet Journal</h1>
          <BulletJournalCreatePage />
        </Route>
        <Route exact path= '*'>
          <h1>Not Found</h1>
        </Route>
      </Switch>
    </div>



   /* <div className="App">
      <GlobalStyles />
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </div>
  );
}
*/

/*export function BulletJournal() {
  const name = " ";
  return (
    <div className="BulletJournal">
      <Button>click me!</Button>
      <h1>Welcome to the bullet journal!</h1>
      <CustomHeader description={'Bullet journal'}/>    
    </div>
  )
}

type CustomHeaderProps = {
  description: string;
}

const CustomHeader: React.FC<CustomHeaderProps> = (props) => {
  const[state, setState] = useState("Default");
  return (
    <div>
      <h1 className='custom-header-h1'>
        {props.description} Header
      </h1>
      <Header>{state}</Header>
      <Input label="State" onChange={(e) => {
        setState(e.target.value);
      }}
      />
    </div>
  );


};
*/
