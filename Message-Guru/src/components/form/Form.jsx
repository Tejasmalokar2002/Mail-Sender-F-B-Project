import React, { useState } from 'react';
import { Box, Button, TextField, Stack, Typography } from '@mui/material';
import { ArrowForward, ArrowBack } from '@mui/icons-material';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; 
import backgroundImage from './peter-rovder-X_5kMOSxLzw-unsplash.jpg'; 
import pngImage from './pngwing.com.png'; 

const FormComponent = () => {
    const [step, setStep] = useState(1);

    const [formData, setFormData] = useState({
        to: '',
        cc: '',
        from: null,
        zip: [],
        subject: '',
        body: '',
    });

    const [fileInputsDisabled, setFileInputsDisabled] = useState(true); 
    const [fromFileName, setFromFileName] = useState(""); 
    const [zipFileNames, setZipFileNames] = useState([]); 

    
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };


    const handleFileChange = (e) => {
        const { name, files } = e.target;

        if (files.length > 0) {
            if (name === 'from' && !files[0].name.endsWith('.xlsx')) {
                alert('Error: Please select Excel File only');
                return;
            }
            if (name === 'zip' && !files[0].name.endsWith('.zip')) {
                alert('Error: Please select ZIP File only');
                return;
            }


            setFormData({ ...formData, [name]: files });
            if (name === 'from') setFromFileName(files[0].name);

     
            if (name === 'zip') {
                setFormData({ ...formData, [name]: files });
                const fileNames = Array.from(files).map(file => file.name);
                setZipFileNames(fileNames);
            }
        }
    };


    const handleEditorChange = (value) => {
        setFormData({ ...formData, body: value });
    };


   const handleSubmit = async () => {
    console.log('Form data submitted:', formData);
};
    return (
        <div
            style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundColor: 'darkviolet',
                backgroundSize: 'cover',
                height: '100vh',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh',
                    padding: '20px',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        width: '70%',
                        backgroundColor: 'white',
                        borderRadius: '10px',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    }}
                >
                    {/* Left Box with PNG Image */}
                    <Box sx={{ width: '50%', padding: '20px' }}>
                        <img
                            src={pngImage}
                            alt="Image"
                            style={{
                                width: '100%',
                                height: 'auto',
                                objectFit: 'cover',
                            }}
                        />
                    </Box>

                    {/* Right Box with Form */}
                    <Box sx={{ width: '50%', padding: '20px', marginTop: '20px' }}>
                        {step === 1 && (
                            <Stack spacing={2}>
                                <Typography variant="h5" align="center" sx={{ marginBottom: '20px' }}>
                                    Email Title
                                </Typography>
                                <TextField
                                    fullWidth
                                    label="To"
                                    variant="outlined"
                                    name="to"
                                    value={formData.to}
                                    onChange={handleInputChange}
                                />
                                <TextField
                                    fullWidth
                                    label="CC"
                                    variant="outlined"
                                    name="cc"
                                    value={formData.cc}
                                    onChange={handleInputChange}
                                />
                                <Button
                                    variant="contained"
                                    component="label"
                                    fullWidth
                                    onClick={() => setFileInputsDisabled(false)}
                                >
                                    From (Only .xlsx)
                                    <input
                                        type="file"
                                        accept=".xlsx"
                                        name="from"
                                        hidden
                                        disabled={fileInputsDisabled}
                                        onChange={handleFileChange}
                                    />
                                </Button>
                                {fromFileName && (
                                    <Typography variant="body2" sx={{ marginTop: '5px' }}>
                                        Selected File: {fromFileName}
                                    </Typography>
                                )}
                                <Button
                                    variant="contained"
                                    component="label"
                                    fullWidth
                                    onClick={() => setFileInputsDisabled(false)}
                                >
                                    Upload ZIP (Multiple)
                                    <input
                                        type="file"
                                        accept=".zip"
                                        name="zip"
                                        multiple
                                        hidden
                                        disabled={fileInputsDisabled}
                                        onChange={handleFileChange}
                                    />
                                </Button>
                                {zipFileNames.length > 0 && (
                                    <Typography variant="body2" sx={{ marginTop: '5px' }}>
                                        Selected Files: {zipFileNames.join(', ')}
                                    </Typography>
                                )}

                                <Button
                                    variant="contained"
                                    sx={{
                                        alignSelf: 'flex-end',
                                        backgroundColor: 'blue',
                                    }}
                                    onClick={() => setStep(2)}
                                    endIcon={<ArrowForward />}
                                >
                                    Next
                                </Button>
                            </Stack>
                        )}

                        {step === 2 && (
                           <div>
                           <Stack spacing={2}>
                               <Typography variant="h5" align="center" sx={{ marginBottom: '40px' }}>
                                   Email Title
                               </Typography>
                               <TextField
                                   fullWidth
                                   label="Subject"
                                   variant="outlined"
                                   name="subject"
                                   value={formData.subject}
                                   onChange={handleInputChange}
                               />
                           </Stack>
                       
                           <div>
                               <Box sx={{ marginBottom: '40px', border: '1px solid gray', marginTop: '20px' }}>
                                   <label>Body</label>
                                   <ReactQuill
                                       value={formData.body}
                                       onChange={handleEditorChange}
                                       theme="snow"
                                       style={{ height: '50px', minHeight: '250px', overflow: 'hidden' }}
                                   />
                               </Box>
                           </div>
                       
                           <div style={{ display: 'flex', flexDirection: 'row', gap: '10px', marginTop: '20px' }}>
                               <Button
                                   variant="contained"
                                   color="secondary"
                                   startIcon={<ArrowBack />}
                                   onClick={() => setStep(1)}
                               >
                                   Back
                               </Button>
                       
                               <Button
                                   variant="contained"
                                   onClick={handleSubmit}
                                   sx={{
                                       backgroundColor: 'green',
                                   }}
                               >
                                   Submit
                               </Button>
                           </div>
                       </div>
                       



                        )}
                    </Box>
                </Box>
            </Box>
        </div>
    );
};

export default FormComponent;
