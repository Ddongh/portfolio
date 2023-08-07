import Axios from "axios";
import React from "react";

const ChatMain = ()=>{
    const variable = {roomId:'12345'};
        Axios.post('/api/chat/chatTest', variable)
        .then(response => {
            console.log(response);
        })
        .catch(err => {
            console.log(err.response.data);
            
        });
    return <>chat</>
}

export default ChatMain;