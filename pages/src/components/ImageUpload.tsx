import React, { useState } from 'react';

const ImageUpload: React.FC<{ onUpload: (file: File) => void }> = ({ onUpload }) => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedFile(file);
        }
    };

    const handleUpload = async () => {
        if (selectedFile) {
            await onUpload(selectedFile);
            setSelectedFile(null);
        }
    };

    return (
        <div className="image-upload">
            <input type="file" accept="image/*" onChange={handleFileChange} />
            <button onClick={handleUpload} disabled={!selectedFile}>
                上传图片
            </button>
        </div>
    );
};

export default ImageUpload;