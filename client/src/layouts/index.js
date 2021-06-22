import './index.css';
import { ErrorBoundary, MenuBar } from '../components';
import { useLocation } from 'react-router-dom';


function BasicLayout(props) {
    const location = useLocation();
    const paths = ['/', '/user','/chat','/find'];

    return (
        <div>
            <MenuBar
                show={paths.includes(location.pathname)}
                pathname={location.pathname}
            />
            <ErrorBoundary>
                {props.children}
            </ErrorBoundary>
        </div>
    )
}

export default BasicLayout;