import Header from "./Description"
import Play from "./Play"

const Main = () => {
  // const { width, height } = useWindowSize();
 
  // console.log(width, height);
  return (
    <div className="main">
      <div className="container">
        <Header />
        <Play />
      </div>
    </div>
  )
}

export default Main