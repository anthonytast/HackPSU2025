import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

function Projects() {
    const router = useRouter();
    const{email} = router.query;
    const[projects, setProjects] = useState([]);
    const[Popup, setPopup] = useState("");
    
    useEffect(() => {
        async function fetchProjects(){
            if(!email) return;

            try {
                const response = await fetch(`/api/get-projects?email=${email}`)
                const data = await response.json();

                if(response.ok){
                    setProjects(data.projects)
                }

            }catch(error){
                console.log("Fetching projects error" + error);
            }
        }

        fetchProjects();
    }, [email])


    const handleSelectProject = (projectName) => {
        console.log(`Selected project: ${projectName}`);
        // alert(`You selected: ${projectName}`);
        // Add logic to navigate to the selected project's page or load its data
    };

    const handleAddProject = async (projectName) =>{
        try{
            const response = await fetch("/api/add-project", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({email, projectName})
            })

            if(response.ok){
                alert("Project added!")
            }else{
                const errorData = await response.json();
                alert(errorData.error || "Failed to add project.")
            }

        }catch(error){
            console.log(error);
        }
    }


    return (
        <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
            <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Select a Project</h1>
            
            {projects.length == 0? (
                <p style={{ textAlign: "center", fontSize: "18px", color: "#555" }}>
                Currently No Projects
            </p>
            ): (
                
                <div
                style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "20px",
                    justifyContent: "center",
                }}
            >
                {projects.map((project) => (
                    <div
                        key={project.id}
                        style={{
                            border: "1px solid #ccc",
                            borderRadius: "10px",
                            padding: "20px",
                            width: "200px",
                            textAlign: "center",
                            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                        }}
                    >
                        <h3>{project.name}</h3>
                        <button
                            onClick={() => handleSelectProject(project.name)}
                            style={{
                                marginTop: "10px",
                                padding: "10px 15px",
                                backgroundColor: "#007bff",
                                color: "white",
                                border: "none",
                                borderRadius: "5px",
                                cursor: "pointer",
                            }}
                        >
                            Select
                        </button>
                    </div>
                ))}
            </div>

            )}
            
            

            {Popup && (
                <div
                    style={{
                        position: "fixed",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        backgroundColor: "white",
                        padding: "20px",
                        borderRadius: "10px",
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                        zIndex: 1000,
                    }}
                >
                    <h2> Add New Project </h2>
                    <input
                        type="text"
                        value={newProjectName}
                        onChange={(e) => setNewProjectName(e.target.value)}
                        placeholder="Enter project name"
                        style={{
                            width: "100%",
                            padding: "10px",
                            marginBottom: "10px",
                            border: "1px solid #ccc",
                            borderRadius: "5px",
                        }}   
                    />
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <button
                            onClick={handleAddProject}
                            style={{
                                padding: "10px 15px",
                                backgroundColor: "#007bff",
                                color: "white",
                                border: "none",
                                borderRadius: "5px",
                                cursor: "pointer",
                            }}
                        >
                            Add
                        </button>
                        <button
                            onClick={() => setShowPopup(false)} // Close the popup
                            style={{
                                padding: "10px 15px",
                                backgroundColor: "#dc3545",
                                color: "white",
                                border: "none",
                                borderRadius: "5px",
                                cursor: "pointer",
                            }}
                        >
                            Cancel
                        </button>
                    </div>
                        

                </div>
            )}



        </div>




    );
}

export default Projects;