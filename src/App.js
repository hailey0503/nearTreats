import 'regenerator-runtime/runtime'
import React from 'react'
import { login, logout } from './utils'
import './global.css'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

import 'bootstrap/dist/css/bootstrap.min.css'
import Card from 'react-bootstrap/Card'
import Carousel from 'react-bootstrap/Carousel'
import ProgressBar from 'react-bootstrap/ProgressBar'
import Dog4 from "./dog_4.jpeg"
import Dog5 from "./dog_5.jpeg"
import Dog6 from "./dog_6.jpeg"
import Logo from "./paw.png"


import { Form, Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import getConfig from './config'
import { async } from 'q';
const { networkId, contractName } = getConfig(process.env.NODE_ENV || 'development')
const cardAdd = ["dogshelter1.testnet", "dogshelter2.testnet", "dogshelter3.testnet"]
export default function App() {

//target, tokensofar will be updated in index.ts. How can I use those function and get data??

  // use React Hooks to store target amount in component state
  const [target, setTarget] = React.useState({})
  // use React Hooks to store amount of token donated so far in component state
  const [donatedSoFar, setDonated] = React.useState({})
  // when the user has not yet interacted with the form, disable the button
  const [buttonDisabled, setButtonDisabled] = React.useState(true)

  // after submitting the form, we want to show Notification
  const [showNotification, setShowNotification] = React.useState(false)

  
  React.useEffect( ///how to get data from index.ts or should I create here? then how can I use them in index.ts
    async() => {
      const mapTarget = {}
      const mapDonated = {}

      for (let i = 0; i < cardAdd.length; i++) { 
        const thisTarget = await window.contract.getTarget({card:cardAdd[i]}, 130000000000000)
        const thisDonatedSoFar = await window.contract.getDonatedSoFar({card:cardAdd[i]}, 130000000000000)
        mapTarget[cardAdd[i]] = thisTarget

        //console.log('this target : ' + thisTarget)
        //console.log('this donate : ' + thisDonatedSoFar)

        mapDonated[cardAdd[i]] = thisDonatedSoFar
      
        //console.log(mapTarget)
      }
      setTarget({...target, ...mapTarget})
      setDonated({...donatedSoFar, ...mapDonated})
    }, []
  )
  
  const onSubmit1 = (event) => {
    event.preventDefault();
    //console.log(event.target.card0.value)     //card 1, 2, 3
    window.contract.addToken({ card: cardAdd[0], numToken : event.target.card0.value, receiver: contractName}, 180000000000000)
          .then(donateAmount => {
            const mapDonated = {}
            mapDonated[cardAdd[0]] = donateAmount
            setDonated({...donatedSoFar, ...mapDonated})
          })
  }

  const onSubmit2 = (event) => {
    event.preventDefault();
    //console.log(event.target.card1.value)     //card 1, 2, 3
    window.contract.addToken({ card: cardAdd[1], numToken : event.target.card1.value, receiver: contractName}, 180000000000000)
          .then(donateAmount => {
            const mapDonated = {}
            mapDonated[cardAdd[1]] = donateAmount
            setDonated({...donatedSoFar, ...mapDonated})
          })
  }

  const onSubmit3 = (event) => {
    event.preventDefault();
    //console.log(event.target.card2.value)     //card 1, 2, 3
    window.contract.addToken({ card: cardAdd[2], numToken : event.target.card2.value, receiver: contractName}, 180000000000000)
          .then(donateAmount => {
            const mapDonated = {}
            mapDonated[cardAdd[2]] = donateAmount
            setDonated({...donatedSoFar, ...mapDonated})
          })
  }
  
  <input type="text" name="username"/>


  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">
          <img
            alt=""
            src={Logo}
            width="35"
            height="40"
            className="d-inline-block align-top"
          />{' '}
          Pupper Treats
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">      
        </Nav>
        {window.walletConnection.isSignedIn() ? 

          <Nav>
          <Nav.Link href="#">{window.accountId}</Nav.Link>
          <Button onClick={logout} variant="outline-info">Logout</Button> 
          
          </Nav>

       
        : 
        <Form inline>
          <FormControl type="text" placeholder="your NEAR address here" className="mr-sm-2" />
            <Button onClick={login} variant="outline-info">Login</Button>
          </Form>}
        
        </Navbar.Collapse>
      </Navbar>
      
      <div>
        <br />
        <div className="Home">
          <div className="container">           
            <div className="row">            
              <div className="col" placeholder="Dog Picture">                
                <Carousel>
                  <Carousel.Item>
                    <Card style={{ width: '18rem' }}>
                      <Card.Img variant="top" src={Dog4} />
                        <Card.Body>
                          <Card.Title>FOOO</Card.Title>
                          <Card.Text>
                            Fooo is a 6 months old pup and loves taking a long nap. He needs medication for his ears.
                          </Card.Text>
                          <ProgressBar animated now={donatedSoFar[cardAdd[0]] / target[cardAdd[0]] * 100} label={`${(donatedSoFar[cardAdd[0]] / target[cardAdd[0]] * 100).toFixed(0)}%`}/>
                          <br/ >
                          <Form onSubmit={onSubmit1}>
                            <Form.Group controlId="tokenAmount">                    
                              <Form.Control type="number" placeholder="Enter token amount" name = "card0"/>                              
                            </Form.Group>
                            <Button variant="outline-info" type="submit">
                              Share Love
                            </Button>
                          </Form>                            
                        </Card.Body>
                    </Card>                  
                  </Carousel.Item>
                <Carousel.Item>
                  <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={Dog6} />
                      <Card.Body>
                        <Card.Title>BAR</Card.Title>
                          <Card.Text>
                            Bar is a 3 year old pup and loves running in the evening. She needs medication for her skin.
                          </Card.Text>
                          <ProgressBar animated now={donatedSoFar[cardAdd[1]] / target[cardAdd[1]] * 100} label={`${(donatedSoFar[cardAdd[1]]/ target[cardAdd[1]] * 100).toFixed(0)}%`}/>
                          <br />
                          <Form onSubmit={onSubmit2}>
                              <Form.Group controlId="tokenAmount">                    
                                <Form.Control type="number" placeholder="Enter token amount" name = "card1"/>                              
                              </Form.Group>
                              <Button variant="outline-info" type="submit">
                                Share Love
                              </Button>
                          </Form>
                      </Card.Body>
            
                  </Card>
                
                </Carousel.Item>
                  <Carousel.Item>
                    <Card style={{ width: '18rem' }}>
                      <Card.Img variant="top" src={Dog5} />
                        <Card.Body>
                          <Card.Title>FIDO and frends</Card.Title>
                            <Card.Text>
                              FIDO's shelter needs a lot of food and fund for upgrading dog house. Please help!
                            </Card.Text>
                            <ProgressBar animated now={donatedSoFar[cardAdd[2]] / target[cardAdd[2]] * 100} label={`${(donatedSoFar[cardAdd[2]] / target[cardAdd[2]] * 100).toFixed(0)}%`}/>
                            <br/ >
                            <Form onSubmit={onSubmit3}>
                              <Form.Group controlId="tokenAmount">                    
                                <Form.Control type="number" placeholder="Enter token amount" name = "card2" />                              
                              </Form.Group>
                              <Button variant="outline-info" type="submit">
                                Share Love
                              </Button>
                          </Form>
                        </Card.Body>
                    </Card>               
                </Carousel.Item>
              </Carousel>
            
              </div>
              <div className="col" placeholder = "welcome">
               
     
                <div className="text">
                  <br/ >
                  <h2>The Happier Dog, </h2>
                  <h2>The Better World.</h2>
                  <br/ >
                  <h4>How it works</h4>
                  <br/ >
                  <p>Donate your Near Token & Help dogs to be healthy and happy.</p>
                  <p>Once the amount of donated token reaches the target, your token will be automatically donated to the shelters. </p>
                </div>
              </div>
                
            </div>
          </div>
        </div>
      </div>

    </div>
  )
  
  // if not signed in, return early with sign-in prompt
  // if (!window.walletConnection.isSignedIn()) {
  //   return (
  //     <main>
  //       <h1>Welcome to NEAR!</h1>
  //       <p>
  //         To make use of the NEAR blockchain, you need to sign in. The button
  //         below will sign you in using NEAR Wallet.
  //       </p>
  //       <p>
  //         By default, when your app runs in "development" mode, it connects
  //         to a test network ("testnet") wallet. This works just like the main
  //         network ("mainnet") wallet, but the NEAR Tokens on testnet aren't
  //         convertible to other currencies – they're just for testing!
  //       </p>
  //       <p>
  //         Go ahead and click the button below to try it out:
  //       </p>
  //       <p style={{ textAlign: 'center', marginTop: '2.5em' }}>
  //         <button onClick={login}>Sign in</button>
  //       </p>
  //     </main>
  //   )
  // }

  // return (
  //   // use React Fragment, <>, to avoid wrapping elements in unnecessary divs
  //   <>
  //     <button className="link" style={{ float: 'right' }} onClick={logout}>
  //       Sign out
  //     </button>
  //     <main>
  //       <h1>
  //         <label
  //           htmlFor="greeting"
  //           style={{
  //             color: 'var(--secondary)',
  //             borderBottom: '2px solid var(--secondary)'
  //           }}
  //         >
  //           {greeting}
  //         </label>
  //         {' '/* React trims whitespace around tags; insert literal space character when needed */}
  //         {window.accountId}!
  //       </h1>
  //       <form onSubmit={async event => {
  //         event.preventDefault()

  //         // get elements from the form using their id attribute
  //         const { fieldset, greeting } = event.target.elements

  //         // hold onto new user-entered value from React's SynthenticEvent for use after `await` call
  //         const newGreeting = greeting.value

  //         // disable the form while the value gets updated on-chain
  //         fieldset.disabled = true

  //         try {
  //           // make an update call to the smart contract
  //           await window.contract.setGreeting({
  //             // pass the value that the user entered in the greeting field
  //             message: newGreeting
  //           })
  //         } catch (e) {
  //           alert(
  //             'Something went wrong! ' +
  //             'Maybe you need to sign out and back in? ' +
  //             'Check your browser console for more info.'
  //           )
  //           throw e
  //         } finally {
  //           // re-enable the form, whether the call succeeded or failed
  //           fieldset.disabled = false
  //         }

  //         // update local `greeting` variable to match persisted value
  //         setGreeting(newGreeting)

  //         // show Notification
  //         setShowNotification(true)

  //         // remove Notification again after css animation completes
  //         // this allows it to be shown again next time the form is submitted
  //         setTimeout(() => {
  //           setShowNotification(false)
  //         }, 11000)
  //       }}>
  //         <fieldset id="fieldset">
  //           <label
  //             htmlFor="greeting"
  //             style={{
  //               display: 'block',
  //               color: 'var(--gray)',
  //               marginBottom: '0.5em'
  //             }}
  //           >
  //             Change greeting
  //           </label>
  //           <div style={{ display: 'flex' }}>
  //             <input
  //               autoComplete="off"
  //               defaultValue={greeting}
  //               id="greeting"
  //               onChange={e => setButtonDisabled(e.target.value === greeting)}
  //               style={{ flex: 1 }}
  //             />
  //             <button
  //               disabled={buttonDisabled}
  //               style={{ borderRadius: '0 5px 5px 0' }}
  //             >
  //               Save
  //             </button>
  //           </div>
  //         </fieldset>
  //       </form>
  //       <p>
  //         Look at that! A Hello World app! This greeting is stored on the NEAR blockchain. Check it out:
  //       </p>
  //       <ol>
  //         <li>
  //           Look in <code>src/App.js</code> and <code>src/utils.js</code> – you'll see <code>getGreeting</code> and <code>setGreeting</code> being called on <code>contract</code>. What's this?
  //         </li>
  //         <li>
  //           Ultimately, this <code>contract</code> code is defined in <code>assembly/main.ts</code> – this is the source code for your <a target="_blank" rel="noreferrer" href="https://docs.near.org/docs/develop/contracts/overview">smart contract</a>.</li>
  //         <li>
  //           When you run <code>yarn dev</code>, the code in <code>assembly/main.ts</code> gets deployed to the NEAR testnet. You can see how this happens by looking in <code>package.json</code> at the <code>scripts</code> section to find the <code>dev</code> command.</li>
  //       </ol>
  //       <hr />
  //       <p>
  //         To keep learning, check out <a target="_blank" rel="noreferrer" href="https://docs.near.org">the NEAR docs</a> or look through some <a target="_blank" rel="noreferrer" href="https://examples.near.org">example apps</a>.
  //       </p>
  //     </main>
  //     {showNotification && <Notification />}
  //   </>
  // )
}

// this component gets rendered by App after the form is submitted
// function Notification() {
//   const urlPrefix = `https://explorer.${networkId}.near.org/accounts`
//   return (
//     <aside>
//       <a target="_blank" rel="noreferrer" href={`${urlPrefix}/${window.accountId}`}>
//         {window.accountId}
//       </a>
//       {' '/* React trims whitespace around tags; insert literal space character when needed */}
//       called method: 'setGreeting' in contract:
//       {' '}
//       <a target="_blank" rel="noreferrer" href={`${urlPrefix}/${window.contract.contractId}`}>
//         {window.contract.contractId}
//       </a>
//       <footer>
//         <div>✔ Succeeded</div>
//         <div>Just now</div>
//       </footer>
//     </aside>
//   )
// }
