import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import DonutChart from 'react-donut-chart';
import axios from 'axios';
import './SelectedJob.scss';

const SelectedJob = ()=>{
    const [selectedJob, setSelectedJob] = useState([]);
    const [resumeSkills, setResumeSkills] = useState([]);
    const [jobSkills, setJobSkills] = useState([]);
    const [machingScore, setMatchingScore] = useState('');
    const {id} = useParams();
    const {title} = useParams();
    const {company} = useParams();

    useEffect(()=>{
        const getJobDetails = async()=>{
            try{
                const response = await axios.get(`http://localhost:8080/jobs/${id}`);
                setSelectedJob(response.data.jobDescription);
                setResumeSkills(response.data.resumeSkills);
                setJobSkills(response.data.jobDescriptionSkills);
                setMatchingScore(response.data.matchingPercentage);
            }catch(error){
                console.error('Error fetching data:', error);
            }
        }
        getJobDetails();
    },[id]);

    const handleClick = (e) => {
        e.preventDefault();
        // window.history.back();
        //localStorage.removeItem('currentPage');
        //window.history.back();
        window.history.go(-1)
      };

      const score = parseInt(machingScore);
      console.log(score);

    return(
        <>
        <div className="wrapper">
            <div className="container">
                <div className="container__header">
                    <h1 className="container__header-title">
                    {title} - {company}
                    </h1>
                </div>
                <div className="container__body">
                    <div className="inside">
                        <div className="inside__left-pannel">
                            <div className="inside__chart">
                                <h2>Match Rate</h2>
                                <DonutChart className="donutchart"
                                    data={[
                                        {
                                        label: 'Your Score',
                                        value: score,
                                        },
                                        {
                                        label: '',
                                        value: 10,
                                        isEmpty: true,
                                        },
                                    ]}
                                />
                            </div>
                            <button onClick={handleClick}>Back to Job Search</button>
                        </div>
                        <div className="inside__right-pannel">
                            <div className="inside__card-pannel">
                                <div className="inside__resume-skills">
                                    <h2>Your Skills</h2>
                                    {resumeSkills.map((skil, index) => (
                                        <p key={index}>{skil}</p>
                                    ))}
                                </div>
                                <div className="inside__jobskills">
                                    <h2>Required Skills</h2>
                                    {jobSkills.map((jobSkill, index) => (
                                        <p key={index}>{jobSkill}</p>
                                    ))}
                                </div>
                            </div>
                            
                            <div className="inside__jobdescription">
                                <h2>Job Description</h2>
                                {selectedJob.map((jobDescription, index) => (
                                <p key={index}>{jobDescription}</p>
                                ))}
                            </div>
                        
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
        </>
    );
}

export default SelectedJob;