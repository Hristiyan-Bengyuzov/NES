import '../styles/Loading.css';
import ReactLoading from 'react-loading';

const Loading = () => {
    return (
        <>
            <div className='container'>
                <p>Loading...</p>
                <ReactLoading type={'spin'} color={'#3027e6'} height={666} width={150} />
            </div>
        </>
    );
}

export default Loading;