import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Link } from 'react-router-dom';
import './UserProfile.scss';


const UserProfile = () => {
  const [file, setFile] = useState(null);
  const [personalData, setPersonalData] = useState([]);
  const [experience, setExperience] = useState([]);
  const [skills, setSkills] = useState([]);
  const [education, setEducation] = useState([]);
  const [certificate, setCertificate] = useState([]);
  const [resumeRecords, setResumeRecords] = useState(
    JSON.parse(localStorage.getItem('resumeRecords')) || []
  );

  useEffect(() => {
    const storedRecords = JSON.parse(localStorage.getItem('resumeRecords'));
    if (storedRecords) {
      setPersonalData(storedRecords.personal_infos)
      setExperience(storedRecords.work_experience.entries);
      setEducation(storedRecords.education.entries);
      setCertificate(storedRecords.certifications);
      setSkills(storedRecords.skills);
      
    }
  }, []);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };
   useEffect(() => {
    if(!resumeRecords){
      handleUpload();
    }
    else{
    }
    
  }, [file]);

  const handleUpload = async () => {
    if (!file) {
      console.error('No file selected');
      return;
    }

    const formData = new FormData();
    formData.append('show_original_response', 'false');
    formData.append('fallback_providers', '');
    formData.append('providers', 'affinda');
    formData.append('file', file);

    const options = {
      method: 'POST',
      url: 'https://api.edenai.run/v2/ocr/resume_parser',
      headers: {
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiODk4OWEzMjItZjU1OS00NzM5LTg0MTgtMzU2Nzk1MTI5YjYwIiwidHlwZSI6ImFwaV90b2tlbiJ9.T6k_M-v6qqbiHRfnDFv3Woxpe30xFBSJbNr1p68zS5Q', // Replace with your actual API key
        'Content-Type': 'multipart/form-data',
      },
      data: formData,
    };

    try {
      const response = await axios(options);
      const extractedData = response.data.affinda.extracted_data;
        localStorage.setItem('resumeRecords', JSON.stringify(extractedData));
        setPersonalData(extractedData.personal_infos);
        setExperience(extractedData.work_experience.entries);
        setEducation(extractedData.education.entries);
        setCertificate(extractedData.certifications);
        setSkills(extractedData.skills);
      
    } catch (error) {
      console.error(error);
    }
  };

  const sendSkillsToServer = async (skills) => {
    try {
      console.log(skills)
      const response = await axios.post('http://localhost:8080/jobs', { resume: skills });
      console.log('Skills sent to server:', response.data);
    } catch (error) {
      console.error('Error sending skills to server:', error);
    }
  };

  return (
    <>
    <div className="profile-wrapper">
           <div className="upload-container">
             <div className='upload-container__card'>
               <CloudUploadIcon color="primary" fontSize="large"/> 
             </div>
             <div className='upload-container__card'>
               <h1>Upload your resume to get started</h1>
             </div>
             <div className='upload-container__card'>
               <input className='upload-container__btn-upload' type="file" accept=".pdf, .doc, .docx" onChange={handleFileChange} />
             </div>
         <div className='upload-container__btn-pannel'>
       
         <Link to={'/search'}>
             <button className='upload-container__btn-search'>Search Jobs</button>         </Link>
         </div>
        
         </div>

         <div className='resume-container'>
          <div>
            <h2>Personal Details</h2>
            
            {/* <h2>{personalData.name.raw_name}</h2> */}
            {/* <ul>
            {personalData?.map((item, index) => (
              <li key={index}>{item.name}</li>
            ))}
            </ul> */}
          </div>
          <div>
            <h2>Work Experience</h2>
            <ul>
                {experience.map((item, index) => {
                return (
                  <li key={index}>
                    
                    <p>
                    {item.title}
                    </p>

                    <p>
                    {item.start_date} - {item.end_date}
                    </p>

                    <p>
                    {item.company} 
                    </p>
                  </li>
                );
              })}
            </ul>
          </div>
          <div>
            <h2>Education</h2>
            <ul>
            {education.map((item, index) => {
                    return (
                      <li key={index}>
                        <p>{item.accreditation}</p>
                        <p>{item.start_date} - {item.end_date}</p>
                        <p>{item.establishment}</p>

                        {/* Use map to render each location */}
                        <p>
                          {/* {item.location?.map((loc, index) => {
                            return (
                              <p key={index}>
                                {loc.city} - {loc.country}
                              </p>
                            );
                          })} */}
                        </p>
                      </li>
                    );
                  })}
            </ul>
          </div>
          <div>
            <h2>Certification</h2>
            <ul>
                {certificate.map((item, index) => {
                return (
                  <li key={index}>{item.name}</li>
                );
              })}
            </ul>
          </div>
          <div>
            <h2>Skills</h2>
            <ul>
                          {skills.map((item, index) => {
                return (
                  <li key={index}>{item.name}</li>
                );
              })}
            </ul>
          </div>
         </div>
    </div>
    </>
  );
};

export default UserProfile;
