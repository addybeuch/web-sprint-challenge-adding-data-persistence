const db = require("../../data/dbConfig");

async function getProjects() {
  const projects = await db("projects");
  const proRet = projects.map((project) => {
    return {
      project_id: project.project_id,
      project_name: project.project_name,
      project_description: project.project_description,
      project_completed: project.project_completed === 1 ? true : false,
    };
  });
  return proRet;
}

async function addProject(project) {
  const [project_id] = await db("projects").insert(project, [
    "project_id",
    "project_name",
    "project_description",
    "project_completed",
  ]);
  const benza = await db("projects").where("project_id", project_id).first();
  if (benza.project_completed === 1) {
    benza.project_completed = true;
  } else {
    benza.project_completed = false;
  }
  return benza;
}

module.exports = {
  getProjects,
  addProject,
};
