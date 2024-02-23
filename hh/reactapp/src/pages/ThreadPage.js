import Thread from "../components/Thread";
import NavBar from '../components/Navbar.js';

const ThreadPage = () => {
  return (
    <div className='forum-background'>
      <NavBar />
      <Thread />
    </div>
  );
}

export default ThreadPage;