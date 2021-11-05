const db = require("../../data/dbConfig");

async function getTasks() {
  const tasks = await db("tasks as t")
    .leftJoin("projects as pr", "t.project_id", "pr.project_id")
    .select(
      "task_id",
      "task_description",
      "task_notes",
      "task_completed",
      "project_name",
      "project_description"
    );

  const newTask = tasks.map((task) => {
    const output = {
      task_id: task.task_id,
      task_description: task.task_description,
      task_notes: task.task_notes,
      task_completed: task.task_completed === 1 ? true : false,
      project_name: task.project_name,
      project_description: task.project_description,
    };
    return output;
  });
  return newTask;
}

async function addTask(task) {
  const [task_id] = await db("tasks").insert(task, [
    "task_id",
    "task_notes",
    "task_description",
    "task_completed",
    "project_id",
  ]);
  const benza = await db("tasks").where("task_id", task_id).first();
  if (benza.task_completed === 1) {
    benza.task_completed = true;
  } else {
    benza.task_completed = false;
  }
  return benza;
}

module.exports = {
  getTasks,
  addTask,
};
