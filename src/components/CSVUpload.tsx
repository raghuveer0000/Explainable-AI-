import { useState, useCallback } from "react";
import { Upload, FileSpreadsheet, X, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface CSVUploadProps {
  onFileUpload: (file: File, data: string[][]) => void;
}

const CSVUpload = ({ onFileUpload }: CSVUploadProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const parseCSV = (text: string): string[][] => {
    const lines = text.split("\n").filter(line => line.trim());
    return lines.map(line => {
      const values: string[] = [];
      let current = "";
      let inQuotes = false;
      
      for (const char of line) {
        if (char === '"') {
          inQuotes = !inQuotes;
        } else if (char === "," && !inQuotes) {
          values.push(current.trim());
          current = "";
        } else {
          current += char;
        }
      }
      values.push(current.trim());
      return values;
    });
  };

  const processFile = useCallback(async (selectedFile: File) => {
    setError(null);
    
    if (!selectedFile.name.endsWith(".csv")) {
      setError("Please upload a CSV file");
      return;
    }

    if (selectedFile.size > 10 * 1024 * 1024) {
      setError("File size must be less than 10MB");
      return;
    }

    setIsProcessing(true);
    setFile(selectedFile);

    try {
      const text = await selectedFile.text();
      const data = parseCSV(text);
      
      if (data.length < 2) {
        throw new Error("CSV must have at least a header row and one data row");
      }

      onFileUpload(selectedFile, data);
      toast({
        title: "File uploaded successfully",
        description: `${data.length - 1} records loaded from ${selectedFile.name}`,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to parse CSV file");
      setFile(null);
    } finally {
      setIsProcessing(false);
    }
  }, [onFileUpload, toast]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      processFile(droppedFile);
    }
  }, [processFile]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      processFile(selectedFile);
    }
  };

  const clearFile = () => {
    setFile(null);
    setError(null);
  };

  return (
    <div className="glass-card p-8">
      <h3 className="font-display text-xl font-semibold text-foreground mb-6">
        Upload Customer Data
      </h3>

      {!file ? (
        <div
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          className={`
            relative border-2 border-dashed rounded-xl p-12 text-center transition-all duration-300
            ${isDragging 
              ? "border-primary bg-primary/5" 
              : "border-border hover:border-primary/50 hover:bg-secondary/50"
            }
          `}
        >
          <input
            type="file"
            accept=".csv"
            onChange={handleFileSelect}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          
          <div className="flex flex-col items-center gap-4">
            <div className={`p-4 rounded-xl transition-colors ${isDragging ? "bg-primary/20" : "bg-secondary"}`}>
              <Upload className={`w-8 h-8 ${isDragging ? "text-primary" : "text-muted-foreground"}`} />
            </div>
            <div>
              <p className="text-foreground font-medium mb-1">
                {isDragging ? "Drop your file here" : "Drag & drop your CSV file"}
              </p>
              <p className="text-muted-foreground text-sm">
                or click to browse (max 10MB)
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="border border-border rounded-xl p-6 bg-secondary/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-primary/10">
                <FileSpreadsheet className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-foreground font-medium">{file.name}</p>
                <p className="text-muted-foreground text-sm">
                  {(file.size / 1024).toFixed(1)} KB
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {isProcessing ? (
                <div className="w-5 h-5 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
              ) : (
                <CheckCircle2 className="w-5 h-5 text-green-500" />
              )}
              <Button variant="ghost" size="icon" onClick={clearFile}>
                <X className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      )}

      {error && (
        <div className="mt-4 flex items-center gap-2 text-destructive text-sm">
          <AlertCircle className="w-4 h-4" />
          {error}
        </div>
      )}

      <p className="mt-4 text-muted-foreground text-sm">
        Supported format: CSV with headers. Include customer attributes like tenure, monthly charges, contract type, etc.
      </p>
    </div>
  );
};

export default CSVUpload;
