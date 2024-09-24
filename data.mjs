import fs from "fs/promises";

const createHtmlTemplate = (htmlInjection) => `
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>

<body style="font-family: Arial, Helvetica, sans-serif;">

  <div style="width: min(100% - 40px); margin-inline: auto;">
    ${htmlInjection}
  </div>

</body>

</html>`;

const rootHtmlTemplate = createHtmlTemplate(
  `<h1>Hello from HTTP Server</h1><a href='/todos'>Todos</a>&nbsp;&nbsp;<a href='/form'>Form</a>`
);
const notFoundTemplate = createHtmlTemplate(`<h1>404 - Page not found</h1>`);

let formTemplate = "";

const loadFormTemplate = async () => {
  try {
    formTemplate = await fs.readFile("./template/form.html", "utf-8");
  } catch (error) {
    console.error("Error loading form template", error);
  }
};

loadFormTemplate().catch(console.log);

const generateTodosTemplate = () => {
  const todosHtml = todos
    .map((todo) => {
      return `<div style="margin-bottom: 10px; padding: 10px; border: 1px solid #ccc">
    <h2>${todo.title}</h2>
    <p>User ID: ${todo.userId}</p>
    <p>id: ${todo.id}</p>
    <p>Completed: ${todo.completed ? "Yes" : "No"}</p>
  </div>`;
    })
    .join("");

  const buttonHtml = `<button onclick="location.href='/form'" type="button">Add new todo</button>`;

  // console.log(todosHtml)

  return createHtmlTemplate(`${todosHtml}${buttonHtml}`);
};

const todos = [
  {
    userId: 1,
    id: 1,
    title: "delectus aut autem",
    completed: false,
  },
  {
    userId: 1,
    id: 2,
    title: "quis ut nam facilis et officia qui",
    completed: false,
  },
  {
    userId: 1,
    id: 3,
    title: "fugiat veniam minus",
    completed: false,
  },
  {
    userId: 1,
    id: 4,
    title: "et porro tempora",
    completed: true,
  },
  {
    userId: 1,
    id: 5,
    title: "laboriosam mollitia et enim quasi adipisci quia provident illum",
    completed: false,
  },
];

export {
  rootHtmlTemplate,
  notFoundTemplate,
  todos,
  formTemplate,
  loadFormTemplate,
  generateTodosTemplate,
};
