import Navbar from "../components/navbar"
import { useState } from "react"
import RateLimitedUI from "../components/RateLimitedUi";

const homePage = () => {

const [isRateLimited, setIsRateLimited] = useState(true);

  return (
    <div className='min-h-screen'>
        <Navbar />

        {isRateLimited && <RateLimitedUI />}
    </div>
  )
}

export default homePage