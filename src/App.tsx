import "./styles.css";
import data from "./data.json";
import { useEffect, useState } from "react";

interface FileStructureProps {
  list: {
    name: string;
    children?: FileStructureProps["list"];
  }[];
}

const FileStructureData: React.FC<FileStructureProps> = ({ list = [] }) => {
  return (
    <div style={styles.container}>
      {list.map((item, index) => (
        <FileItem key={index} item={item} />
      ))}
    </div>
  );
};

const FileItem: React.FC<{ item: { name: string; children?: any } }> = ({
  item,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={styles.folderContainer}>
      <div style={styles.folder} onClick={() => setIsOpen(!isOpen)}>
        {item.children ? (
          <span style={styles.folderText}>
            {isOpen ? "📂" : "📁"} {item.name}
          </span>
        ) : (
          <span style={styles.fileText}>📄 {item.name}</span>
        )}
      </div>

      {isOpen && item.children && (
        <div style={styles.childContainer}>
          <FileStructureData list={item.children} />
        </div>
      )}
    </div>
  );
};

// Inline styles object
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    padding: "16px",
    backgroundColor: "#f3f4f6",
    borderRadius: "8px",
    maxWidth: "400px",
  },
  folderContainer: {
    marginLeft: "16px",
    borderLeft: "2px solid #ccc",
    paddingLeft: "8px",
  },
  folder: {
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
  },
  folderText: {
    color: "#2563eb",
    fontWeight: "500",
  },
  fileText: {
    color: "#4b5563",
  },
  childContainer: {
    marginLeft: "16px",
  },
};

export default function App() {
  const [tree, setTree] = useState(data);

  return (
    <div className="App">
      <h1>File Structure</h1>
      <div className="FileMainIcons">
        <FileStructureData list={tree} />
      </div>
    </div>
  );
}
