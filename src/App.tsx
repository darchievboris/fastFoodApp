import './App.css'
import Button from "./components/UI/Button/Button.tsx";
import Input from "./components/UI/Input/Input.tsx";

function App() {

  return (
    <>
      <Button>123</Button>
        <Button appearance="big">hello world</Button>
        <Input placeholder="Email" id='email'/>
    </>
  )
}

export default App
