/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useMemo, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.global.css';
import { FilesViewer } from './components/FilesViewer';
// import { FilesViewer } from './components/FilesViewer';

const fs = window.require('fs');
const pathModule = window.require('path');

const { app } = window.require('@electron/remote');

const formatSize = (size: number) => {
  const i: any = Math.floor(Math.log(size) / Math.log(1024));
  return `${(size / Math.pow(1024, i)).toFixed(2) * 1} ${
    ['B', 'kB', 'MB', 'GB', 'TB'][i]
  }`;
};

const Hello = () => {
  const [path, setPath] = useState(app.getAppPath());

  const files = useMemo(
    () =>
      fs
        .readdirSync(path)
        .map((file: any) => {
          const stats = fs.statSync(pathModule.join(path, file));
          return {
            name: file,
            size: stats.isFile() ? formatSize(stats.size) : null,
            directory: stats.isDirectory(),
          };
        })
        .sort((a: any, b: any) => {
          if (a.directory === b.directory) {
            return a.name.localeCompare(b.name);
          }
          return a.directory ? -1 : 1;
        }),
    [path]
  );

  const onBack = () => setPath(pathModule.dirname(path));
  const onOpen = (folder: any) => setPath(pathModule.join(path, folder));

  const [searchString, setSearchString] = useState('');
  const filteredFiles = files.filter((s: any) =>
    s.name.startsWith(searchString)
  );

  return (
    <div className="container mt-2">
      <h4>{path}</h4>
      <div className="form-group mt-4 mb-2">
        <input
          value={searchString}
          onChange={(event) => setSearchString(event.target.value)}
          className="form-control form-control-sm"
          placeholder="File search"
        />
      </div>
      <FilesViewer files={filteredFiles} onBack={onBack} onOpen={onOpen} />
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Hello} />
      </Switch>
    </Router>
  );
}
