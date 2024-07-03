// src/hooks/useSignalR.js
import { useEffect, useState } from "react";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { useDispatch, useSelector } from "react-redux";
import { addMessage, setConnectionStatus } from "../slices/chatSlice";
import { setMessage } from "../slices/messagesSlice";
import fetchAndConvertImage from "../data/getImages";
import {
  addGroupMember,
  addGroupMessage,
  getGroups,
} from "../slices/friendsSlice";

const useSignalR = (userId) => {
  const dispatch = useDispatch();

  const [connection, setConnection] = useState(null);
  const username = useSelector((state) => state.auth.user.userdata[0].UserName);
  console.log(username);

  useEffect(() => {
    const newConnection = new HubConnectionBuilder()
      .withUrl(`https://academix.runasp.net/chatHub?customData=${username}`, {
        withCredentials: true, // Ensure this matches your server configuration
      })
      .configureLogging(LogLevel.Information)
      .build();

    setConnection(newConnection); // Set the connection in state

    newConnection
      .start()
      .then(() => {
        dispatch(setConnectionStatus("connected"));
        console.log("SignalR Connected.");
      })
      .catch((err) => {
        dispatch(setConnectionStatus("disconnected"));
        console.error("SignalR Connection Error: ", err);
      });

    // newConnection.onclose(async () => {
    //   console.log("Connection closed. Reconnecting...");
    //   await newConnection
    //     .start()
    //     .then(() => {
    //       dispatch(setConnectionStatus("connected"));
    //       console.log("SignalR Connected.");
    //     })
    //     .catch((err) => {
    //       dispatch(setConnectionStatus("disconnected"));
    //       console.error("SignalR Connection Error: ", err);
    //     });
    // });

    newConnection.on("ReceiveMessage", async (user, Message, File) => {
      console.log(`Message from ${user}: ${Message} ${File} `);

      let imageUrl = null;
      if (File) {
        imageUrl = await fetchAndConvertImage(File);
      }

      const processedMessage = {
        user,

        Message,
        File: imageUrl,
      };
      dispatch(addMessage(processedMessage));
      dispatch(setMessage(processedMessage));
    });

    newConnection.on("GroupCreated", (id, name) => {
      console.log(`Group from ${id}: ${name}`);
    });
    newConnection.on("DeleteGroup", (msg) => {
      console.log(`Group now ${msg}`);
      dispatch(getGroups({ UserId: userId }));
    });
    newConnection.on("RemovedFromGroup", (user, name, members) => {
      console.log(`Group now ${user}`);
      dispatch(getGroups({ UserId: userId }));
    });
    newConnection.on(
      "MemberAdded",
      (groupid, name, first, last, username, admin) => {
        console.log(`added ${first} ${last} ${admin}`);

        dispatch(
          addGroupMember({
            User: {
              UserName: username,
              FirstName: first,
              LastName: last,
              IsAdmin: admin,
            },
          })
        );
      }
    );
    newConnection.on("AddedToGroup", (groupid, name, first, last, admin) => {
      console.log(`added, ${groupid}, ${name}`);
      dispatch(getGroups({ UserId: userId }));
    });
    newConnection.on(
      "ReceiveGroupMessage",
      async (senderUserName, Message, File) => {
        let imageUrl = null;
        if (File) {
          imageUrl = await fetchAndConvertImage(File);
        }

        const processedGroupMessage = {
          senderUserName,
          Message,
          File: imageUrl,
        };
        console.log(`added, ${senderUserName}, ${Message}`);
        dispatch(addGroupMessage(processedGroupMessage));
      }
    );

    return () => {
      if (newConnection) {
        newConnection
          .stop()
          .then(() => dispatch(setConnectionStatus("disconnected")))
          .catch((err) => console.error("SignalR Disconnection Error: ", err));
      }
    };
  }, []);

  return connection;
};

export default useSignalR;
