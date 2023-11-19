import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import './ProfilePage.scss';

const ProfilePage = () =>{
    return(
        <>
        <div className="profile-wrapper">
            <div className="profile-wrapper__upload-section">
                <button className='upload-wrapper__upload-btn'>
                    <CloudUploadIcon color="primary"/> Drag-n-drop or upload your resume
                </button>
            </div>
            <div className="profile-wrapper__linkdin-section">
                <button className='upload-wrapper__upload-btn'>
                    <CloudUploadIcon color="primary"/> LinkdIn Link
                </button>
            </div>
            <div className="profile-wrapper__add-details">
                <div>
                    <h3>Skills</h3>
                    <input type="text" />
                </div>
                <div>
                    <h3>Work Experience</h3>
                    <input type="text" />
                </div>
                <div>
                    <h3>Education</h3>
                    <input type="text" />
                </div>
                
            </div>
            
            
        </div>
        
        </>
    );
}
export default ProfilePage;