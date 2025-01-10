import { useEffect, useState, useRef } from "react";
import AddImage from "./AddImage";

function Home() {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImageName, setSelectedImageName] = useState("");
  const [isSheetOpen, setSheetOpen] = useState(false);

  useEffect(() => {
    const storedImages = localStorage.getItem("images");

    if (storedImages) {
      setImages(JSON.parse(storedImages));
    }
  }, []);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const newImageURL = reader.result;
        setSelectedImage(newImageURL);
        setSheetOpen(true);
        const title = file.name.split(".")[0];
        setSelectedImageName(title);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <AddImage
        handleFileSelect={handleFileSelect}
        selectedImage={selectedImage}
        selectedImageName={selectedImageName}
        setSelectedImage={setSelectedImage}
        setSelectedImageName={setSelectedImageName}
        isSheetOpen={isSheetOpen}
        setSheetOpen={setSheetOpen}
        setImages={setImages}
        images={images}
      />
    </div>
  );
}

export default Home;
