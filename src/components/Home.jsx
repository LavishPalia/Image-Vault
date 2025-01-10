import { useEffect, useState } from "react";
import AddImage from "./AddImage";

function Home() {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImageName, setSelectedImageName] = useState("");
  const [isSheetOpen, setSheetOpen] = useState(false);

  // console.log(images);

  // Load images from localStorage on component mount
  useEffect(() => {
    const storedImages = localStorage.getItem("images");
    console.log(storedImages);

    if (storedImages) {
      setImages(JSON.parse(storedImages));
    }
  }, []);

  // // Update localStorage whenever images state changes
  // useEffect(() => {
  //   localStorage.setItem("images", JSON.stringify(images));
  // }, [images]);

  // const handleFileSelect = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     setSelectedImage(URL.createObjectURL(file)); // Generate URL for image preview
  //     setSheetOpen(true); // Open the sheet when an image is selected
  //     const title = file.name.split(".")[0];
  //     setSelectedImageName(title);
  //   }
  // };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const newImageURL = reader.result; // Base64 string
        setSelectedImage(newImageURL);
        setSheetOpen(true); // Open the sheet when an image is selected
        const title = file.name.split(".")[0];
        setSelectedImageName(title);
      };
      reader.readAsDataURL(file); // Convert the file to Base64 string
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <AddImage
        handleFileSelect={handleFileSelect}
        selectedImage={selectedImage}
        selectedImageName={selectedImageName}
        setSelectedImage={setSelectedImage}
        isSheetOpen={isSheetOpen}
        setSheetOpen={setSheetOpen}
        setImages={setImages}
        images={images}
      />
    </div>
  );
}

export default Home;
