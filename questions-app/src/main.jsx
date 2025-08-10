import { createRoot } from 'react-dom/client'
import {App} from './Components/App'
import './Components/css/Index.css'

const root = createRoot(document.getElementById('root'))
root.render(<App />)