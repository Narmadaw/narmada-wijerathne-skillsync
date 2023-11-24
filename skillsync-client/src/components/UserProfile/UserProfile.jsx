import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import axios from 'axios';
import './UserProfile.scss';
import nlp from 'compromise';

const UserProfile = () =>{
    const [resumeText, setResumeText] = useState('');
    const [skills, setSkills] = useState([]);
    const [inputSkills, setInputSkills] = useState('');
    const [inputSkillsData, setInputSkillsData] = useState([]);

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        const text = await readFile(file);
        setResumeText(text);
        const { skills } = extractInformation(text);
        setSkills(skills);
        //sendSkillsToServer();
      };

      const readFile = (file) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = (event) => resolve(event.target.result);
          reader.onerror = (error) => reject(error);
          reader.readAsText(file);
        });
      };

      const extractInformation = (resumeText) => {
        const doc = nlp(resumeText);
        const skills = doc.nouns().out('array');
        return {
          skills,
        };
      };

      const sendSkillsToServer = async () => {
        try {
          const response = await axios.post('http://localhost:8080/jobs', { resume: skills });
          console.log(response.data);
          
        } catch (error) {
          console.error('Error sending skills to server:', error);
        }
      };

      const handleInput = (event) =>{
        console.log(event.target.value);
        setInputSkills(event.target.value);
      }

      const handleKeyPress = (event) =>{
        if (event.key === 'Enter') {
          setInputSkillsData([...inputSkillsData, inputSkills]);
          setInputSkills(''); // Clear the input field after adding a skill
        }
      }
 
      
    return(
        <>

        {/* <div className="container">
            <div className="container__circle">1</div>
            
            <div className="container__circle container__circle--middle" >2</div>
            <div className="container__circle container__circle--last" >3</div>
            <div className="container__line"></div>
            <div className="container__lbl">Upload Resume</div>
            <div className="container__lbl container__lbl--middle">Search Job</div>
            <div className="container__lbl container__lbl--last">View Results</div>
        </div> */}

        {/* --------------------------------- */}
        <div className="profile-wrapper">
          <div className="upload-container">
            <div className='upload-container__card'>
              <CloudUploadIcon color="primary" fontSize="large"/> 
            </div>
            <div className='upload-container__card'>
              <h1>Upload your resume to get started</h1>
            </div>
            <div className='upload-container__card'>
              <input className='upload-container__btn-upload' type="file" accept=".txt" onChange={handleFileChange} />
            </div>
            <div className='upload-container__card'>
              <p>Don't have a resume? Add your skills below</p>
            </div>
            <div className='upload-container__card'>
            <input className='upload-container__input' type="text" name='skill' value={inputSkills} onChange={handleInput} onKeyUp={handleKeyPress} placeholder='Add your skills' />
            </div>
            <div className='upload-container__card'>
            <ul className='upload-container__skills-list'>
              {inputSkillsData.map((skill, index) => (
                <li className='upload-container__skills-list-item' key={index}>{skill}</li>
              ))}
            </ul>
        </div>
        <div className='upload-container__btn-pannel'>
        <button className='upload-container__btn-save' onClick={sendSkillsToServer}>Save Resume</button>
        <Link to={'/search'}>
            <button className='upload-container__btn-search'>Search Jobs</button>
        </Link>
        </div>
        
          </div>
        </div>

      
        </>
    );
}
export default UserProfile;