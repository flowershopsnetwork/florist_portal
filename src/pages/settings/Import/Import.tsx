import { POST } from "@/api/restRequest";
import React, { ChangeEvent, useState } from "react";
import { toast } from "sonner";

interface UploadResponse {
  message: string;
  matched_florist_codes: string[];
  original_file_names: string[];
  stored_paths: string[];
}

const Import: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState<boolean>(false);
  const [response, setResponse] = useState<UploadResponse | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const handleUpload = async () => {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append("photos[]", file);
    });

    try {
      setUploading(true);

      const res = await POST<UploadResponse>(
        "/florist/multiple-images",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setResponse(res.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to update image.", {
        style: { backgroundColor: "#dc3545", color: "#fff" },
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
        Upload Florist Images
      </h2>

      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleFileChange}
        className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4
                           file:rounded-full file:border-0
                           file:text-sm file:font-semibold
                           file:bg-blue-50 file:text-blue-700
                           hover:file:bg-blue-100 mb-4"
      />

      <button
        onClick={handleUpload}
        disabled={uploading || files.length === 0}
        className={`w-full py-2 px-4 rounded-md text-white font-medium 
                            ${
                              uploading || files.length === 0
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-blue-600 hover:bg-blue-700"
                            }`}
      >
        {uploading ? "Uploading..." : "Upload"}
      </button>

      {response && (
        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-md">
          <h4 className="text-green-700 font-semibold mb-2">Upload Result</h4>
          <p className="text-sm text-gray-700">
            <strong>Matched Florists:</strong>{" "}
            {response.matched_florist_codes.join(", ")}
          </p>
          <p className="text-sm text-gray-700">
            <strong>Uploaded Files:</strong>{" "}
            {response.original_file_names.join(", ")}
          </p>
        </div>
      )}
    </div>
  );
};

export default Import;
