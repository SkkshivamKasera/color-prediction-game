import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { ForgotPassword, Home, Login, Otp, Recharge, ResetPassword, SignUp, WithDraw } from './components';
import { ProtectedRoute } from "protected-route-react"
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast'
import { loadUser } from './redux/actions/userAction';
import { fetchGameData } from './redux/actions/gameAction';

function App() {
  const [getUser, setGetUser] = useState(false)
  const [getGameData, setGetGameData] = useState(false)

  const [betAmount, setBetAmount] = useState(0)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [betColor, setBetColor] = useState("")

  const dispatch = useDispatch()
  const { isAuthenticated, loading: authLoading, error: authError, message: authMessage } = useSelector(state => state.user)
  const { loading: gameLoading, error: gameError, message: gameMessage } = useSelector(state => state.game)
  const { loading: paymentLoading, error: paymentError, message: paymentMessage } = useSelector(state => state.payment)

  const [counter, setCounter] = useState(() => {
    const storedCounter = localStorage.getItem('counter');
    return storedCounter ? parseInt(storedCounter) : 60;
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCounter((prevCounter) => {
        if (prevCounter === 0) {
          clearInterval(timer);
          return 0;
        }
        // Decrease counter by 1 and update localStorage
        const newCounter = prevCounter - 1;
        localStorage.setItem('counter', newCounter.toString());
        return newCounter;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatCounter = () => {
    const minutes = Math.floor(counter / 60);
    const seconds = counter % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  useEffect(() => {
    if (authError) {
      toast.error(authError)
      dispatch({ type: "CLEAR_ERROR" })
    }
    if (authMessage) {
      toast.success(authMessage)
      dispatch({ type: "CLEAR_MESSAGE" })
    }
    if (gameError) {
      toast.error(gameError)
      setBetAmount(0)
      dispatch({ type: "CLEAR_ERROR" })
    }
    if (gameMessage) {
      toast.success(gameMessage)
      dispatch({ type: "CLEAR_MESSAGE" })
    }
    if (paymentError) {
      toast.error(paymentError)
      dispatch({ type: "CLEAR_ERROR" })
    }
    if (paymentMessage) {
      toast.success(paymentMessage)
      dispatch({ type: "CLEAR_MESSAGE" })
    }
  }, [dispatch, authError, authMessage, gameError, gameMessage, paymentError, paymentMessage])

  if (!getUser) {
    dispatch(loadUser())
    setGetUser(true)
  }
  if (!getGameData) {
    dispatch(fetchGameData())
    setGetGameData(true)
  }

  return (
    authLoading || paymentLoading ? (
      <div>Loading...</div>
    ) : (
      <Router>
        <Routes>
          <Route exact path='/' element={<ProtectedRoute isAuthenticated={isAuthenticated}><Home betAmount={betAmount} setBetAmount={setBetAmount} formatCounter={formatCounter} counter={counter} setCounter={setCounter} setGetUser={setGetUser} betColor={betColor} setBetColor={setBetColor}/></ProtectedRoute>} />

          <Route exact path='/login' element={<Login />}></Route>

          <Route exact path='/signup' element={<SignUp name={name} setName={setName} email={email} setEmail={setEmail} password={password} setPassword={setPassword} />}></Route>

          <Route exact path='/otp' element={<Otp name={name} email={email} password={password} />}></Route>
          
          <Route exact path='/password/forgot' element={<ForgotPassword />}></Route>

          <Route exact path='/password/reset/:token' element={<ResetPassword />}></Route>

          <Route exact path='/payment/recharge' element={<ProtectedRoute isAuthenticated={isAuthenticated}><Recharge /></ProtectedRoute>}></Route>

          <Route exact path='/payment/withdraw' element={<ProtectedRoute isAuthenticated={isAuthenticated}><WithDraw /></ProtectedRoute>}></Route>
        </Routes>
        <Toaster />
      </Router>
    )
  );
}

export default App;