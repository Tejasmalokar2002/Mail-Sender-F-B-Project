import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import bgImage from './peter-rovder-X_5kMOSxLzw-unsplash.jpg';

const Input = styled("input")({
  display: "none",
});

const EmailForm = () => {
  const [formData, setFormData] = useState({
    to: "",
    cc: "",
    subject: "",
    body: "",
    excelFile: null,
    zipFiles: [],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleExcelUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
      setFormData({ ...formData, excelFile: file });
    } else {
      alert("Please upload a valid Excel file.");
    }
  };

  const handleZipUpload = (e) => {
    setFormData({ ...formData, zipFiles: Array.from(e.target.files) });
  };

  const handleBodyChange = (content) => {
    setFormData({ ...formData, body: content });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    alert("Form Submitted!");
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md max-w-lg w-full mt-10 mb-8" // Added mb-8 for bottom margin
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Email Form</h2>

        <div className="space-y-4">
          <TextField
            label="To"
            name="to"
            fullWidth
            variant="outlined"
            value={formData.to}
            onChange={handleInputChange}
          />

          <TextField
            label="CC"
            name="cc"
            fullWidth
            variant="outlined"
            value={formData.cc}
            onChange={handleInputChange}
          />

          <label>
            <span className="text-gray-700">From (Excel file only):</span>
            <div className="mt-1 flex items-center space-x-4">
              <Input
                accept=".xlsx"
                id="excel-file"
                type="file"
                onChange={handleExcelUpload}
              />
              <Button
                variant="contained"
                component="span"
                className="bg-blue-500 text-white hover:bg-blue-700"
              >
                Upload Excel
              </Button>
            </div>
          </label>

          <label>
            <span className="text-gray-700">Upload ZIP Files:</span>
            <div className="mt-1 flex items-center space-x-4">
              <Input
                accept=".zip"
                id="zip-files"
                type="file"
                multiple
                onChange={handleZipUpload}
              />
              <Button
                variant="contained"
                component="span"
                className="bg-green-500 text-white hover:bg-green-700"
              >
                Upload ZIPs
              </Button>
            </div>
          </label>

          <TextField
            label="Subject"
            name="subject"
            fullWidth
            variant="outlined"
            value={formData.subject}
            onChange={handleInputChange}
          />

          <div>
            <span className="text-gray-700">Body:</span>
            <ReactQuill
              theme="snow"
              value={formData.body}
              onChange={handleBodyChange}
              className="mt-6"
              style={{ height: '200px', fontSize: '16px' }} // Increased height and font size for body input
            />
          </div>
        </div>

        <Button
          type="submit"
          fullWidth
          variant="contained"
          style={{width:'100px', alignItems:'center', display:'flex', justifyContent:'center', left:'40%'}}
          className=" bg-indigo-500 text-white hover:bg-indigo-700"
        >
          Submit
        </Button>
      </form>
      
    </div>
  );
};

export default EmailForm;
