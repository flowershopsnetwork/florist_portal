// import { GET, POST, PUT } from "@/api/restRequest";
// import { fetchFloristById } from "@/api/services/floristService";
// import { Button } from "@/ComponentModule";
// import { ChangeEvent, useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { toast } from "sonner";

// const FloristPhoto = () => {
//   const { id } = useParams();
//   const floristId = Number(id);
//   const [photo, setPhoto] = useState<File | null>(null);
//   const [imagePreview, setImagePreview] = useState<string | null>(null);

//   const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files.length > 0) {
//       const selectedPhoto = e.target.files[0];
//       setPhoto(selectedPhoto);
//       const previewUrl = URL.createObjectURL(selectedPhoto);
//       setImagePreview(previewUrl);
//     }
//   };

//   const handleUploadClick = async () => {
//     if (!photo) {
//       toast.error("Please select a photo to upload.", {
//         style: { backgroundColor: "#dc3545", color: "#fff" },
//       });
//       return;
//     }

//     const formData = new FormData();
//     formData.append("photo", photo);

//     try {
//       const module = "florists";
//       const response = await POST(`/photo/${module}`, formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });

//       const photoUrl = response.data.photo_url;
//       if (photoUrl) {
//         const saveResponse = await PUT(`/florists/${floristId}/photo`, {
//           photo_url: photoUrl,
//         });

//         toast.success(saveResponse.data.message, {
//           style: { backgroundColor: "#28a745", color: "#fff" },
//         });

//         const imageRes = await GET(`/photo/florists/${photoUrl}`, {
//           responseType: "blob",
//         });
//         const imageBlob = imageRes.data;
//         const imageObjectUrl = URL.createObjectURL(imageBlob);
//         setImagePreview((prev) => {
//           if (prev) URL.revokeObjectURL(prev);
//           return imageObjectUrl;
//         });
//       } else {
//         throw new Error("Photo URL not received from the upload.");
//       }
//     } catch (error: any) {
//       console.error(error);
//       toast.error("Photo upload or save failed.", {
//         style: { backgroundColor: "#dc3545", color: "#fff" },
//       });
//     }
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await fetchFloristById(floristId);
//         if (res.data.photo_url) {
//           const imageRes = await GET(`/photo/florists/${res.data.photo_url}`, {
//             responseType: "blob",
//           });
//           const imageBlob = imageRes.data;
//           const imageObjectUrl = URL.createObjectURL(imageBlob);
//           setImagePreview(imageObjectUrl);
//         }
//       } catch (error) {
//         console.error(error);
//       }
//     };
//     fetchData();

//     return () => {
//       if (imagePreview) {
//         URL.revokeObjectURL(imagePreview);
//       }
//     };
//   }, [floristId]);

//   return (
//     <div className="max-w-xl mt-5 bg-white">
//       <h3 className="text-xl font-medium text-gray-500 mb-4">Upload Logo</h3>
//       <div className="mb-4">
//         <input
//           type="file"
//           accept="image/*"
//           onChange={handleFileChange}
//           className="block w-full text-sm text-gray-700 file:py-2 file:px-4 file:rounded-full file:bg-blue-500 file:text-white file:border-0 file:hover:bg-blue-400"
//         />
//       </div>
//       {imagePreview && (
//         <div className="mt-6">
//           <img
//             src={imagePreview}
//             alt="Preview"
//             className="max-w-[200px] border rounded-lg shadow-md"
//           />
//         </div>
//       )}
//       <div className="mt-6">
//         <Button type="button" onClick={handleUploadClick}>Upload</Button>
//       </div>
//     </div>
//   );
// };

// export default FloristPhoto;


import { POST, PUT } from "@/api/restRequest";
import { fetchFloristById } from "@/api/services/floristService";
import { Button } from "@/ComponentModule";
import { ChangeEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

const FloristPhoto = () => {
  const { id } = useParams();
  const floristId = Number(id);
  const [photo, setPhoto] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedPhoto = e.target.files[0];
      setPhoto(selectedPhoto);
      const previewUrl = URL.createObjectURL(selectedPhoto);
      setImagePreview(previewUrl);
    }
  };

  const handleUploadClick = async () => {
    if (!photo) {
      toast.error("Please select a photo to upload.", {
        style: { backgroundColor: "#dc3545", color: "#fff" },
      });
      return;
    }

    const formData = new FormData();
    formData.append("photo", photo);

    try {
      const module = "florists";
      const response = await POST(`/photo/${module}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const photoUrl = response.data.photo_url;
      if (photoUrl) {
        const saveResponse = await PUT(`/florists/${floristId}/photo`, {
          photo_url: photoUrl,
        });

        toast.success(saveResponse.data.message, {
          style: { backgroundColor: "#28a745", color: "#fff" },
        });

        const imageUrl = `${photoUrl}`;
        setImagePreview(imageUrl);
      } else {
        throw new Error("Photo URL not received from the upload.");
      }
    } catch (error: any) {
      console.error(error);
      toast.error("Photo upload or save failed.", {
        style: { backgroundColor: "#dc3545", color: "#fff" },
      });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetchFloristById(floristId);
        if (res.data.photo_url) {
          const imageUrl = res.data.photo_url;
          setImagePreview(imageUrl);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [floristId]);

  return (
    <div className="max-w-xl mt-5 bg-white">
      <h3 className="text-xl font-medium text-gray-500 mb-4">Upload Logo</h3>
      <div className="mb-4">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-700 file:py-2 file:px-4 file:rounded-full file:bg-blue-500 file:text-white file:border-0 file:hover:bg-blue-400"
        />
      </div>
      {imagePreview && (
        <div className="mt-6">
          <img
            src={imagePreview}
            alt="Preview"
            className="max-w-[200px] border rounded-lg shadow-md"
          />
        </div>
      )}
      <div className="mt-6">
        <Button type="button" onClick={handleUploadClick}>Upload</Button>
      </div>
    </div>
  );
};

export default FloristPhoto;

