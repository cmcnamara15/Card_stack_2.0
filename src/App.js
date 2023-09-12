import React from 'react';
import Card from './Card.js';
import CardStack from './CardStack.js';

function App() {
  return (
    <div className="App" style={{ 
      display: 'flex', 
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh'
      }}>
      <CardStack
        height={600}
        background="rgb(205, 205, 205)"
        hoverOffset={50}
        initialCard={-1}
      >
        <Card height={150} background="rgb(63, 127, 190)">
          <h2>Card 1</h2>
          <p>This is card number 1</p>
        </Card>
        <Card height={150} background="rgb(117, 170, 214">
          <h2>Card 2</h2>
          <p>This is card number 2</p>
        </Card>
        <Card height={150} background="rgb(216, 136, 46)">
          <h2>Card 3</h2>
          <p>This is card number 3</p>
        </Card>
      </CardStack>
    </div>
  );
}

export default App;
