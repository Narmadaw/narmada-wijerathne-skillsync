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
                if(response.data.jobDescription){
                    setSelectedJob(response.data.jobDescription);
                    setResumeSkills(response.data.resumeSkills);
                    setJobSkills(response.data.jobDescriptionSkills);
                    setMatchingScore(response.data.matchingPercentage);
                }else{
                    alert("no data");
                }

                
            }catch(error){
                console.error('Error fetching data:', error);
            }
        }
        getJobDetails();
    },[id]);

    const handleClick = (e) => {
        e.preventDefault();
        window.history.go(-1)
      };

    const score = parseInt(machingScore);
    const matchingSkills = jobSkills.filter(jobSkill => resumeSkills.includes(jobSkill));
    const missingSkills = jobSkills.filter(jobSkill => !resumeSkills.includes(jobSkill));
    const orderedSkills = matchingSkills.concat(missingSkills);
    return(
        <>
        <div className="selected-job-wrapper">
            <div className="container">
                <div className="container__header">
                    <h1 className="container__header-title">
                            Job Title : {title} - {company}
                    </h1>
                    <button className="container__btn-back" onClick={handleClick}>Back to Job Search</button>
                </div>
                <div className="container__chart">
                    <div className="container__chart-box">
                        <DonutChart className="donutchart"
                            data={[
                                    {   label:"Match Rate",
                                        value: score,
                                    },
                                    {
                                        value: 10,
                                        isEmpty: true,
                                    },
                            ]}
                        />
                    </div>
                    <div className="container__skills-pannel">
                        <div className="container__skills">
                            <h2 className="container__sub-header">Your Skills</h2>
                            <div className="container__horizontal">
                            {resumeSkills.map((skil, index) => (
                                    <p key={index}>{skil}</p>
                                ))}
                            </div>
                                
                        </div>
                        <div className="container__skills">
                            <div>
                                <h2 className="container__sub-header">Required Skills</h2>
                            </div>
                            <div className="container__horizontal">
                            {orderedSkills.map((jobSkill, index) => (
                                    <p  key={index}
                                        className={matchingSkills.includes(jobSkill) ? 'container__matching' : 'container__missing'}>
                                            {jobSkill}
                                            </p>
                                        ))} 

                            </div>
                            
                                                                 
                        </div>
                    </div>

                </div>
                <div className="container__job-description">
                    <h2>Job Description</h2>
                        {selectedJob.map((jobDescription, index) => (
                            <p key={index}>{jobDescription}</p>
                        ))}
                </div>
            </div>
        </div>
        </>
    );
}

export default SelectedJob;