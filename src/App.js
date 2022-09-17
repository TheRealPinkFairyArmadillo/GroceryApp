import Header from './components/Header'

function App() {

  const userName = "John Doe" // CHANGE when authentication works

  return (
    <div className="App">
      <Header userName={userName}/>
    </div>
  );
}

export default App;