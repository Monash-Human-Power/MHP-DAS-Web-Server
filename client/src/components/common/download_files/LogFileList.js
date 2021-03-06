import WidgetListGroupItem from 'components/common/WidgetListGroupItem';
import React from 'react';
import { Button } from 'react-bootstrap';

/**
 * @typedef {object} LogFileListProps
 * @property {LogFile[]} files List of log files to display
 * @property {(file: string) => void} onDeleteFile Function called when user deletes a log
 */

/**
 * List of log files with delete buttons
 *
 * @param {LogFileListProps} Props props
 * @returns {React.Component<LogFileListProps>} Component
 */
export default function LogFileList({ files, onDeleteFile }) {
  if (files === null) return 'Loading...';
  if (files.length === 0) return 'No log files found.';

  const handleDelete = (event, file) => {
    event.preventDefault();
    onDeleteFile(file);
  };

  return files.map((file) => (
    <WidgetListGroupItem
      title={file.fileName}
      action
      href={file.url}
      target="_blank"
    >
      <Button variant="danger" size="sm" onClick={(e) => handleDelete(e, file)}>
        Delete
      </Button>
    </WidgetListGroupItem>
  ));
}
