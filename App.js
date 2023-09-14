import SimpleReact from './SimpleReact.js';

class App extends SimpleReact.Component {

  constructor(props) {
    super(props);
    this.state = {
      count: 0
    }
  }

  increment() {
    this.setState({count: this.state.count + 1});
  }

  render() {
    return SimpleReact.createElement.call(this,
      'div', 
      null,
      SimpleReact.createElement('h1', {id: 'h1'}, 'Simple React Counter'),
      SimpleReact.createElement('p', {id: 'p'}, `Count: ${this.state.count}`),
      SimpleReact.createElement(
        'button', 
        {onClick: () => this.increment(), style: 'width: 400px'}, 
        'Increment'
      )
    );
  }
}

export default App;