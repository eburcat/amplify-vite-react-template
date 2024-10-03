import '@aws-amplify/ui-react/styles.css'
//import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { signInWithRedirect, signOut, getCurrentUser, fetchUserAttributes, fetchAuthSession } from 'aws-amplify/auth';
import { Hub } from 'aws-amplify/utils';

Hub.listen('auth', async ({payload}) => {
  switch (payload.event) {
    case "signInWithRedirect":
      const user = await getCurrentUser();
      const userAttributes = await fetchUserAttributes();
      console.log({user, userAttributes});
      break;
    case "signInWithRedirect_failure":
      console.log(payload);
      break;
    default:
      console.log(payload);
  }
});

const client = generateClient<Schema>();

function App() {

  /*const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);

  useEffect(() => {
    client.models.Todo.observeQuery().subscribe({
      next: (data) => setTodos([...data.items]),
    });
  }, []);*/

  function createTodo() {
    client.models.Todo.create({ content: window.prompt("Todo content") });
  }

  /*function deleteTodo(id: string) {
    client.models.Todo.delete({id});
  }*/

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

  const signOutFunc = async () => {
    console.log("j");
    try {
      await signOut();
    } catch (error) {
      console.error('Error during sign-out:', error);
    }
  };

  const getUser = async () => {
    console.log("i");
    try {
      const currentUser = await getCurrentUser();

      console.log(currentUser);
    } catch (error) {
      console.error('Error during sign-in:', error);
    }
  };

  const getSession = async () => {
    console.log("k");
    try {
      const session = await fetchAuthSession();
      
      console.log("id token", session.tokens?.idToken);
      console.log("access token", session.tokens?.accessToken);
    } catch (error) {
      console.error('Error during sign-in:', error);
    }
  };

  return (
    <main>
      <button onClick={signInWithOneLogin}>Sign In with OneLogin</button>
      <button onClick={signOutFunc}>Sign out</button>
      <button onClick={getUser}>Get User Details</button>
      <button onClick={getSession}>Get Session Details</button>
      <p></p>
      <h1>Todos</h1>
      <button onClick={createTodo}>+ new</button>
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
