import React, {useState, useEffect} from 'react'
import client, { databases, DATABASE_ID, COLLECTION_MESSAGES_ID } from '../appwriteConfig'
import { ID, Query, Role, Permission } from 'appwrite';
import { Trash2 } from 'react-feather';
import Header from '../components/Header';
import { useAuth } from '../utils/AuthContext';

const Room = () => {
  const { user } = useAuth()

  const [messages, setMessages] = useState([]);
  const [messageBody, setMessageBody] = useState('');

  useEffect(() => {
    // Fetch initial messages and subscribe to changes
    getMessages()

    const unsubscrbe = client.subscribe(`databases.${DATABASE_ID}.collections.${COLLECTION_MESSAGES_ID}.documents`, response => {
      // Callback will be executed on changes for documents & all files
      if(response.events.includes("databases.*.collections.*.documents.*.create")){
        console.log("A Message Was Created!")
        setMessages(prevState => [response.payload, ...prevState])
      }

      if(response.events.includes("databases.*.collections.*.documents.*.delete")){
        console.log("A Message Was Deleted!!!!")
        setMessages(prevState => prevState.filter(message => message.$id !== response.payload.$id))
      }

    });
    //cleanup function
    return () => {
        unsubscrbe();
    }
  }, [])

  const handleSubmit = async(e) => {
    e.preventDefault()

    let payload = {
      user_id:user.$id,
      user_name:user.name,
      body: messageBody,
    }

    let permissions = [
      //CRUD
      Permission.write(Role.user(user.$id))
    ]

    let response = await databases.createDocument(
      DATABASE_ID,
      COLLECTION_MESSAGES_ID,
      ID.unique(),
      payload,
      permissions,
    )
    console.log("Created Message!", response)
    //setMessages(prevState => [response, ...prevState])
    setMessageBody('');
  }

  const getMessages = async () => {
     // Fetch the latest messages
    const response = await databases.listDocuments(
        DATABASE_ID, 
        COLLECTION_MESSAGES_ID,
      [
        Query.orderAsc('$createdAt'),
        Query.limit(10),
      ])
    console.log("Response: ", response);
    setMessages(response.documents);
  }

  const deleteMessage = async (message_id) => {
    // Delete a message by ID
    databases.deleteDocument(DATABASE_ID, COLLECTION_MESSAGES_ID, message_id);
  }

  return (
    <main className='container'>
            <Header />
      <div className='room--container'>
        <form onSubmit={handleSubmit} id='message--form'>
          <div>
            <textarea 
                required
                maxLength={1000} 
                placeholder='Say Something..'
                onChange={(e) => {setMessageBody(e.target.value)}}
                value={messageBody}
                ></textarea>
          </div>
          
          <div className='send-btn--wrapper'>
            <input className='btn btn--secondary' type="submit" value='Send'></input>
          </div>
        </form>

        <div>
          {messages.map(message => (
            <div key={message.$id} className='message--wrapper'>

              <div className='message--header'>
                <p>
                  {message?.user_name ? 
                  <span>{message.user_name}</span> : (
                    <span>Anonymouse User</span>
                  )}
                  <small className='message-timestamp'>{new Date(message.$createdAt).toLocaleString()}</small>
                </p>
                
                {message.$permissions.includes(`delete(\"user:${user.$id}\")`) && (
                <Trash2 
                onClick={() => deleteMessage(message.$id)} className='delete--btn'/>
                )}
                
              </div>
              <div  className='message--body'>
              <span>{message.body}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </main>
  )
}

export default Room