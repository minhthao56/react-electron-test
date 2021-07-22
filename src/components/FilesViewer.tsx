/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-key */
import React from 'react';

import { IconFolder, IconFile, IconFolderOpen } from './Icon';

interface IFilesViewer {
  files?: any;
  onBack?: any;
  onOpen?: any;
}

// eslint-disable-next-line import/prefer-default-export
export const FilesViewer: React.FC<IFilesViewer> = ({
  files,
  onBack,
  onOpen,
}) => (
  <table className="table">
    <tbody>
      <tr className="clickable" onClick={onBack}>
        <td className="icon-row">
          <IconFolderOpen />
        </td>
        <td>...</td>
        <td />
      </tr>

      {files.map(({ name, directory, size }: any, i: any) => {
        return (
          <tr
            className="clickable"
            onClick={() => directory && onOpen(name)}
            key={i}
          >
            <td className="icon-row">
              {directory ? <IconFolder /> : <IconFile />}
            </td>
            <td>{name}</td>
            <td>
              <span className="float-end">{size}</span>
            </td>
          </tr>
        );
      })}
    </tbody>
  </table>
);
