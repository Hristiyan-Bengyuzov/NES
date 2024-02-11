import Forums from '../components/Forums.js';
import ThreadForm from '../components/ThreadForm.js';

const ForumsPage = () => {
  return (
    <div className='forum-background'>
      <ThreadForm/>
      <Forums />
    </div>
  );
}


export default ForumsPage;