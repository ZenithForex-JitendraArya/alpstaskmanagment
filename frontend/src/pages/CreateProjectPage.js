
import './HomePage.css';
import NavBar from '../components/layout/Navbar';
import CreateProject from '../components/projects/CreateProject';

const CreateProjectPage = () => {
    return (
        <>
            <NavBar />
            <div className="container py-5">
                <CreateProject />
            </div>
        </>
    );
};

export default CreateProjectPage;