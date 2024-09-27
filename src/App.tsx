import '@aws-amplify/ui-react/styles.css'
import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { signInWithRedirect } from 'aws-amplify/auth';

const client = generateClient<Schema>();

function App() {

  const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);

  useEffect(() => {
    client.models.Todo.observeQuery().subscribe({
      next: (data) => setTodos([...data.items]),
    });
  }, []);

  function createTodo() {
    client.models.Todo.create({ content: window.prompt("Todo content") });
  }

  function deleteTodo(id: string) {
    client.models.Todo.delete({id});
  }

  const signInWithOneLogin = async () => {
    console.log("h");
    try {
      await signInWithRedirect({
        provider: {
          custom: 'OneLoginLogUInSAML',
        },
      });
    } catch (error) {
      console.error('Error during sign-in:', error);
    }
  };

  return (
    <main>
      <button onClick={signInWithOneLogin}>Sign In with OneLogin</button>
      <h1>Todos</h1>
      <button onClick={createTodo}>+ new</button>
      <ul>
        {todos.map((todo) => (
          <li
            onClick={() => deleteTodo(todo.id)}
            key={todo.id}>
            {todo.content}
          </li>
        ))}
      </ul>
      <div>
        🥳 App successfully hosted. Try creating a new todo.
        <br />
        <a href="https://docs.amplify.aws/react/start/quickstart/#make-frontend-updates">
          Review next step of this tutorial.
        </a>
      </div>
    </main>
  )
}

export default App;
