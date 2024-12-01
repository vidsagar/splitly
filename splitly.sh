#!/bin/bash

# Variables
source ./source.env

# SSH and deploy
echo "Deploying React app to the server...on $PORT"

# Copy build files to the server
scp -r $LOCAL_BUILD_PATH/* $SERVER_USER@$SERVER_IP:$DEST_PATH

# SSH and deploy

ssh $SERVER_USER@$SERVER_IP "
  PORT=$PORT
  DEST_PATH=$DEST_PATH
  PID=\$(sudo -S lsof -t -i:\$PORT)
  echo \"Port \$PORT is currently in use by PID: \$PID\"
  
  if [ -n \"\$PID\" ]; then
    echo \"Killing process (PID: \$PID)\"
    sudo kill -9 \$PID
  else
    echo \"No process found to kill on port \$PORT\"
  fi

  echo \"Serving the React app from \$DEST_PATH on port \$PORT...\"
  cd \$DEST_PATH
  serve -s . -l \$PORT
"