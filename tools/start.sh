#!/bin/bash
atom .
gnome-terminal -x bash -c "npm start"
gnome-terminal -x bash -c "wal"
cd public
npm run dev --watch
