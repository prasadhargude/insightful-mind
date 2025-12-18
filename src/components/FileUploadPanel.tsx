import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, File, X, Edit3, AlertCircle } from "lucide-react";
import { Button } from "./ui/button";
import { extractTextFromFile } from "@/services/api";

interface FileUploadPanelProps {
  onTextExtracted: (text: string) => void;
}

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_TYPES = {
  "text/plain": [".txt"],
  "application/pdf": [".pdf"],
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
};

const FileUploadPanel = ({ onTextExtracted }: FileUploadPanelProps) => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [extractedText, setExtractedText] = useState<string>("");
  const [isExtracting, setIsExtracting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    if (file.size > MAX_FILE_SIZE) {
      setError("File size exceeds 5MB limit. Please choose a smaller file.");
      return;
    }

    setError(null);
    setUploadedFile(file);
    setIsExtracting(true);

    try {
      const text = await extractTextFromFile(file);
      setExtractedText(text);
      onTextExtracted(text);
    } catch (err) {
      setError("Failed to extract text from file. Please try again or use text input.");
    } finally {
      setIsExtracting(false);
    }
  }, [onTextExtracted]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: ACCEPTED_TYPES,
    maxFiles: 1,
    maxSize: MAX_FILE_SIZE,
  });

  const clearFile = () => {
    setUploadedFile(null);
    setExtractedText("");
    setError(null);
    setIsEditing(false);
    onTextExtracted("");
  };

  const handleTextEdit = (newText: string) => {
    setExtractedText(newText);
    onTextExtracted(newText);
  };

  const dropzoneProps = getRootProps();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-4"
    >
      <AnimatePresence mode="wait">
        {!uploadedFile ? (
          <motion.div
            key="dropzone"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              {...dropzoneProps}
              className={`
                relative h-64 md:h-80 rounded-2xl border-2 border-dashed
                flex flex-col items-center justify-center gap-4 cursor-pointer
                transition-all duration-300
                ${isDragActive 
                  ? "border-primary bg-primary-soft/30" 
                  : "border-border hover:border-primary/50 hover:bg-muted/30"
                }
              `}
              role="button"
              aria-label="Upload file by clicking or dragging"
            >
              <input {...getInputProps()} aria-label="File upload input" />
              
              <div className={`
                w-16 h-16 rounded-full flex items-center justify-center
                transition-all duration-300
                ${isDragActive ? "bg-primary/20" : "bg-muted"}
              `}>
                <Upload 
                  className={`w-7 h-7 transition-colors ${isDragActive ? "text-primary" : "text-muted-foreground"}`} 
                  aria-hidden="true"
                />
              </div>

              <div className="text-center px-4">
                <p className="text-foreground font-medium mb-1">
                  {isDragActive ? "Drop your file here" : "Drag & drop your file here"}
                </p>
                <p className="text-sm text-muted-foreground">
                  or click to browse • TXT, PDF, DOCX up to 5MB
                </p>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="preview"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="rounded-2xl border border-border bg-card/50 overflow-hidden"
          >
            {/* File header */}
            <div className="flex items-center justify-between p-4 border-b border-border bg-muted/30">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary-soft flex items-center justify-center">
                  <File className="w-5 h-5 text-primary" aria-hidden="true" />
                </div>
                <div>
                  <p className="font-medium text-foreground">{uploadedFile.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {(uploadedFile.size / 1024).toFixed(1)} KB
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsEditing(!isEditing)}
                  aria-label={isEditing ? "View mode" : "Edit extracted text"}
                >
                  <Edit3 className="w-4 h-4" aria-hidden="true" />
                  <span className="hidden sm:inline ml-1">
                    {isEditing ? "Done" : "Edit"}
                  </span>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={clearFile}
                  aria-label="Remove file"
                >
                  <X className="w-4 h-4" aria-hidden="true" />
                </Button>
              </div>
            </div>

            {/* Extracted text preview/edit */}
            <div className="p-4">
              {isExtracting ? (
                <div className="h-40 flex items-center justify-center">
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
                    <p className="text-sm text-muted-foreground">Extracting text...</p>
                  </div>
                </div>
              ) : isEditing ? (
                <textarea
                  value={extractedText}
                  onChange={(e) => handleTextEdit(e.target.value)}
                  className="w-full h-48 p-3 rounded-lg border border-border bg-background
                             text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30
                             resize-none text-sm leading-relaxed"
                  aria-label="Edit extracted text"
                />
              ) : (
                <div className="h-48 overflow-y-auto p-3 rounded-lg bg-muted/30">
                  <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">
                    {extractedText}
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error message */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center gap-2 p-3 rounded-lg bg-severe-soft text-severe"
            role="alert"
          >
            <AlertCircle className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
            <p className="text-sm">{error}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default FileUploadPanel;
