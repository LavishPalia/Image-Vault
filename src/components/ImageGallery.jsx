import { Search } from "lucide-react";
import { useLocation } from "react-router-dom";

const ImageGallery = () => {
  const location = useLocation();

  console.log("location.state", location.state);

  const selectedImages = location.state || [];

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <div className="flex items-center justify-between mb-6">
        <input
          type="text"
          placeholder="Search Assets"
          className="relative w-1/2 px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300"
        />

        <Search className="absolute right-[51%] text-muted-foreground" />
      </div>

      <div className="grid grid-cols-4 gap-4">
        {selectedImages.length > 0 &&
          selectedImages.map((image, index) => (
            <div
              key={index}
              className="relative overflow-hidden bg-white rounded-lg shadow-lg even:row-span-2 first-of-type:row-span-1 group"
            >
              <img
                src={image.url}
                alt={`Asset ${index + 1}`}
                className="object-cover object-center w-full h-full aspect-video"
              />

              <p className="absolute px-2 py-1 text-white transition-opacity duration-300 rounded opacity-0 top-2 left-2 bg-black/50 group-hover:opacity-100">
                {image.name}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ImageGallery;
