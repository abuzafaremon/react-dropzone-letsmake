import React, { useCallback, useMemo, useState } from "react";
import { useDropzone } from "react-dropzone";

const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out",
};

const focusedStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};

export default function MyDropzone() {
  const [files, setFiles] = useState(null);
  const onDrop = useCallback((acceptedFiles) => {
    setFiles(acceptedFiles);
  }, []);
  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
    useDropzone({
      onDrop,
      accept: {
        "image/jpeg": [],
        "image/png": [],
        "video/mp4": [],
      },
    });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );
  return (
    <>
      <div className="container">
        <div {...getRootProps({ style })}>
          <input {...getInputProps()} />
          <p>Drag 'n' drop video files or image files here</p>
        </div>
      </div>
      <div>
        {files?.map((file, i) =>
          file.type === ("image/jpeg" || "image/png") ? (
            <img
              key={i}
              src={URL.createObjectURL(file)}
              alt={file.name}
              style={{ width: "300px", margin: "5px" }}
            />
          ) : (
            <video
              controls
              key={i}
              src={URL.createObjectURL(file)}
              alt={file.name}
              style={{ width: "300px", margin: "5px" }}
            />
          )
        )}
      </div>
    </>
  );
}
