import { useQuill } from "react-quilljs";

import "quill/dist/quill.snow.css"; 

export default () => {
  const { quill, quillRef } = useQuill({ placeholder: "123" });

  console.log(quill); 
  console.log(quillRef); 

  return (
    <div style={{ width: 500, height: 300 }}>
      <div ref={quillRef} />
    </div>
  );
};