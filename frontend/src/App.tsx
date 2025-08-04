import { useState } from 'react'
import './global.css'
import {Button} from "@/components/ui/button.tsx";

function App() {
  const [count, setCount] = useState(0)

  return (
    <Button onClick={() => setCount(count + 1)}>
        Click here {count}
    </Button>
  )
}

export default App
