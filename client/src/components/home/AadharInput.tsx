import React, { useRef, useState, useEffect } from "react";
import { UploadCloud, X } from "lucide-react";
import { fileToBase64 } from "../lib/utils";

interface AadharInputProps {
  label: string;
  onDrop: (file: File | null) => void;
}

const AadharInput: React.FC<AadharInputProps> = ({ label, onDrop }) => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let isMounted = true;

    const getPreview = async () => {
      try {
        if (file) {
          const base64 = await fileToBase64(file);

          if (isMounted) {
            setPreview(base64);
          }
        } else {
          setPreview(null);
        }
      } catch (error) {
        console.error("Error converting file:", error);
      }
    };

    getPreview();

    return () => {
      isMounted = false;
    };
  }, [file]);

  const handleFile = (selectedFile: File) => {
    setFile(selectedFile);
    onDrop(selectedFile);
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFile(null);
    onDrop(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <div
      className="flex flex-col gap-3"
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        e.preventDefault();
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
          handleFile(e.dataTransfer.files[0]);
        }
      }}
    >
      <input
        type="file"
        ref={inputRef}
        className="hidden"
        onChange={(e) => {
          if (e.target.files && e.target.files.length > 0) {
            handleFile(e.target.files[0]);
          }
        }}
        accept="image/*"
      />
      <span className="text-[15px] font-semibold text-primary">{label}</span>

      {preview ? (
        <div className="relative w-full h-48 rounded-2xl overflow-hidden border-2 border-secondary shadow-sm">
          <img
            src={preview}
            alt={label}
            className="w-full h-full object-cover"
          />
          <button
            onClick={handleRemove}
            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1.5 hover:bg-red-600 transition-colors shadow-md"
            title="Remove Image"
          >
            <X size={16} strokeWidth={2.5} />
          </button>
        </div>
      ) : (
        <div
          className="bg-base rounded-2xl py-10 px-5 flex flex-col items-center justify-center gap-4 shadow-sm cursor-pointer transition-all duration-200 border-2 border-dashed border-secondary hover:border-primary hover:bg-secondary/15 h-48"
          onClick={() => inputRef.current?.click()}
        >
          <div className="text-base bg-primary rounded-full w-12 h-12 flex items-center justify-center shadow-md">
            <UploadCloud size={24} strokeWidth={2.5} />
          </div>
          <span className="text-sm text-primary font-semibold text-center break-all">
            Click here to Upload/Capture
          </span>
        </div>
      )}
    </div>
  );
};

export default AadharInput;
