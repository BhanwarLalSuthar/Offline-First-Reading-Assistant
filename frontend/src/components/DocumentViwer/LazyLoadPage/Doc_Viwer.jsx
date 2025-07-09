import  { useState } from 'react';
import LazyLoadPage from './LazyLoadPage';
import AnnotationLayer from '../Annotation/AnnotationLayer';

export default function Viewer() {
  const [file, setFile] = useState(null);
  const [fileType, setFileType] = useState('');
  const [textContent, setTextContent] = useState('');

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (!selectedFile) return;

    const extension = selectedFile.name.split('.').pop().toLowerCase();
    setFileType(extension);
    setFile(selectedFile);
    setTextContent('');

    if (['txt', 'html'].includes(extension)) {
      const reader = new FileReader();
      reader.onload = (e) => setTextContent(e.target.result);
      reader.readAsText(selectedFile);
    }
  };

  const renderViewer = () => {
    if (!file) return <div style={{ padding: '1rem' }}>No file selected</div>;

    if (['png', 'jpg', 'jpeg', 'gif', 'bmp', 'webp'].includes(fileType)) {
 
      const width = 800;
      const height = 600;
      return (
        <div style={{ position: 'relative', width, height, maxWidth: '100%', margin: '0 auto' }}>
          <LazyLoadPage src={URL.createObjectURL(file)} alt="Uploaded" type="image" style={{ width: '100%',
          height: '100%',
          objectFit: 'contain',
          display: 'block',}} />
          <AnnotationLayer width={width} height={height} storageKey={`annotation-${file.name}`} imageSrc={URL.createObjectURL(file)} />
        </div>
      );
    }

    if (['txt', 'html'].includes(fileType)) {
      return (
        <div style={{ whiteSpace: 'pre-wrap', padding: '1rem', maxHeight: '80vh', overflowY: 'auto' }}>
          {textContent}
        </div>
      );
    }

    if (fileType === 'pdf') {
      return (
        <iframe
          src={URL.createObjectURL(file)}
          title="PDF Preview"
          width="100%"
          height="600px"
          style={{ border: 'none' }}
        />
      );
    }

    // For unsupported types (docx, xlsx, etc.)
    return (
      <div style={{ padding: '1rem' }}>
        Preview not supported for .{fileType} files.
        <br />
        <a href={URL.createObjectURL(file)} download={file.name}>
          Download file
        </a>
      </div>
    );
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
      <h2>📄 Universal Document Viewer</h2>
      <input type="file" onChange={handleFileChange} style={{ marginBottom: '1rem' }} />
      <div style={{ border: '1px solid #ccc', minHeight: '300px', padding: '1rem', borderRadius: '4px' }}>
        {renderViewer()}
      </div>
    </div>
  );
}
